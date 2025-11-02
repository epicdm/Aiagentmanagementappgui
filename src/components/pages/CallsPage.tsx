import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { MessageSquare, Phone, Search, Loader2, Download, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { CallLog, getCalls, Agent, getAgents } from "../../utils/api";
import { toast } from "sonner@2.0.3";

interface CallsPageProps {
  accessToken: string;
  onViewCallDetail?: (callId: string) => void;
}

export function CallsPage({ accessToken, onViewCallDetail }: CallsPageProps) {
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<CallLog[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadData();

    // Listen for agent created events to reload data
    const handleAgentCreated = () => {
      // Small delay to ensure backend has generated mock calls
      setTimeout(() => {
        loadData();
      }, 500);
    };

    window.addEventListener('agentCreated', handleAgentCreated);
    return () => window.removeEventListener('agentCreated', handleAgentCreated);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = calls.filter(call => 
        call && call.phoneNumber &&
        (call.phoneNumber.includes(searchQuery) ||
        getAgentName(call.agentId)?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredCalls(filtered);
    } else {
      setFilteredCalls(calls);
    }
  }, [searchQuery, calls]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [callsData, agentsData] = await Promise.all([
        getCalls(accessToken, 100),
        getAgents(accessToken)
      ]);
      // Filter out null values
      const validCalls = (callsData.calls || []).filter(call => call != null);
      const validAgents = (agentsData || []).filter(agent => agent != null && agent.id);
      setCalls(validCalls);
      setFilteredCalls(validCalls);
      setAgents(validAgents);
    } catch (error) {
      console.error('Error loading calls:', error);
      toast.error("Failed to load calls");
    } finally {
      setIsLoading(false);
    }
  };

  const getAgentName = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || 'Unknown';
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Calculate stats
  const totalCalls = filteredCalls.length;
  const successfulCalls = filteredCalls.filter(c => c.outcome === 'success').length;
  const successRate = totalCalls > 0 ? ((successfulCalls / totalCalls) * 100).toFixed(1) : '0';
  const avgDuration = filteredCalls.length > 0 
    ? Math.floor(filteredCalls.reduce((sum, c) => sum + c.duration, 0) / filteredCalls.length)
    : 0;
  const totalCost = filteredCalls.reduce((sum, c) => sum + parseFloat(c.cost), 0).toFixed(2);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl mb-2">Call History</h1>
          <p className="text-slate-600">View and analyze all calls</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search calls, numbers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl mb-1">{totalCalls}</div>
            <div className="text-sm text-slate-600">Total Calls</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl mb-1">{successRate}%</div>
            <div className="text-sm text-slate-600">Success Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl mb-1">{formatDuration(avgDuration)}</div>
            <div className="text-sm text-slate-600">Avg Duration</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl mb-1">${totalCost}</div>
            <div className="text-sm text-slate-600">Total Cost</div>
          </CardContent>
        </Card>
      </div>

      {/* Calls Table */}
      {filteredCalls.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl mb-2">No Calls Found</h3>
            <p className="text-slate-600">
              {searchQuery ? 'Try adjusting your search query' : 'Make your first call to see activity here'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm">Date/Time</th>
                    <th className="text-left p-4 text-sm">Agent</th>
                    <th className="text-left p-4 text-sm">Phone</th>
                    <th className="text-left p-4 text-sm">Direction</th>
                    <th className="text-left p-4 text-sm">Duration</th>
                    <th className="text-left p-4 text-sm">Cost</th>
                    <th className="text-left p-4 text-sm">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredCalls.filter(call => call && call.id).map(call => (
                    <tr 
                      key={call.id} 
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => onViewCallDetail?.(call.id)}
                    >
                      <td className="p-4">
                        <div className="text-sm">{call.createdAt ? formatDate(call.createdAt) : 'N/A'}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{getAgentName(call.agentId)}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-mono">{call.phoneNumber || 'N/A'}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {call.direction === 'inbound' ? (
                            <ArrowDownCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowUpCircle className="h-4 w-4 text-blue-600" />
                          )}
                          <span className="text-sm capitalize">{call.direction || 'unknown'}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{call.duration ? formatDuration(call.duration) : '0:00'}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">${call.cost || '0.00'}</div>
                      </td>
                      <td className="p-4">
                        <Badge variant={
                          call.outcome === 'success' ? 'default' :
                          call.outcome === 'failed' ? 'destructive' :
                          'secondary'
                        }>
                          {call.outcome || 'unknown'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
