import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Bot, Plus, Search, Loader2 } from "lucide-react";
import { Agent, getAgents, deleteAgent } from "../../utils/api";
import { AgentCard } from "../AgentCard";
import { CreateAgentDialog } from "../CreateAgentDialog";
import { EditAgentDialog } from "../EditAgentDialog";
import { toast } from "sonner@2.0.3";

interface AgentsPageProps {
  accessToken: string;
}

export function AgentsPage({ accessToken }: AgentsPageProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadAgents();

    // Listen for agent created events
    const handleAgentCreated = (event: CustomEvent) => {
      const newAgent = event.detail;
      setAgents(prev => [...prev, newAgent]);
      toast.success(`Agent "${newAgent.name}" created successfully!`);
    };

    window.addEventListener('agentCreated', handleAgentCreated as EventListener);
    return () => window.removeEventListener('agentCreated', handleAgentCreated as EventListener);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = agents.filter(agent => 
        agent && agent.name && agent.type &&
        (agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.type.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredAgents(filtered);
    } else {
      setFilteredAgents(agents);
    }
  }, [searchQuery, agents]);

  const loadAgents = async () => {
    try {
      setIsLoading(true);
      const fetchedAgents = await getAgents(accessToken);
      // Filter out any null or invalid agents
      const validAgents = fetchedAgents.filter(agent => agent != null && agent.id);
      setAgents(validAgents);
      setFilteredAgents(validAgents);
    } catch (error) {
      console.error('Error loading agents:', error);
      toast.error("Failed to load agents");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgentCreated = (agent: Agent) => {
    setAgents([...agents, agent]);
    setIsCreateDialogOpen(false);
    toast.success("Agent created successfully!");
  };

  const handleAgentUpdated = (updatedAgent: Agent) => {
    setAgents(agents.map(a => a.id === updatedAgent.id ? updatedAgent : a));
    setSelectedAgent(null);
    toast.success("Agent updated successfully!");
  };

  const handleDeleteAgent = async (agentId: string) => {
    try {
      await deleteAgent(accessToken, agentId);
      setAgents(agents.filter(a => a.id !== agentId));
      setSelectedAgent(null);
      toast.success("Agent deleted successfully!");
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast.error("Failed to delete agent");
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl mb-2">AI Agents</h1>
          <p className="text-slate-600">Create and manage your voice AI agents</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Agent
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Agents Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="text-center py-20">
          {searchQuery ? (
            <>
              <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">No agents found</h3>
              <p className="text-slate-600 mb-6">
                Try adjusting your search query
              </p>
            </>
          ) : (
            <>
              <Bot className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">No Agents Yet</h3>
              <p className="text-slate-600 mb-6">
                Create your first AI agent to get started
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Agent
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.filter(agent => agent != null && agent.id).map(agent => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onClick={() => setSelectedAgent(agent)}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <CreateAgentDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onAgentCreated={handleAgentCreated}
        accessToken={accessToken}
      />

      {selectedAgent && (
        <EditAgentDialog
          agent={selectedAgent}
          isOpen={!!selectedAgent}
          onClose={() => setSelectedAgent(null)}
          onAgentUpdated={handleAgentUpdated}
          accessToken={accessToken}
        />
      )}
    </div>
  );
}
