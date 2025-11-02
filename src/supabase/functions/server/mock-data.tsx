// Mock data generator for demo purposes
// In production, this would be replaced with real data from LiveKit/Twilio

const sampleTranscripts = [
  {
    messages: [
      { speaker: 'agent', text: 'Hello! Thank you for calling. How can I assist you today?', timestamp: '00:00' },
      { speaker: 'customer', text: "Hi, I'm interested in learning more about your AI voice agents.", timestamp: '00:05' },
      { speaker: 'agent', text: "Great! Our AI voice agents can handle customer calls 24/7. What specific use case are you considering?", timestamp: '00:12' },
      { speaker: 'customer', text: 'We need something for customer support. Do you have pricing information?', timestamp: '00:20' },
      { speaker: 'agent', text: 'Absolutely! Our pricing starts at $0.15 per minute. We also offer volume discounts for high-call businesses.', timestamp: '00:27' },
      { speaker: 'customer', text: 'That sounds reasonable. Can I try it out first?', timestamp: '00:35' },
      { speaker: 'agent', text: "Of course! We offer a 14-day free trial with 100 minutes included. I'll send you the signup link right away.", timestamp: '00:40' },
      { speaker: 'customer', text: 'Perfect! Thank you so much for your help.', timestamp: '00:48' },
      { speaker: 'agent', text: "You're welcome! Is there anything else I can help you with today?", timestamp: '00:52' },
      { speaker: 'customer', text: 'No, that covers it. Have a great day!', timestamp: '00:56' },
      { speaker: 'agent', text: 'You too! Thanks for calling.', timestamp: '00:59' }
    ],
    sentiment: 'positive',
    summary: 'Customer inquiry about AI voice agents for customer support. Discussed pricing and free trial. Customer showed strong interest.',
    keyPoints: ['Interested in customer support use case', 'Pricing discussed: $0.15/min', 'Signed up for 14-day free trial'],
    actionItems: ['Send signup link for free trial', 'Follow up in 3 days'],
    outcome: 'success'
  },
  {
    messages: [
      { speaker: 'agent', text: 'Good afternoon! How may I help you today?', timestamp: '00:00' },
      { speaker: 'customer', text: 'I need help with my account. I was charged twice.', timestamp: '00:04' },
      { speaker: 'agent', text: "I'm sorry to hear that. Let me look into this for you. Can you provide your account email?", timestamp: '00:09' },
      { speaker: 'customer', text: 'Sure, it\'s john.smith@email.com', timestamp: '00:15' },
      { speaker: 'agent', text: 'Thank you. I see two charges on October 28th. It looks like one was reversed automatically. Can you check your account?', timestamp: '00:22' },
      { speaker: 'customer', text: 'Oh yes, I see the refund now. My apologies!', timestamp: '00:30' },
      { speaker: 'agent', text: 'No problem at all! These things happen. Is there anything else I can help with?', timestamp: '00:35' },
      { speaker: 'customer', text: 'No, that was it. Thanks for your patience.', timestamp: '00:40' },
      { speaker: 'agent', text: 'Happy to help! Have a wonderful day.', timestamp: '00:44' }
    ],
    sentiment: 'neutral',
    summary: 'Customer concerned about duplicate charge. Issue was already auto-resolved with refund. Customer satisfied after verification.',
    keyPoints: ['Duplicate charge concern', 'Automatic refund already processed', 'Issue resolved quickly'],
    actionItems: ['No follow-up needed'],
    outcome: 'success'
  },
  {
    messages: [
      { speaker: 'agent', text: 'Thank you for calling! This is your AI assistant. How can I help?', timestamp: '00:00' },
      { speaker: 'customer', text: "I'm having technical issues with the API integration.", timestamp: '00:05' },
      { speaker: 'agent', text: 'I understand. Can you describe the error you\'re encountering?', timestamp: '00:10' },
      { speaker: 'customer', text: 'I keep getting a 401 Unauthorized error.', timestamp: '00:15' },
      { speaker: 'agent', text: 'That typically means there\'s an issue with your API key. Have you included it in the Authorization header?', timestamp: '00:20' },
      { speaker: 'customer', text: 'Yes, I copied it from the dashboard.', timestamp: '00:27' },
      { speaker: 'agent', text: 'Let me check... Could you regenerate your API key and try again? Sometimes keys can be invalidated.', timestamp: '00:32' },
      { speaker: 'customer', text: 'Okay, let me try that. One moment.', timestamp: '00:40' },
      { speaker: 'customer', text: 'It worked! Thank you so much.', timestamp: '01:15' },
      { speaker: 'agent', text: 'Excellent! Glad we could resolve that. Anything else I can assist with?', timestamp: '01:20' },
      { speaker: 'customer', text: 'Nope, all good now. Thanks!', timestamp: '01:25' },
    ],
    sentiment: 'positive',
    summary: 'Technical support call regarding API integration. 401 error resolved by regenerating API key.',
    keyPoints: ['API 401 error', 'Key regeneration solved issue', 'Quick resolution'],
    actionItems: ['Monitor for similar API issues', 'Consider adding troubleshooting docs'],
    outcome: 'success'
  },
  {
    messages: [
      { speaker: 'agent', text: 'Hello! Thanks for reaching out. How can I help you today?', timestamp: '00:00' },
      { speaker: 'customer', text: 'I want to cancel my subscription.', timestamp: '00:04' },
      { speaker: 'agent', text: 'I\'m sorry to hear you want to cancel. May I ask what prompted this decision?', timestamp: '00:08' },
      { speaker: 'customer', text: 'The pricing is just too high for our current needs.', timestamp: '00:14' },
      { speaker: 'agent', text: 'I understand budget concerns. We do have a lower-tier plan at $49/month. Would that work better?', timestamp: '00:20' },
      { speaker: 'customer', text: 'Hmm, I\'m currently on the $99 plan. What are the differences?', timestamp: '00:27' },
      { speaker: 'agent', text: 'The $49 plan includes 500 minutes instead of 2000, but all features remain the same.', timestamp: '00:33' },
      { speaker: 'customer', text: 'Actually, that might work. We\'re only using about 400 minutes.', timestamp: '00:40' },
      { speaker: 'agent', text: 'Perfect! I can downgrade your account right now. You\'ll see the change on your next bill.', timestamp: '00:46' },
      { speaker: 'customer', text: 'Great, let\'s do that instead of canceling.', timestamp: '00:52' },
      { speaker: 'agent', text: 'All set! Is there anything else I can help with today?', timestamp: '00:57' },
      { speaker: 'customer', text: 'No, thank you for saving me money!', timestamp: '01:02' },
    ],
    sentiment: 'positive',
    summary: 'Customer wanted to cancel due to pricing. Successfully retained by offering lower-tier plan that better fits usage.',
    keyPoints: ['Cancellation request due to cost', 'Downgraded from $99 to $49 plan', 'Customer retained'],
    actionItems: ['Process plan downgrade', 'Follow up in 30 days'],
    outcome: 'success'
  },
  {
    messages: [
      { speaker: 'agent', text: 'Good morning! How may I assist you?', timestamp: '00:00' },
      { speaker: 'customer', text: 'I have a question about phone number provisioning.', timestamp: '00:04' },
      { speaker: 'agent', text: 'Of course! What would you like to know?', timestamp: '00:08' },
      { speaker: 'customer', text: 'Can I get a toll-free number?', timestamp: '00:12' },
      { speaker: 'agent', text: 'Yes! Toll-free numbers are available. The setup fee is $2 and monthly cost is $1.50.', timestamp: '00:17' },
      { speaker: 'customer', text: 'Perfect. How do I set that up?', timestamp: '00:23' },
      { speaker: 'agent', text: 'Go to the Phone Numbers page, click "Buy Number", and select "Toll-Free" from the options.', timestamp: '00:28' },
      { speaker: 'customer', text: 'Got it! Can I pick the number or is it random?', timestamp: '00:35' },
      { speaker: 'agent', text: 'You can choose from available numbers. We show you 10 options to pick from.', timestamp: '00:40' },
      { speaker: 'customer', text: 'Excellent! That\'s all I needed. Thank you!', timestamp: '00:46' },
    ],
    sentiment: 'positive',
    summary: 'Customer inquiry about toll-free number provisioning. Provided pricing and setup instructions.',
    keyPoints: ['Toll-free number inquiry', 'Pricing: $2 setup + $1.50/month', 'Can choose from 10 available numbers'],
    actionItems: ['Monitor for toll-free number purchase'],
    outcome: 'success'
  }
];

const phoneNumbers = [
  '+1 (555) 123-4567',
  '+1 (555) 234-5678',
  '+1 (555) 345-6789',
  '+1 (555) 456-7890',
  '+1 (555) 567-8901',
  '+1 (555) 678-9012',
  '+1 (555) 789-0123',
  '+1 (555) 890-1234',
  '+1 (555) 901-2345',
  '+1 (555) 012-3456',
  '+1 (555) 111-2222',
  '+1 (555) 333-4444',
  '+1 (555) 555-6666',
  '+1 (555) 777-8888',
  '+1 (555) 999-0000',
];

export function generateMockCallLogs(userId: string, agentIds: string[], count: number = 50) {
  const calls = [];
  const outcomes: Array<'success' | 'failed' | 'voicemail' | 'busy' | 'no_answer'> = ['success', 'success', 'success', 'success', 'success', 'voicemail', 'busy', 'no_answer', 'failed'];
  const directions: Array<'inbound' | 'outbound'> = ['inbound', 'outbound'];
  
  for (let i = 0; i < count; i++) {
    // Create calls over the last 7 days, with more recent calls
    const hoursAgo = Math.floor(Math.random() * 168); // 7 days in hours
    const createdAt = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    
    // Successful calls have longer duration and transcripts
    const duration = outcome === 'success' 
      ? Math.floor(Math.random() * 240) + 60  // 1-5 minutes
      : Math.floor(Math.random() * 30);        // 0-30 seconds
    
    const transcript = outcome === 'success' 
      ? sampleTranscripts[i % sampleTranscripts.length]
      : null;
    
    const cost = (duration / 60 * 0.15).toFixed(2);
    
    calls.push({
      id: `call_${crypto.randomUUID()}`,
      userId,
      agentId: agentIds[Math.floor(Math.random() * agentIds.length)],
      phoneNumber: phoneNumbers[i % phoneNumbers.length],
      direction,
      duration,
      outcome,
      cost,
      createdAt: createdAt.toISOString(),
      transcript: transcript ? JSON.stringify(transcript) : null,
      recording: outcome === 'success' ? 'https://example.com/recording.mp3' : null,
      // Additional metadata for detailed view
      sentiment: transcript?.sentiment || 'neutral',
      summary: transcript?.summary || null,
      keyPoints: transcript?.keyPoints || [],
      actionItems: transcript?.actionItems || [],
      qualityScore: outcome === 'success' ? (Math.random() * 1.5 + 3.5).toFixed(1) : null, // 3.5-5.0
      customerSatisfaction: outcome === 'success' ? (Math.random() * 1.5 + 3.5).toFixed(1) : null,
      transferredToHuman: Math.random() < 0.1, // 10% chance
      endedBy: outcome === 'success' ? (Math.random() < 0.5 ? 'customer' : 'agent') : 'system',
      tags: outcome === 'success' ? ['sales', 'support'][Math.floor(Math.random() * 2)] : null,
    });
  }
  
  return calls.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function generateDashboardStats(agents: any[], calls: any[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const callsToday = calls.filter(c => new Date(c.createdAt) >= today);
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const callsThisMonth = calls.filter(c => new Date(c.createdAt) >= thisMonth);
  
  const costToday = callsToday.reduce((sum, c) => sum + parseFloat(c.cost), 0);
  const costMonth = callsThisMonth.reduce((sum, c) => sum + parseFloat(c.cost), 0);
  
  return {
    total_agents: agents.length,
    total_phone_numbers: Math.min(agents.length, 5), // Mock: assume some phones assigned
    total_calls_today: callsToday.length,
    total_calls_month: callsThisMonth.length,
    total_cost_today_usd: costToday.toFixed(2),
    total_cost_month_usd: costMonth.toFixed(2),
    trends: {
      agents: { value: '+2', isPositive: true },
      calls: { value: '+12%', isPositive: true },
      costs: { value: '+8%', isPositive: true },
    }
  };
}

export function generateMockPhoneNumbers(userId: string, count: number = 5) {
  const phones = [];
  const areaCode = 767;
  
  for (let i = 0; i < count; i++) {
    const number = `+1${areaCode}${Math.floor(Math.random() * 9000000) + 1000000}`;
    phones.push({
      id: `phone_${crypto.randomUUID()}`,
      userId,
      phoneNumber: number,
      formattedNumber: `+1 (${areaCode}) ${number.slice(5, 8)}-${number.slice(8)}`,
      countryCode: 'US',
      status: i < 3 ? 'active' : 'idle',
      assignedAgentId: i < 3 ? `agent_${i}` : null,
      totalCalls: i < 3 ? Math.floor(Math.random() * 500) : 0,
      totalMinutes: i < 3 ? Math.floor(Math.random() * 1000) : 0,
      totalCost: i < 3 ? (Math.random() * 500).toFixed(2) : '0.00',
      provisionedAt: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  return phones;
}

export function generateSampleAgents(userId: string) {
  const now = new Date().toISOString();
  
  return [
    {
      id: `agent_${crypto.randomUUID()}`,
      userId,
      name: 'Customer Support Agent',
      type: 'voice',
      model: 'gpt-4',
      voice: 'nova',
      language: 'en-US',
      systemPrompt: 'You are a friendly and professional customer support agent. Help customers with their inquiries, resolve issues promptly, and maintain a positive tone throughout the conversation.',
      status: 'active',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    },
    {
      id: `agent_${crypto.randomUUID()}`,
      userId,
      name: 'Sales Outreach Bot',
      type: 'voice',
      model: 'gpt-4-turbo',
      voice: 'alloy',
      language: 'en-US',
      systemPrompt: 'You are a sales representative reaching out to potential customers. Be enthusiastic, highlight product benefits, handle objections gracefully, and aim to book meetings.',
      status: 'active',
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
    },
    {
      id: `agent_${crypto.randomUUID()}`,
      userId,
      name: 'Appointment Scheduler',
      type: 'voice',
      model: 'gpt-4',
      voice: 'shimmer',
      language: 'en-US',
      systemPrompt: 'You are an appointment scheduling assistant. Help customers book, reschedule, or cancel appointments. Confirm all details and send confirmation messages.',
      status: 'active',
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    },
    {
      id: `agent_${crypto.randomUUID()}`,
      userId,
      name: 'Technical Support Assistant',
      type: 'chat',
      model: 'claude-3-opus',
      voice: 'onyx',
      language: 'en-US',
      systemPrompt: 'You are a technical support specialist. Help users troubleshoot technical issues, provide step-by-step guidance, and escalate to human agents when necessary.',
      status: 'active',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    },
    {
      id: `agent_${crypto.randomUUID()}`,
      userId,
      name: 'Lead Qualification Agent',
      type: 'voice',
      model: 'gpt-4-turbo',
      voice: 'echo',
      language: 'en-US',
      systemPrompt: 'You are a lead qualification specialist. Ask qualifying questions to determine if prospects are a good fit, gather key information, and score leads based on their responses.',
      status: 'inactive',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    },
  ];
}
