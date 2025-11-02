import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Loader2, Download, TrendingUp, TrendingDown } from "lucide-react";
import { getAnalytics, AnalyticsData } from "../../utils/api";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "sonner@2.0.3";

interface AnalyticsPageProps {
  accessToken: string;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function AnalyticsPage({ accessToken }: AnalyticsPageProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      const data = await getAnalytics(accessToken);
      // Ensure data is valid
      if (data && data.summary && data.callsByDate && data.agentPerformance) {
        setAnalytics(data);
      } else {
        console.error('Invalid analytics data received');
        toast.error("Invalid analytics data");
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast.error("Failed to load analytics");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl mb-2">Analytics</h1>
          <p className="text-slate-600">Track performance and insights</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl mb-1">{analytics.summary.totalCalls}</div>
            <div className="text-sm text-slate-600">Total Calls</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
              <TrendingUp className="h-4 w-4" />
              +12%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl mb-1">{analytics.summary.successRate}%</div>
            <div className="text-sm text-slate-600">Success Rate</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
              <TrendingUp className="h-4 w-4" />
              +3%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl mb-1">{formatDuration(analytics.summary.avgDuration)}</div>
            <div className="text-sm text-slate-600">Avg Duration</div>
            <div className="flex items-center gap-1 text-sm text-red-600 mt-2">
              <TrendingDown className="h-4 w-4" />
              -5%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl mb-1">${analytics.summary.totalCost}</div>
            <div className="text-sm text-slate-600">Total Cost</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
              <TrendingUp className="h-4 w-4" />
              +15%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call Volume Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Call Volume (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.callsByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Calls"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance by Agent */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Agent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm">Agent</th>
                  <th className="text-left p-4 text-sm">Calls</th>
                  <th className="text-left p-4 text-sm">Success Rate</th>
                  <th className="text-left p-4 text-sm">Avg Duration</th>
                  <th className="text-left p-4 text-sm">Total Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {(analytics.agentPerformance || []).filter(agent => agent && agent.agentId).map(agent => (
                  <tr key={agent.agentId} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">{agent.agentName || 'Unknown'}</td>
                    <td className="p-4">{agent.calls || 0}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[100px]">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${agent.successRate || 0}%` }}
                          />
                        </div>
                        <span className="text-sm">{agent.successRate}%</span>
                      </div>
                    </td>
                    <td className="p-4">{formatDuration(agent.avgDuration)}</td>
                    <td className="p-4">${agent.totalCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Calls by Agent (Bar Chart) */}
      <Card>
        <CardHeader>
          <CardTitle>Calls by Agent</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={(analytics.agentPerformance || []).filter(agent => agent && agent.agentId)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="agentName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="calls" fill="#3b82f6" name="Total Calls" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
