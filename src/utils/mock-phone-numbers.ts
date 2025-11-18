// Mock phone numbers data for frontend fallback when backend is unavailable

// Import the PhoneNumber interface from api.tsx to ensure compatibility
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
  capabilities?: {
    voice?: boolean;
    sms?: boolean;
    mms?: boolean;
  };
  // Additional fields for UI
  assignedAgentName?: string;
  friendlyName?: string;
  type?: 'local' | 'toll-free' | 'mobile';
  provider?: 'twilio' | 'telnyx' | 'bandwidth';
  monthlyPrice?: number;
}

export const MOCK_PHONE_NUMBERS: PhoneNumber[] = [
  {
    id: 'phone_1',
    userId: 'demo-user',
    phoneNumber: '+14155550123',
    formattedNumber: '+1 (415) 555-0123',
    countryCode: 'US',
    status: 'active',
    assignedAgentId: 'agent_1',
    assignedAgentName: 'Customer Support Assistant',
    friendlyName: 'Customer Support Line',
    type: 'toll-free',
    totalCalls: 342,
    totalMinutes: 1580,
    totalCost: '$47.40',
    capabilities: {
      voice: true,
      sms: true,
      mms: true,
    },
    monthlyPrice: 2.00,
    provider: 'twilio',
    provisionedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'phone_2',
    userId: 'demo-user',
    phoneNumber: '+12125550456',
    formattedNumber: '+1 (212) 555-0456',
    countryCode: 'US',
    status: 'active',
    assignedAgentId: 'agent_2',
    assignedAgentName: 'Sales Outreach Agent',
    friendlyName: 'Sales Outbound',
    type: 'local',
    totalCalls: 187,
    totalMinutes: 923,
    totalCost: '$27.69',
    capabilities: {
      voice: true,
      sms: true,
      mms: false,
    },
    monthlyPrice: 1.00,
    provider: 'telnyx',
    provisionedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'phone_3',
    userId: 'demo-user',
    phoneNumber: '+18885550789',
    formattedNumber: '+1 (888) 555-0789',
    countryCode: 'US',
    status: 'active',
    assignedAgentId: 'agent_3',
    assignedAgentName: 'Appointment Scheduler',
    friendlyName: 'Appointment Booking',
    type: 'toll-free',
    totalCalls: 256,
    totalMinutes: 1120,
    totalCost: '$33.60',
    capabilities: {
      voice: true,
      sms: true,
      mms: true,
    },
    monthlyPrice: 2.00,
    provider: 'twilio',
    provisionedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'phone_4',
    userId: 'demo-user',
    phoneNumber: '+13105550234',
    formattedNumber: '+1 (310) 555-0234',
    countryCode: 'US',
    status: 'idle',
    assignedAgentId: undefined,
    assignedAgentName: undefined,
    friendlyName: 'Support Line West',
    type: 'local',
    totalCalls: 0,
    totalMinutes: 0,
    totalCost: '$0.00',
    capabilities: {
      voice: true,
      sms: true,
      mms: false,
    },
    monthlyPrice: 1.00,
    provider: 'bandwidth',
    provisionedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'phone_5',
    userId: 'demo-user',
    phoneNumber: '+15555550999',
    formattedNumber: '+1 (555) 555-0999',
    countryCode: 'US',
    status: 'idle',
    assignedAgentId: undefined,
    assignedAgentName: undefined,
    friendlyName: 'New Number',
    type: 'local',
    totalCalls: 0,
    totalMinutes: 0,
    totalCost: '$0.00',
    capabilities: {
      voice: true,
      sms: false,
      mms: false,
    },
    monthlyPrice: 1.00,
    provider: 'twilio',
    provisionedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Store for locally created phone numbers (in-memory)
let localPhoneNumbers: PhoneNumber[] = [...MOCK_PHONE_NUMBERS];

export function getMockPhoneNumbers(): PhoneNumber[] {
  return [...localPhoneNumbers];
}

export function generateMockPhoneNumber(phoneData: Partial<PhoneNumber>): PhoneNumber {
  const newPhone: PhoneNumber = {
    id: `phone_${Date.now()}`,
    userId: 'demo-user',
    phoneNumber: phoneData.phoneNumber || '+1 (555) 000-0000',
    formattedNumber: phoneData.formattedNumber || '+1 (555) 000-0000',
    countryCode: phoneData.countryCode || 'US',
    status: phoneData.status || 'active',
    assignedAgentId: phoneData.assignedAgentId,
    assignedAgentName: phoneData.assignedAgentName,
    friendlyName: phoneData.friendlyName || 'New Phone Number',
    type: phoneData.type || 'local',
    totalCalls: phoneData.totalCalls || 0,
    totalMinutes: phoneData.totalMinutes || 0,
    totalCost: phoneData.totalCost || '$0.00',
    capabilities: phoneData.capabilities || {
      voice: true,
      sms: true,
      mms: false,
    },
    monthlyPrice: phoneData.monthlyPrice || 1.00,
    provider: phoneData.provider || 'twilio',
    provisionedAt: new Date().toISOString(),
  };
  
  // Add to local storage
  localPhoneNumbers.push(newPhone);
  
  return newPhone;
}

export function updateMockPhoneNumber(phoneId: string, updates: Partial<PhoneNumber>): PhoneNumber {
  const index = localPhoneNumbers.findIndex(p => p.id === phoneId);
  
  if (index === -1) {
    throw new Error('Phone number not found');
  }
  
  localPhoneNumbers[index] = {
    ...localPhoneNumbers[index],
    ...updates,
  };
  
  return localPhoneNumbers[index];
}

export function deleteMockPhoneNumber(phoneId: string): void {
  localPhoneNumbers = localPhoneNumbers.filter(p => p.id !== phoneId);
}

export function resetMockPhoneNumbers(): void {
  localPhoneNumbers = [...MOCK_PHONE_NUMBERS];
}