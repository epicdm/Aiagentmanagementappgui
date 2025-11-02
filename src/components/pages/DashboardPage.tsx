import { useState, useEffect, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Bot, Phone, TrendingUp, TrendingDown, DollarSign, MessageSquare, BarChart3, Plus, ArrowRight, Loader2 } from "lucide-react";
import { getDashboardStats, getCalls, DashboardStats, CallLog } from "../../utils/api";
import { toast } from "sonner@2.0.3";

interface DashboardPageProps {
  accessToken: string;
  onNavigate: (page: string) => void;
  onCreateAgent: () => void;
}

export function DashboardPage({ accessToken, onNavigate, onCreateAgent }: DashboardPageProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentCalls, setRecentCalls] = useState<CallLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();

    // Listen for agent created events to reload data
    const handleAgentCreated = () => {
      // Small delay to ensure backend has saved the data
      setTimeout(() => {
        loadDashboardData();
      }, 500);
    };

    window.addEventListener('agentCreated', handleAgentCreated);
    return () => window.removeEventListener('agentCreated', handleAgentCreated);
  }, [accessToken]);

  const loadDashboardData = async () => {
    console.log('🎯 [DASHBOARD] Loading dashboard data...');
    try {
      setIsLoading(true);
      console.log('🎯 [DASHBOARD] Making parallel API calls...');
      const [statsData, callsData] = await Promise.all([
        getDashboardStats(accessToken),
        getCalls(accessToken, 5)
      ]);
      console.log('🎯 [DASHBOARD] Stats received:', statsData);
      console.log('🎯 [DASHBOARD] Calls received:', callsData);
      setStats(statsData);
      // Filter out null calls
      const validCalls = (callsData.calls || []).filter(call => call != null);
      console.log('🎯 [DASHBOARD] Valid calls:', validCalls.length);
      setRecentCalls(validCalls);
      console.log('🎯 [DASHBOARD] ✅ Dashboard loaded successfully');
    } catch (error) {
      console.error('🎯 [DASHBOARD] ❌ Error loading dashboard:', error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const mins = Math.floor(diff / (1000 * 60));
      return `${mins}m ago`;
    }
    if (hours < 24) {
      return `${hours}h ago`;
    }
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600 dark:text-slate-400">No data available</p>
      </div>
    );
  }

  const hasAgents = stats.total_agents > 0;

  if (!hasAgents) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
            <Bot className="h-8 w-8 text-blue-600 dark:text-blue-300" />
          </div>
          <h2 className="text-3xl mb-4">Welcome to AI Agent Studio!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Get started by creating your first AI voice agent. 
            Build powerful conversational experiences in minutes.
          </p>
          <Button size="lg" onClick={onCreateAgent}>
            <Plus className="h-5 w-5 mr-2" />
            Create Your First Agent
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome back! Here's your account overview</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Agents"
          value={stats.total_agents}
          trend={stats.trends.agents}
          icon={<Bot className="h-5 w-5" />}
          iconBg="bg-blue-100 dark:bg-blue-900"
          iconColor="text-blue-600 dark:text-blue-300"
        />
        <MetricCard
          title="Phone Numbers"
          value={stats.total_phone_numbers}
          subtitle="assigned"
          icon={<Phone className="h-5 w-5" />}
          iconBg="bg-purple-100 dark:bg-purple-900"
          iconColor="text-purple-600 dark:text-purple-300"
        />
        <MetricCard
          title="Calls Today"
          value={stats.total_calls_today}
          trend={stats.trends.calls}
          icon={<MessageSquare className="h-5 w-5" />}
          iconBg="bg-green-100 dark:bg-green-900"
          iconColor="text-green-600 dark:text-green-300"
        />
        <MetricCard
          title="Calls This Month"
          value={stats.total_calls_month}
          subtitle="billing period"
          icon={<BarChart3 className="h-5 w-5" />}
          iconBg="bg-orange-100 dark:bg-orange-900"
          iconColor="text-orange-600 dark:text-orange-300"
        />
        <MetricCard
          title="Cost Today"
          value={`$${stats.total_cost_today_usd}`}
          subtitle="since midnight"
          icon={<DollarSign className="h-5 w-5" />}
          iconBg="bg-emerald-100 dark:bg-emerald-900"
          iconColor="text-emerald-600 dark:text-emerald-300"
        />
        <MetricCard
          title="Cost This Month"
          value={`$${stats.total_cost_month_usd}`}
          trend={stats.trends.costs}
          icon={<DollarSign className="h-5 w-5" />}
          iconBg="bg-pink-100 dark:bg-pink-900"
          iconColor="text-pink-600 dark:text-pink-300"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard
            icon={<Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
            title="Manage Agents"
            description="View and edit your AI agents"
            onClick={() => onNavigate('agents')}
          />
          <QuickActionCard
            icon={<Phone className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
            title="Phone Numbers"
            description="Provision and assign numbers"
            onClick={() => onNavigate('phone-numbers')}
          />
          <QuickActionCard
            icon={<BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400" />}
            title="Call History"
            description="View logs and analytics"
            onClick={() => onNavigate('calls')}
          />
        </div>
      </div>

      {/* Recent Calls */}
      {recentCalls.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Calls</CardTitle>
                <CardDescription>Your latest call activity</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => onNavigate('calls')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCalls.filter(call => call && call.id).map((call) => (
                <div key={call.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      call.direction === 'inbound' ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'
                    }`}>
                      <MessageSquare className={`h-4 w-4 ${
                        call.direction === 'inbound' ? 'text-green-600 dark:text-green-300' : 'text-blue-600 dark:text-blue-300'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span>{call.phoneNumber || 'N/A'}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                          {call.direction || 'unknown'}
                        </span>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {call.createdAt ? formatDate(call.createdAt) : 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm">{call.duration ? formatDuration(call.duration) : '0:00'}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">${call.cost || '0.00'}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      call.outcome === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      call.outcome === 'failed' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {call.outcome}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  trend?: { value: string; isPositive: boolean };
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
}

function MetricCard({ title, value, subtitle, trend, icon, iconBg, iconColor }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${iconBg}`}>
            <div className={iconColor}>{icon}</div>
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${
              trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {trend.value}
            </div>
          )}
        </div>
        <div className="text-3xl mb-1">{value}</div>
        <div className="text-sm text-slate-600 dark:text-slate-400">{title}</div>
        {subtitle && <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{subtitle}</div>}
      </CardContent>
    </Card>
  );
}

interface QuickActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function QuickActionCard({ icon, title, description, onClick }: QuickActionCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{description}</p>
        <Button variant="ghost" size="sm" className="group">
          Go
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
