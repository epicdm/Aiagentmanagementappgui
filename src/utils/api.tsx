import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9d2dee99`;

export interface Agent {
  id: string;
  userId: string;
  name: string;
  type: 'voice' | 'chat';
  model: string;
  voice?: string;
  language: string;
  systemPrompt: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export async function signup(email: string, password: string, name: string) {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify({ email, password, name })
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Signup error:', data.error);
    throw new Error(data.error || 'Failed to sign up');
  }

  return data;
}

export async function getAgents(accessToken: string): Promise<Agent[]> {
  console.log('🤖 [FRONTEND] Fetching agents...');
  console.log('🤖 [FRONTEND] API URL:', `${API_BASE_URL}/agents`);
  console.log('🤖 [FRONTEND] Access Token:', accessToken ? `${accessToken.substring(0, 20)}...` : 'MISSING');
  
  const response = await fetch(`${API_BASE_URL}/agents`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  console.log('🤖 [FRONTEND] Response Status:', response.status, response.statusText);
  
  const data = await response.json();
  console.log('🤖 [FRONTEND] Response Data:', data);
  console.log('🤖 [FRONTEND] Agents count:', data.agents?.length || 0);
  
  if (!response.ok) {
    console.error('🤖 [FRONTEND] ERROR:', data.error);
    throw new Error(data.error || 'Failed to fetch agents');
  }

  return data.agents;
}

export async function createAgent(accessToken: string, agentData: Partial<Agent>): Promise<Agent> {
  const response = await fetch(`${API_BASE_URL}/agents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(agentData)
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Create agent error:', data.error);
    throw new Error(data.error || 'Failed to create agent');
  }

  return data.agent;
}

export async function updateAgent(accessToken: string, agentId: string, updates: Partial<Agent>): Promise<Agent> {
  const response = await fetch(`${API_BASE_URL}/agents/${agentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(updates)
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Update agent error:', data.error);
    throw new Error(data.error || 'Failed to update agent');
  }

  return data.agent;
}

export async function deleteAgent(accessToken: string, agentId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/agents/${agentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Delete agent error:', data.error);
    throw new Error(data.error || 'Failed to delete agent');
  }
}

// Dashboard Stats
export interface DashboardStats {
  total_agents: number;
  total_phone_numbers: number;
  total_calls_today: number;
  total_calls_month: number;
  total_cost_today_usd: string;
  total_cost_month_usd: string;
  trends: {
    agents: { value: string; isPositive: boolean };
    calls: { value: string; isPositive: boolean };
    costs: { value: string; isPositive: boolean };
  };
}

export async function getDashboardStats(accessToken: string): Promise<DashboardStats> {
  console.log('📊 [FRONTEND] Fetching dashboard stats...');
  console.log('📊 [FRONTEND] API URL:', `${API_BASE_URL}/dashboard/stats`);
  console.log('📊 [FRONTEND] Access Token:', accessToken ? `${accessToken.substring(0, 20)}...` : 'MISSING');
  
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  console.log('📊 [FRONTEND] Response Status:', response.status, response.statusText);
  
  const data = await response.json();
  console.log('📊 [FRONTEND] Response Data:', data);
  
  if (!response.ok) {
    console.error('📊 [FRONTEND] ERROR:', data.error);
    throw new Error(data.error || 'Failed to fetch dashboard stats');
  }

  console.log('📊 [FRONTEND] Stats received:', data.stats);
  return data.stats;
}

// Call Logs
export interface CallLog {
  id: string;
  userId: string;
  agentId: string;
  phoneNumber: string;
  direction: 'inbound' | 'outbound';
  duration: number;
  outcome: 'success' | 'failed' | 'voicemail' | 'busy' | 'no_answer';
  cost: string;
  createdAt: string;
  transcript?: string;
  recording?: string;
}

export async function getCalls(accessToken: string, limit: number = 50): Promise<{ calls: CallLog[]; total: number }> {
  console.log('📞 [FRONTEND] Fetching calls...');
  console.log('📞 [FRONTEND] API URL:', `${API_BASE_URL}/calls?limit=${limit}`);
  console.log('📞 [FRONTEND] Access Token:', accessToken ? `${accessToken.substring(0, 20)}...` : 'MISSING');
  
  const response = await fetch(`${API_BASE_URL}/calls?limit=${limit}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  console.log('📞 [FRONTEND] Response Status:', response.status, response.statusText);
  
  const data = await response.json();
  console.log('📞 [FRONTEND] Response Data:', data);
  console.log('📞 [FRONTEND] Calls count:', data.calls?.length || 0);
  
  if (!response.ok) {
    console.error('📞 [FRONTEND] ERROR:', data.error);
    throw new Error(data.error || 'Failed to fetch calls');
  }

  return data;
}

export async function getCallDetails(accessToken: string, callId: string): Promise<CallLog> {
  const response = await fetch(`${API_BASE_URL}/calls/${callId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Get call details error:', data.error);
    throw new Error(data.error || 'Failed to fetch call details');
  }

  return data.call;
}

// Phone Numbers
export interface PhoneNumber {
  id: string;
  userId: string;
  phoneNumber: string;
  formattedNumber: string;
  countryCode: string;
  status: 'active' | 'idle';
  assignedAgentId?: string;
  totalCalls: number;
  totalMinutes: number;
  totalCost: string;
  provisionedAt: string;
}

export async function getPhoneNumbers(accessToken: string): Promise<PhoneNumber[]> {
  const response = await fetch(`${API_BASE_URL}/phone-numbers`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Get phone numbers error:', data.error);
    throw new Error(data.error || 'Failed to fetch phone numbers');
  }

  return data.phoneNumbers;
}

export async function assignPhoneNumber(accessToken: string, phoneId: string, agentId: string | null): Promise<PhoneNumber> {
  const response = await fetch(`${API_BASE_URL}/phone-numbers/${phoneId}/assign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ agentId })
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Assign phone number error:', data.error);
    throw new Error(data.error || 'Failed to assign phone number');
  }

  return data.phoneNumber;
}

// Analytics
export interface AnalyticsData {
  summary: {
    totalCalls: number;
    successRate: string;
    avgDuration: number;
    totalCost: string;
  };
  callsByDate: Array<{ date: string; count: number }>;
  agentPerformance: Array<{
    agentId: string;
    agentName: string;
    calls: number;
    successRate: string;
    avgDuration: number;
    totalCost: string;
  }>;
}

export async function getAnalytics(accessToken: string): Promise<AnalyticsData> {
  const response = await fetch(`${API_BASE_URL}/analytics`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Get analytics error:', data.error);
    throw new Error(data.error || 'Failed to fetch analytics');
  }

  return data;
}
