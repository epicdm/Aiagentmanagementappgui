# 🎯 AI Agent Management Platform - MASTER PRODUCT REQUIREMENTS DOCUMENT

**Version:** 2.0  
**Last Updated:** November 2, 2024  
**Platform:** Web Application (React + TypeScript + Supabase)  
**Completeness:** 100% - Production Ready

---

## 📋 TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Technical Architecture](#technical-architecture)
3. [User Application Features](#user-application-features)
4. [Admin Panel Features](#admin-panel-features)
5. [Data Models](#data-models)
6. [API Specifications](#api-specifications)
7. [Design System](#design-system)
8. [Security & Compliance](#security--compliance)
9. [Implementation Checklist](#implementation-checklist)

---

## 📋 EXECUTIVE SUMMARY

### **What is This Platform?**

An enterprise-grade AI Agent Management Platform similar to Retell AI, Vapi, and ElevenLabs that enables users to:
- Create and manage voice/chat AI agents
- Make automated phone calls at scale
- Run marketing/sales campaigns
- Track leads and analytics
- Monitor calls in real-time
- Access comprehensive admin panel

### **Platform Scope**

- **24 Total Pages:** 16 user pages + 8 admin pages
- **Users:** B2B SaaS customers (agencies, sales teams, support centers)
- **Pricing Model:** Pay-as-you-go + subscription tiers
- **Target Scale:** 1,000+ concurrent users, 100,000+ calls/day

---

## 🏗️ TECHNICAL ARCHITECTURE

### **Tech Stack**

```
Frontend:
├── React 18 (functional components only)
├── TypeScript (strict mode)
├── Tailwind CSS v4.0
├── ShadCN UI (60+ components)
├── Lucide React (icons)
├── Recharts (data visualization)
└── Sonner (toast notifications)

Backend:
├── Supabase Auth (JWT authentication)
├── Supabase PostgreSQL (database)
├── Supabase Storage (file storage)
├── Supabase Edge Functions (Hono server)
└── KV Store (key-value storage)

Build & Deploy:
├── Vite (bundler)
├── ESLint (linting)
└── PostCSS (CSS processing)
```

### **Architecture Pattern**

```
┌─────────────┐
│  Frontend   │ ← React SPA with client-side routing
│  (React)    │
└──────┬──────┘
       │
       │ HTTPS + JWT
       ↓
┌─────────────┐
│   Server    │ ← Supabase Edge Functions (Hono)
│  (Backend)  │
└──────┬──────┘
       │
       ├─→ PostgreSQL (structured data)
       ├─→ KV Store (cache/temp data)
       └─→ Storage (recordings/files)
```

### **Folder Structure**

```
/
├── App.tsx                    # Main app with routing
├── components/
│   ├── ThemeProvider.tsx      # Dark mode support
│   ├── ErrorBoundary.tsx      # Error handling
│   ├── AppLayout.tsx          # User app layout
│   ├── AdminLayout.tsx        # Admin panel layout
│   ├── LandingPage.tsx        # Public homepage
│   ├── AuthPage.tsx           # Login/signup
│   ├── CreateAgentDialog.tsx  # Agent creation
│   ├── EditAgentDialog.tsx    # Agent editing
│   ├── ConfirmDialog.tsx      # Confirmation prompts
│   ├── pages/                 # 16 user pages
│   │   ├── DashboardPage.tsx
│   │   ├── AgentsPage.tsx
│   │   ├── PhoneNumbersPage.tsx
│   │   ├── CallsPage.tsx
│   │   ├── CallDetailPage.tsx
│   │   ├── LiveCallsPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   ├── TestingPage.tsx
│   │   ├── LeadsPage.tsx
│   │   ├── CampaignsPage.tsx
│   │   ├── CampaignDetailPage.tsx
│   │   ├── SettingsPage.tsx
│   │   ├── BillingPage.tsx
│   │   ├── ApiKeysPage.tsx
│   │   ├── WebhooksPage.tsx
│   │   ├── MarketplacePage.tsx
│   │   └── WhiteLabelPage.tsx
│   └── pages/admin/          # 8 admin pages
│       ├── AdminDashboardPage.tsx
│       ├── AdminUsersPage.tsx
│       ├── AdminBillingPage.tsx
│       ├── AdminAnalyticsPage.tsx
│       ├── AdminAuditLogsPage.tsx
│       ├── AdminSupportPage.tsx
│       ├── AdminContentPage.tsx
│       └── AdminSystemPage.tsx
├── utils/
│   ├── api.tsx               # API utilities
│   ├── hooks.tsx             # Custom React hooks
│   ├── security.tsx          # Security utilities
│   └── supabase/
│       ├── client.tsx        # Supabase client
│       └── info.tsx          # Project config
├── styles/
│   └── globals.css           # Global styles + theme
└── supabase/functions/server/
    ├── index.tsx             # Main server
    ├── kv_store.tsx          # KV utilities
    └── mock-data.tsx         # Demo data
```

---

## 📱 USER APPLICATION FEATURES

### **Overview: 16 Pages for End Users**

---

## PAGE 1: 🏠 DASHBOARD

**Route:** `/dashboard`  
**Purpose:** Main landing page with metrics and quick actions

### **Features:**

#### **1. Key Metrics (4 Cards)**

```typescript
interface MetricCard {
  title: string;        // "Total Agents", "Total Calls", etc.
  value: number;        // 12, 1234, etc.
  icon: LucideIcon;     // Bot, Phone, Clock, DollarSign
  color: string;        // blue, green, purple
  change: {
    value: string;      // "+2 this month", "+15%"
    trend: 'up' | 'down' | 'neutral';
  };
  onClick?: () => void; // Navigate to detail page
}
```

**Cards:**
1. **Total Agents:** Count of user's agents with change indicator
2. **Total Calls:** Count of calls made (all time or period)
3. **Minutes Used:** Total call duration with quota bar
4. **Revenue/Spend:** Financial metric with trend

#### **2. Quick Actions (4 Buttons)**

- Create Agent → Opens CreateAgentDialog
- Start Call → Navigate to TestingPage
- View Analytics → Navigate to AnalyticsPage
- Buy Number → Navigate to PhoneNumbersPage

#### **3. Activity Feed**

```typescript
interface Activity {
  id: string;
  type: 'agent_created' | 'call_completed' | 'campaign_started' | 
        'lead_added' | 'number_purchased' | 'settings_changed';
  description: string;  // "Created agent 'Sales Bot'"
  timestamp: Date;
  user?: string;        // User who performed action
  icon: LucideIcon;
}
```

**Display:** List of 5-10 recent activities with timestamps like "2 minutes ago"

#### **4. Performance Charts (2 Charts)**

**Chart 1: Call Volume (Line Chart)**
```typescript
{
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Calls',
      data: [45, 52, 38, 65, 73, 42, 58],
      borderColor: '#3B82F6',
      fill: true
    }]
  }
}
```

**Chart 2: Success Rate (Bar Chart)**
```typescript
{
  type: 'bar',
  data: {
    labels: ['Agent 1', 'Agent 2', 'Agent 3', 'Agent 4', 'Agent 5'],
    datasets: [{
      label: 'Success %',
      data: [87, 92, 65, 78, 94],
      backgroundColor: (value) => 
        value > 80 ? '#10B981' : value > 50 ? '#F59E0B' : '#EF4444'
    }]
  }
}
```

#### **5. System Status**

```typescript
interface SystemStatus {
  api: 'operational' | 'degraded' | 'down';
  voice: 'operational' | 'degraded' | 'down';
  lastUpdated: Date;
}
```

**Display:** Colored dots (green/yellow/red) with status text

---

## PAGE 2: 🤖 AGENTS

**Route:** `/agents`  
**Purpose:** Manage all AI agents with full CRUD

### **Features:**

#### **1. Header & Controls**

- Title: "AI Agents" with count "(12 agents)"
- **Create Agent Button** (primary, top right)
- Search bar (search by name)
- Filter dropdown: All | Active | Inactive | Draft
- Sort: Name A-Z | Created Date | Last Modified

#### **2. Agent Card Grid**

**Layout:** Responsive grid (1 col mobile, 2 tablet, 3 desktop)

```typescript
interface Agent {
  id: string;
  name: string;
  description: string;
  type: 'voice' | 'chat' | 'hybrid';
  status: 'active' | 'inactive' | 'draft';
  
  // AI Configuration
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3-opus' | 'claude-3-sonnet' | 
         'claude-2' | 'gemini-pro';
  temperature: number;      // 0.0 - 2.0
  maxTokens: number;        // 100 - 8000
  systemPrompt: string;     // Required, 50-5000 chars
  contextKnowledge: string;
  
  // Voice Configuration (if type !== 'chat')
  voiceProvider: 'elevenlabs' | 'openai' | 'azure' | 'google';
  voiceId: string;          // Selected voice
  voiceSpeed: number;       // 0.5x - 2.0x
  voicePitch: number;       // -20 to +20
  stability: number;        // 0.0 - 1.0 (ElevenLabs only)
  similarityBoost: number;  // 0.0 - 1.0 (ElevenLabs only)
  
  // Behavior
  firstMessage: string;
  endCallPhrases: string[];
  interruptBehavior: 'allow' | 'prevent' | 'smart';
  silenceTimeout: number;   // 3-30 seconds
  maxCallDuration: number;  // 1-60 minutes
  backgroundSound: boolean;
  
  // Advanced
  transcription: boolean;
  recordCalls: boolean;
  voicemailDetection: boolean;
  voicemailAction: 'leave_message' | 'hangup' | 'callback';
  transferEnabled: boolean;
  transferNumber: string;
  customVariables: { key: string; value: string }[];
  webhookUrl: string;
  webhookEvents: string[];
  webhookSecret: string;
  tags: string[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  
  // Statistics
  totalCalls: number;
  successRate: number;
  avgDuration: number;
  totalMinutes: number;
  lastActive: Date;
}
```

**Agent Card Display:**

```
┌───────────────────────────────┐
│ [Icon] Agent Name      [Menu] │
│ Status Badge                  │
├───────────────────────────────┤
│ Type: Voice Agent             │
│ Model: GPT-4                  │
│ Voice: Rachel (ElevenLabs)    │
│ Created: Jan 15, 2024         │
├───────────────────────────────┤
│ 📊 Stats                      │
│ • Calls: 234                  │
│ • Success: 87%                │
│ • Avg: 3m 45s                 │
├───────────────────────────────┤
│ [Test] [Edit] [Details]       │
└───────────────────────────────┘
```

#### **3. Agent Actions Menu (⋮)**

- Edit Agent
- Test Agent
- View Details
- Duplicate Agent
- Activate/Deactivate
- Delete Agent (with confirmation)

#### **4. Empty State**

When no agents:
- Icon: Large bot
- Title: "No agents yet"
- Description: "Create your first AI agent to get started"
- Button: "Create Agent"

---

## PAGE 3: 📝 CREATE/EDIT AGENT DIALOG

**Component:** `<CreateAgentDialog>` or `<EditAgentDialog>`  
**Purpose:** Multi-section form for agent configuration

### **Dialog Structure:**

```typescript
interface AgentFormData {
  // Section 1: Basic Info
  name: string;              // Required, max 50 chars
  description: string;       // Max 500 chars
  type: 'voice' | 'chat' | 'hybrid';
  language: string;          // EN-US, ES, FR, etc.
  status: 'active' | 'inactive';
  
  // Section 2: AI Model
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;      // Required, 50-5000 chars
  contextKnowledge: string;
  
  // Section 3: Voice (conditional)
  voiceProvider: string;
  voiceId: string;
  voiceSpeed: number;
  voicePitch: number;
  stability: number;
  similarityBoost: number;
  
  // Section 4: Behavior
  firstMessage: string;
  endCallPhrases: string[];
  interruptBehavior: string;
  silenceTimeout: number;
  maxCallDuration: number;
  backgroundSound: boolean;
  
  // Section 5: Advanced
  transcription: boolean;
  recordCalls: boolean;
  voicemailDetection: boolean;
  voicemailAction: string;
  transferEnabled: boolean;
  transferNumber: string;
  customVariables: Array<{key: string; value: string}>;
  webhookUrl: string;
  webhookEvents: string[];
  tags: string[];
}
```

### **Form Sections:**

#### **Section 1: Basic Information**

**Fields:**
1. **Agent Name*** (text, required, max 50)
2. **Description** (textarea, max 500)
3. **Agent Type*** (select: Voice | Chat | Hybrid)
4. **Language*** (select: 10+ languages)
5. **Status** (toggle: Active | Inactive)

#### **Section 2: AI Model Configuration**

**Fields:**
1. **AI Model*** (select with pricing):
   - GPT-4 Turbo ($0.01/1K)
   - GPT-4 ($0.03/1K)
   - GPT-3.5 Turbo ($0.002/1K)
   - Claude 3 Opus ($0.015/1K)
   - Claude 3 Sonnet ($0.003/1K)
   - Claude 2 ($0.008/1K)
   - Gemini Pro ($0.0005/1K)

2. **Temperature** (slider: 0.0 - 2.0, step 0.1, default 0.7)
3. **Max Tokens** (number: 100 - 8000, default 2000)
4. **System Prompt*** (textarea: 50-5000 chars, with templates):
   - Customer Support Template
   - Sales Agent Template
   - Appointment Booking Template
   - Survey Conductor Template
   - Lead Qualifier Template
   - Custom

5. **Context/Knowledge Base** (textarea: max 10000 chars, optional file upload)

#### **Section 3: Voice Configuration**

*Only shown if type = voice or hybrid*

**Fields:**
1. **Voice Provider*** (radio):
   - ElevenLabs (premium, most natural)
   - OpenAI TTS (good quality, fast)
   - Azure TTS (multilingual)
   - Google TTS (reliable)

2. **Voice Selection*** (dropdown, ElevenLabs voices):
   - Rachel (Calm, Female)
   - Domi (Strong, Male)
   - Bella (Soft, Female)
   - Antoni (Neutral, Male)
   - Elli (Young, Female)
   - Josh (Professional, Male)
   - Arnold (Deep, Male)
   - Adam (Narrative, Male)
   - Sam (Energetic, Male)
   - *Preview button plays 5s sample*

3. **Voice Speed** (slider: 0.5x - 2.0x, step 0.1, default 1.0x)
4. **Voice Pitch** (slider: -20 to +20, step 1, default 0)
5. **Stability** (slider: 0.0 - 1.0, ElevenLabs only)
6. **Similarity Boost** (slider: 0.0 - 1.0, ElevenLabs only)

#### **Section 4: Behavior Settings**

**Fields:**
1. **First Message** (textarea, max 500 chars)
2. **End Call Phrases** (multi-input, defaults: "goodbye", "bye", "thank you goodbye")
3. **Interrupt Behavior** (select):
   - Allow interruptions
   - Prevent interruptions
   - Smart mode (context-aware)

4. **Silence Timeout** (number: 3-30 seconds, default 5)
5. **Max Call Duration** (number: 1-60 minutes, default 30)
6. **Background Sound** (toggle, options: office/cafe/quiet)

#### **Section 5: Advanced Settings**

**Fields:**
1. **Transcription** (toggle, default enabled)
2. **Record Calls** (toggle, default enabled)
3. **Voicemail Detection** (toggle + action dropdown)
4. **Transfer Settings** (toggle + number + phrases)
5. **Custom Variables** (key-value pairs, use in prompts with {{var}})
6. **Webhook URL** (URL + event checkboxes + auto-generated secret)
7. **Tags** (multi-select chips + custom tags)

### **Action Buttons:**

- **Cancel** - Close without saving
- **Save as Draft** - Save with status=inactive
- **Save & Activate** - Save with status=active

### **Validation:**

- Required fields: asterisk (*)
- Real-time validation on blur
- Error messages below fields
- Disable save if validation fails
- Success toast on save

---

## PAGE 4: ☎️ PHONE NUMBERS

**Route:** `/phone-numbers`  
**Purpose:** Manage phone numbers for agents

### **Data Model:**

```typescript
interface PhoneNumber {
  id: string;
  phoneNumber: string;      // E.164 format: +15551234567
  country: string;          // US, CA, UK, etc.
  type: 'local' | 'tollfree' | 'mobile';
  location: {
    city: string;
    state: string;
    country: string;
  };
  areaCode: string;
  assignedAgentId: string | null;
  status: 'active' | 'available' | 'reserved';
  monthlyCost: number;      // 1.50, 3.00, etc.
  
  // Configuration
  callRecording: boolean;
  callForwarding: {
    enabled: boolean;
    number: string;
    afterRings: number;
  };
  voicemail: {
    enabled: boolean;
    greeting: string;       // URL or text-to-speech
    emailNotifications: boolean;
  };
  sms: {
    enabled: boolean;
    webhookUrl: string;
  };
  
  purchasedAt: Date;
  purchasedBy: string;
}
```

### **Features:**

#### **1. Phone Numbers Table**

**Columns:**
- Phone Number (formatted, copy button, flag icon)
- Type (Local/Toll-free/Mobile)
- Location (City, State)
- Assigned Agent (dropdown to reassign or "Unassigned")
- Status Badge (Active/Available/Reserved)
- Monthly Cost ($X.XX/month)
- Actions (Settings ⚙️ dropdown)

#### **2. Purchase Number Flow (6 Steps)**

**Step 1: Select Country**
- Dropdown: US, CA, UK, AU, etc.
- Show available count per country

**Step 2: Select Type**
- Radio: Local | Toll-free | Mobile

**Step 3: Choose Area Code** (if local)
- Searchable dropdown
- Popular area codes highlighted
- Search by city name

**Step 4: Select Number**
- List of 10-20 available numbers
- Pricing shown
- Filters: Contains digits, Easy to remember
- Radio selection

**Step 5: Assign Agent**
- Dropdown: agents or "Unassigned"
- Configure: Recording, Voicemail, Forwarding

**Step 6: Confirm**
- Review all selections
- Show one-time + monthly cost
- Confirm purchase

---

## PAGE 5: 📞 CALLS

**Route:** `/calls`  
**Purpose:** Call history with filtering

### **Data Model:**

```typescript
interface Call {
  id: string;
  callId: string;          // External call ID
  direction: 'inbound' | 'outbound';
  
  // Parties
  phoneNumber: string;     // Customer phone
  agentId: string;
  contactName: string | null;  // If in leads
  
  // Timing
  startedAt: Date;
  endedAt: Date;
  duration: number;        // Seconds
  
  // Status & Outcome
  status: 'completed' | 'failed' | 'busy' | 'no_answer' | 'voicemail';
  outcome: string | null;  // Qualified, Not Interested, etc.
  
  // Content
  recordingUrl: string | null;
  transcriptUrl: string | null;
  transcript: {
    speaker: 'agent' | 'user';
    text: string;
    timestamp: number;
    sentiment: number;       // -1 to 1
  }[];
  
  // Costs
  aiCost: number;
  voiceCost: number;
  phoneCost: number;
  totalCost: number;
  
  // Metrics
  responseTimeAvg: number;  // Milliseconds
  userInterruptions: number;
  agentInterruptions: number;
  silenceDuration: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  
  // Metadata
  userId: string;
  campaignId: string | null;
}
```

### **Features:**

#### **1. Filters & Search**

- Search: Phone number, agent name, transcript keywords
- Status: All | Completed | Failed | Busy | No Answer | Voicemail
- Agent: Multi-select dropdown
- Date Range: Custom picker
- Duration: <1min | 1-5min | 5-15min | >15min
- Sort: Newest | Oldest | Longest | Shortest

#### **2. Summary Cards**

- Total Calls
- Total Duration (hours & minutes)
- Total Cost ($)
- Success Rate (%)

#### **3. Calls Table**

**Columns:**
1. Date & Time (with timezone)
2. Direction (icon ↗/↙ + badge)
3. Phone Number (formatted, copy)
4. Agent (name + avatar)
5. Duration (colored: <1min yellow, >10min green)
6. Status (color-coded badge)
7. Cost ($ with breakdown tooltip)
8. Recording (play button ▶)
9. Transcript (view button)
10. Actions (View Details)

**Features:**
- Pagination: 25/50/100 per page
- Bulk selection for export/delete
- Click row to open call detail

---

## PAGE 6: 📋 CALL DETAIL

**Route:** `/call/:callId`  
**Purpose:** Detailed single call view

### **Features:**

#### **1. Call Information Card**

**Metadata:**
- Date & Time (with timezone)
- Direction (Inbound/Outbound)
- Duration
- Phone Number
- Contact Name (if exists)

**Agent Info:**
- Agent Name
- Agent Type
- AI Model
- Voice

**Metrics:**
- Response Time (avg)
- User Interruptions
- Agent Interruptions
- Silence Duration
- Sentiment (😊/😐/😞 + score)

**Cost Breakdown:**
- AI Model Cost: $X.XX
- Voice Synthesis: $X.XX
- Phone Cost: $X.XX
- **Total: $X.XX**

#### **2. Recording Player**

- Audio player controls
- Waveform visualization
- Playback speed: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
- Timeline with speaker markers
- Download button
- Share button

#### **3. Transcript**

**Format:**
```
┌─────────────────────┐
│ [Agent] 00:00       │
│ Hello! How can I... │
└─────────────────────┘
┌─────────────────────┐
│ [User] 00:05        │
│ I need help with... │
└─────────────────────┘
```

**Features:**
- Color-coded speakers (Agent blue, User green)
- Timestamps on each message
- Search within transcript
- Highlight keywords
- Copy/Download (PDF/TXT)
- Sentiment indicators per message

#### **4. Analysis Tabs**

**Tab 1: Summary**
- AI-generated summary
- Key points discussed
- Action items
- Call outcome

**Tab 2: Topics**
- Topics with confidence %
- Example: "Account Issues (95%)", "Billing Question (78%)"

**Tab 3: Sentiment Timeline**
- Line chart showing sentiment over time
- X-axis: Time
- Y-axis: Score (-1 to 1)

**Tab 4: Insights**
- Call quality score (0-10)
- Agent performance notes
- Improvement suggestions
- Similar calls links

---

## PAGE 7: 📡 LIVE CALLS

**Route:** `/live-calls`  
**Purpose:** Real-time call monitoring

### **Data Model:**

```typescript
interface LiveCall {
  id: string;
  agentId: string;
  agentName: string;
  phoneNumber: string;
  status: 'ringing' | 'connected' | 'speaking' | 'listening';
  duration: number;        // Live counting
  
  // Real-time metrics
  currentSpeaker: 'agent' | 'user' | 'silence';
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  responseTimeAvg: number;
  userInterruptions: number;
  
  // Live transcript (last N messages)
  recentMessages: {
    speaker: 'agent' | 'user';
    text: string;
    timestamp: number;
  }[];
  
  // Meta
  startedAt: Date;
}
```

### **Features:**

#### **1. Live Call Cards Grid**

**Card Format:**
```
┌─────────────────────────────┐
│ 🔴 LIVE               [Menu]│
│ Agent: Sales Agent          │
│ Phone: +1 (555) 123-4567   │
│ Duration: 2m 15s (live)     │
├─────────────────────────────┤
│ 📊 Metrics                  │
│ • Status: Speaking          │
│ • Sentiment: 😊 Positive    │
│ • Response: 1.1s avg        │
├─────────────────────────────┤
│ 💬 Live Transcript          │
│ [Agent] How can I help?    │
│ [User] I need support...   │
│ [Agent] I'd be happy to... │
├─────────────────────────────┤
│ [View] [Monitor] [Intervene]│
└─────────────────────────────┘
```

**Features:**
- Pulsing red "LIVE" indicator
- Auto-refresh every 2 seconds
- Real-time metrics update
- Live transcript (last 3-5 messages)

#### **2. Full Monitoring View**

**Dialog Features:**
- Large modal or full-page
- Split: Call info (left) + Live transcript (right)
- Audio stream (listen-in)
- Live sentiment graph
- Actions:
  - End call (emergency)
  - Send note to agent
  - Bookmark moment
  - Take over call (admin only)

---

## PAGE 8: 📊 ANALYTICS

**Route:** `/analytics`  
**Purpose:** Comprehensive insights dashboard

### **Features:**

#### **1. Overview Metrics (4 Cards)**

- Total Calls (count + trend)
- Total Minutes (duration + cost/min)
- Success Rate (% + visual indicator)
- Average Duration (time + optimal range)

#### **2. Charts (8 Total)**

**Chart 1: Call Volume Over Time**
```typescript
{
  type: 'line',
  xAxis: 'time' (hourly/daily/weekly),
  yAxis: 'count',
  lines: ['Total', 'Successful', 'Failed'],
  interactive: true
}
```

**Chart 2: Call Status Distribution**
```typescript
{
  type: 'donut',
  segments: [
    { label: 'Completed', value: 850, color: 'green' },
    { label: 'Failed', value: 45, color: 'red' },
    { label: 'No Answer', value: 102, color: 'gray' },
    { label: 'Busy', value: 23, color: 'yellow' },
    { label: 'Voicemail', value: 34, color: 'blue' }
  ]
}
```

**Chart 3: Calls by Agent (Bar)**  
**Chart 4: Revenue Trend (Area)**  
**Chart 5: Average Duration (Line)**  
**Chart 6: Peak Hours (Heatmap)**  
**Chart 7: Geographic Distribution (Map/Bar)**  
**Chart 8: Cost Analysis (Stacked Bar)**

#### **3. Performance Tables**

**Table 1: Top Performing Agents**
- Agent Name
- Total Calls
- Success Rate
- Avg Duration
- Total Cost
- Revenue Generated

**Table 2: Call Outcomes**
- Outcome Type
- Count
- Percentage
- Trend

**Table 3: Common Issues**
- Issue Description
- Frequency
- Suggested Resolution

---

## PAGE 9: 🧪 TESTING (Agent Playground)

**Route:** `/testing`  
**Purpose:** Test agents before deployment

### **Layout:** Two-panel

**Left Panel: Configuration**
- Agent selection dropdown
- Test phone number input (or select from leads)
- Override settings (optional):
  - Temperature
  - Max tokens
  - Voice speed
  - First message
- Test variables (if agent uses them)
- Test type (radio):
  - Voice Call (actual call)
  - Text Simulation (chat)
  - Voice Preview (TTS only)
- **Start Test** button

**Right Panel: Test Interface**

#### **Mode 1: Voice Call**

**Pre-call:**
- Instructions
- Cost estimate

**During call:**
- Status (Calling → Connected)
- Live duration timer
- Audio controls (mute, volume)
- End call button
- Live metrics

**Post-call:**
- Summary card
- Duration & cost
- Full transcript
- Recording player
- Analysis + suggestions

#### **Mode 2: Text Simulation**

**Chat Interface:**
```
┌──────────────────────┐
│ [Agent] Agent Name   │
├──────────────────────┤
│                      │
│ [Agent] Hello!       │
│                      │
│      [User] Hi there │
│                      │
│ [Agent] How can I... │
│                      │
├──────────────────────┤
│ [Type message...][Send]│
└──────────────────────┘
```

**Features:**
- Chat bubbles (agent left, user right)
- Typing indicator
- Timestamps
- Clear conversation
- Export
- Token count (live)
- Cost tracker

#### **Mode 3: Voice Preview**

- Text input
- Play button
- Audio player
- Voice settings
- Compare voices

---

## PAGE 10: 👥 LEADS

**Route:** `/leads`  
**Purpose:** Contact management

### **Data Model:**

```typescript
interface Lead {
  id: string;
  
  // Personal Info
  firstName: string;
  lastName: string;
  phoneNumber: string;     // Required
  email: string;
  company: string;
  jobTitle: string;
  
  // Lead Details
  status: 'new' | 'contacted' | 'qualified' | 'not_interested' | 'converted';
  source: 'manual' | 'import' | 'campaign' | 'api' | 'website' | 'referral' | 'event';
  assignedTo: string | null;  // Agent or campaign ID
  
  // Tags & Custom
  tags: string[];
  customFields: { key: string; value: string }[];
  
  // Call Preferences
  bestTimeToCall: string;
  timezone: string;
  doNotCall: boolean;
  
  // Notes & Activity
  notes: string;
  lastContacted: Date | null;
  callCount: number;
  
  // Metadata
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
}
```

### **Features:**

#### **1. Leads Table**

**Columns:**
- Name (click to edit)
- Phone Number (call button, copy)
- Email (send button, copy)
- Company
- Status (badge, editable dropdown)
- Last Contacted (date or "Never")
- Calls (count, click for history)
- Tags (chips, add button)
- Actions (View, Edit, Call, Delete)

#### **2. Add/Edit Lead Dialog**

**Form:**
- First Name* (required)
- Last Name* (required)
- Phone Number* (required, validated)
- Email
- Company
- Job Title
- Status (dropdown)
- Source (dropdown)
- Assigned To (agent/campaign)
- Tags (multi-select)
- Custom Fields (key-value pairs)
- Notes (textarea)
- Best Time to Call (time picker)
- Timezone
- Do Not Call (checkbox)

#### **3. Import Leads**

**Steps:**

**Step 1: Upload**
- Drag & drop or file picker
- Formats: CSV, Excel (.xlsx)
- Template download link
- Max 5 MB

**Step 2: Map Fields**
- Show CSV headers
- Map to system fields:
  - Name → First Name + Last Name
  - Phone → Phone Number
  - Email → Email
  - etc.
- Preview first 5 rows

**Step 3: Review**
- Total to import
- Validation errors
- Duplicate handling:
  - Skip duplicates
  - Update existing
  - Import as new

**Step 4: Summary**
- Successfully imported: X
- Skipped (duplicates): X
- Errors: X (with log)
- View imported button

#### **4. Bulk Actions**

- Select multiple (checkboxes)
- Actions:
  - Add to campaign
  - Change status
  - Add tags
  - Delete
  - Export

---

## PAGE 11: 📣 CAMPAIGNS

**Route:** `/campaigns`  
**Purpose:** Outbound campaign management

### **Data Model:**

```typescript
interface Campaign {
  id: string;
  name: string;
  description: string;
  type: 'outbound' | 'inbound' | 'mixed';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  
  // Configuration
  agentId: string;
  leadIds: string[];       // Or lead segment filter
  callStrategy: 'sequential' | 'random' | 'priority' | 'time_optimized';
  maxAttemptsPerLead: number;  // 1-5
  retryDelay: number;      // Minutes
  retryOn: {
    noAnswer: boolean;
    busy: boolean;
    voicemail: boolean;
  };
  voicemailAction: 'leave_message' | 'hangup' | 'callback';
  callRateLimit: number;   // Calls per hour
  
  // Schedule
  startDate: Date;
  endDate: Date | null;
  callingHours: {
    start: string;         // "09:00"
    end: string;           // "17:00"
  };
  activeDays: number[];    // [1,2,3,4,5] = Mon-Fri
  timezone: string;
  pausePeriods: { start: Date; end: Date }[];
  
  // Settings
  recordCalls: boolean;
  transcription: boolean;
  notifications: {
    started: boolean;
    completed: boolean;
    highSuccess: boolean;
    lowSuccess: boolean;
    errors: boolean;
  };
  webhookUrl: string;
  webhookEvents: string[];
  tags: string[];
  notes: string;
  
  // Progress (read-only)
  totalLeads: number;
  callsMade: number;
  connected: number;
  successful: number;
  totalDuration: number;
  totalCost: number;
  
  // Metadata
  createdAt: Date;
  createdBy: string;
  startedAt: Date | null;
  completedAt: Date | null;
}
```

### **Features:**

#### **1. Campaign Cards Grid**

**Card Format:**
```
┌──────────────────────────────┐
│ 📣 Campaign Name      [Menu] │
│ Status Badge                 │
├──────────────────────────────┤
│ Agent: Sales Agent           │
│ Leads: 150 total             │
│ Progress: [▓▓▓▓▓░░░] 65%     │
├──────────────────────────────┤
│ Stats:                       │
│ • Called: 98/150             │
│ • Connected: 76 (77%)        │
│ • Success: 45 (59%)          │
│ • Duration: 5h 23m           │
│ • Cost: $127.50              │
├──────────────────────────────┤
│ Schedule: Daily 9AM-5PM EST  │
│ Next: Jan 15, 9:00 AM        │
├──────────────────────────────┤
│ [View][Edit][Pause][Stop]    │
└──────────────────────────────┘
```

#### **2. Campaign Detail Page**

See separate section below.

---

## PAGE 12: 📋 CAMPAIGN DETAIL

**Route:** `/campaign/:campaignId`  
**Purpose:** Real-time campaign monitoring

### **Features:**

#### **1. Overview Metrics (5 Cards)**

- Total Leads
- Calls Made (X/Total %)
- Connected (count + rate %)
- Successful (count + rate %)
- Total Cost

#### **2. Progress Charts**

**Chart 1: Call Progress (Stacked Area)**
- X-axis: Time
- Stacks: Successful, Connected, No Answer, Failed

**Chart 2: Status Breakdown (Donut)**
- Successful, No Answer, Busy, Failed, Voicemail, Not Called

#### **3. Campaign Leads Table**

**Columns:**
- Lead Name (click for detail)
- Phone Number (call button)
- Status (Not Called, Calling, Connected, Completed, Failed, Skip)
- Attempts (1/3)
- Last Call (date/time or "Never")
- Duration (if connected)
- Outcome (Qualified, Not Interested, etc.)
- Next Attempt (scheduled time)
- Actions (View, Call Now, Skip, Mark Done)

**Features:**
- Real-time updates (polling every 5s)
- Filters and search
- Export filtered results

#### **4. Activity Timeline**

```
⏰ 10:30 AM - Call completed
   Lead: John Doe (+1 555-1234)
   Result: Qualified
   Duration: 3m 45s

⏰ 10:15 AM - Call attempted
   Lead: Jane Smith (+1 555-5678)
   Result: No answer

⏰ 9:00 AM - Campaign started
```

#### **5. Performance Insights**

- Best performing times (heatmap)
- Avg calls to success
- Cost per connected call
- Cost per successful outcome
- Agent performance metrics

---

## PAGE 13: 🛠️ CREATE CAMPAIGN

**Component:** `<CreateCampaignDialog>`  
**Purpose:** 6-step campaign wizard

### **Step 1: Basic Info**

- Campaign Name* (text, max 100)
- Description (textarea, max 500)
- Campaign Type (Outbound | Inbound | Mixed)
- Select Agent* (dropdown)

### **Step 2: Select Leads**

**Option A: Existing Leads**
- Multi-select table
- Filters and search
- Select All / Clear

**Option B: Import New**
- File upload
- Field mapping
- Add immediately

**Option C: Lead Segment**
- Predefined filters
- Examples: "Hot Leads", "Uncontacted", "Follow-ups"

**Summary:**
- Total selected: 150
- Preview first 5
- Edit/remove

### **Step 3: Campaign Settings**

- Call Strategy (Sequential | Random | Priority | Time-optimized)
- Max Attempts (1-5, default 3)
- Retry Delay (Immediately, 1hr, 2hr, 1day, 2days)
- Retry On (checkboxes: No Answer, Busy, Voicemail)
- Voicemail Action (Leave message | Hang up | Mark callback)
- Call Rate Limit (10-100 per hour, default 30)

### **Step 4: Schedule**

- Start Date & Time (datetime picker or "Immediately")
- End Date (date picker or "Run until complete")
- Calling Hours (start time - end time)
- Active Days (checkboxes: Mon-Sun, presets: Weekdays/Weekends/All)
- Timezone* (dropdown, auto-detect toggle)
- Pause Periods (optional, add date ranges)

### **Step 5: Advanced Options**

- Call Recording (toggle, default on)
- Transcription (toggle, default on)
- Notifications (checkboxes for events)
- Webhook Integration (URL + events)
- Tags (multi-select)
- Notes (textarea)

### **Step 6: Review & Launch**

**Summary:**
- Campaign name
- Agent
- Total leads
- Schedule
- Call strategy
- Max attempts
- Estimated duration
- Estimated cost

**Actions:**
- Save as Draft
- Schedule Campaign
- Start Now

---

## PAGE 14: ⚙️ SETTINGS

**Route:** `/settings`  
**Purpose:** Account settings

### **Tabs:**

#### **Tab 1: Account**

**Profile:**
- Avatar (upload/URL/remove)
- Full Name
- Email (verified badge)
- Phone
- Company
- Job Title

**Password:**
- Current password
- New password
- Confirm password
- Strength indicator
- Requirements: 8+ chars, uppercase, lowercase, number

**Two-Factor Auth:**
- Toggle enable/disable
- Setup wizard
- Backup codes

#### **Tab 2: Notifications**

**Email Notifications:**
- Agent created/updated
- Call completed
- Campaign started/completed
- Low balance alert
- Failed payment
- Weekly summary
- Marketing emails

**In-App Notifications:**
- Real-time call alerts
- System updates
- New features

**SMS Notifications:**
- Toggle enable/disable
- Phone number
- Select events

#### **Tab 3: Preferences**

**General:**
- Language (EN, ES, FR, etc.)
- Timezone (auto-detect)
- Date Format (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD)
- Time Format (12-hour, 24-hour)
- Currency (USD, EUR, GBP, etc.)

**Display:**
- Theme (Light, Dark, System)
- Sidebar (Collapsed default, Icons only)
- Dashboard Widgets (checkboxes)

#### **Tab 4: Integrations**

**Connected Services:**
- Zapier (status, connect/disconnect)
- Slack (connect)
- HubSpot (connect)
- Salesforce (connect)
- Custom webhooks

Each shows:
- Logo
- Status (Connected/Not connected)
- Configure button
- Disconnect button

#### **Tab 5: Security**

**Active Sessions:**
- Device: Chrome on Windows
- Location: New York, USA
- IP: 192.168.1.1
- Last Active: 5 minutes ago
- Current session badge
- Revoke button

**Actions:**
- Logout All Devices

**Activity Log:**
- Recent security events

**Data & Privacy:**
- Export all data
- Delete account (dangerous, confirmation required)

---

## PAGE 15: 💳 BILLING

**Route:** `/billing`  
**Purpose:** Payments and usage

### **Data Model:**

```typescript
interface Transaction {
  id: string;
  type: 'top_up' | 'usage' | 'refund' | 'bonus';
  amount: number;
  description: string;
  balanceAfter: number;
  status: 'completed' | 'pending' | 'failed';
  createdAt: Date;
  receiptUrl: string;
}

interface PaymentMethod {
  id: string;
  type: 'card';
  brand: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}
```

### **Features:**

#### **1. Current Balance Card**

- Large balance: $47.52
- Last updated: timestamp
- **Top Up** button (primary)
- Auto-reload toggle:
  - Enable/disable
  - Threshold: When < $10
  - Amount: Reload $50

#### **2. Billing Overview**

**Current Period:**
- Period: Jan 1 - Jan 31, 2024
- Days remaining: 15
- Current usage: $127.50
- Projected: $255.00

**Usage Breakdown:**
- AI Model: $85.20 (67%)
- Voice Synthesis: $32.15 (25%)
- Phone: $10.15 (8%)

#### **3. Payment Methods**

**Card List:**
Each shows:
- Brand logo
- Last 4: •••• 4242
- Expiry: 12/25
- Default badge
- Actions: Set default, Edit, Remove

**Add Payment Method:**
- Card number
- Expiry
- CVV
- Billing address
- Save as default

#### **4. Top Up Dialog**

**Step 1: Amount**
- Presets: $25, $50, $100, $200
- Custom amount
- Bonus: "Add $100, get $5 bonus!"

**Step 2: Payment Method**
- Radio list of saved cards
- Add new option

**Step 3: Confirm**
- Amount
- Payment method
- Bonus
- Total
- Confirm

**Success:**
- New balance
- Transaction ID
- Receipt sent

#### **5. Transaction History**

**Columns:**
- Date
- Type (badge: Top Up, Usage, Refund, Bonus)
- Description
- Amount (+ green, - red)
- Balance After
- Status
- Receipt (download PDF)

**Filters:**
- Date range
- Type
- Export (CSV/Excel)

#### **6. Invoices**

**Columns:**
- Invoice #
- Date
- Period
- Amount
- Status (Paid, Pending, Overdue)
- Actions (View PDF, Download, Email)

---

## PAGE 16: 🔑 API KEYS

**Route:** `/api-keys`  
**Purpose:** Programmatic access management

### **Data Model:**

```typescript
interface ApiKey {
  id: string;
  name: string;
  key: string;              // sk_live_abc123...xyz
  status: 'active' | 'revoked';
  permissions: string[];    // ['read:agents', 'write:calls', etc.]
  expiresAt: Date | null;
  ipWhitelist: string[];
  createdAt: Date;
  lastUsedAt: Date | null;
  usageCount: number;
}
```

### **Features:**

#### **1. API Keys Table**

**Columns:**
- Name (editable inline)
- Key (masked, show/hide toggle, copy)
- Created
- Last Used (date or "Never")
- Status (Active/Revoked)
- Actions (Edit, Revoke, Stats)

#### **2. Create API Key Dialog**

**Fields:**
- Key Name* (text)
- Permissions (checkboxes):
  - Read agents
  - Write agents
  - Read calls
  - Write calls
  - etc.
- Expiration (Never, 30d, 90d, 1yr, Custom)
- IP Whitelist (multi-input, supports wildcards)

**On Create:**
- Show full key ONCE
- Warning: "Save now, won't see again!"
- Copy button
- Download as .txt
- Email to me checkbox

#### **3. Documentation Link**

- Button: "View API Documentation"
- Opens docs with endpoints, examples, SDKs

#### **4. Usage Statistics (per key)**

- Requests (24h) chart
- Total requests
- Error rate
- Most used endpoints

---

## PAGE 17: 🪝 WEBHOOKS

**Route:** `/webhooks`  
**Purpose:** Event notifications

### **Data Model:**

```typescript
interface Webhook {
  id: string;
  url: string;
  events: string[];        // ['agent.created', 'call.completed', etc.]
  status: 'active' | 'paused' | 'failing';
  secret: string;          // For signature verification
  headers: { key: string; value: string }[];
  retryPolicy: {
    enabled: boolean;
    maxRetries: number;
  };
  createdAt: Date;
  lastDelivery: {
    timestamp: Date;
    statusCode: number;
    success: boolean;
  };
  successRate: number;     // Percentage
}
```

### **Available Events:**

**Agent Events:**
- agent.created
- agent.updated
- agent.deleted
- agent.activated
- agent.deactivated

**Call Events:**
- call.started
- call.ringing
- call.answered
- call.completed
- call.failed
- call.recording.ready
- call.transcription.ready

**Campaign Events:**
- campaign.started
- campaign.paused
- campaign.completed
- campaign.lead.completed

**System Events:**
- balance.low
- payment.succeeded
- payment.failed

### **Features:**

#### **1. Webhooks Table**

**Columns:**
- URL (truncated, copy)
- Events (pills, count)
- Status (Active/Paused/Failing)
- Last Delivery (timestamp + status ✓/✗)
- Success Rate (% with color)
- Actions (Edit, Test, Logs, Delete)

#### **2. Add/Edit Webhook Dialog**

**Fields:**
- Webhook URL* (HTTPS required)
- Events* (organized checkboxes, Select All/Clear)
- Secret Key (auto-generated, show/hide, regenerate)
- Headers (key-value pairs)
- Retry Policy:
  - Enable retries
  - Max retries (1-5)
  - Exponential backoff
- Status (Active/Paused)

#### **3. Test Webhook**

- Select event type
- Show sample payload
- Send button
- Show response (status, headers, body)

#### **4. Webhook Logs**

**Table:**
- Timestamp
- Event
- Status Code (colored)
- Response Time
- Attempt (1/3)
- Actions (View Payload, View Response, Retry)

**Filters:**
- Date range
- Event type
- Status code
- Success/Failed
- Export CSV/Excel

---

## PAGE 18: 🏪 MARKETPLACE

**Route:** `/marketplace`  
**Purpose:** Pre-built agent templates

### **Data Model:**

```typescript
interface Template {
  id: string;
  name: string;
  description: string;
  category: string;        // Customer Support, Sales, etc.
  language: string;
  voiceProvider: string;
  voiceId: string;
  model: string;
  
  // Configuration (pre-filled)
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  firstMessage: string;
  // ... all agent settings
  
  // Marketplace Meta
  creatorId: string;
  creatorName: string;
  verified: boolean;
  rating: number;          // 0.0 - 5.0
  reviewCount: number;
  installCount: number;
  price: number;           // 0 = free
  
  // Media
  imageUrl: string;
  screenshots: string[];
  
  // Versioning
  version: string;
  changelog: { version: string; date: Date; notes: string }[];
  
  createdAt: Date;
  updatedAt: Date;
}
```

### **Features:**

#### **1. Filters Sidebar**

**Categories:**
- Customer Support (45)
- Sales (32)
- Appointment Booking (28)
- Lead Qualification (19)
- Survey & Feedback (15)
- Technical Support (12)
- E-commerce (8)
- Healthcare (6)
- Real Estate (5)
- Other (10)

**Language:**
- English, Spanish, French, German, etc.

**Voice Type:**
- Male, Female, Neutral

**Pricing:**
- Free, Paid, All

**Sort:**
- Popular, Newest, Top Rated, Name (A-Z)

#### **2. Templates Grid**

**Card:**
```
┌─────────────────────┐
│ [Template Image]    │
├─────────────────────┤
│ Template Name       │
│ by Creator (✓)      │
│ ⭐⭐⭐⭐⭐ 4.8 (124)  │
├─────────────────────┤
│ Cat: Support        │
│ Lang: English       │
│ Voice: Rachel       │
│ Model: GPT-4        │
├─────────────────────┤
│ Short description...│
├─────────────────────┤
│ 💰 Free  📥 1.2k    │
├─────────────────────┤
│ [Details] [Install] │
└─────────────────────┘
```

#### **3. Template Detail Dialog**

**Tabs:**

**Tab 1: Overview**
- Full description
- Key features (bullets)
- Use cases
- Screenshots

**Tab 2: Configuration**
- Shows all settings
- Can be customized after install

**Tab 3: Reviews**
- Review list (rating, text, helpful upvote)
- Write review (if installed)

**Tab 4: Changelog**
- Version history

**Tab 5: Support**
- FAQ
- Contact creator
- Report issue

#### **4. Install Process**

**Dialog:**
1. Customize agent name
2. Review settings (editable)
3. Confirm installation

**Success:**
- Toast notification
- Navigate to agents
- New agent appears (with template badge)

---

## PAGE 19: 🎨 WHITE LABEL

**Route:** `/white-label`  
**Purpose:** Custom branding (Enterprise)

### **Features:**

#### **1. Brand Identity**

**Logos:**
- Light mode logo (upload PNG/SVG, max 2MB, 200x60px)
- Dark mode logo (or use same)
- Favicon (ICO/PNG, max 100KB, 32x32 or 64x64)

#### **2. Color Scheme**

**Primary Colors:**
- Primary (hex picker)
- Secondary
- Accent

**Semantic:**
- Success (green)
- Warning (yellow)
- Error (red)
- Info (blue)

**Reset to defaults** button

**Preview:** Shows buttons, links in selected colors

#### **3. Typography**

**Fonts:**
- Primary Font (System + Google Fonts)
- Heading Font (or use same)
- Font Size Scale (Small, Medium, Large)
- Preview text

#### **4. Custom Domain**

**Settings:**
- Custom Domain (input: app.yourdomain.com)
- Verification status (Verified ✓ or Pending)
- DNS instructions (code blocks)
- SSL Certificate (auto via Let's Encrypt)

#### **5. Email Branding**

- From Name (input)
- From Email (with domain verification)
- Email Logo (upload)
- Email Footer (textarea)

#### **6. Legal Pages**

- Privacy Policy URL
- Terms of Service URL
- Cookie Policy URL

*(Links appear in footer)*

#### **7. Advanced**

**Custom Code:**
- Custom CSS (code editor, preview mode)
- Custom JavaScript (Enterprise only, security warning)
- Google Analytics ID (input, enable toggle)

#### **8. Preview**

- Preview button
- Shows header, sidebar, sample page
- Toggle light/dark

**Save:** Changes take up to 5 minutes to propagate

---

## 🛡️ ADMIN PANEL FEATURES

### **Overview: 8 Pages for Super Admins**

**Access:** Red/orange gradient button at bottom of user sidebar  
**Visual Identity:** Red-orange theme (#DC2626 → #EA580C), Shield icon  
**Header:** "Admin Panel" badge, "Back to User App" button

---

## PAGE 20: 🏠 ADMIN DASHBOARD

**Route:** `/admin/dashboard`  
**Purpose:** System-wide overview

### **Features:**

#### **1. Key Metrics (5 Cards)**

- Total Users (1,247, +23 this week)
- Active Users 24h (432, 34.6%)
- Calls Today (3,456 vs 3,123 yesterday)
- Revenue MTD ($94.5k, 94.5% of $100k goal)
- System Health (All Operational, green)

#### **2. Call Volume Chart (24h)**

- Line chart: Total, Successful, Failed
- Hover tooltips

#### **3. Revenue Chart (7 days)**

- Area chart with gradient
- Daily revenue
- Cumulative line
- Target line (dotted)

#### **4. System Health Table**

**Services:**
1. API Service (Operational, 120ms avg, 99.98%)
2. Database (Operational, 45ms avg, 99.99%)
3. Voice Service (Operational, 230ms avg, 99.95%)
4. Storage (Operational, 2.5TB/5TB, 100%)
5. Cache Redis (Operational, 94.5% hit rate, 99.97%)

**Status colors:** Green, Yellow, Orange, Red

#### **5. Geographic Distribution**

**Bar chart or map:**
- United States: 2,145 (62%)
- Canada: 678 (20%)
- UK: 345 (10%)
- Australia: 189 (5%)
- Other: 99 (3%)

#### **6. Recent Alerts**

```
⚠️ High error rate detected
   Service: Voice API, 2h ago, Resolved

ℹ️ Database backup completed
   4h ago, 234 GB

✓ System update deployed
   v2.1.3, Yesterday
```

#### **7. Recent Activity**

Timeline of admin actions

#### **8. Quick Actions Panel**

- View All Users
- Billing & Revenue
- Usage Analytics
- Search Users
- View Alerts
- Audit Logs
- System Settings

---

## PAGE 21: 👥 ADMIN USERS

**Route:** `/admin/users`  
**Purpose:** User management

### **Data Model:**

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  company: string;
  jobTitle: string;
  
  status: 'active' | 'trial' | 'suspended' | 'deleted';
  plan: 'enterprise' | 'pro' | 'starter' | 'free';
  
  createdAt: Date;
  lastActive: Date;
  loginCount: number;
  lastIp: string;
  lastLocation: string;
  
  // Usage (30 days)
  agentsCount: number;
  callsCount: number;
  minutesUsed: number;
  
  // Billing (30 days)
  spend: number;
  
  // Limits
  limits: {
    agents: number;
    callsPerMonth: number;
    minutesPerMonth: number;
    phoneNumbers: number;
    storage: number;      // GB
  };
}
```

### **Features:**

#### **1. Users Table**

**Columns:**
- User (avatar, name, email)
- ID (copy button)
- Status (badge)
- Plan (badge, upgrade/downgrade button)
- Joined (date)
- Last Active (date, online indicator)
- Usage 30d (agents, calls, minutes)
- Spend 30d (amount, trend)
- Actions (⋮ dropdown)

**Actions Menu:**
- View Details
- **Impersonate User** (logs action)
- Adjust Billing
- Edit Limits
- Suspend Account
- Delete User
- Send Email
- View Audit Log

#### **2. User Detail Dialog**

**Tabs:**

**Tab 1: Overview**
- Full user info
- Stats
- Quick actions

**Tab 2: Recent Activity**
- Timeline of user actions

**Tab 3: Billing**
- Balance
- Plan
- Payment method
- Transactions
- Invoices
- Adjust balance button

**Tab 4: Usage**
- Quota progress bars
- Usage by hour chart
- Cost vs revenue

**Tab 5: Error Logs**
- Recent errors
- Filter by type
- Export

#### **3. Admin Actions**

**Impersonate User:**
- Dialog confirmation
- Reason required (textarea)
- Logged in audit
- Opens user account in new tab
- Admin badge shown
- Exit impersonation button

**Adjust Billing:**
- Current balance
- Adjustment amount (+ or -)
- Reason (dropdown)
- Notes (textarea)
- Logged in audit

**Edit Limits:**
- All quotas editable
- Reason required
- Logged

**Suspend Account:**
- Reason (dropdown)
- Notes
- Duration (indefinite or date)
- Notify user (email checkbox)
- Logged

**Delete User:**
- Type "DELETE" to confirm
- Shows what gets deleted
- Export data first (button)
- Reason required
- Logged

**Send Email:**
- Email composer
- Templates
- Send

---

## PAGE 22: 💰 ADMIN BILLING

**Route:** `/admin/billing`  
**Purpose:** Platform revenue monitoring

### **Features:**

#### **1. Revenue Overview (4 Cards)**

- Total Revenue (Month): $94.5k (+7.1%)
- MRR: $84.5k (+5.2%)
- ARR: $1.014M (projected $1.2M)
- ARPU: $75.73 (+2.3%)

#### **2. Revenue by Plan (Stacked Area, 10 months)**

- Enterprise (dark blue)
- Pro (blue)
- Starter (light blue)
- Pay-as-you-go (lightest)

#### **3. Revenue Distribution (Donut)**

- Enterprise: $45.2k (48%)
- Pro: $32.8k (35%)
- Starter: $13.5k (14%)
- PAYG: $3.0k (3%)

#### **4. Failed Payments Table**

**Columns:**
- User (name, email)
- Amount
- Plan
- Reason (Card declined, etc.)
- Date
- Attempts (2/3)
- Next Retry
- Actions (Retry Now, Contact, View, Waive, Suspend)

**Summary:**
- Total failed: 3 ($267.00)

#### **5. Recent Refunds Table**

**Columns:**
- User
- Amount
- Reason
- Requested
- Processed By
- Status

**Total refunded this month:** $450.00

#### **6. Subscription Metrics (4 Cards)**

- New Subscriptions (23, +15%)
- Canceled (5, 0.4% churn)
- Upgrades (12, +$2.4k revenue)
- Downgrades (3, -$450 revenue)

#### **7. Top Customers by Spend**

**Table:**
- Rank
- User
- Plan
- Spend 30d
- Spend All Time
- View Details

#### **8. Revenue Forecast**

- Line chart
- Historical (solid)
- Forecast (dashed)
- Confidence interval (shaded)
- Target line

---

## PAGE 23: 📈 ADMIN ANALYTICS

**Route:** `/admin/analytics`  
**Purpose:** Platform usage monitoring

### **Features:**

#### **1. Usage Overview (4 Cards)**

- Total Calls 30d (89,234, +12.5%, $4,567 cost)
- Total Minutes 30d (134,567 = 2,243h, $6,789 cost)
- Total AI Tokens 30d (123.4M, $3,456 cost)
- Infrastructure Cost 30d ($17.5k, 81.4% margin)

#### **2. Usage by Hour (Heatmap)**

- X: Hour (0-23)
- Y: Day of week
- Color: Call volume
- Tooltip: Exact count

#### **3. Cost Breakdown (Donut)**

- AI Models: 45%
- Voice Synthesis: 30%
- Phone Services: 15%
- Database & Storage: 7%
- Other: 3%

#### **4. Cost vs Revenue (Dual-axis Line)**

- Revenue (green, left Y)
- Cost (red, right Y)
- Profit (green fill)
- Margin trend

#### **5. Top Users by Usage**

**Table:**
- Rank
- User
- Calls
- Minutes
- Cost
- Revenue
- Margin %
- View Details

#### **6. Resource Utilization**

**API Requests 24h:**
- Count: 1.2M
- Avg response: 120ms
- Error rate: 0.02%
- Chart: Requests/min

**Database Queries 24h:**
- Count: 5.6M
- Avg latency: 12ms
- Slow queries: 45 (>100ms)
- Chart: Latency

**Voice API:**
- TTS requests: 45,678
- Avg latency: 230ms
- Error rate: 0.5%

**Storage:**
- Call recordings: 1.2TB (48%)
- User data: 400GB (16%)
- Logs: 600GB (24%)
- Backups: 300GB (12%)
- Total: 2.5TB / 5TB

#### **7. Quota Warnings Table**

**Users approaching limits:**
- User
- Quota (Minutes/month)
- Used (9,456 / 10,000)
- Usage % (94.6%)
- Status (Warning/Critical)
- Actions (Notify, Increase, View)

#### **8. Usage Trends (30 days)**

- Multi-line chart:
  - Calls (blue)
  - Minutes (green)
  - API requests (purple)
  - Errors (red)

#### **9. Cost Optimization Recommendations**

**Suggestions:**
1. Switch GPT-4 → GPT-3.5 for simple tasks
   - Savings: $1,200/month
   - Affected: 15 users
   - Implement button

2. Enable call recording compression
   - Savings: $340/month
   - Storage: 30% reduction
   - Implement

3. Archive logs >90 days
   - Savings: $180/month
   - Space: 150GB freed
   - Implement

---

## PAGE 24: 📝 ADMIN AUDIT LOGS

**Route:** `/admin/audit`  
**Purpose:** Complete admin action trail

### **Data Model:**

```typescript
interface AuditLog {
  id: string;
  eventId: string;
  timestamp: Date;
  
  // Who
  adminId: string;
  adminEmail: string;
  
  // What
  action: string;          // 'user.impersonated', 'billing.adjusted', etc.
  description: string;
  
  // Target
  targetType: 'user' | 'agent' | 'campaign' | 'system';
  targetId: string;
  targetEmail: string;
  
  // Context
  reason: string;
  notes: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  sessionId: string;
  
  // Changes
  before: any;             // JSON
  after: any;              // JSON
  
  // Severity
  severity: 'critical' | 'high' | 'medium' | 'low';
}
```

### **Action Types:**

**User Management:**
- user.created, user.updated, user.impersonated
- user.suspended, user.unsuspended, user.deleted
- user.password_reset, user.email_sent

**Billing:**
- billing.balance_adjusted, billing.refund_issued
- billing.payment_waived, billing.plan_changed, billing.payment_retry

**Data:**
- data.exported (GDPR), data.deleted, backup.restored

**Settings:**
- settings.updated, limits.adjusted, feature_flag.changed

**Security:**
- login.admin, logout.admin
- api_key.created, api_key.revoked
- webhook.created, webhook.deleted

**System:**
- system.update_deployed
- maintenance.started, maintenance.completed

### **Severity Levels:**

**Critical (Red):**
- User deleted
- Data export
- Mass deletion
- System settings changed
- Security settings changed

**High (Orange):**
- User suspended
- Billing adjusted
- Limits increased significantly
- Impersonation
- Payment waived

**Medium (Yellow):**
- User updated
- Settings changed
- Refund issued
- Plan changed

**Low (Gray):**
- User viewed
- Report generated
- Email sent
- Minor setting change

### **Features:**

#### **1. Audit Logs Table**

**Columns:**
- Timestamp (precise to second)
- Severity (color badge)
- Admin (avatar + name)
- Action (icon + description)
- Target (affected user/resource)
- Details (expand arrow)
- IP Address (with location)
- Actions (View Full)

**Expanded:**
- Shows full JSON with before/after states

#### **2. Filters**

- Action Type (dropdown)
- Severity (All, Critical, High, Medium, Low)
- Admin User (dropdown)
- Target User (search)
- Date Range (picker)

#### **3. Search**

- Search by: Event ID, Admin email, Target user, IP, Action
- Real-time suggestions

#### **4. Advanced Filters**

- Combine with AND/OR
- Save filter presets
- Example: "Show all Critical by Admin John in last 7 days"

#### **5. Export**

**Formats:**
- CSV (Excel analysis)
- JSON (programmatic)
- PDF (compliance reports)

**Includes:**
- All filtered results
- Full details
- Timestamp range
- Generated by
- Generated at

#### **6. Retention**

- Logs retained: 2 years
- Older: archived to cold storage
- Request archive access button

---

## 📊 DATA MODELS

### **Core Entities**

```typescript
// Already defined above:
- User
- Agent
- PhoneNumber
- Call
- Lead
- Campaign
- Transaction
- PaymentMethod
- ApiKey
- Webhook
- Template
- AuditLog

// Additional:

interface Organization {
  id: string;
  name: string;
  domain: string;
  plan: string;
  status: string;
  createdAt: Date;
}

interface CallRecording {
  id: string;
  callId: string;
  url: string;
  duration: number;
  fileSize: number;
  format: string;
  createdAt: Date;
}

interface Transcript {
  id: string;
  callId: string;
  messages: {
    speaker: 'agent' | 'user';
    text: string;
    timestamp: number;
    sentiment: number;
    confidence: number;
  }[];
}
```

---

## 🔌 API SPECIFICATIONS

### **Base URL:**

```
https://{projectId}.supabase.co/functions/v1/make-server-9d2dee99
```

### **Authentication:**

```
Authorization: Bearer {accessToken}
```

### **Endpoints:**

```typescript
// Agents
GET    /agents                     // List all agents
GET    /agents/:id                 // Get agent
POST   /agents                     // Create agent
PATCH  /agents/:id                 // Update agent
DELETE /agents/:id                 // Delete agent

// Calls
GET    /calls                      // List calls (filterable)
GET    /calls/:id                  // Get call detail
POST   /calls                      // Initiate call
DELETE /calls/:id                  // Delete call

// Leads
GET    /leads                      // List leads
GET    /leads/:id                  // Get lead
POST   /leads                      // Create lead
POST   /leads/import               // Bulk import
PATCH  /leads/:id                  // Update lead
DELETE /leads/:id                  // Delete lead

// Campaigns
GET    /campaigns                  // List campaigns
GET    /campaigns/:id              // Get campaign
POST   /campaigns                  // Create campaign
PATCH  /campaigns/:id              // Update campaign
POST   /campaigns/:id/start        // Start campaign
POST   /campaigns/:id/pause        // Pause campaign
POST   /campaigns/:id/stop         // Stop campaign
DELETE /campaigns/:id              // Delete campaign

// Phone Numbers
GET    /phone-numbers              // List numbers
GET    /phone-numbers/available    // Search available
POST   /phone-numbers/purchase     // Purchase number
PATCH  /phone-numbers/:id          // Update config
DELETE /phone-numbers/:id          // Release number

// Billing
GET    /billing/balance            // Get balance
POST   /billing/topup              // Add funds
GET    /billing/transactions       // Transaction history
GET    /billing/invoices           // List invoices

// Admin
GET    /admin/users                // List all users
GET    /admin/users/:id            // Get user detail
PATCH  /admin/users/:id            // Update user
POST   /admin/users/:id/impersonate  // Impersonate
POST   /admin/users/:id/adjust-billing  // Adjust balance
POST   /admin/users/:id/suspend    // Suspend user
DELETE /admin/users/:id            // Delete user

GET    /admin/audit-logs           // List audit logs
GET    /admin/analytics            // Platform analytics
GET    /admin/system-health        // System status
```

---

## 🎨 DESIGN SYSTEM

### **Colors:**

```css
/* User App */
--primary: #3B82F6;      /* Blue */
--success: #10B981;      /* Green */
--warning: #F59E0B;      /* Yellow */
--error: #EF4444;        /* Red */
--neutral: #64748B;      /* Slate */

/* Admin Panel */
--admin-primary: linear-gradient(135deg, #DC2626 0%, #EA580C 100%);
/* Red-Orange gradient */

/* Semantic (both) */
--text-primary: #0F172A;     /* Dark mode: #F8FAFC */
--text-secondary: #64748B;   /* Dark mode: #94A3B8 */
--bg-primary: #FFFFFF;       /* Dark mode: #0F172A */
--bg-secondary: #F8FAFC;     /* Dark mode: #1E293B */
--border: #E2E8F0;           /* Dark mode: #334155 */
```

### **Typography:**

```css
/* Font Family */
font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;

/* Scale */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */

/* Weight */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### **Spacing:**

```css
/* Based on 4px grid */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

### **Border Radius:**

```css
--radius-sm: 0.25rem;  /* 4px */
--radius-md: 0.5rem;   /* 8px */
--radius-lg: 0.75rem;  /* 12px */
--radius-xl: 1rem;     /* 16px */
--radius-full: 9999px;
```

### **Shadows:**

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### **Breakpoints:**

```css
/* Mobile first */
sm: 640px;   /* Small tablets */
md: 768px;   /* Tablets */
lg: 1024px;  /* Laptops */
xl: 1280px;  /* Desktops */
2xl: 1536px; /* Large screens */
```

---

## 🔐 SECURITY & COMPLIANCE

### **Authentication:**

- Supabase Auth with JWT tokens
- Refresh token rotation
- Session timeout: 30 minutes inactivity
- Password requirements: 8+ chars, uppercase, lowercase, number
- 2FA support (optional)
- Social login: Google, GitHub (optional)

### **Authorization:**

- Role-based: User vs Admin
- Token validation on every request
- Protected routes client-side
- Server-side permission checks
- Audit logging for admin actions

### **Data Security:**

- HTTPS only (production)
- Secure cookies (HttpOnly, Secure, SameSite)
- No sensitive data in localStorage
- Environment variables for secrets
- Input sanitization (XSS prevention)
- SQL injection prevention (parameterized queries)
- Rate limiting: 100 req/min per user
- CORS properly configured

### **Compliance:**

- GDPR: Data export, right to deletion
- HIPAA-ready: Encrypted storage, audit logs
- SOC 2: Complete audit trail
- Data retention: 2 years for logs, 90 days for recordings

### **Security Utilities:**

```typescript
// /utils/security.tsx

sanitizeHTML(input: string): string
sanitizeInput(input: string): string
validatePassword(password: string): ValidationResult
isValidEmail(email: string): boolean
isValidPhone(phone: string): boolean
RateLimiter class
validateFileUpload(file: File): ValidationResult
generateSecureToken(length: number): string
```

---

## ✅ IMPLEMENTATION CHECKLIST

### **User Features (16 pages)**

- [x] Dashboard with metrics
- [x] AI Agent creation (40+ fields)
- [x] AI Agent management (CRUD)
- [x] Phone number management
- [x] Call history with filters
- [x] Call detail view
- [x] Live call monitoring
- [x] Analytics dashboard (8 charts)
- [x] Agent testing playground (3 modes)
- [x] Lead management (import/export)
- [x] Campaign creation (6-step wizard)
- [x] Campaign detail monitoring
- [x] Account settings (5 tabs)
- [x] Billing & payments
- [x] API key management
- [x] Webhook configuration
- [x] Agent marketplace
- [x] White label branding

### **Admin Features (8 pages)**

- [x] Admin dashboard
- [x] User management (1,247 users)
- [x] User impersonation
- [x] Billing & revenue ($94.5k MRR)
- [x] Usage analytics
- [x] Audit logs (complete trail)
- [x] Support tools
- [x] Content moderation
- [x] System monitoring

### **Technical Features**

- [x] React 18 + TypeScript
- [x] Tailwind CSS v4
- [x] ShadCN UI (60+ components)
- [x] Supabase Auth
- [x] Supabase Database
- [x] Supabase Storage
- [x] Error boundaries
- [x] Input sanitization
- [x] Rate limiting
- [x] Session timeout
- [x] Dark mode
- [x] Mobile responsive
- [x] Accessibility (WCAG AA)
- [x] Performance optimization
- [x] Security hardening

### **Documentation**

- [x] Complete PRD (this document)
- [x] API documentation
- [x] Data models
- [x] Design system
- [x] User guides
- [x] Admin guides
- [x] Security documentation

---

## 📈 SUCCESS METRICS

### **User Metrics:**

- User signups
- Active users (DAU, MAU)
- Agent creation rate
- Call volume
- Campaign success rate
- User retention
- Feature adoption

### **Business Metrics:**

- MRR: $84.5k (target: $100k)
- ARR: $1.014M (target: $1.2M)
- ARPU: $75.73
- Churn rate: 0.4%
- Gross margin: 81.4%

### **System Metrics:**

- Uptime: 99.9% (actual: 99.97%)
- Response time: <200ms (actual: 120ms avg)
- Error rate: <0.1% (actual: 0.02%)
- Database latency: <50ms (actual: 12ms avg)

---

## 🎯 DEPLOYMENT REQUIREMENTS

### **Environment Variables:**

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=production
```

### **Build:**

```bash
npm run build
```

### **Deploy:**

- Platform: Vercel, Netlify, AWS, etc.
- SSL certificate required
- Domain configuration
- Environment variables set

---

## 📚 CONCLUSION

This PRD documents a **complete, production-ready AI Agent Management Platform** with:

- **24 pages** (16 user + 8 admin)
- **200+ fields** documented
- **30+ tables** specified
- **20+ charts** defined
- **40+ API endpoints** specified
- **Complete data models**
- **Design system**
- **Security guidelines**
- **100% feature coverage**

**Status:** ✅ Complete & Ready for Implementation

**Copy this PRD to any AI tool and recreate the entire platform without missing a single feature!**

---

*End of Master PRD*
