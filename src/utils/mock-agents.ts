// Mock agents data for frontend fallback when backend is unavailable
import { Agent } from './api';

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'agent_1',
    userId: 'demo-user',
    name: 'Customer Support Assistant',
    type: 'voice',
    model: 'gpt-4',
    voice: 'nova',
    language: 'en-US',
    systemPrompt: 'You are a helpful customer support agent. Always be polite, professional, and focus on solving customer problems efficiently.',
    status: 'active',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'agent_2',
    userId: 'demo-user',
    name: 'Sales Outreach Agent',
    type: 'voice',
    model: 'gpt-4-turbo',
    voice: 'alloy',
    language: 'en-US',
    systemPrompt: 'You are a confident sales development representative. Your goal is to qualify leads, understand their needs, and book product demonstrations. Be enthusiastic but not pushy.',
    status: 'active',
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'agent_3',
    userId: 'demo-user',
    name: 'Appointment Scheduler',
    type: 'voice',
    model: 'gpt-4',
    voice: 'shimmer',
    language: 'en-US',
    systemPrompt: 'You are a professional scheduling assistant. Help customers book appointments efficiently. Check availability, confirm details, and send confirmations.',
    status: 'active',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'agent_4',
    userId: 'demo-user',
    name: 'Technical Support Specialist',
    type: 'chat',
    model: 'claude-3.7-sonnet',
    language: 'en-US',
    systemPrompt: 'You are a knowledgeable technical support specialist. Help customers troubleshoot technical issues step-by-step. Be patient and explain things clearly.',
    status: 'inactive',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'agent_5',
    userId: 'demo-user',
    name: 'Lead Qualification Bot',
    type: 'chat',
    model: 'gpt-4.1-mini',
    language: 'en-US',
    systemPrompt: 'You are a lead qualification specialist. Ask key questions to understand the prospect\'s needs, budget, timeline, and decision-making process. Be professional and thorough.',
    status: 'active',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Store for locally created agents (in-memory)
let localAgents: Agent[] = [...MOCK_AGENTS];

export function getMockAgents(): Agent[] {
  return [...localAgents];
}

export function generateMockAgent(agentData: Partial<Agent>): Agent {
  const newAgent: Agent = {
    id: `agent_${Date.now()}`,
    userId: 'demo-user',
    name: agentData.name || 'New Agent',
    type: agentData.type || 'voice',
    model: agentData.model || 'gpt-4',
    voice: agentData.voice || 'nova',
    language: agentData.language || 'en-US',
    systemPrompt: agentData.systemPrompt || '',
    status: agentData.status || 'active',
    createdAt: new Date().toISOString(),
  };
  
  // Add to local storage
  localAgents.push(newAgent);
  
  return newAgent;
}

export function updateMockAgent(agentId: string, updates: Partial<Agent>): Agent {
  const index = localAgents.findIndex(a => a.id === agentId);
  
  if (index === -1) {
    throw new Error('Agent not found');
  }
  
  localAgents[index] = {
    ...localAgents[index],
    ...updates,
  };
  
  return localAgents[index];
}

export function deleteMockAgent(agentId: string): void {
  localAgents = localAgents.filter(a => a.id !== agentId);
}

export function resetMockAgents(): void {
  localAgents = [...MOCK_AGENTS];
}
