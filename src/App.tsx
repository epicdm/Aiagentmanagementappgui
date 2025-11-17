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
import { PersonasPage } from "./components/pages/PersonasPage";
import { BillingPage } from "./components/pages/BillingPage";
import { ApiKeysPage } from "./components/pages/ApiKeysPage";
import { WebhooksPage } from "./components/pages/WebhooksPage";
import { MarketplacePage } from "./components/pages/MarketplacePage";
import { WhiteLabelPage } from "./components/pages/WhiteLabelPage";
import { FunnelsPage } from "./components/pages/FunnelsPage";
import { FunnelDetailPage } from "./components/pages/FunnelDetailPage";
import { SocialMediaPage } from "./components/pages/SocialMediaPage";
import { SocialMediaCalendarPage } from "./components/pages/SocialMediaCalendarPage";
import { SocialPostDetailPage } from "./components/pages/SocialPostDetailPage";
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
type PageState = "dashboard" | "agents" | "phone-numbers" | "calls" | "live-calls" | "analytics" | "testing" | "leads" | "campaigns" | "settings" | "personas" | "billing" | "api-keys" | "webhooks" | "marketplace" | "white-label" | "funnels" | "social-media";
type AdminPageState = "admin-dashboard" | "admin-users" | "admin-billing" | "admin-analytics" | "admin-audit" | "admin-support" | "admin-content" | "admin-system";
type CallDetailState = { page: "call-detail"; callId: string };
type CampaignDetailState = { page: "campaign-detail"; campaignId: string };
type FunnelDetailState = { page: "funnel-detail"; funnelId: string };
type SocialCalendarState = { page: "social-calendar" };
type SocialPostDetailState = { page: "social-post-detail"; postId: string };

export default function App() {
  // Skip auth - go directly to app
  const [appState, setAppState] = useState<AppState>("app");
  const [currentPage, setCurrentPage] = useState<PageState | AdminPageState | CallDetailState | CampaignDetailState | FunnelDetailState | SocialCalendarState | SocialPostDetailState>({"page": "dashboard"} as any);
  const [user, setUser] = useState<any>({ email: "guest@demo.com", id: "demo-user" });
  const [accessToken, setAccessToken] = useState<string>("demo-token");
  const [isCreateAgentOpen, setIsCreateAgentOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // No loading needed

  const getCurrentPageId = () => {
    if (typeof currentPage === 'string') return currentPage;
    if (typeof currentPage === 'object' && 'page' in currentPage) {
      if (currentPage.page === 'call-detail') return 'calls';
      if (currentPage.page === 'campaign-detail') return 'campaigns';
      if (currentPage.page === 'funnel-detail') return 'funnels';
      if (currentPage.page === 'social-calendar') return 'social-media';
      if (currentPage.page === 'social-post-detail') return 'social-media';
      return currentPage.page;
    }
    return 'dashboard';
  };

  // No session check needed - public access
  useEffect(() => {
    // App is ready immediately
    console.log('App loaded - public access mode');
  }, []);

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

  const handleViewFunnelDetail = (funnelId: string) => {
    setCurrentPage({ page: "funnel-detail", funnelId });
  };

  const handleViewSocialCalendar = () => {
    setCurrentPage({ page: "social-calendar" });
  };

  const handleViewSocialPost = (postId: string) => {
    setCurrentPage({ page: "social-post-detail", postId });
  };

  const [showCreateSocialPost, setShowCreateSocialPost] = useState(false);

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

  // No loading or auth pages - direct access to app

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

        {currentPage === "personas" && (
          <PersonasPage accessToken={accessToken} />
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

        {currentPage === "funnels" && (
          <FunnelsPage 
            accessToken={accessToken}
            onNavigate={handleNavigate}
            onViewFunnel={handleViewFunnelDetail}
          />
        )}

        {typeof currentPage === 'object' && currentPage.page === "funnel-detail" && (
          <FunnelDetailPage
            funnelId={currentPage.funnelId}
            accessToken={accessToken}
            onBack={() => handleNavigate("funnels")}
          />
        )}

        {currentPage === "social-media" && (
          <SocialMediaPage 
            accessToken={accessToken}
            onNavigate={handleNavigate}
            onViewCalendar={handleViewSocialCalendar}
            onViewPost={handleViewSocialPost}
          />
        )}

        {typeof currentPage === 'object' && currentPage.page === "social-calendar" && (
          <SocialMediaCalendarPage
            accessToken={accessToken}
            onBack={() => handleNavigate("social-media")}
            onCreatePost={() => setShowCreateSocialPost(true)}
            onViewPost={handleViewSocialPost}
          />
        )}

        {typeof currentPage === 'object' && currentPage.page === "social-post-detail" && (
          <SocialPostDetailPage
            postId={currentPage.postId}
            accessToken={accessToken}
            onBack={() => handleNavigate("social-media")}
          />
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
