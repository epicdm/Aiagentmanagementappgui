import { useState, useEffect } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LandingPage } from "./components/LandingPage";
import { AuthPage } from "./components/AuthPage";
import { AppLayout } from "./components/AppLayout";
import { AdminLayout } from "./components/AdminLayout";
import { useSessionTimeout } from "./utils/hooks";
import { toast } from "sonner";
import { DashboardPage } from "./components/pages/DashboardPage";
import { AgentsPage } from "./components/pages/AgentsPage";
import { PhoneNumbersPage } from "./components/pages/PhoneNumbersPage";
import { CallsPage } from "./components/pages/CallsPage";
import { CallDetailPage } from "./components/pages/CallDetailPage";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { TestingPage } from "./components/pages/TestingPage";
import { LeadsPage } from "./components/pages/LeadsPage";
import { CampaignsPage } from "./components/pages/CampaignsPage";
import { CampaignDetailPage } from "./components/pages/CampaignDetailPage";
import { LiveCallsPage } from "./components/pages/LiveCallsPage";
import { SettingsPage } from "./components/pages/SettingsPage";
import { BillingPage } from "./components/pages/BillingPage";
import { ApiKeysPage } from "./components/pages/ApiKeysPage";
import { WebhooksPage } from "./components/pages/WebhooksPage";
import { MarketplacePage } from "./components/pages/MarketplacePage";
import { WhiteLabelPage } from "./components/pages/WhiteLabelPage";
import { AdminDashboardPage } from "./components/pages/admin/AdminDashboardPage";
import { AdminUsersPage } from "./components/pages/admin/AdminUsersPage";
import { AdminBillingPage } from "./components/pages/admin/AdminBillingPage";
import { AdminAnalyticsPage } from "./components/pages/admin/AdminAnalyticsPage";
import { AdminAuditLogsPage } from "./components/pages/admin/AdminAuditLogsPage";
import { AdminSupportPage } from "./components/pages/admin/AdminSupportPage";
import { AdminContentPage } from "./components/pages/admin/AdminContentPage";
import { AdminSystemPage } from "./components/pages/admin/AdminSystemPage";
import { Toaster } from "./components/ui/sonner";
import { createClient } from "./utils/supabase/client";
import { CreateAgentDialog } from "./components/CreateAgentDialog";
import { Agent } from "./utils/api";

type AppState = "landing" | "auth" | "app" | "admin";
type PageState = "dashboard" | "agents" | "phone-numbers" | "calls" | "live-calls" | "analytics" | "testing" | "leads" | "campaigns" | "settings" | "billing" | "api-keys" | "webhooks" | "marketplace" | "white-label";
type AdminPageState = "admin-dashboard" | "admin-users" | "admin-billing" | "admin-analytics" | "admin-audit" | "admin-support" | "admin-content" | "admin-system";
type CallDetailState = { page: "call-detail"; callId: string };
type CampaignDetailState = { page: "campaign-detail"; campaignId: string };

export default function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [currentPage, setCurrentPage] = useState<PageState | AdminPageState | CallDetailState | CampaignDetailState>({"page": "dashboard"} as any);
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [isCreateAgentOpen, setIsCreateAgentOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentPageId = () => {
    if (typeof currentPage === 'string') return currentPage;
    if (typeof currentPage === 'object' && 'page' in currentPage) {
      if (currentPage.page === 'call-detail') return 'calls';
      if (currentPage.page === 'campaign-detail') return 'campaigns';
      return currentPage.page;
    }
    return 'dashboard';
  };

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token && session?.user) {
        setAccessToken(session.access_token);
        setUser(session.user);
        setAppState("app");
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStarted = () => {
    setAppState("auth");
  };

  const handleAuthSuccess = (token: string, userData: any) => {
    setAccessToken(token);
    setUser(userData);
    setAppState("app");
    setCurrentPage("dashboard");
  };

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setAccessToken("");
      setUser(null);
      setAppState("landing");
      setCurrentPage("dashboard");
      toast.success("Signed out successfully");
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Error signing out");
    }
  };

  // Session timeout - auto logout after 30 minutes of inactivity
  const handleSessionTimeout = async () => {
    toast.error("Session expired due to inactivity. Please sign in again.");
    await handleSignOut();
  };

  // Only enable session timeout when user is logged in
  useSessionTimeout(
    handleSessionTimeout,
    30 * 60 * 1000, // 30 minutes
  );

  const handleNavigate = (page: string) => {
    // If navigating to admin pages, switch to admin mode
    if (page.startsWith('admin-')) {
      setAppState('admin');
    }
    setCurrentPage(page as PageState | AdminPageState);
  };

  const handleBackToApp = () => {
    setAppState('app');
    setCurrentPage('dashboard');
  };

  const handleViewCallDetail = (callId: string) => {
    setCurrentPage({ page: "call-detail", callId });
  };

  const handleViewCampaignDetail = (campaignId: string) => {
    setCurrentPage({ page: "campaign-detail", campaignId });
  };

  const handleCreateAgent = () => {
    setIsCreateAgentOpen(true);
  };

  const handleAgentCreated = (agent: Agent) => {
    setIsCreateAgentOpen(false);
    // Dispatch a custom event that pages can listen to
    window.dispatchEvent(new CustomEvent('agentCreated', { detail: agent }));
    // Navigate to agents page to show the new agent
    setCurrentPage("agents");
  };

  // Show loading state while checking session
  if (isLoading) {
    return (
      <ErrorBoundary>
        <ThemeProvider>
          <div className="flex items-center justify-center min-h-screen bg-slate-950">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
              <p className="mt-4 text-slate-400">Loading...</p>
            </div>
          </div>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  if (appState === "landing") {
    return (
      <ErrorBoundary>
        <ThemeProvider>
          <LandingPage onGetStarted={handleGetStarted} />
          <Toaster />
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  if (appState === "auth") {
    return (
      <ErrorBoundary>
        <ThemeProvider>
          <AuthPage onAuthSuccess={handleAuthSuccess} />
          <Toaster />
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  // Admin panel rendering
  if (appState === "admin") {
    return (
      <ErrorBoundary>
        <ThemeProvider>
          <AdminLayout
            currentPage={getCurrentPageId()}
            onNavigate={handleNavigate}
            onBackToApp={handleBackToApp}
          >
            {currentPage === "admin-dashboard" && <AdminDashboardPage />}
            {currentPage === "admin-users" && <AdminUsersPage />}
            {currentPage === "admin-billing" && <AdminBillingPage />}
            {currentPage === "admin-analytics" && <AdminAnalyticsPage />}
            {currentPage === "admin-audit" && <AdminAuditLogsPage />}
            {currentPage === "admin-support" && <AdminSupportPage />}
            {currentPage === "admin-content" && <AdminContentPage />}
            {currentPage === "admin-system" && <AdminSystemPage />}
          </AdminLayout>
          <Toaster />
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
      <AppLayout
        user={user}
        currentPage={getCurrentPageId()}
        onNavigate={handleNavigate}
        onSignOut={handleSignOut}
      >
        {currentPage === "dashboard" && (
          <DashboardPage
            accessToken={accessToken}
            onNavigate={handleNavigate}
            onCreateAgent={handleCreateAgent}
          />
        )}
        
        {currentPage === "agents" && (
          <AgentsPage accessToken={accessToken} />
        )}
        
        {currentPage === "phone-numbers" && (
          <PhoneNumbersPage accessToken={accessToken} />
        )}
        
        {currentPage === "calls" && (
          <CallsPage 
            accessToken={accessToken}
            onViewCallDetail={handleViewCallDetail}
          />
        )}

        {currentPage === "live-calls" && (
          <LiveCallsPage accessToken={accessToken} />
        )}

        {typeof currentPage === 'object' && currentPage.page === "call-detail" && (
          <CallDetailPage
            callId={currentPage.callId}
            accessToken={accessToken}
            onBack={() => handleNavigate("calls")}
          />
        )}
        
        {currentPage === "analytics" && (
          <AnalyticsPage accessToken={accessToken} />
        )}
        
        {currentPage === "testing" && (
          <TestingPage accessToken={accessToken} />
        )}

        {currentPage === "leads" && (
          <LeadsPage accessToken={accessToken} />
        )}

        {currentPage === "campaigns" && (
          <CampaignsPage 
            accessToken={accessToken}
            onViewDetail={handleViewCampaignDetail}
          />
        )}

        {typeof currentPage === 'object' && currentPage.page === "campaign-detail" && (
          <CampaignDetailPage
            campaignId={currentPage.campaignId}
            accessToken={accessToken}
            onBack={() => handleNavigate("campaigns")}
          />
        )}

        {currentPage === "settings" && (
          <SettingsPage accessToken={accessToken} user={user} />
        )}

        {currentPage === "billing" && (
          <BillingPage accessToken={accessToken} />
        )}

        {currentPage === "api-keys" && (
          <ApiKeysPage accessToken={accessToken} />
        )}

        {currentPage === "webhooks" && (
          <WebhooksPage accessToken={accessToken} />
        )}

        {currentPage === "marketplace" && (
          <MarketplacePage accessToken={accessToken} />
        )}

        {currentPage === "white-label" && (
          <WhiteLabelPage accessToken={accessToken} />
        )}
      </AppLayout>

      {/* Global Create Agent Dialog */}
      <CreateAgentDialog
        isOpen={isCreateAgentOpen}
        onClose={() => setIsCreateAgentOpen(false)}
        onAgentCreated={handleAgentCreated}
        accessToken={accessToken}
      />

      <Toaster />
    </ThemeProvider>
    </ErrorBoundary>
  );
}
