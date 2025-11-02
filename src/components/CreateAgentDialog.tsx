import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Agent, createAgent } from "../utils/api";
import { toast } from "sonner@2.0.3";

interface CreateAgentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentCreated: (agent: Agent) => void;
  accessToken: string;
}

export function CreateAgentDialog({ isOpen, onClose, onAgentCreated, accessToken }: CreateAgentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "chat" as "voice" | "chat",
    model: "gpt-4",
    voice: "alloy",
    language: "en-US",
    systemPrompt: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Please enter an agent name");
      return;
    }

    setIsLoading(true);

    try {
      const agent = await createAgent(accessToken, {
        ...formData,
        status: 'active',
      });
      
      toast.success(`Agent "${agent.name}" created successfully!`);
      
      onAgentCreated(agent);
      
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('agentCreated', { detail: agent }));
      
      // Reset form
      setFormData({
        name: "",
        type: "chat",
        model: "gpt-4",
        voice: "alloy",
        language: "en-US",
        systemPrompt: "",
      });
      
      onClose();
    } catch (error: any) {
      console.error('Error creating agent:', error);
      toast.error(error.message || "Failed to create agent");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New AI Agent</DialogTitle>
          <DialogDescription>
            Configure your new voice or chat AI agent
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Agent Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Customer Support Bot"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Agent Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "voice" | "chat") => setFormData({ ...formData, type: value })}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chat">Chat Agent</SelectItem>
                <SelectItem value="voice">Voice Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">AI Model *</Label>
            <Select
              value={formData.model}
              onValueChange={(value) => setFormData({ ...formData, model: value })}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === 'voice' && (
            <div className="space-y-2">
              <Label htmlFor="voice">Voice *</Label>
              <Select
                value={formData.voice}
                onValueChange={(value) => setFormData({ ...formData, voice: value })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alloy">Alloy</SelectItem>
                  <SelectItem value="echo">Echo</SelectItem>
                  <SelectItem value="fable">Fable</SelectItem>
                  <SelectItem value="onyx">Onyx</SelectItem>
                  <SelectItem value="nova">Nova</SelectItem>
                  <SelectItem value="shimmer">Shimmer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="language">Language *</Label>
            <Select
              value={formData.language}
              onValueChange={(value) => setFormData({ ...formData, language: value })}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="en-GB">English (UK)</SelectItem>
                <SelectItem value="es-ES">Spanish</SelectItem>
                <SelectItem value="fr-FR">French</SelectItem>
                <SelectItem value="de-DE">German</SelectItem>
                <SelectItem value="it-IT">Italian</SelectItem>
                <SelectItem value="pt-BR">Portuguese</SelectItem>
                <SelectItem value="zh-CN">Chinese</SelectItem>
                <SelectItem value="ja-JP">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              placeholder="You are a helpful AI assistant that..."
              value={formData.systemPrompt}
              onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
              disabled={isLoading}
              rows={4}
            />
            <p className="text-xs text-slate-500">
              Define the personality and behavior of your AI agent
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Agent"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
