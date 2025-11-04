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
      capabilities: {
        voice: true,
        sms: i % 2 === 0, // Every other phone has SMS enabled
        mms: i % 3 === 0, // Every third phone has MMS enabled
      },
    });
  }
  
  return phones;
}

export function generateSystemPersonas() {
  return [
    {
      id: 'persona_template_customer_support',
      name: 'Customer Support Agent',
      type: 'customer_support',
      description: 'Professional and empathetic support agent focused on resolving customer issues',
      instructions: 'You are a friendly and professional customer support agent. Help customers with their inquiries, resolve issues promptly, and maintain a positive tone throughout the conversation. Always listen carefully, show empathy, and provide clear solutions.',
      tone: 'friendly',
      style: 'conversational',
      personalityTraits: ['Empathetic', 'Patient', 'Helpful', 'Professional', 'Problem-solver'],
      channels: ['voice', 'chat', 'whatsapp', 'email', 'sms'],
      tools: ['knowledge_base', 'ticketing', 'crm'],
      isTemplate: true,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'persona_template_sales',
      name: 'Sales Representative',
      type: 'sales',
      description: 'Confident and persuasive sales agent focused on closing deals',
      instructions: 'You are a sales representative reaching out to potential customers. Be enthusiastic, highlight product benefits, handle objections gracefully, and aim to book meetings or close deals. Build rapport quickly and identify customer needs.',
      tone: 'professional',
      style: 'persuasive',
      personalityTraits: ['Confident', 'Persuasive', 'Goal-oriented', 'Friendly', 'Resilient'],
      channels: ['voice', 'chat', 'whatsapp', 'sms'],
      tools: ['crm', 'calendar', 'payment'],
      isTemplate: true,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'persona_template_technical_support',
      name: 'Technical Support Specialist',
      type: 'technical_support',
      description: 'Patient and knowledgeable tech support expert',
      instructions: 'You are a technical support specialist. Help users troubleshoot technical issues, provide step-by-step guidance, and escalate to human agents when necessary. Use clear, simple language and avoid jargon unless the user is technical.',
      tone: 'professional',
      style: 'technical',
      personalityTraits: ['Patient', 'Technical', 'Problem-solver', 'Clear', 'Methodical'],
      channels: ['voice', 'chat', 'email'],
      tools: ['knowledge_base', 'screen_sharing', 'ticketing'],
      isTemplate: true,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'persona_template_receptionist',
      name: 'Receptionist',
      type: 'receptionist',
      description: 'Friendly and organized front-desk assistant',
      instructions: 'You are a receptionist handling incoming calls and messages. Greet callers warmly, route calls to appropriate departments, take messages accurately, and manage appointment scheduling. Be organized and efficient.',
      tone: 'friendly',
      style: 'formal',
      personalityTraits: ['Friendly', 'Organized', 'Efficient', 'Polite', 'Helpful'],
      channels: ['voice', 'chat', 'sms'],
      tools: ['calendar', 'call_routing', 'messaging'],
      isTemplate: true,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'persona_template_survey',
      name: 'Survey Collector',
      type: 'survey',
      description: 'Neutral and systematic survey conductor',
      instructions: 'You are a survey conductor gathering feedback and data. Ask questions clearly and systematically, record responses accurately, and maintain a neutral tone. Thank participants for their time.',
      tone: 'neutral',
      style: 'formal',
      personalityTraits: ['Neutral', 'Clear', 'Systematic', 'Professional', 'Courteous'],
      channels: ['voice', 'chat', 'sms', 'email'],
      tools: ['survey_forms', 'data_collection'],
      isTemplate: true,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    },
  ];
}

export function generateSampleAgents(userId: string) {
  const now = new Date().toISOString();
  
  return [
    {
      id: `agent_${crypto.randomUUID()}`,
      userId,
      name: 'Customer Support Agent',
      type: 'inbound',
      agentType: 'voice',
      model: 'gpt-4',
      voice: 'nova',
      language: 'en-US',
      personaId: 'persona_template_customer_support',
      systemPrompt: 'You are a friendly and professional customer support agent. Help customers with their inquiries, resolve issues promptly, and maintain a positive tone throughout the conversation.',
      status: 'active',
      channels: ['voice', 'chat'],
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    },
    {
      id: `agent_${crypto.randomUUID()}`,
      userId,
      name: 'Sales Outreach Bot',
      type: 'outbound',
      agentType: 'voice',
      model: 'gpt-4-turbo',
      voice: 'alloy',
      language: 'en-US',
      personaId: 'persona_template_sales',
      systemPrompt: 'You are a sales representative reaching out to potential customers. Be enthusiastic, highlight product benefits, handle objections gracefully, and aim to book meetings.',
      status: 'active',
      channels: ['voice', 'sms'],
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
    },
    {
      id: `agent_${crypto.randomUUID()}`,
      userId,
      name: 'Appointment Scheduler',
      type: 'hybrid',
      agentType: 'voice',
      model: 'gpt-4',
      voice: 'shimmer',
      language: 'en-US',
      personaId: 'persona_template_receptionist',
      systemPrompt: 'You are an appointment scheduling assistant. Help customers book, reschedule, or cancel appointments. Confirm all details and send confirmation messages.',
      status: 'active',
      channels: ['voice', 'chat', 'sms'],
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    },
    {
      id: `agent_${crypto.randomUUID()}`,
      userId,
      name: 'Technical Support Assistant',
      type: 'inbound',
      agentType: 'chat',
      model: 'claude-3-opus',
      voice: 'onyx',
      language: 'en-US',
      personaId: 'persona_template_technical_support',
      systemPrompt: 'You are a technical support specialist. Help users troubleshoot technical issues, provide step-by-step guidance, and escalate to human agents when necessary.',
      status: 'active',
      channels: ['chat', 'email'],
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    },
    {
      id: `agent_${crypto.randomUUID()}`,
      userId,
      name: 'Lead Qualification Agent',
      type: 'outbound',
      agentType: 'voice',
      model: 'gpt-4-turbo',
      voice: 'echo',
      language: 'en-US',
      personaId: 'persona_template_sales',
      systemPrompt: 'You are a lead qualification specialist. Ask qualifying questions to determine if prospects are a good fit, gather key information, and score leads based on their responses.',
      status: 'inactive',
      channels: ['voice'],
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    },
  ];
}

// Generate Sales Funnels Mock Data
export function generateSampleFunnels(userId: string, agents: any[]) {
  return [
    {
      id: `funnel_${crypto.randomUUID()}`,
      userId,
      name: 'Home Buyer Qualification',
      description: 'Qualify potential home buyers and book property viewings',
      status: 'active',
      type: 'lead_generation',
      agentId: agents.find(a => a.name.includes('Appointment'))?.id || agents[0].id,
      entryPoints: ['phone', 'web_form'],
      phoneNumber: '+1 (767) 818-9426',
      webFormEnabled: true,
      qualificationRules: {
        questions: ['budget', 'location', 'bedrooms', 'timeline', 'preapproved'],
        scoring: {
          budget_high: 20,
          timeline_soon: 30,
          preapproved: 25,
          specific_location: 15,
        },
        thresholds: {
          hot: 70,
          warm: 40,
        },
      },
      routing: {
        hot: 'book_appointment',
        warm: 'nurture_sequence',
        cold: 'long_term_followup',
      },
      integrations: {
        calendar: 'calendly',
        crm: 'followupboss',
        notifications: ['email', 'sms'],
      },
      stats: {
        totalCalls: 156,
        completed: 134,
        hotLeads: 89,
        booked: 67,
        conversionRate: 0.50,
        avgScore: 68,
        avgCallTime: 272, // seconds
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: `funnel_${crypto.randomUUID()}`,
      userId,
      name: 'SaaS Product Demo Booking',
      description: 'Qualify leads and schedule product demonstrations',
      status: 'active',
      type: 'appointments',
      agentId: agents.find(a => a.name.includes('Sales'))?.id || agents[1].id,
      entryPoints: ['phone', 'web_form', 'chat'],
      phoneNumber: '+1 (767) 818-9267',
      webFormEnabled: true,
      chatWidgetEnabled: true,
      qualificationRules: {
        questions: ['company_size', 'role', 'budget', 'timeline', 'pain_points'],
        scoring: {
          enterprise: 30,
          decision_maker: 25,
          budget_confirmed: 20,
          urgent_timeline: 15,
        },
        thresholds: {
          hot: 65,
          warm: 35,
        },
      },
      routing: {
        hot: 'book_demo',
        warm: 'send_resources',
        cold: 'nurture_campaign',
      },
      integrations: {
        calendar: 'google_calendar',
        crm: 'hubspot',
        notifications: ['email', 'slack'],
      },
      stats: {
        totalCalls: 89,
        completed: 76,
        hotLeads: 42,
        booked: 31,
        conversionRate: 0.41,
        avgScore: 62,
        avgCallTime: 305,
      },
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: `funnel_${crypto.randomUUID()}`,
      userId,
      name: 'Customer Support Triage',
      description: 'Route support requests to appropriate teams',
      status: 'active',
      type: 'lead_generation',
      agentId: agents.find(a => a.name.includes('Support'))?.id || agents[0].id,
      entryPoints: ['phone', 'chat'],
      phoneNumber: '+1 (767) 555-0123',
      chatWidgetEnabled: true,
      qualificationRules: {
        questions: ['issue_type', 'severity', 'account_tier'],
        scoring: {
          critical: 100,
          high_priority: 70,
          paying_customer: 50,
        },
        thresholds: {
          hot: 80,
          warm: 50,
        },
      },
      routing: {
        hot: 'escalate_immediately',
        warm: 'standard_queue',
        cold: 'self_service',
      },
      integrations: {
        ticketing: 'zendesk',
        notifications: ['email'],
      },
      stats: {
        totalCalls: 234,
        completed: 215,
        hotLeads: 23,
        booked: 0,
        conversionRate: 0,
        avgScore: 45,
        avgCallTime: 180,
      },
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

// Generate Social Media Accounts Mock Data
export function generateSocialAccounts(userId: string) {
  return [
    {
      id: `social_${crypto.randomUUID()}`,
      userId,
      platform: 'linkedin',
      accountName: 'Sarah Johnson',
      handle: '@sarah-johnson',
      followers: 2456,
      connected: true,
      brandVoice: 'Professional yet approachable, focuses on family values and home dreams',
      toneBreakdown: {
        professional: 65,
        conversational: 25,
        inspirational: 10,
      },
      topTopics: ['#RealEstate', '#HomeBuying', '#PropertyInvestment', '#DreamHome'],
      avgEngagement: 4.2,
      postsAnalyzed: 50,
      connectedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

// Generate Social Media Posts Mock Data
export function generateSocialPosts(userId: string, accountId: string) {
  return [
    {
      id: `post_${crypto.randomUUID()}`,
      userId,
      accountId,
      platforms: ['linkedin'],
      content: 'AI isn\'t replacing marketers – it\'s empowering them to work smarter.\n\nHere\'s what I\'m seeing in 2025:\n\n1. Hyper-personalization at scale\nAI can now customize content for 10,000 leads as easily as 10.\n\n2. Predictive campaign optimization\nML models predict which channels will convert before you spend a dollar.\n\n3. Voice & video automation\nAI-powered voice agents handling customer interactions 24/7.\n\nWhat\'s your take? How are you using AI in your marketing stack?\n\n#AIMarketing #MarketingAutomation #DigitalTransformation',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      status: 'scheduled',
      scheduledFor: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedEngagement: 4.5,
      wordCount: 180,
      hashtags: ['#AIMarketing', '#MarketingAutomation', '#DigitalTransformation'],
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: `post_${crypto.randomUUID()}`,
      userId,
      accountId,
      platforms: ['linkedin'],
      content: '3 lessons I learned closing 47 deals this quarter:\n\n1. Listen more than you talk\nYour prospects will tell you exactly what they need.\n\n2. Follow up relentlessly\n80% of sales happen after the 5th touch.\n\n3. Solve problems, don\'t sell products\nPeople buy solutions, not features.\n\nWhich one resonates most with you?\n\n#SalesTips #B2BSales #SalesStrategy',
      imageUrl: null,
      status: 'published',
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      actualEngagement: 5.2,
      views: 2134,
      likes: 156,
      comments: 23,
      shares: 45,
      wordCount: 95,
      hashtags: ['#SalesTips', '#B2BSales', '#SalesStrategy'],
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: `post_${crypto.randomUUID()}`,
      userId,
      accountId,
      platforms: ['linkedin'],
      content: 'Just wrapped up an incredible case study 📊\n\nHelped a client increase their email open rates by 300% using AI personalization.\n\nThe secret? We analyzed 10,000 customer conversations to understand their exact pain points, then created hyper-targeted campaigns.\n\nResults in 60 days:\n• Open rate: 18% → 54%\n• Click rate: 2.1% → 8.3%  \n• Revenue: +$127K\n\nWant to learn our framework? Drop a comment and I\'ll share the breakdown.\n\n#CaseStudy #EmailMarketing #AIMarketing',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      status: 'published',
      publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      actualEngagement: 8.1,
      views: 3821,
      likes: 289,
      comments: 45,
      shares: 67,
      wordCount: 142,
      hashtags: ['#CaseStudy', '#EmailMarketing', '#AIMarketing'],
      createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}
