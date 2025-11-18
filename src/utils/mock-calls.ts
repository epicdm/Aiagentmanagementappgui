export interface MockCall {
  id: string;
  agentId: string;
  phoneNumber: string;
  direction: 'inbound' | 'outbound';
  duration: number;
  outcome: 'completed' | 'busy' | 'no-answer' | 'failed';
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  cost: number;
  createdAt: string;
  transcript?: string;
  recording?: string;
}

const phoneNumbers = [
  '+1 (555) 123-4567',
  '+1 (555) 234-5678',
  '+1 (555) 345-6789',
  '+1 (555) 456-7890',
  '+1 (555) 567-8901',
  '+1 (555) 678-9012',
  '+1 (555) 789-0123',
  '+1 (555) 890-1234',
];

const summaries = {
  completed: [
    'Customer inquiry about product features - Successfully answered questions',
    'Support request handled - Issue resolved',
    'Sales call - Customer interested, scheduled follow-up',
    'Appointment confirmation - Confirmed for next week',
    'Order status inquiry - Provided tracking information',
    'Billing question - Explained charges and next steps',
    'Technical support - Guided through troubleshooting',
    'New customer onboarding - Walked through platform features',
  ],
  'no-answer': [
    'No answer - Left voicemail',
    'Customer did not pick up',
    'Line rang but no response',
  ],
  busy: [
    'Line was busy',
    'Customer was on another call',
  ],
  failed: [
    'Call dropped unexpectedly',
    'Connection failed',
    'Number not in service',
  ],
};

export function generateMockCall(agentId: string): MockCall {
  const direction = Math.random() > 0.5 ? 'inbound' : 'outbound';
  const outcomes: Array<'completed' | 'busy' | 'no-answer' | 'failed'> = ['completed', 'busy', 'no-answer', 'failed'];
  const weights = [0.7, 0.1, 0.15, 0.05]; // 70% completed, 10% busy, 15% no-answer, 5% failed
  
  let random = Math.random();
  let outcomeIndex = 0;
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      outcomeIndex = i;
      break;
    }
  }
  const outcome = outcomes[outcomeIndex];
  
  const duration = outcome === 'completed' 
    ? Math.floor(Math.random() * 480) + 60 // 1-8 minutes
    : Math.floor(Math.random() * 30); // Under 30 seconds
  
  const sentiments: Array<'positive' | 'neutral' | 'negative'> = ['positive', 'neutral', 'negative'];
  const sentimentWeights = outcome === 'completed' ? [0.6, 0.3, 0.1] : [0.1, 0.5, 0.4];
  
  let sentimentRandom = Math.random();
  let sentimentIndex = 0;
  for (let i = 0; i < sentimentWeights.length; i++) {
    sentimentRandom -= sentimentWeights[i];
    if (sentimentRandom <= 0) {
      sentimentIndex = i;
      break;
    }
  }
  const sentiment = sentiments[sentimentIndex];
  
  const cost = (duration / 60) * 0.015; // $0.015 per minute
  
  const summaryOptions = summaries[outcome];
  const summary = summaryOptions[Math.floor(Math.random() * summaryOptions.length)];
  
  // Random date within last 30 days
  const daysAgo = Math.floor(Math.random() * 30);
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - daysAgo);
  createdAt.setHours(createdAt.getHours() - hoursAgo);
  createdAt.setMinutes(createdAt.getMinutes() - minutesAgo);
  
  return {
    id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    agentId,
    phoneNumber: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
    direction,
    duration,
    outcome,
    summary,
    sentiment,
    cost: parseFloat(cost.toFixed(3)),
    createdAt: createdAt.toISOString(),
    transcript: outcome === 'completed' ? 'Transcript available' : undefined,
    recording: outcome === 'completed' ? `https://recordings.example.com/${Date.now()}.mp3` : undefined,
  };
}

export function generateMultipleMockCalls(agentId: string, count: number): MockCall[] {
  const calls: MockCall[] = [];
  for (let i = 0; i < count; i++) {
    calls.push(generateMockCall(agentId));
  }
  // Sort by date, newest first
  return calls.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
