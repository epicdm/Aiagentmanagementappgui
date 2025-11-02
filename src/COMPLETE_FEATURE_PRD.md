# 🎯 AI Agent Management Platform - Complete Product Requirements Document (PRD)

## 📋 Executive Summary

A comprehensive AI Agent Management Platform similar to Retell AI, Vapi, and ElevenLabs, featuring full AI agent lifecycle management, campaign orchestration, lead tracking, real-time call monitoring, analytics, and an enterprise admin panel. Built with React, TypeScript, Tailwind CSS, and Supabase.

---

## 🏗️ SYSTEM ARCHITECTURE

### **Technical Stack**
- **Frontend:** React 18, TypeScript, Tailwind CSS v4
- **UI Components:** ShadCN UI library (60+ components)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Authentication:** Supabase Auth (JWT tokens)
- **Database:** Supabase PostgreSQL + KV Store
- **Backend:** Supabase Edge Functions (Hono)
- **State Management:** React Hooks (useState, useEffect, useContext)
- **Theme:** Dark mode support with ThemeProvider
- **Notifications:** Sonner (toast notifications)

### **Application Structure**
- **User Application:** 16 pages (main product)
- **Admin Panel:** 8 pages (super admin functionality)
- **Navigation:** Collapsible sidebar with organized sections
- **Responsive:** Mobile-first design (375px to 2560px)

---

## 📱 USER APPLICATION (16 PAGES)

---

## 1. 🏠 **DASHBOARD PAGE**

### **Purpose**
Main landing page after login showing overview metrics and quick actions.

### **Features**

#### **Key Metrics Cards (4 cards)**
1. **Total Agents**
   - Count: Display number (e.g., "12")
   - Icon: Bot icon
   - Color: Blue theme
   - Change indicator: "+2 this month" with up arrow

2. **Total Calls**
   - Count: Display number (e.g., "1,234")
   - Icon: Phone icon
   - Color: Green theme
   - Change indicator: "+15% this week" with trend

3. **Minutes Used**
   - Count: Display minutes (e.g., "3,456")
   - Icon: Clock icon
   - Color: Purple theme
   - Usage bar: Visual progress indicator

4. **Revenue**
   - Amount: Display currency (e.g., "$12,345")
   - Icon: Dollar icon
   - Color: Green theme
   - Change indicator: "+8.5% vs last month"

#### **Quick Actions Section**
Row of action buttons:
1. **Create Agent** - Opens create agent dialog
2. **Start Call** - Navigate to testing page
3. **View Analytics** - Navigate to analytics page
4. **Buy Number** - Navigate to phone numbers page

#### **Activity Feed**
- **Title:** "Recent Activity"
- **List items** (5-10 recent activities):
  - Activity type icon (agent created, call made, etc.)
  - Activity description
  - Timestamp (e.g., "2 minutes ago")
  - User/agent involved
- **Activities tracked:**
  - Agent created
  - Agent updated
  - Call completed
  - Campaign started
  - Lead added
  - Phone number purchased
  - Settings changed

#### **Performance Charts (2 charts)**

1. **Call Volume Chart (Line Chart)**
   - X-axis: Last 7 days
   - Y-axis: Number of calls
   - Data points: Daily call counts
   - Hover tooltip: Show exact numbers
   - Color: Blue gradient

2. **Success Rate Chart (Bar Chart)**
   - X-axis: Agent names
   - Y-axis: Success percentage
   - Show top 5 agents
   - Color: Green for high (>80%), Yellow for medium (50-80%), Red for low (<50%)

#### **System Status Indicators**
- API Status: Operational/Degraded/Down (green/yellow/red dot)
- Voice Service: Status indicator
- Last Updated: Timestamp

---

## 2. 🤖 **AGENTS PAGE**

### **Purpose**
Manage all AI agents with full CRUD operations.

### **Header Section**
- **Title:** "AI Agents"
- **Total Count:** "(12 agents)"
- **Create Agent Button:** Primary button (top right)
- **Search Bar:** Search by agent name
- **Filter Dropdown:** Filter by status (All, Active, Inactive, Draft)
- **Sort Options:** Name (A-Z), Created Date, Last Modified

### **Agent Cards Grid**
Layout: Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)

#### **Agent Card Components**

**Card Layout:**
```
┌─────────────────────────────┐
│  [Icon] Agent Name          │
│  Status Badge     ⋮ Menu    │
├─────────���───────────────────┤
│  Type: Voice Agent          │
│  Model: GPT-4               │
│  Voice: Rachel (ElevenLabs) │
│  Created: Jan 15, 2024      │
├─────────────────────────────┤
│  📊 Stats Section           │
│  • Calls: 234               │
│  • Success: 87%             │
│  • Avg Duration: 3m 45s     │
├─────────────────────────────┤
│  [Test] [Edit] [View Details]│
└─────────────────────────────┘
```

**Card Fields:**
1. **Agent Icon:** Bot icon with color based on status
2. **Agent Name:** Display name (editable)
3. **Status Badge:** 
   - Active (green)
   - Inactive (gray)
   - Draft (yellow)
4. **Actions Menu (⋮):**
   - Edit Agent
   - Test Agent
   - View Details
   - Duplicate Agent
   - Deactivate/Activate
   - Delete Agent (with confirmation)

5. **Agent Properties:**
   - Type: Voice/Chat/Hybrid
   - AI Model: GPT-4, GPT-3.5, Claude 3, Claude 2, Gemini
   - Voice Provider: ElevenLabs, OpenAI TTS, Azure TTS
   - Voice Name: Selected voice
   - Language: English, Spanish, French, etc.
   - Created Date: Timestamp

6. **Statistics:**
   - Total Calls Made
   - Success Rate (%)
   - Average Call Duration
   - Total Minutes Used
   - Last Active: Timestamp

7. **Action Buttons:**
   - Test: Opens testing playground
   - Edit: Opens edit dialog
   - View Details: Opens detail dialog

### **Empty State**
When no agents exist:
- Icon: Large bot icon
- Title: "No agents yet"
- Description: "Create your first AI agent to get started"
- CTA Button: "Create Agent"

---

## 3. 📝 **CREATE/EDIT AGENT DIALOG**

### **Purpose**
Multi-step form for creating or editing AI agents with comprehensive configuration.

### **Dialog Structure**
- Modal dialog (large size, 800px width)
- Tabs/Steps for organization
- Save & Cancel buttons
- Real-time validation
- Preview section (optional)

### **Form Sections**

#### **Section 1: Basic Information**

**Fields:**
1. **Agent Name*** (required)
   - Input: Text field
   - Max length: 50 characters
   - Validation: Required, no special chars
   - Placeholder: "e.g., Customer Support Agent"

2. **Description**
   - Input: Textarea
   - Max length: 500 characters
   - Placeholder: "Describe what this agent does..."

3. **Agent Type*** (required)
   - Select dropdown
   - Options:
     - Voice Agent (phone calls)
     - Chat Agent (text-based)
     - Hybrid (both voice and text)

4. **Language*** (required)
   - Select dropdown
   - Options: English (US), English (UK), Spanish, French, German, Italian, Portuguese, Japanese, Chinese
   - Default: English (US)

5. **Status**
   - Toggle switch
   - Options: Active / Inactive
   - Default: Inactive (draft mode)

#### **Section 2: AI Model Configuration**

**Fields:**
1. **AI Model*** (required)
   - Select dropdown
   - Options with pricing:
     - GPT-4 Turbo ($0.01/1K tokens)
     - GPT-4 ($0.03/1K tokens)
     - GPT-3.5 Turbo ($0.002/1K tokens)
     - Claude 3 Opus ($0.015/1K tokens)
     - Claude 3 Sonnet ($0.003/1K tokens)
     - Claude 2 ($0.008/1K tokens)
     - Gemini Pro ($0.0005/1K tokens)
   - Show pricing info tooltip

2. **Temperature**
   - Slider: 0.0 to 2.0
   - Step: 0.1
   - Default: 0.7
   - Label shows current value
   - Tooltip: "Controls randomness. Lower = focused, Higher = creative"

3. **Max Tokens**
   - Number input
   - Range: 100 - 8000
   - Default: 2000
   - Tooltip: "Maximum response length"

4. **System Prompt*** (required)
   - Textarea (large)
   - Min length: 50 characters
   - Max length: 5000 characters
   - Placeholder: "You are a helpful AI assistant..."
   - Character counter
   - Template dropdown:
     - Customer Support Template
     - Sales Agent Template
     - Appointment Booking Template
     - Survey Conductor Template
     - Lead Qualifier Template
     - Custom

5. **Context/Knowledge Base**
   - Textarea
   - Max length: 10,000 characters
   - Placeholder: "Additional context or knowledge..."
   - Optional: Upload document (.txt, .pdf, .docx)

#### **Section 3: Voice Configuration**
(Only shown if Agent Type = Voice or Hybrid)

**Fields:**
1. **Voice Provider*** (required)
   - Radio buttons or select
   - Options:
     - ElevenLabs (premium, most natural)
     - OpenAI TTS (good quality, fast)
     - Azure TTS (multilingual)
     - Google TTS (reliable)

2. **Voice Selection*** (required)
   - Dropdown (populated based on provider)
   - ElevenLabs voices:
     - Rachel (Calm, Female)
     - Domi (Strong, Male)
     - Bella (Soft, Female)
     - Antoni (Neutral, Male)
     - Elli (Young, Female)
     - Josh (Professional, Male)
     - Arnold (Deep, Male)
     - Adam (Narrative, Male)
     - Sam (Energetic, Male)
   - Show voice preview button (play 5s sample)

3. **Voice Speed**
   - Slider: 0.5x to 2.0x
   - Default: 1.0x
   - Step: 0.1

4. **Voice Pitch**
   - Slider: -20 to +20 semitones
   - Default: 0
   - Step: 1

5. **Stability** (ElevenLabs only)
   - Slider: 0.0 to 1.0
   - Default: 0.5
   - Tooltip: "Lower = more expressive, Higher = more consistent"

6. **Similarity Boost** (ElevenLabs only)
   - Slider: 0.0 to 1.0
   - Default: 0.75

#### **Section 4: Behavior Settings**

**Fields:**
1. **First Message**
   - Textarea
   - Max length: 500 characters
   - Placeholder: "Hello! How can I assist you today?"
   - This is what the agent says when call starts

2. **End Call Phrases**
   - Multi-input field (add/remove)
   - Default phrases: "goodbye", "bye", "thank you goodbye"
   - Agent ends call when user says these

3. **Interrupt Behavior**
   - Dropdown:
     - Allow interruptions (user can interrupt agent)
     - Prevent interruptions (agent completes response)
     - Smart mode (context-aware)

4. **Silence Timeout**
   - Number input
   - Range: 3-30 seconds
   - Default: 5 seconds
   - Tooltip: "How long to wait before prompting user"

5. **Max Call Duration**
   - Number input
   - Range: 1-60 minutes
   - Default: 30 minutes

6. **Background Sound**
   - Toggle switch
   - Option: Enable background noise (office, cafe, quiet)

#### **Section 5: Advanced Settings**

**Fields:**
1. **Transcription**
   - Toggle: Enable/Disable
   - Default: Enabled

2. **Record Calls**
   - Toggle: Enable/Disable
   - Default: Enabled
   - Storage info: "Recordings stored for 90 days"

3. **Enable Voicemail Detection**
   - Toggle: Enable/Disable
   - Action dropdown: Leave message / Hang up / Mark for callback

4. **Transfer Settings**
   - Toggle: Enable call transfer
   - Transfer number input
   - Transfer phrases: Multi-input

5. **Custom Variables**
   - Key-value pairs (add/remove)
   - Example: customer_name, order_id, etc.
   - These can be used in prompts with {{variable_name}}

6. **Webhook URL**
   - URL input
   - Events to send:
     - Checkboxes: Call started, Call ended, User spoke, Agent spoke, Transcription ready
   - Webhook secret: Auto-generated (show/hide)

7. **Tags**
   - Multi-select chips
   - Options: Customer Service, Sales, Support, Booking, Survey, Lead Gen, Follow-up
   - Custom tags: Allow user to add

### **Action Buttons**
- **Cancel:** Close dialog without saving
- **Save as Draft:** Save but keep inactive
- **Save & Activate:** Save and set status to active

### **Validation**
- Required fields marked with asterisk
- Real-time validation on blur
- Error messages below fields
- Disable save button if validation fails
- Show success toast on save

---

## 4. 🔍 **AGENT DETAIL DIALOG**

### **Purpose**
View comprehensive details about a specific agent.

### **Dialog Structure**
- Large modal (900px width)
- Tabbed interface
- Action buttons (Edit, Test, Duplicate, Delete)

### **Tab 1: Overview**

**Content:**
- Agent name and status
- Created date and last modified
- Description
- All configuration fields (read-only display)
- Quick stats (calls, success rate, minutes)

### **Tab 2: Configuration**

**Content:**
- AI Model settings
- Voice settings
- Behavior settings
- Advanced settings
- Edit button to jump to edit mode

### **Tab 3: Analytics**

**Content:**
- Total calls made
- Success rate chart (last 30 days)
- Average call duration trend
- Most common user intents
- Peak usage times (heatmap)
- Cost analysis

### **Tab 4: Call History**

**Content:**
- Recent calls table (last 20 calls)
- Columns: Date, Duration, Status, Cost
- Click to view call detail
- Filter by date range

### **Tab 5: Performance**

**Content:**
- Response time metrics
- Error rate
- User satisfaction (if feedback enabled)
- Common failure reasons
- Recommendations for improvement

---

## 5. ☎️ **PHONE NUMBERS PAGE**

### **Purpose**
Manage phone numbers for agents to make/receive calls.

### **Header Section**
- Title: "Phone Numbers"
- Count: "(5 numbers)"
- **Purchase Number Button** (primary, top right)
- Search bar
- Filter by status (Active, Available, Reserved)

### **Phone Numbers Table**

**Columns:**
1. **Phone Number**
   - Format: +1 (555) 123-4567
   - Country flag icon
   - Copy to clipboard button

2. **Type**
   - Local / Toll-free / Mobile

3. **Location**
   - City, State, Country

4. **Assigned Agent**
   - Agent name with avatar
   - Dropdown to reassign
   - "Unassigned" if no agent

5. **Status**
   - Badge: Active (green), Available (gray), Reserved (yellow)

6. **Monthly Cost**
   - Display: $1.50/month or $3.00/month

7. **Actions**
   - Edit button
   - Release button (with confirmation)
   - Settings (⚙️) dropdown:
     - Configure forwarding
     - Set voicemail
     - View usage
     - Release number

### **Purchase Number Dialog**

**Steps:**

**Step 1: Select Country**
- Dropdown: United States, Canada, UK, Australia, etc.
- Show available number count per country

**Step 2: Select Type**
- Radio buttons:
  - Local (shows specific cities)
  - Toll-free
  - Mobile

**Step 3: Choose Area Code** (if local)
- Dropdown or searchable list
- Show popular area codes
- Search by city name

**Step 4: Select Number**
- List of available numbers (10-20 options)
- Show pricing
- Filters: Contains digits, Easy to remember
- Select radio button

**Step 5: Assign Agent**
- Dropdown: Select agent or leave unassigned
- Configure settings:
  - Enable call recording
  - Set voicemail
  - Forward missed calls

**Step 6: Confirm**
- Review selection
- Show one-time cost + monthly cost
- Confirm and purchase

### **Number Configuration Dialog**

**Settings:**
1. **Call Forwarding**
   - Toggle enable/disable
   - Forward to number: input
   - Forward after: X rings

2. **Voicemail**
   - Toggle enable/disable
   - Voicemail greeting: Upload or text-to-speech
   - Email notifications: Toggle

3. **SMS** (if supported)
   - Enable SMS receiving
   - Webhook for incoming SMS

4. **Call Recording**
   - Toggle enable/disable
   - Storage duration: 30/60/90 days

---

## 6. 📞 **CALLS PAGE**

### **Purpose**
View all call history with filtering and detailed information.

### **Header Section**
- Title: "Call History"
- Total count: "(1,234 calls)"
- Date range picker (default: Last 30 days)
- Export button (CSV/Excel)

### **Filters & Search**

**Filter Bar:**
1. **Search:** By phone number, agent name, or transcript keywords
2. **Status Filter:** All, Completed, Failed, Busy, No Answer, Voicemail
3. **Agent Filter:** Multi-select dropdown (all agents)
4. **Date Range:** Custom date picker
5. **Duration Filter:** <1 min, 1-5 min, 5-15 min, >15 min
6. **Sort:** Newest first, Oldest first, Longest duration, Shortest duration

### **Calls Table**

**Columns:**
1. **Date & Time**
   - Format: Jan 15, 2024 10:30 AM
   - Timezone indicator
   - Sort by this column

2. **Direction**
   - Icon: Outgoing (↗) or Incoming (↙)
   - Badge: Outbound (blue), Inbound (green)

3. **Phone Number**
   - Format: +1 (555) 123-4567
   - Click to copy
   - Show contact name if in leads

4. **Agent**
   - Agent name with avatar
   - Agent icon with color

5. **Duration**
   - Format: 3m 45s
   - Color code: <1min (yellow), >10min (green)

6. **Status**
   - Badge with color:
     - Completed (green)
     - Failed (red)
     - Busy (yellow)
     - No Answer (gray)
     - Voicemail (blue)

7. **Cost**
   - Format: $0.25
   - Tooltip: Breakdown (AI cost, voice cost, phone cost)

8. **Recording**
   - Play button (▶) if available
   - Disabled if not recorded
   - Click to play inline or download

9. **Transcript**
   - View button if available
   - Shows first 50 chars on hover

10. **Actions**
    - View Details button
    - Opens call detail dialog/page

### **Table Features**
- Pagination: 25/50/100 rows per page
- Total results shown
- Bulk selection: Checkbox for bulk actions
- Bulk actions: Export selected, Delete selected (with confirmation)

### **Summary Cards** (above table)
Row of 4 metric cards:
1. **Total Calls:** Count
2. **Total Duration:** Hours and minutes
3. **Total Cost:** Dollar amount
4. **Success Rate:** Percentage

---

## 7. 📋 **CALL DETAIL PAGE**

### **Purpose**
Detailed view of a single call with full transcript and analytics.

### **Header Section**
- Back button (← Back to Calls)
- Call ID: #12345
- Status badge
- Action buttons: Download Recording, Export Transcript, Share

### **Call Information Card**

**Details:**
1. **Call Metadata**
   - Date & Time: Jan 15, 2024 10:30 AM EST
   - Direction: Outbound/Inbound
   - Duration: 3m 45s
   - Phone Number: +1 (555) 123-4567
   - Contact Name: (if in leads)

2. **Agent Information**
   - Agent Name: Customer Support Agent
   - Agent Type: Voice
   - AI Model: GPT-4
   - Voice: Rachel (ElevenLabs)

3. **Call Metrics**
   - Response Time: Average 1.2s
   - User Interruptions: 3
   - Agent Interruptions: 1
   - Silence Duration: 15s total
   - Sentiment: Positive (😊) / Neutral (😐) / Negative (😞)

4. **Costs Breakdown**
   - AI Model Cost: $0.15
   - Voice Synthesis Cost: $0.08
   - Phone Cost: $0.02
   - Total: $0.25

### **Call Recording Player**

**Features:**
- Audio player controls
- Waveform visualization
- Playback speed: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
- Timeline with speaker markers
- Download button
- Share button

### **Transcript Section**

**Layout:**
```
┌─────────────────────────────────────┐
│ [Agent] 00:00                       │
│ Hello! How can I assist you today?  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [User] 00:05                        │
│ I need help with my account.        │
└─────────────────────────────────────┘
```

**Features:**
- Color-coded: Agent (blue), User (green)
- Timestamps for each message
- Search within transcript
- Highlight keywords
- Copy transcript button
- Download as PDF/TXT
- Sentiment indicators per message
- Confidence scores (if available)

### **Analysis Section**

**Tabs:**

**Tab 1: Summary**
- Auto-generated summary (AI)
- Key points discussed
- Action items identified
- Call outcome/resolution

**Tab 2: Topics**
- Topics identified: List of topics with confidence %
- Example: Account Issues (95%), Billing Question (78%)

**Tab 3: Sentiment Timeline**
- Line chart showing sentiment over time
- X-axis: Time
- Y-axis: Sentiment score (-1 to 1)

**Tab 4: Insights**
- Call quality score: 8.5/10
- Agent performance: Helpful, Responsive
- Areas for improvement: Suggestions
- Similar calls: Links to related calls

---

## 8. 📡 **LIVE CALLS PAGE**

### **Purpose**
Real-time monitoring of active calls with live transcription.

### **Header Section**
- Title: "Live Calls"
- Active calls count: "(3 active)"
- Auto-refresh toggle (on by default, every 2 seconds)
- Filter by agent

### **Active Calls Grid**

**Layout:** Card grid (2 cols desktop, 1 col mobile)

**Live Call Card:**
```
┌─────────────────────────────────────┐
│ 🔴 LIVE                    ⋮        │
│ Agent: Customer Support Agent       │
│ Phone: +1 (555) 123-4567           │
│ Duration: 2m 15s                    │
├─────────────────────────────────────┤
│ 📊 Real-time Metrics                │
│ • Status: Speaking                  │
│ • Sentiment: 😊 Positive            │
│ • Response Time: 1.1s avg           │
├─────────────────────────────────────┤
│ 💬 Live Transcript (last 3 msgs)    │
│ [Agent] How can I help?            │
│ [User] I need support...           │
│ [Agent] I'd be happy to...         │
├─────────────────────────────────────┤
│ [View Full] [Monitor] [Intervene]   │
└─────────────────────────────────────┘
```

**Card Features:**
1. **Live Indicator:** Pulsing red dot
2. **Call Info:** Agent, phone, duration (live counting)
3. **Real-time Metrics:**
   - Current status: Speaking, Listening, Thinking
   - Live sentiment
   - Response time average
   - User interruptions count

4. **Live Transcript:**
   - Shows last 3-5 messages
   - Auto-scrolls as new messages arrive
   - Color-coded speakers

5. **Action Buttons:**
   - View Full: Opens full live monitoring view
   - Monitor: Start monitoring (listen-only)
   - Intervene: Join call (whisper mode or conference)

### **Full Live Monitoring View**

**Dialog/Page Features:**
- Large dialog or full-page view
- Split layout: Call info (left) + Live transcript (right)
- Audio stream (listen to call)
- Live transcription with auto-scroll
- Real-time sentiment graph
- Action buttons:
  - End call (emergency)
  - Send note to agent (if supported)
  - Bookmark moment
  - Take over call (admin only)

### **Call Queue** (if applicable)
- Show waiting calls
- Queue position
- Expected wait time
- Assign to agent button

---

## 9. 📊 **ANALYTICS PAGE**

### **Purpose**
Comprehensive analytics and insights dashboard.

### **Header Section**
- Title: "Analytics"
- Date range picker (Today, 7 days, 30 days, 90 days, Custom)
- Export report button (PDF/Excel)

### **Overview Metrics** (4 cards)

1. **Total Calls**
   - Count with trend (↑ +15%)
   - Comparison to previous period

2. **Total Minutes**
   - Duration with trend
   - Cost per minute shown

3. **Success Rate**
   - Percentage with trend
   - Visual indicator (green >80%, yellow 60-80%, red <60%)

4. **Average Duration**
   - Time with trend
   - Optimal range indicator

### **Charts Section**

#### **Chart 1: Call Volume Over Time**
- Type: Line or Area chart
- X-axis: Time (hourly/daily/weekly based on range)
- Y-axis: Number of calls
- Multiple lines: Total, Successful, Failed
- Hover tooltip: Exact numbers
- Legend: Toggle lines on/off

#### **Chart 2: Call Status Distribution**
- Type: Donut/Pie chart
- Segments:
  - Completed (green)
  - Failed (red)
  - No Answer (gray)
  - Busy (yellow)
  - Voicemail (blue)
- Show counts and percentages
- Click to filter

#### **Chart 3: Calls by Agent**
- Type: Bar chart
- X-axis: Agent names
- Y-axis: Call count
- Color by success rate
- Sort: Most calls to least

#### **Chart 4: Revenue Trend**
- Type: Line chart with area fill
- X-axis: Time
- Y-axis: Dollar amount
- Show cumulative and per-period
- Hover: Daily breakdown

#### **Chart 5: Average Call Duration**
- Type: Line chart
- X-axis: Time
- Y-axis: Duration (minutes)
- Show optimal range band
- Trend line

#### **Chart 6: Peak Hours Heatmap**
- Type: Heatmap
- X-axis: Hours (0-23)
- Y-axis: Days of week
- Color intensity: Call volume
- Tooltip: Exact count

#### **Chart 7: Geographic Distribution**
- Type: Map or bar chart
- Show calls by country/state
- Top 5 locations table
- Click to drill down

#### **Chart 8: Cost Analysis**
- Type: Stacked bar chart
- X-axis: Time
- Y-axis: Cost
- Stacks: AI cost, Voice cost, Phone cost
- Total line overlay

### **Performance Tables**

#### **Table 1: Top Performing Agents**
Columns:
- Agent Name
- Total Calls
- Success Rate
- Avg Duration
- Total Cost
- Revenue Generated

#### **Table 2: Call Outcomes**
Columns:
- Outcome Type
- Count
- Percentage
- Trend

#### **Table 3: Common Issues**
- Extracted from failed calls
- Issue description
- Frequency
- Suggested resolution

### **Export Options**
- PDF Report: Executive summary with key charts
- Excel: Raw data with all metrics
- CSV: Transaction-level data

---

## 10. 🧪 **TESTING PAGE (Agent Playground)**

### **Purpose**
Test AI agents before deployment with interactive playground.

### **Layout:** Two-panel design

### **Left Panel: Agent Selection & Config**

**Agent Selection**
- Dropdown: Select agent to test
- Show agent status (Active/Draft)
- Load agent configuration button

**Test Configuration**
1. **Test Phone Number**
   - Input: Enter phone number to call
   - OR select from leads dropdown
   - Validate format

2. **Override Settings** (optional)
   - Toggle: Override agent settings
   - Fields (if enabled):
     - Temperature
     - Max tokens
     - Voice speed
     - First message

3. **Test Variables** (if agent uses variables)
   - Key-value inputs
   - Example: customer_name = "John"

4. **Test Type**
   - Radio buttons:
     - Voice Call (actual call)
     - Text Simulation (chat interface)
     - Voice Preview (TTS only)

**Action Buttons**
- **Start Test:** Primary button
- **Reset:** Clear configuration

### **Right Panel: Test Interface**

#### **Mode 1: Voice Call Test**

**Pre-call:**
- Instructions: "Click Start Test to make a call"
- Cost estimate: "Estimated cost: $0.15"

**During call:**
- Status: "Calling..." → "Connected"
- Duration timer (live)
- Audio controls: Mute, Volume
- End call button (red)
- Live metrics:
  - Response time
  - Current sentiment
  - Messages exchanged

**Post-call:**
- Call summary card
- Duration and cost
- Transcript (full)
- Recording player
- Analysis:
  - Overall score
  - Response quality
  - Voice quality
  - Suggestions for improvement

#### **Mode 2: Text Simulation**

**Chat Interface:**
```
┌─────────────────────────────────────┐
│ [Agent Avatar] Agent Name           │
├─────────────────────────────────────┤
│                                     │
│  [Agent] Hello! How can I help?     │
│                                     │
│             [User] I need support   │
│                                     │
│  [Agent] I'd be happy to assist...  │
│                                     │
├───────────────────���─────────────────┤
│ [Type message...] [Send] [Clear]    │
└─────────────────────────────────────┘
```

**Features:**
- Chat bubbles (agent left, user right)
- Typing indicator when agent responds
- Timestamps
- Clear conversation button
- Export conversation
- Token count display
- Cost tracker (live)
- Response time per message

#### **Mode 3: Voice Preview**

**Interface:**
- Text input: "Enter text to hear agent's voice"
- Play button
- Audio player
- Voice settings (speed, pitch)
- Compare voices: Side-by-side buttons

### **Test History Section** (bottom)

**Recent Tests Table:**
- Date & Time
- Agent Name
- Test Type
- Duration
- Status (Pass/Fail)
- View Details button

---

## 11. 👥 **LEADS PAGE**

### **Purpose**
Manage contacts and leads for calling campaigns.

### **Header Section**
- Title: "Leads"
- Count: "(245 leads)"
- **Add Lead Button** (primary)
- **Import Leads Button** (secondary)
- **Export Button** (CSV/Excel)

### **Filters & Search**
1. **Search:** By name, phone, email, company
2. **Status Filter:** All, New, Contacted, Qualified, Not Interested, Converted
3. **Source Filter:** Manual, Import, Campaign, API
4. **Tags Filter:** Multi-select
5. **Sort:** Name (A-Z), Recent first, Last contacted

### **Leads Table**

**Columns:**
1. **Name**
   - Full name
   - Click to view/edit details

2. **Phone Number**
   - Format: +1 (555) 123-4567
   - Click to call button (phone icon)
   - Copy button

3. **Email**
   - Email address
   - Email icon (send email)
   - Copy button

4. **Company**
   - Company name (optional)

5. **Status**
   - Badge: New, Contacted, Qualified, Not Interested, Converted
   - Color-coded
   - Dropdown to change status

6. **Last Contacted**
   - Date: Jan 15, 2024
   - "Never" if not contacted

7. **Calls**
   - Count: Number of calls made
   - Click to view call history

8. **Tags**
   - Chips: Hot Lead, VIP, Follow-up
   - Add tag button

9. **Actions**
   - View/Edit button
   - Call button
   - Delete button (with confirmation)

### **Add/Edit Lead Dialog**

**Form Fields:**
1. **Personal Information**
   - First Name* (required)
   - Last Name* (required)
   - Phone Number* (required, with validation)
   - Email (optional)
   - Company (optional)
   - Job Title (optional)

2. **Lead Details**
   - Status: Dropdown
   - Source: Dropdown (Manual, Website, Referral, Campaign, Event, Other)
   - Assigned To: Select agent or campaign

3. **Tags**
   - Multi-select or create new

4. **Custom Fields**
   - Key-value pairs (add/remove)
   - Example: Industry, Budget, Timeline

5. **Notes**
   - Textarea
   - Max 2000 characters
   - Timestamps on notes

6. **Call Preferences**
   - Best time to call: Time picker
   - Timezone: Dropdown
   - Do Not Call: Checkbox

### **Import Leads Feature**

**Dialog Steps:**

**Step 1: Upload File**
- Drag & drop area or file picker
- Accepted formats: CSV, Excel (.xlsx)
- Template download link
- Max file size: 5 MB

**Step 2: Map Fields**
- Show CSV headers
- Map to system fields:
  - Name → First Name + Last Name
  - Phone → Phone Number
  - Email → Email
  - etc.
- Preview first 5 rows

**Step 3: Review & Import**
- Show total leads to import
- Validation errors (if any)
- Duplicate handling:
  - Skip duplicates
  - Update existing
  - Import as new
- Confirm and import

**Step 4: Import Summary**
- Successfully imported: X leads
- Skipped (duplicates): X leads
- Errors: X leads (with error log)
- View imported leads button

### **Bulk Actions**
- Select multiple leads (checkboxes)
- Actions dropdown:
  - Add to campaign
  - Change status
  - Add tags
  - Delete selected
  - Export selected

---

## 12. 📣 **CAMPAIGNS PAGE**

### **Purpose**
Create and manage outbound calling campaigns for bulk lead engagement.

### **Header Section**
- Title: "Campaigns"
- Count: "(8 campaigns)"
- **Create Campaign Button** (primary)
- Filter by status: All, Active, Paused, Completed, Scheduled

### **Campaigns Grid/List**

**Campaign Card:**
```
┌─────────────────────────────────────┐
│ 📣 Campaign Name         [⋮ Menu]   │
│ Status Badge                        │
├─────────────────────────────────────┤
│ Agent: Sales Agent                  │
│ Leads: 150 total                    │
│ Progress: [▓▓▓▓▓░░░] 65%            │
├─────────────────────────────────────┤
│ Stats:                              │
│ • Called: 98/150                    │
│ • Connected: 76 (77%)               │
│ • Success: 45 (59%)                 │
│ • Duration: 5h 23m                  │
│ • Cost: $127.50                     │
├─────────────────────────────────────┤
│ Schedule: Daily 9AM-5PM EST         │
│ Next call: Jan 15, 9:00 AM          │
├─────────────────────────────────────┤
│ [View] [Edit] [Pause/Resume] [Stop] │
└─────────────────────────────────────┘
```

**Card Components:**
1. **Campaign Name & Status**
   - Name (editable)
   - Status badge:
     - Active (green, pulsing)
     - Paused (yellow)
     - Scheduled (blue)
     - Completed (gray)
     - Draft (gray outline)

2. **Campaign Details**
   - Agent assigned
   - Total leads count
   - Progress bar (visual %)

3. **Real-time Statistics**
   - Calls made / Total leads
   - Connection rate (%)
   - Success rate (%)
   - Total duration
   - Total cost

4. **Schedule Info**
   - Calling hours
   - Days active
   - Next scheduled call time
   - Timezone

5. **Action Buttons**
   - View Details: Opens detail page
   - Edit: Opens edit dialog
   - Pause/Resume: Toggle campaign
   - Stop: End campaign (confirmation)

### **Actions Menu (⋮):**
- View Details
- Edit Campaign
- Duplicate Campaign
- View Leads
- Download Report
- Pause/Resume
- Stop Campaign
- Delete Campaign

---

## 13. 📋 **CAMPAIGN DETAIL PAGE**

### **Purpose**
Comprehensive view of a single campaign with real-time monitoring.

### **Header Section**
- Back button (← Back to Campaigns)
- Campaign Name (editable inline)
- Status badge (large)
- Action buttons: Edit, Pause/Resume, Stop, Export Report

### **Overview Section**

**Key Metrics Cards (5 cards):**
1. **Total Leads:** 150
2. **Calls Made:** 98/150 (65%)
3. **Connected:** 76 (77% connection rate)
4. **Successful:** 45 (59% success rate)
5. **Total Cost:** $127.50

### **Campaign Details Card**

**Information:**
1. **Basic Info**
   - Campaign Name
   - Description
   - Created Date
   - Created By
   - Status

2. **Configuration**
   - Agent: Name and link
   - Total Leads: Count with link to leads
   - Call Strategy: Sequential, Random, Priority-based
   - Max Attempts: 3 per lead
   - Retry Delay: 2 hours

3. **Schedule**
   - Start Date: Jan 15, 2024
   - End Date: Jan 30, 2024 (or Ongoing)
   - Calling Hours: 9:00 AM - 5:00 PM
   - Days: Mon-Fri
   - Timezone: EST
   - Calls per hour: 30 (rate limit)

4. **Settings**
   - Voicemail action: Leave message / Skip
   - No answer action: Retry / Skip
   - Busy action: Retry / Skip
   - Call recording: Enabled
   - Transcription: Enabled

### **Progress Section**

**Progress Chart:**
- Type: Stacked area chart
- X-axis: Time (days/hours)
- Y-axis: Number of calls
- Stacks: Successful, Connected but not qualified, No answer, Failed
- Shows trend over campaign duration

**Call Status Breakdown:**
- Donut chart showing:
  - Successful (green)
  - No Answer (gray)
  - Busy (yellow)
  - Failed (red)
  - Voicemail (blue)
  - Not Called (light gray)

### **Campaign Leads Table**

**Columns:**
1. **Lead Name**
   - Full name with avatar
   - Click to view lead detail

2. **Phone Number**
   - Formatted number
   - Call button

3. **Status**
   - Badge: Not Called, Calling, Connected, Completed, Failed, Skip
   - Real-time update during active campaign

4. **Attempts**
   - Count: 1/3
   - Shows number of call attempts

5. **Last Call**
   - Date & time of last attempt
   - "Never" if not called

6. **Call Duration**
   - Duration of successful call
   - "-" if not connected

7. **Outcome**
   - Qualified, Not Interested, Callback, Voicemail, No Answer, Failed

8. **Next Attempt**
   - Scheduled time for next call
   - "-" if no retry

9. **Actions**
   - View Call Details
   - Call Now (manual trigger)
   - Skip Lead
   - Mark as Done

**Table Features:**
- Real-time updates (polling every 5s)
- Filter by status
- Search by name/phone
- Sort by any column
- Export filtered results

### **Activity Timeline**

**Shows recent campaign events:**
- Campaign started
- Call attempted to [Lead Name]
- Call completed: Success/Failure
- Campaign paused by [User]
- Campaign resumed
- Lead added to campaign
- Agent changed
- Settings updated

**Timeline Format:**
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

### **Performance Insights**

**Metrics:**
1. **Best Performing Times**
   - Heatmap of success by hour
   - Recommendation for optimal calling times

2. **Avg Calls to Success**
   - Number: How many attempts until conversion
   - Improvement suggestions

3. **Cost Efficiency**
   - Cost per connected call
   - Cost per successful outcome
   - Comparison to benchmarks

4. **Agent Performance**
   - Response quality score
   - Average call duration
   - Success rate vs overall avg

### **Actions Panel** (right sidebar)

**Quick Actions:**
- ▶️ Resume Campaign / ⏸️ Pause Campaign
- 🔄 Add More Leads
- 📧 Email All Leads
- 📊 Export Full Report
- ⚙️ Edit Settings
- 🗑️ Delete Campaign

---

## 14. 🛠️ **CREATE/EDIT CAMPAIGN DIALOG**

### **Purpose**
Multi-step wizard to create or edit outbound campaigns.

### **Step 1: Basic Information**

**Fields:**
1. **Campaign Name*** (required)
   - Input: Text field
   - Max 100 characters
   - Placeholder: "e.g., Q1 Sales Outreach"

2. **Description**
   - Textarea
   - Max 500 characters
   - Placeholder: "Describe the goal of this campaign..."

3. **Campaign Type**
   - Radio buttons:
     - Outbound Calls (agent calls leads)
     - Inbound (leads call assigned number)
     - Mixed

4. **Select Agent*** (required)
   - Dropdown: List of active agents
   - Show agent type and model
   - Preview button to test agent

### **Step 2: Select Leads**

**Options:**

**Option A: Use Existing Leads**
- Multi-select list or table
- Filters: Status, Tags, Source
- Search by name/phone
- Select All / Clear All
- Show selected count

**Option B: Import New Leads**
- File upload (CSV/Excel)
- Field mapping
- Add to campaign immediately

**Option C: Use Lead Segment**
- Predefined filters
- Examples: "Hot Leads", "Uncontacted", "Follow-ups"

**Lead Summary:**
- Total leads selected: 150
- Preview first 5 leads
- Edit/remove leads

### **Step 3: Campaign Settings**

**Fields:**

1. **Call Strategy**
   - Dropdown:
     - Sequential (alphabetical order)
     - Random
     - Priority-based (sort by lead score)
     - Time-optimized (call at best time for each lead)

2. **Max Attempts per Lead**
   - Number: 1-5
   - Default: 3

3. **Retry Delay**
   - Dropdown: Immediately, 1 hour, 2 hours, 1 day, 2 days
   - Default: 2 hours

4. **Retry on Outcome**
   - Checkboxes:
     - ✅ No Answer (retry)
     - ✅ Busy (retry)
     - ✅ Voicemail (retry)
     - ❌ Failed (do not retry)
     - ❌ Connected (do not retry)

5. **Voicemail Action**
   - Radio:
     - Leave message (use agent's voicemail script)
     - Hang up and retry later
     - Mark as completed

6. **Call Rate Limiting**
   - Number: Max calls per hour
   - Range: 10-100
   - Default: 30
   - Info: "To avoid spam flags and maintain quality"

### **Step 4: Schedule**

**Fields:**

1. **Start Date & Time***
   - Date picker + time picker
   - Options: Start immediately / Schedule for later
   - Default: Immediate

2. **End Date** (optional)
   - Date picker
   - Or toggle: "Run until all leads contacted"

3. **Calling Hours***
   - Start time: 9:00 AM
   - End time: 5:00 PM
   - Info: "Calls only made during these hours"

4. **Active Days***
   - Checkboxes: Mon, Tue, Wed, Thu, Fri, Sat, Sun
   - Preset buttons: Weekdays, Weekends, All Days

5. **Timezone***
   - Dropdown: Select timezone
   - Auto-detect toggle
   - Info: "All times are in this timezone"

6. **Pause Periods** (optional)
   - Add date ranges to pause campaign
   - Example: Holidays, lunch hours

### **Step 5: Advanced Options**

**Fields:**

1. **Call Recording**
   - Toggle: Enable/Disable
   - Default: Enabled

2. **Transcription**
   - Toggle: Enable/Disable
   - Default: Enabled

3. **Real-time Notifications**
   - Checkboxes:
     - Campaign started
     - Campaign completed
     - High success rate (>70%)
     - Low success rate (<30%)
     - Errors/issues

4. **Webhook Integration**
   - Toggle: Send webhook events
   - Webhook URL: Input
   - Events to send:
     - Campaign started
     - Call completed
     - Lead qualified
     - Campaign completed

5. **Tags**
   - Multi-select: Add campaign tags
   - For organization and filtering

6. **Notes**
   - Textarea: Internal notes about campaign

### **Step 6: Review & Launch**

**Summary Page:**
- Campaign name
- Agent: Name
- Total leads: Count
- Schedule: Date range and hours
- Call strategy: Type
- Max attempts: Number
- Estimated duration: X days
- Estimated cost: $XXX (based on avg call duration)

**Final Actions:**
- **Save as Draft:** Save but don't start
- **Schedule Campaign:** Save and schedule for start date
- **Start Now:** Save and start immediately

---

## 15. ⚙️ **SETTINGS PAGE**

### **Purpose**
User account settings and preferences (NOT the collapsible settings menu - that's separate).

### **Tab Structure**

### **Tab 1: Account**

**Profile Section:**
1. **Avatar**
   - Current avatar image
   - Upload new: File picker or URL
   - Remove button

2. **Personal Information**
   - Full Name: Input
   - Email: Input (primary, verified badge)
   - Phone: Input
   - Company: Input
   - Job Title: Input

3. **Password**
   - Current password: Password input
   - New password: Password input
   - Confirm password: Password input
   - Password strength indicator
   - Requirements: 8+ chars, uppercase, lowercase, number

4. **Two-Factor Authentication**
   - Toggle: Enable/Disable
   - Setup wizard if enabled
   - Backup codes download

### **Tab 2: Notifications**

**Email Notifications:**
- Checkboxes:
  - ✅ Agent created/updated
  - ✅ Call completed
  - ✅ Campaign started/completed
  - ✅ Low balance alert
  - ✅ Failed payment
  - ❌ Weekly summary
  - ❌ Marketing emails

**In-App Notifications:**
- Checkboxes:
  - ✅ Real-time call alerts
  - ✅ System updates
  - ✅ New features

**SMS Notifications:**
- Toggle: Enable/Disable
- Phone number: Input
- Events: Select which events trigger SMS

### **Tab 3: Preferences**

**General:**
1. **Language**
   - Dropdown: English, Spanish, French, etc.

2. **Timezone**
   - Dropdown: Select timezone
   - Auto-detect toggle

3. **Date Format**
   - Radio: MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD

4. **Time Format**
   - Radio: 12-hour, 24-hour

5. **Currency**
   - Dropdown: USD, EUR, GBP, etc.

**Display:**
1. **Theme**
   - Radio: Light, Dark, System (auto)

2. **Sidebar**
   - Toggle: Collapsed by default
   - Toggle: Show icons only

3. **Dashboard**
   - Checkboxes: Which widgets to show
   - Drag-to-reorder (future)

### **Tab 4: Integrations**

**Connected Services:**
- List of integrations:
  - Zapier (Connected/Not connected)
  - Slack (Connect button)
  - HubSpot (Connect button)
  - Salesforce (Connect button)
  - Custom webhooks

**Each integration shows:**
- Logo
- Status: Connected (green) or Connect button
- Configure button if connected
- Disconnect button

### **Tab 5: Security**

**Active Sessions:**
- Table of logged-in sessions:
  - Device: Chrome on Windows
  - Location: New York, USA
  - IP: 192.168.1.1
  - Last Active: 5 minutes ago
  - Current session badge
  - Revoke button

**Logout All Devices:**
- Button to end all sessions except current

**Activity Log:**
- Recent security events:
  - Logged in from new device
  - Password changed
  - 2FA enabled
  - API key generated

**Data & Privacy:**
- Export all data: Button
- Delete account: Button (danger, confirmation required)

### **Save Changes**
- Floating save bar appears when changes made
- Save button (primary)
- Cancel button

---

## 16. 💳 **BILLING PAGE**
(Under Settings → Billing in collapsible menu)

### **Purpose**
Manage billing, payments, and view usage.

### **Current Balance Card**

**Display:**
- Large balance: $47.52
- Last updated: Timestamp
- **Top Up Button** (primary)
- Auto-reload toggle: Enable/Disable
  - If enabled: Reload when balance < $10
  - Reload amount: $50

### **Billing Overview Section**

**Current Billing Period:**
- Period: Jan 1 - Jan 31, 2024
- Days remaining: 15 days
- Current usage: $127.50
- Projected end-of-month: $255.00

**Usage Breakdown:**
- AI Model Costs: $85.20 (67%)
- Voice Synthesis: $32.15 (25%)
- Phone Costs: $10.15 (8%)

### **Payment Methods**

**Cards List:**
Each card shows:
- Card brand logo (Visa, Mastercard, Amex)
- Last 4 digits: •••• 4242
- Expiry: 12/25
- Default badge (if primary)
- Actions: Set as default, Edit, Remove

**Add Payment Method:**
- Button to add new card
- Opens payment dialog with:
  - Card number input
  - Expiry date
  - CVV
  - Billing address
  - Save as default checkbox

### **Top Up Dialog**

**Steps:**

**Step 1: Select Amount**
- Preset buttons: $25, $50, $100, $200
- Custom amount input
- Show bonus: "Add $100, get $5 bonus!"

**Step 2: Select Payment Method**
- Radio list of saved cards
- Add new card option

**Step 3: Confirm**
- Amount: $50.00
- Payment method: Visa ••4242
- Bonus: +$2.50
- Total to add: $52.50
- Confirm button

**Success:**
- Success message
- New balance shown
- Transaction ID
- Receipt sent to email

### **Transaction History**

**Table Columns:**
1. **Date**
   - Format: Jan 15, 2024 10:30 AM

2. **Type**
   - Badge: Top Up, Usage, Refund, Bonus

3. **Description**
   - Text: "Top up via Visa ••4242"
   - Or: "Call to +1 555-1234 (3m 45s)"

4. **Amount**
   - Positive (green): +$50.00
   - Negative (red): -$0.25

5. **Balance After**
   - Running balance: $47.52

6. **Status**
   - Badge: Completed, Pending, Failed

7. **Receipt**
   - Download button (PDF)

**Filters:**
- Date range picker
- Type filter: All, Top Up, Usage, Refund
- Export button (CSV/Excel)

### **Invoices Section**

**Table Columns:**
1. **Invoice #**
   - Format: INV-2024-001

2. **Date**
   - Jan 1, 2024

3. **Period**
   - Jan 1 - Jan 31, 2024

4. **Amount**
   - $127.50

5. **Status**
   - Badge: Paid, Pending, Overdue

6. **Actions**
   - View button (opens PDF)
   - Download button
   - Email button

### **Plan & Usage Limits** (if applicable)

**Current Plan:**
- Plan name: Pay-as-you-go / Starter / Pro / Enterprise
- Price: $0/month + usage or $X/month
- Upgrade button if not on highest plan

**Usage Limits:**
- Agents: 12/Unlimited
- Calls per month: 1,234/5,000
- Minutes per month: 3,456/10,000
- Phone numbers: 5/10

**Progress bars** for each limit

**Upgrade Plan:**
- Compare plans button
- Opens pricing table

---

## 17. 🔑 **API KEYS PAGE**
(Under Settings → API Keys in collapsible menu)

### **Purpose**
Manage API keys for programmatic access.

### **Header Section**
- Title: "API Keys"
- Description: "Use API keys to integrate with our platform programmatically"
- Documentation link
- **Create API Key Button** (primary)

### **API Keys Table**

**Columns:**
1. **Name**
   - Key name/label: "Production Key"
   - Editable inline

2. **Key**
   - Format: sk_live_abc123...xyz (masked)
   - Show/Hide toggle (eye icon)
   - Copy button
   - Shows full key only once on creation

3. **Created**
   - Date: Jan 15, 2024

4. **Last Used**
   - Date & time: "2 hours ago"
   - "Never" if not used

5. **Status**
   - Badge: Active (green), Revoked (red)
   - Toggle to disable

6. **Actions**
   - Edit name
   - Revoke key (with confirmation)
   - View usage stats

### **Create API Key Dialog**

**Fields:**
1. **Key Name*** (required)
   - Input: Text
   - Placeholder: "e.g., Production Key"
   - Helper: "Choose a descriptive name"

2. **Permissions** (optional, if RBAC)
   - Checkboxes:
     - Read agents
     - Write agents
     - Read calls
     - Write calls
     - etc.

3. **Expiration** (optional)
   - Dropdown: Never, 30 days, 90 days, 1 year, Custom
   - Date picker if custom

4. **IP Whitelist** (optional)
   - Multi-input: Add IP addresses
   - Wildcard support

**On Creation:**
- Show full API key ONCE
- Warning: "Save this key now. You won't see it again!"
- Copy button
- Download as text file button
- Email to me checkbox

### **API Documentation Link**
- Button: "View API Documentation"
- Opens docs with endpoints, examples, SDKs

### **Usage Statistics** (per key)
- Requests last 24 hours: Chart
- Total requests: Count
- Error rate: Percentage
- Most used endpoints: List

---

## 18. 🪝 **WEBHOOKS PAGE**
(Under Settings → Webhooks in collapsible menu)

### **Purpose**
Configure webhooks to receive real-time event notifications.

### **Header Section**
- Title: "Webhooks"
- Description: "Receive real-time HTTP callbacks when events occur"
- Documentation link
- **Add Webhook Button** (primary)

### **Webhooks Table**

**Columns:**
1. **URL**
   - Webhook endpoint URL
   - Truncated if long
   - Copy button
   - Edit inline

2. **Events**
   - Pills showing subscribed events
   - Example: "agent.created", "call.completed"
   - Count: "5 events"

3. **Status**
   - Badge: Active, Paused, Failing
   - Toggle to enable/disable

4. **Last Delivery**
   - Timestamp: "2 minutes ago"
   - Status: Success (✓) or Failed (✗)

5. **Success Rate**
   - Percentage: 98.5%
   - Color: Green >95%, Yellow 80-95%, Red <80%

6. **Actions**
   - Edit webhook
   - Test webhook (send test payload)
   - View logs
   - Delete webhook

### **Add/Edit Webhook Dialog**

**Fields:**
1. **Webhook URL*** (required)
   - Input: URL field
   - Validation: Must be HTTPS
   - Placeholder: "https://example.com/webhook"

2. **Events*** (required)
   - Checkboxes (organized by category):
   
   **Agent Events:**
   - ☐ agent.created
   - ☐ agent.updated
   - ☐ agent.deleted
   - ☐ agent.activated
   - ☐ agent.deactivated

   **Call Events:**
   - ☐ call.started
   - ☐ call.ringing
   - ☐ call.answered
   - ☐ call.completed
   - ☐ call.failed
   - ☐ call.recording.ready
   - ☐ call.transcription.ready

   **Campaign Events:**
   - ☐ campaign.started
   - ☐ campaign.paused
   - ☐ campaign.completed
   - ☐ campaign.lead.completed

   **System Events:**
   - ☐ balance.low
   - ☐ payment.succeeded
   - ☐ payment.failed

   **Select All / Clear All** buttons

3. **Secret Key**
   - Auto-generated secure token
   - Show/Hide toggle
   - Regenerate button
   - Info: "Use this to verify webhook signatures"

4. **Headers** (optional)
   - Key-value pairs (add/remove)
   - Example: Authorization, X-Custom-Header
   - Helpful for custom auth

5. **Retry Policy**
   - Toggle: Enable automatic retries
   - Max retries: Number (1-5)
   - Retry delay: Exponential backoff

6. **Status**
   - Toggle: Active / Paused

### **Test Webhook**
- Button: "Send Test Event"
- Select event type dropdown
- Shows sample payload
- Send button
- Shows response (status code, headers, body)

### **Webhook Logs** (per webhook)

**Table:**
1. **Timestamp**
   - Date & time of delivery attempt

2. **Event**
   - Event type: call.completed

3. **Status Code**
   - HTTP response: 200, 404, 500, etc.
   - Color: Green (2xx), Yellow (4xx), Red (5xx)

4. **Response Time**
   - Milliseconds: 125ms

5. **Attempt**
   - Which retry: 1/3

6. **Actions**
   - View payload
   - View response
   - Retry manually

**Filters:**
- Date range
- Event type
- Status code
- Success/Failed

**Export logs:** CSV/Excel

---

## 19. 🏪 **MARKETPLACE PAGE**

### **Purpose**
Browse and install pre-built AI agent templates created by the community or company.

### **Header Section**
- Title: "Agent Marketplace"
- Description: "Discover and install ready-to-use AI agent templates"
- Search bar: "Search templates..."
- **Submit Template Button** (if user wants to contribute)

### **Filters Sidebar**

**Categories:**
- Checkboxes:
  - ☐ Customer Support (45)
  - ☐ Sales (32)
  - ☐ Appointment Booking (28)
  - ☐ Lead Qualification (19)
  - ☐ Survey & Feedback (15)
  - ☐ Technical Support (12)
  - ☐ E-commerce (8)
  - ☐ Healthcare (6)
  - ☐ Real Estate (5)
  - ☐ Other (10)

**Language:**
- Checkboxes: English, Spanish, French, German, etc.

**Voice Type:**
- Checkboxes: Male, Female, Neutral

**Pricing:**
- Radio: Free, Paid, All

**Sort:**
- Dropdown: Popular, Newest, Top Rated, Name (A-Z)

### **Templates Grid**

**Layout:** 3 columns desktop, 2 tablet, 1 mobile

**Template Card:**
```
┌─────────────────────────────────────┐
│ [Template Icon/Image]               │
├─────────────────────────────────────┤
│ Template Name                       │
│ by Creator Name                     │
│ ⭐⭐⭐⭐⭐ 4.8 (124 reviews)         │
├─────────────────────────────────────┤
│ Category: Customer Support          │
│ Language: English                   │
│ Voice: Rachel (Female)              │
│ Model: GPT-4                        │
├─────────────────────────────────────┤
│ Short description of what this      │
│ template does and its key features. │
├─────────────────────────────────────┤
│ 💰 Free  📥 1.2k installs           │
├─────────────────────────────────────┤
│ [View Details] [Install]            │
└─────────────────────────────────────┘
```

**Card Info:**
1. **Template Image:** Preview or icon
2. **Name:** Template name
3. **Creator:** Username or "Official"
4. **Rating:** Stars + count
5. **Category, Language, Voice, Model**
6. **Description:** Brief summary (2 sentences)
7. **Pricing:** Free or price
8. **Install count:** Number of times installed
9. **Buttons:** View Details, Install

### **Template Detail Page/Dialog**

**Header:**
- Template name (large)
- Creator info (name, avatar, verified badge)
- Rating: ⭐ 4.8/5.0 (124 reviews)
- Install count: 1,234 installs
- Category badges
- **Install Button** (primary)

**Tabs:**

**Tab 1: Overview**
- Full description
- Key features (bullet list)
- What it does
- Example use cases
- Screenshots/preview

**Tab 2: Configuration**
- Shows what settings it uses
- AI model: GPT-4
- Voice: Rachel
- Language: English
- System prompt preview (first 200 chars)
- Behavior settings
- Can be customized after install: Yes

**Tab 3: Reviews**
- Reviews list
- Each review shows:
  - User avatar & name
  - Star rating
  - Date
  - Review text
  - Helpful button (upvote)
- Write a review (if installed)

**Tab 4: Changelog**
- Version history
- v1.2 - Jan 15, 2024: What's new
- v1.1 - Dec 1, 2023: Updates
- v1.0 - Nov 1, 2023: Initial release

**Tab 5: Support**
- FAQ about template
- Contact creator button
- Report issue button

### **Install Process**

**Dialog:**
1. **Customize Agent Name**
   - Input: "Customer Support Agent"
   - Default: Template name

2. **Review Settings**
   - Shows all settings
   - User can modify before install

3. **Confirm Installation**
   - Confirm button
   - Cancel button

**On Install:**
- Success toast
- Navigate to agents page
- New agent appears (with template badge)

### **My Templates** (if user creates)
- Tab showing templates user has submitted
- Edit/Delete own templates
- View analytics (installs, reviews)

---

## 20. 🎨 **WHITE LABEL PAGE**
(Under Settings → White Label in collapsible menu)

### **Purpose**
Customize branding for enterprise clients who want to rebrand the platform.

### **Header Section**
- Title: "White Label Settings"
- Description: "Customize the platform with your own branding"
- Info badge: "Available on Enterprise plan only" (if applicable)

### **Section 1: Brand Identity**

**Logo Settings:**
1. **Light Mode Logo**
   - Current logo preview
   - Upload button (PNG, SVG, max 2MB)
   - Recommended size: 200x60px
   - Remove button

2. **Dark Mode Logo**
   - Same as above
   - Use same as light mode: Toggle

3. **Favicon**
   - Current favicon preview
   - Upload button (ICO, PNG, max 100KB)
   - Size: 32x32px or 64x64px

### **Section 2: Color Scheme**

**Primary Colors:**
1. **Primary Color**
   - Color picker
   - Hex input: #3B82F6
   - Preview: Shows buttons, links in this color

2. **Secondary Color**
   - Color picker
   - Hex input

3. **Accent Color**
   - Color picker
   - For CTAs and highlights

**Semantic Colors:**
4. **Success Color** (green)
5. **Warning Color** (yellow)
6. **Error Color** (red)
7. **Info Color** (blue)

**Reset to Defaults** button

### **Section 3: Typography**

**Font Settings:**
1. **Primary Font**
   - Dropdown: System fonts + Google Fonts
   - Options: Inter, Roboto, Open Sans, Lato, etc.
   - Preview text

2. **Heading Font**
   - Same dropdown
   - Use same as primary: Toggle

3. **Font Size Scale**
   - Radio: Small, Medium (default), Large
   - For accessibility

### **Section 4: Custom Domain**

**Domain Settings:**
1. **Custom Domain**
   - Input: app.yourdomain.com
   - Verification status: Verified (✓) or Pending
   - Instructions: "Point your DNS to..."
   - DNS records to add (shown as code blocks)

2. **SSL Certificate**
   - Status: Active / Pending
   - Auto-generated by Let's Encrypt
   - Renews automatically

### **Section 5: Email Branding**

**Email Settings:**
1. **From Name**
   - Input: "Your Company Name"
   - Used in emails from platform

2. **From Email**
   - Input: noreply@yourdomain.com
   - Requires domain verification

3. **Email Logo**
   - Upload button
   - Used in email templates

4. **Email Footer**
   - Textarea: Custom footer text
   - Company address, links, etc.

### **Section 6: Legal Pages**

**Custom Legal Pages:**
1. **Privacy Policy URL**
   - Input: https://yourdomain.com/privacy

2. **Terms of Service URL**
   - Input: https://yourdomain.com/terms

3. **Cookie Policy URL**
   - Input: https://yourdomain.com/cookies

These links appear in footer

### **Section 7: Advanced**

**Custom Code:**
1. **Custom CSS**
   - Code editor (textarea)
   - For advanced styling
   - Preview mode

2. **Custom JavaScript** (Enterprise only)
   - Code editor
   - Warning about security
   - For analytics, chat widgets, etc.

3. **Google Analytics ID** (optional)
   - Input: UA-XXXXXXXXX-X or G-XXXXXXXXXX
   - Enable/disable toggle

### **Preview Mode**
- **Preview Button:** Opens preview of platform with white label applied
- Shows header, sidebar, sample page
- Toggle light/dark mode preview

### **Save Changes**
- Save button (primary)
- Changes may take up to 5 minutes to propagate
- Success toast when saved

---

## 🛡️ **ADMIN PANEL (8 PAGES)**

**Access:** Red/orange gradient button at bottom of user sidebar "Admin Panel"

**Visual Identity:**
- Different color scheme: Red-orange gradient (#DC2626 → #EA580C)
- Shield icon (🛡️) in sidebar
- "Admin Panel" badge on all pages
- "Back to User App" button in header

---

## 21. 🏠 **ADMIN DASHBOARD PAGE**

### **Purpose**
System-wide overview for super admins to monitor platform health.

### **Header Section**
- Title: "🛡️ Admin Dashboard"
- Subtitle: "System Overview"
- Back to User App button
- Last updated: Timestamp
- Refresh button

### **Key Metrics Row (5 cards)**

1. **Total Users**
   - Count: 1,247
   - Change: +23 this week (↑ +1.9%)
   - Icon: Users icon
   - Click to navigate to Users page

2. **Active Users (24h)**
   - Count: 432
   - Percentage: 34.6% of total
   - Icon: Activity icon

3. **Calls Today**
   - Count: 3,456
   - Comparison: vs 3,123 yesterday
   - Icon: Phone icon

4. **Revenue (MTD)**
   - Amount: $94.5k
   - Progress: vs $100k goal (94.5%)
   - Icon: Dollar icon

5. **System Health**
   - Status: All Systems Operational
   - Color: Green
   - Icon: Check circle
   - Click for details

### **Call Volume Chart**

**Chart Type:** Line chart
- Title: "Call Volume (Last 24 Hours)"
- X-axis: Time (0-24 hours)
- Y-axis: Number of calls
- Multiple lines:
  - Total calls (blue)
  - Successful (green)
  - Failed (red)
- Hover tooltip: Show exact numbers and percentage

### **Revenue Chart**

**Chart Type:** Area chart with gradient
- Title: "Revenue Trend (Last 7 Days)"
- X-axis: Days
- Y-axis: Dollar amount
- Show: Daily revenue
- Cumulative line overlay
- Target line (dotted)

### **System Health Status**

**Service Status Table:**

Columns: Service, Status, Response Time, Uptime

Rows:
1. **API Service**
   - Status: Operational (green dot)
   - Response Time: 120ms avg
   - Uptime: 99.98%

2. **Database**
   - Status: Operational
   - Response Time: 45ms avg
   - Uptime: 99.99%

3. **Voice Service**
   - Status: Operational
   - Response Time: 230ms avg
   - Uptime: 99.95%

4. **Storage**
   - Status: Operational
   - Capacity: 2.5TB / 5TB (50%)
   - Uptime: 100%

5. **Cache (Redis)**
   - Status: Operational
   - Hit Rate: 94.5%
   - Uptime: 99.97%

**Service Status Colors:**
- Operational: Green
- Degraded: Yellow
- Partial Outage: Orange
- Down: Red

### **Geographic Distribution**

**Chart Type:** Bar chart or map

Shows calls by country:
1. United States: 2,145 calls (62%)
2. Canada: 678 calls (20%)
3. United Kingdom: 345 calls (10%)
4. Australia: 189 calls (5%)
5. Other: 99 calls (3%)

### **Recent Alerts**

**List of system alerts:**
```
⚠️ High error rate detected
   Service: Voice API
   Time: 2 hours ago
   Status: Resolved
   [View Details]

ℹ️ Database backup completed
   Time: 4 hours ago
   Size: 234 GB
   [View Details]

✓ System update deployed
   Version: v2.1.3
   Time: Yesterday
   [View Changelog]
```

### **Recent Activity**

**Timeline of admin actions:**
- User "John Doe" suspended by Admin
- Billing adjusted for "Acme Corp"
- Data export requested by "Jane Smith"
- System settings updated
- New user signed up: "Tech Startup Inc"

Each entry shows:
- Action icon
- Description
- Admin who performed action
- Timestamp
- Quick action button

### **Quick Actions Panel** (right sidebar)

**Buttons:**
- 👥 View All Users
- 💰 Billing & Revenue
- 📊 Usage Analytics
- 🔍 Search Users
- 🚨 View Alerts
- 📝 Audit Logs
- ⚙️ System Settings

---

## 22. 👥 **ADMIN USERS PAGE**

### **Purpose**
Manage all platform users with detailed controls.

### **Header Section**
- Title: "User Management"
- Total count: "(1,247 users)"
- Search bar (by name, email, ID, phone)
- **Add User Button** (manual user creation)
- Export users button (CSV)

### **Filters**

**Filter Bar:**
1. **Status Filter**
   - All Users
   - Active (green)
   - Trial (blue)
   - Suspended (red)
   - Deleted (gray)

2. **Plan Filter**
   - All Plans
   - Enterprise
   - Pro
   - Starter
   - Free

3. **Date Filter**
   - Joined: Last 7 days, 30 days, 90 days, All time

4. **Sort**
   - Newest first
   - Oldest first
   - Most active
   - Highest spend
   - Name (A-Z)

### **Users Table**

**Columns:**

1. **User**
   - Avatar (generated from initials)
   - Name: John Doe
   - Email: john@example.com
   - Click to view full profile

2. **ID**
   - User ID: usr_abc123
   - Copy button

3. **Status**
   - Badge: Active, Trial, Suspended, Deleted
   - Color-coded

4. **Plan**
   - Badge: Enterprise, Pro, Starter, Free
   - Upgrade/downgrade button

5. **Joined**
   - Date: Jan 15, 2024
   - Tooltip: "45 days ago"

6. **Last Active**
   - Date & time: "2 hours ago"
   - Activity indicator (green dot if online)

7. **Usage (30d)**
   - Agents: 12
   - Calls: 1,234
   - Minutes: 3,456

8. **Spend (30d)**
   - Amount: $127.50
   - Trend: ↑ +15%

9. **Actions**
   - Dropdown menu (⋮):
     - View Details
     - Impersonate User
     - Adjust Billing
     - Edit Limits
     - Suspend Account
     - Delete User
     - Send Email
     - View Audit Log

### **Table Features**
- Pagination: 25/50/100 per page
- Bulk selection: Checkboxes
- Bulk actions: Suspend, Delete, Export selected

### **User Detail Dialog**

**Opens when clicking user row**

**Dialog Tabs:**

**Tab 1: Overview**
- User avatar (large)
- Full name
- Email (verified badge)
- Phone
- Company
- Job title
- User ID
- Status badge
- Plan badge
- Created date
- Last login
- Login count
- IP address (last)
- Location (last)

**Quick Stats:**
- Total agents: 12
- Total calls: 1,234
- Total minutes: 3,456
- Total spend: $892.50
- Average call duration: 3m 45s

**Tab 2: Recent Activity**
Timeline of user actions:
- Agent created: "Sales Agent"
- Call made to +1 555-1234
- Campaign started
- Billing: Top up $50
- Settings updated

Each with timestamp

**Tab 3: Billing**
- Current balance: $47.52
- Plan: Pro ($99/month)
- Payment method: Visa ••4242
- Recent transactions (last 10)
- Invoices (last 6 months)
- Adjust balance button (admin only)
- Change plan button

**Tab 4: Usage**
- Agents: 12/50 (quota)
- Calls this month: 1,234/5,000
- Minutes this month: 3,456/10,000
- Phone numbers: 5/10
- Storage used: 2.3 GB / 10 GB
- API calls: 4,567/100,000

Progress bars for each

**Tab 5: Error Logs**
- Recent errors for this user
- Timestamp, error type, message
- Stack trace (collapsed)
- Filter by error type
- Export logs

### **Admin Actions on User**

**1. Impersonate User**
- Dialog confirmation
- Warning: "Your actions will be logged"
- Reason: Textarea (required)
- Confirm button
- Opens user's account in new tab
- Admin badge shown
- Exit impersonation button

**2. Adjust Billing**
- Dialog with:
  - Current balance: $47.52
  - Adjustment amount: Input (+ or -)
  - Reason: Dropdown (Refund, Bonus, Correction, Other)
  - Notes: Textarea
  - Confirm button
- Logs action in audit

**3. Edit Limits**
- Dialog showing all quotas
- Increase/decrease each
- Reason: Textarea
- Confirm button

**4. Suspend Account**
- Dialog confirmation
- Reason: Dropdown (Payment issue, TOS violation, Fraud, Other)
- Notes: Textarea
- Duration: Indefinite or date picker
- Notify user: Checkbox (send email)
- Confirm button

**5. Delete User**
- Dialog with warnings
- Confirmation: Type "DELETE" to confirm
- What gets deleted: List
  - All agents
  - All calls
  - All recordings
  - All data
- Cannot be undone
- Export data first: Button
- Reason: Required textarea
- Confirm button

**6. Send Email**
- Opens email composer
- To: User's email (pre-filled)
- Subject: Input
- Body: Textarea with formatting
- Template dropdown: Welcome, Reminder, etc.
- Send button

---

## 23. 💰 **ADMIN BILLING & REVENUE PAGE**

### **Purpose**
Monitor platform-wide revenue, billing issues, and financial health.

### **Header Section**
- Title: "Billing & Revenue"
- Date range picker (This month, Last 30 days, etc.)
- Export financial report button (Excel/PDF)

### **Revenue Overview (4 cards)**

1. **Total Revenue (Month)**
   - Amount: $94.5k
   - Change: +7.1% vs last month
   - Graph: Mini sparkline

2. **MRR** (Monthly Recurring Revenue)
   - Amount: $84.5k
   - Change: +5.2%
   - From subscriptions

3. **ARR** (Annual Recurring Revenue)
   - Amount: $1.014M
   - Projected: $1.2M (if trend continues)

4. **Average Revenue per User**
   - Amount: $75.73
   - Change: +2.3%

### **Revenue Breakdown Chart**

**Chart Type:** Stacked area chart
- Title: "Revenue by Plan (Last 10 Months)"
- X-axis: Months
- Y-axis: Dollar amount
- Stacks:
  - Enterprise (dark blue)
  - Pro (blue)
  - Starter (light blue)
  - Pay-as-you-go (lightest blue)
- Legend with totals

### **Revenue by Plan (Donut Chart)**

Shows current month distribution:
- Enterprise: $45.2k (48%)
- Pro: $32.8k (35%)
- Starter: $13.5k (14%)
- Pay-as-you-go: $3.0k (3%)

### **Payment Issues Section**

**Failed Payments Table:**

Shows payments that failed:

Columns:
1. **User**
   - Name with avatar
   - Email

2. **Amount**
   - Dollar amount: $99.00

3. **Plan**
   - Plan name: Pro

4. **Reason**
   - Failure reason: Card declined, Insufficient funds, Expired card

5. **Date**
   - Date of failure: Jan 15, 2024

6. **Attempts**
   - Retry count: 2/3

7. **Next Retry**
   - Scheduled: Jan 16, 2024

8. **Actions**
   - Retry Now button
   - Contact User button
   - View Details
   - Waive Payment
   - Suspend User

**Counts:**
- Total failed: 3 payments
- Total amount: $267.00
- Users affected: 3

### **Recent Refunds**

**Table:**

Columns:
1. **User**
   - Name and email

2. **Amount**
   - Dollar amount: -$50.00

3. **Reason**
   - Dropdown reason or custom text

4. **Requested**
   - Date: Jan 14, 2024

5. **Processed By**
   - Admin name: Admin User

6. **Status**
   - Badge: Completed, Pending, Rejected

**Total refunded this month:** $450.00

### **Subscription Metrics**

**Cards:**
1. **New Subscriptions**
   - Count: 23 this month
   - Change: +15%

2. **Canceled Subscriptions**
   - Count: 5 this month
   - Churn rate: 0.4%

3. **Upgrades**
   - Count: 12 this month
   - Revenue impact: +$2.4k

4. **Downgrades**
   - Count: 3 this month
   - Revenue impact: -$450

### **Top Customers by Spend**

**Table:**

Columns:
1. Rank: #1, #2, etc.
2. User: Name with avatar
3. Plan: Enterprise
4. Spend (30d): $1,234
5. Spend (All time): $15,678
6. Action: View Details

Shows top 10 customers

### **Revenue Forecast**

**Chart:** Line chart with projections
- Historical data: Solid line
- Forecast: Dashed line
- Confidence interval: Shaded area
- Target line

---

## 24. 📈 **ADMIN USAGE ANALYTICS PAGE**

### **Purpose**
Monitor platform usage, resource consumption, and infrastructure costs.

### **Header Section**
- Title: "Usage Analytics"
- Date range picker
- Export usage report button

### **Usage Overview (4 cards)**

1. **Total Calls (30d)**
   - Count: 89,234
   - Change: +12.5%
   - Cost: $4,567

2. **Total Minutes (30d)**
   - Count: 134,567 minutes
   - = 2,243 hours
   - Cost: $6,789

3. **Total AI Tokens (30d)**
   - Count: 123.4M tokens
   - Cost: $3,456

4. **Infrastructure Cost (30d)**
   - Amount: $17.5k
   - Gross margin: 81.4%
   - (Revenue: $94.5k - Cost: $17.5k)

### **Usage by Hour Chart**

**Chart Type:** Heatmap
- X-axis: Hour of day (0-23)
- Y-axis: Day of week
- Color intensity: Call volume
- Tooltip: Exact call count
- Shows peak usage times

### **Cost Breakdown (Donut Chart)**

Shows infrastructure costs:
- AI Models (GPT-4, Claude): 45%
- Voice Synthesis (ElevenLabs, etc.): 30%
- Phone Services (Twilio, etc.): 15%
- Database & Storage: 7%
- Other Infrastructure: 3%

### **Cost vs Revenue Analysis**

**Chart Type:** Dual-axis line chart
- X-axis: Time (days/weeks)
- Y-axis Left: Revenue ($)
- Y-axis Right: Cost ($)
- Lines:
  - Revenue (green)
  - Cost (red)
  - Profit (green area fill)
- Shows margin trend

### **Top Users by Usage**

**Table:**

Columns:
1. **Rank:** #1, #2, etc.
2. **User:** Name with avatar
3. **Calls:** 2,345
4. **Minutes:** 5,678
5. **Cost:** $345.67
6. **Revenue:** $892.50
7. **Margin:** 61.3%
8. **Action:** View Details

Shows top 20 users by usage

### **Resource Utilization**

**Metrics:**

1. **API Requests (24h)**
   - Count: 1.2M requests
   - Avg response time: 120ms
   - Error rate: 0.02%
   - Graph: Requests per minute

2. **Database Queries (24h)**
   - Count: 5.6M queries
   - Avg latency: 12ms
   - Slow queries: 45 (>100ms)
   - Graph: Query latency

3. **Voice API Calls**
   - TTS requests: 45,678
   - Avg latency: 230ms
   - Error rate: 0.5%

4. **Storage**
   - Call recordings: 1.2 TB (48%)
   - User data: 400 GB (16%)
   - Logs: 600 GB (24%)
   - Backups: 300 GB (12%)
   - Total: 2.5 TB / 5 TB

### **Quota Warnings**

**Table of users approaching limits:**

Columns:
1. **User:** Name
2. **Quota:** Minutes per month
3. **Used:** 9,456 / 10,000
4. **Usage:** 94.6%
5. **Status:** Warning (yellow) or Critical (red)
6. **Action:** 
   - Notify User
   - Increase Quota
   - View Details

### **Usage Trends**

**Multi-line chart:**
- X-axis: Last 30 days
- Y-axis: Count
- Lines:
  - Calls (blue)
  - Minutes (green)
  - API requests (purple)
  - Errors (red)

### **Cost Optimization Recommendations**

**List of suggestions:**
1. **Switch GPT-4 to GPT-3.5 for simple tasks**
   - Potential savings: $1,200/month
   - Affected users: 15

2. **Enable call recording compression**
   - Potential savings: $340/month
   - Storage reduction: 30%

3. **Archive old logs (>90 days)**
   - Potential savings: $180/month
   - Storage freed: 150 GB

Each with:
- Description
- Estimated savings
- Impact assessment
- Implement button

---

## 25. 📝 **ADMIN AUDIT LOGS PAGE**

### **Purpose**
Complete audit trail of all admin actions for compliance and security.

### **Header Section**
- Title: "Audit Logs"
- Description: "Complete history of admin actions"
- Date range picker
- Export logs button (CSV/Excel/JSON)

### **Filters**

**Filter Bar:**
1. **Action Type**
   - All Actions
   - User Management
   - Billing Adjustments
   - Settings Changes
   - Data Exports
   - Impersonations
   - Deletions

2. **Severity**
   - All
   - Critical (red)
   - High (orange)
   - Medium (yellow)
   - Low (gray)

3. **Admin User**
   - All Admins
   - Dropdown of admin users

4. **Target User**
   - Search by affected user

5. **Date Range**
   - Today, Last 7 days, 30 days, Custom

### **Audit Logs Table**

**Columns:**

1. **Timestamp**
   - Date & time: Jan 15, 2024 10:30:45 AM EST
   - Precise to the second

2. **Severity**
   - Badge: Critical, High, Medium, Low
   - Color-coded

3. **Admin**
   - Admin user who performed action
   - Avatar + name
   - Admin ID

4. **Action**
   - Action type: User Impersonated
   - Description: Brief description
   - Icon based on action type

5. **Target**
   - Affected user/resource
   - User: John Doe (john@example.com)
   - Or: Agent #123, Campaign #456

6. **Details**
   - Expand arrow
   - Shows full details when clicked

7. **IP Address**
   - IP: 192.168.1.1
   - Location: New York, USA

8. **Actions**
   - View Full Details button

### **Expanded Details View**

When clicking expand arrow:

```json
{
  "event_id": "evt_abc123",
  "timestamp": "2024-01-15T10:30:45Z",
  "admin_id": "adm_xyz789",
  "admin_email": "admin@platform.com",
  "action": "user.impersonated",
  "target_user_id": "usr_def456",
  "target_user_email": "john@example.com",
  "reason": "Investigate billing issue",
  "ip_address": "192.168.1.1",
  "user_agent": "Chrome 120.0 on Windows 10",
  "session_id": "ses_ghi012",
  "before": {
    "status": "active"
  },
  "after": {
    "status": "active",
    "impersonated_by": "adm_xyz789"
  }
}
```

### **Action Types Logged**

**User Management:**
- user.created
- user.updated
- user.impersonated
- user.suspended
- user.unsuspended
- user.deleted
- user.password_reset
- user.email_sent

**Billing:**
- billing.balance_adjusted
- billing.refund_issued
- billing.payment_waived
- billing.plan_changed
- billing.payment_retry

**Data Operations:**
- data.exported (GDPR)
- data.deleted
- backup.restored

**Settings:**
- settings.updated
- limits.adjusted
- feature_flag.changed

**Security:**
- login.admin
- logout.admin
- api_key.created
- api_key.revoked
- webhook.created
- webhook.deleted

**System:**
- system.update_deployed
- maintenance.started
- maintenance.completed

### **Severity Levels**

**Critical (Red):**
- User deleted
- Data export (GDPR)
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

### **Search & Filter**

**Search bar:**
- Search by: Event ID, Admin email, Target user, IP, Action
- Real-time suggestions

**Advanced Filters:**
- Combine multiple filters with AND/OR
- Save filter presets
- Example: "Show all Critical events by Admin John in last 7 days"

### **Export Options**

**Export formats:**
- CSV: For Excel analysis
- JSON: For programmatic processing
- PDF: For compliance reports

**Export includes:**
- All filtered results
- Full details (JSON)
- Timestamp range
- Generated by (admin info)
- Generated at (timestamp)

### **Retention Policy**

**Info banner:**
- Audit logs retained for: 2 years
- Older logs archived to cold storage
- Request archive access: Button

---

## 26. 🛠️ **ADMIN SUPPORT TOOLS PAGE**

### **Purpose**
Help admins quickly find and assist users.

### **Header Section**
- Title: "Support Tools"
- Description: "Quick user lookup and support features"

### **Quick User Lookup**

**Search Panel:**
- Large search input
- Placeholder: "Search by email, name, user ID, phone number..."
- Search button
- Live suggestions as you type

**Recent Searches:**
- List of last 10 searches
- Click to search again

### **Support Tickets Section** (if ticket system exists)

**Active Tickets:**

**Summary Cards:**
1. **Open Tickets**
   - Count: 3
   - Badge: Urgent (1), High (1), Medium (1)

2. **Avg Response Time**
   - Time: 2.3 hours

3. **Avg Resolution Time**
   - Time: 4.5 hours

**Tickets Table:**

Columns:
1. **Ticket ID:** #12345
2. **User:** Name with avatar
3. **Subject:** "Cannot make calls"
4. **Priority:** Urgent, High, Medium, Low
5. **Status:** Open, In Progress, Waiting, Closed
6. **Created:** 2 hours ago
7. **Last Updated:** 30 minutes ago
8. **Assigned To:** Admin name
9. **Actions:** View, Assign to me, Close

### **User Search Results**

**After searching, shows:**

**User Card (Large):**
- Avatar (large)
- Name: John Doe
- Email: john@example.com (verified)
- Phone: +1 (555) 123-4567
- User ID: usr_abc123 (copy button)
- Status badge: Active
- Plan badge: Pro
- Joined: Jan 15, 2024 (45 days ago)
- Last seen: 2 hours ago (green dot if online)

**Quick Stats:**
- Agents: 12
- Calls (30d): 1,234
- Spend (30d): $127.50
- Balance: $47.52

**Quick Actions:**
- 👁️ View Full Profile
- 🔄 Impersonate User
- ✉️ Send Email
- 📞 Call User
- 💰 Adjust Billing
- ⚙️ Edit Limits
- 🚫 Suspend User
- 📝 View Audit Log

### **User Detail Tabs** (embedded in support page)

**Tab 1: Overview**
(Same as Admin Users page overview)

**Tab 2: Recent Activity**
- Last 20 actions
- Timeline view

**Tab 3: Error Logs**
- Recent errors
- Filter by severity
- Stack traces

### **Recent User Errors** (Global)

**Table showing all recent user errors:**

Columns:
1. **User:** Name with avatar
2. **Error:** Error message (truncated)
3. **Type:** API Error, Voice Error, Payment Error, etc.
4. **Page:** Where error occurred
5. **Time:** 5 minutes ago
6. **Actions:** View Details, Contact User

**Filter by:**
- Error type
- Severity
- Time range

### **Common Issues & Resolutions**

**Knowledge Base Section:**

List of articles:
1. **User can't make calls**
   - Check: Balance, Phone number assigned, Agent status
   - Quick fix: Steps to resolve
   - Escalate: Button if can't resolve

2. **Payment failing**
   - Check: Card expiry, Billing address
   - Quick fix: Retry payment, Update card
   - Escalate: Contact user

3. **Agent not responding**
   - Check: AI model status, Prompt length, API limits
   - Quick fix: Test agent, Check logs
   - Escalate: Technical support

Each with:
- Description
- Checklist of things to verify
- Quick fix actions
- When to escalate

---

## 27. 🚩 **ADMIN CONTENT MODERATION PAGE**

### **Purpose**
Review and moderate user-generated content (agent prompts, call transcripts) for policy violations.

### **Header Section**
- Title: "Content Moderation"
- Description: "Review flagged content for policy violations"
- Filter by status: All, Pending, Approved, Blocked

### **Moderation Queue Stats (3 cards)**

1. **Pending Review**
   - Count: 12 items
   - Action needed badge

2. **Blocked This Week**
   - Count: 3 items
   - Users affected: 3

3. **Clean Content Rate**
   - Percentage: 98.7%
   - Trend: Stable

### **Content Categories Tabs**

**Tab 1: Flagged Agent Prompts**
**Tab 2: Flagged Call Transcripts**
**Tab 3: Blocked Keywords**

---

### **Tab 1: Flagged Agent Prompts**

**Table:**

Columns:
1. **Agent Name**
   - Agent name: "Sales Agent"
   - User: John Doe
   - User ID: usr_abc123

2. **Flagged Content**
   - First 100 characters of prompt
   - "View Full" button

3. **Reason**
   - AI detected: Inappropriate language, Violence, Spam
   - Or: User reported

4. **Severity**
   - Badge: Critical, High, Medium, Low
   - Color-coded

5. **Flagged**
   - Date & time: 2 hours ago

6. **Status**
   - Badge: Pending, Under Review, Approved, Blocked

7. **Actions**
   - Review button (opens detail)

### **Review Dialog**

**For Agent Prompts:**

**Left Panel:**
- Agent name
- User info (name, email, plan)
- Agent details (model, voice, created date)

**Center Panel:**
- **Full System Prompt:** (scrollable)
  - Highlighted sections showing flagged content
  - Flag reasons shown in margin

**Right Panel:**
- **Moderation Decision:**
  - Radio buttons:
    - ✅ Approve (no issues found)
    - ⚠️ Approve with Warning (send warning to user)
    - 🚫 Block Prompt (prevent use, notify user)
    - 🛑 Block & Suspend User (serious violation)
  
  - **Warning Message Template:** (if warning selected)
    - Dropdown: Pre-written templates
    - Custom message: Textarea
  
  - **Block Reason:** (if blocking)
    - Dropdown: Violence, Hate speech, Spam, Fraud, Adult content, Other
    - Details: Textarea (required)
  
  - **Internal Notes:** Textarea
  
  - **Notify User:** Checkbox (send email)
  
  - **Submit Decision** button

**Bottom:**
- Previous moderation decisions for this user (if any)
- Similar flagged content (if any)

---

### **Tab 2: Flagged Call Transcripts**

**Table:**

Columns:
1. **Call ID:** #12345
2. **Agent:** Agent name
3. **User:** User name
4. **Phone:** +1 (555) 123-4567
5. **Flagged Content:** First 50 chars
6. **Reason:** Policy violation type
7. **Severity:** Badge
8. **Date:** 3 hours ago
9. **Actions:** Review button

### **Transcript Review Dialog**

**Layout:**

**Left Panel:**
- Call metadata (agent, user, duration, date)
- User info (name, email, history)

**Center Panel:**
- **Full Transcript:**
  - Color-coded speakers
  - Flagged sections highlighted in red
  - Flag reason tooltips
  - Timestamps

**Right Panel:**
- **Moderation Decision:**
  - Similar options as agent prompts
  - Additional: Request call recording deletion
  
  - **Recording Action:**
    - Keep recording
    - Delete recording
    - Archive and restrict access

---

### **Tab 3: Blocked Keywords**

**Purpose:** Manage list of keywords that auto-flag content

**Keywords Table:**

Columns:
1. **Keyword/Phrase**
   - Text: "example banned word"
2. **Category**
   - Violence, Hate Speech, Adult, Spam, Fraud
3. **Action**
   - Auto-block or Flag for review
4. **Added By**
   - Admin name
5. **Date Added**
   - Jan 15, 2024
6. **Triggers (30d)**
   - Count: 3 times
7. **Actions**
   - Edit, Delete

**Add Keyword Button:**
- Opens dialog
- Keyword/phrase input
- Category dropdown
- Action: Auto-block or Flag
- Case sensitive: Checkbox
- Match whole word: Checkbox
- Add button

### **AI Moderation Settings**

**Settings Panel:**

1. **Automatic Flagging**
   - Toggle: Enable AI auto-flagging
   - Sensitivity: Slider (Low, Medium, High)
   - Higher = more content flagged

2. **Categories to Monitor**
   - Checkboxes:
     - Violence & Threats
     - Hate Speech & Discrimination
     - Adult Content
     - Spam & Scams
     - Personally Identifiable Information (PII)
     - Financial Fraud

3. **Auto-actions**
   - Auto-block critical violations: Toggle
   - Notify admins immediately: Toggle
   - Email: Admin email for notifications

### **Moderation Analytics**

**Charts:**

1. **Flags Over Time**
   - Line chart: Last 30 days
   - Shows trend

2. **Flags by Category**
   - Donut chart
   - Shows distribution

3. **Moderator Performance**
   - Table: Each admin
   - Reviews completed
   - Avg review time

---

## 28. 🖥️ **ADMIN SYSTEM & RESOURCES PAGE**

### **Purpose**
Monitor infrastructure, servers, databases, and system resources.

### **Header Section**
- Title: "System & Resources"
- Description: "Infrastructure monitoring and management"
- Last updated: Timestamp
- Auto-refresh: Toggle (every 30s)

### **System Metrics (4 cards)**

1. **CPU Usage**
   - Percentage: 58% average
   - Trend: Mini sparkline
   - Status: Normal (green)

2. **Memory Usage**
   - Amount: 11.2 GB / 16 GB (70%)
   - Trend: Mini sparkline
   - Status: Normal

3. **Database Size**
   - Size: 234 GB
   - Growth: +2.3 GB this week
   - Trend: Increasing

4. **Storage Used**
   - Amount: 2.5 TB / 5 TB (50%)
   - Breakdown: Click to expand
   - Status: Normal

### **CPU & Memory Charts**

**Chart 1: CPU Usage (24 hours)**
- Type: Area chart
- X-axis: Time (0-24 hours)
- Y-axis: Percentage (0-100%)
- Lines for each server
- Threshold line at 80% (warning)

**Chart 2: Memory Usage (24 hours)**
- Similar to CPU chart
- Shows RAM usage
- Threshold at 85%

### **Server Status Table**

**Columns:**
1. **Server Name**
   - Name: api-server-1
   - Location: US-East-1

2. **Role**
   - API Server, Database, Cache, Worker, etc.

3. **Status**
   - Dot: Online (green), Degraded (yellow), Offline (red)

4. **Uptime**
   - Duration: 45 days 12h 34m
   - Percentage: 99.98%

5. **CPU**
   - Current: 45%
   - Avg (24h): 52%

6. **Memory**
   - Current: 8.2 GB / 16 GB (51%)
   - Avg: 8.5 GB

7. **Load**
   - Load average: 1.2, 1.5, 1.8

8. **Actions**
   - View Details
   - SSH (if enabled)
   - Restart (with confirmation)

**Servers List:**
1. api-server-1 (API)
2. api-server-2 (API)
3. db-primary (Database)
4. db-replica (Database)
5. cache-server (Redis)

### **Database Status**

**PostgreSQL (Primary):**
- Status: Operational (green)
- Connections: 245 / 500 (49%)
- Size: 234 GB
- Queries/sec: 4,567
- Slow queries (>100ms): 12
- Replication lag: 0ms
- Last backup: 2 hours ago
- Actions: View slow queries, Run backup, View logs

**PostgreSQL (Replica):**
- Status: Operational
- Replication lag: 2ms
- Read queries/sec: 2,345

**Redis (Cache):**
- Status: Operational
- Memory: 2.3 GB / 8 GB (29%)
- Hit rate: 94.5%
- Keys: 1.2M
- Commands/sec: 12,345

### **Storage Breakdown**

**Chart:** Treemap or Pie chart

Shows storage by category:
- Call Recordings: 1.2 TB (48%)
- User Data: 400 GB (16%)
- Logs: 600 GB (24%)
- Backups: 300 GB (12%)

**Actions:**
- View old recordings
- Archive logs >90 days
- Clean up temp files
- Increase storage (if needed)

### **Backup Status**

**Table:**

Columns:
1. **Backup Type:** Full, Incremental
2. **Date:** Jan 15, 2024 10:00 AM
3. **Size:** 234 GB
4. **Duration:** 45 minutes
5. **Status:** Completed (green), In Progress, Failed
6. **Location:** S3 bucket
7. **Actions:** Restore (confirmation), Download info, Delete

**Backup Schedule:**
- Full backup: Daily at 2:00 AM UTC
- Incremental: Every 6 hours
- Retention: 30 days
- Edit schedule button

### **System Logs**

**Recent Logs Table:**

Columns:
1. **Timestamp:** Precise to millisecond
2. **Level:** Info, Warning, Error, Critical
3. **Service:** API, Database, Worker, etc.
4. **Message:** Log message
5. **Actions:** View full log

**Filters:**
- Level: All, Errors only, Warnings only
- Service: All or specific
- Time range
- Search: By message content

**Export logs:** Button

### **Scheduled Tasks (Cron Jobs)**

**Table:**

Columns:
1. **Task Name:** "Daily database backup"
2. **Schedule:** "Daily at 2:00 AM UTC"
3. **Last Run:** 8 hours ago
4. **Status:** Success, Failed
5. **Duration:** 45 minutes
6. **Next Run:** In 16 hours
7. **Actions:** Run now, Edit, Disable

**Tasks:**
- Database backup
- Log rotation
- Cleanup old recordings
- Generate analytics
- Send daily reports
- Sync with external systems

### **Alerts & Notifications**

**Active Alerts:**

List of system alerts:
1. **High CPU on api-server-1**
   - Severity: Warning
   - Duration: 15 minutes
   - Threshold: >80%
   - Action: Auto-scale triggered

2. **Slow query detected**
   - Severity: Info
   - Query: SELECT * FROM...
   - Duration: 2.3s
   - Action: Investigate

**Alert Configuration:**
- Add alert button
- Configure thresholds
- Notification channels (email, SMS, Slack)

### **Cost Optimization**

**Recommendations:**

1. **Scale down servers during off-peak hours**
   - Potential savings: $450/month
   - Impact: Minimal (off-peak only)
   - Implement button

2. **Archive old call recordings to cold storage**
   - Potential savings: $340/month
   - Recordings >90 days: 800 GB
   - Implement button

3. **Optimize database indexes**
   - Potential speedup: 25% faster queries
   - Implement button

---

## 🎨 **GLOBAL DESIGN SYSTEM**

### **Color Palette**

**User App:**
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Neutral: Slate (#64748B)

**Admin Panel:**
- Primary: Red-Orange Gradient (#DC2626 → #EA580C)
- Same semantic colors as user app

### **Typography**
- Font: System font stack (Inter, San Francisco, Roboto)
- Display: 3xl (1.875rem / 30px)
- H1: 2xl (1.5rem / 24px)
- H2: xl (1.25rem / 20px)
- H3: lg (1.125rem / 18px)
- Body: base (1rem / 16px)
- Small: sm (0.875rem / 14px)
- Tiny: xs (0.75rem / 12px)

### **Spacing**
- Based on 4px grid
- Scale: 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem

### **Border Radius**
- sm: 0.25rem (4px)
- md: 0.5rem (8px) - default
- lg: 0.75rem (12px)
- xl: 1rem (16px)

### **Shadows**
- sm: Light shadow for cards
- md: Medium shadow for modals
- lg: Large shadow for dropdowns

### **Component Library**
- ShadCN UI components (60+ components)
- Lucide React icons
- Recharts for data visualization
- Sonner for toast notifications

### **Theme Support**
- Light mode
- Dark mode (full support)
- System preference detection
- Toggle in header

### **Responsive Breakpoints**
- sm: 640px (mobile)
- md: 768px (tablet)
- lg: 1024px (laptop)
- xl: 1280px (desktop)
- 2xl: 1536px (large desktop)

### **Accessibility**
- WCAG 2.1 Level AA compliant
- Keyboard navigation
- Screen reader support
- 4.5:1 color contrast minimum
- Focus indicators
- ARIA labels

---

## 🔐 **AUTHENTICATION & SECURITY**

### **Authentication**
- Supabase Auth
- JWT tokens
- Refresh tokens
- Session management (30 min timeout)
- Email verification
- Password reset flow
- Social login (Google, GitHub) - optional

### **Authorization**
- Role-based: User vs Admin
- Token validation on every request
- Protected routes
- Admin-only pages

### **Security Features**
- XSS prevention (input sanitization)
- SQL injection prevention (parameterized queries)
- CSRF protection
- Rate limiting (100 req/min per user)
- Password requirements (8+ chars, mixed case, numbers)
- Session timeout (30 min inactivity)
- Audit logging (all admin actions)

---

## 📊 **DATA ARCHITECTURE**

### **Database (Supabase PostgreSQL)**
- Main tables:
  - users
  - agents
  - phone_numbers
  - calls
  - call_recordings
  - call_transcripts
  - leads
  - campaigns
  - campaign_leads
  - transactions
  - api_keys
  - webhooks
  - audit_logs

### **KV Store**
- Quick key-value storage
- Functions: get, set, del, mget, mset, getByPrefix
- Used for: Settings, cache, temporary data

### **File Storage (Supabase Storage)**
- Buckets:
  - call-recordings (private)
  - user-avatars (public)
  - agent-icons (public)
  - documents (private)
- Signed URLs for private files
- Auto-delete after retention period

---

## 🔌 **API & INTEGRATIONS**

### **RESTful API**
- Endpoints for all CRUD operations
- Authentication: Bearer token
- Rate limiting
- Error handling
- API documentation

### **Webhooks**
- Event-driven notifications
- Configurable events
- Signature verification
- Retry logic

### **Third-party Integrations**
- ElevenLabs (voice synthesis)
- OpenAI (GPT models)
- Anthropic (Claude models)
- Twilio/Telnyx (phone services)
- Stripe (payments) - if applicable
- Zapier (automation) - optional

---

## 📱 **NAVIGATION STRUCTURE**

### **User App Sidebar**

**Main Sections:**
- Dashboard
- Agents
- Phone Numbers
- Calls
- Live Calls
- Analytics
- Testing
- Leads
- Campaigns
- Marketplace

**Collapsible Settings Section:**
- Settings (account)
- Billing
- API Keys
- Webhooks
- White Label

**Footer:**
- Theme toggle (dark/light)
- Balance widget: $47.52 → Top up
- Admin Panel button (red gradient)

### **Admin Panel Sidebar**

**Header:**
- Shield icon + "Admin Panel"
- Back to User App button

**Sections:**
- Dashboard
- User Management
- Billing & Revenue
- Usage Analytics
- Audit Logs
- Support Tools
- Content Moderation
- System & Resources

---

## 🚀 **PERFORMANCE REQUIREMENTS**

### **Speed**
- Initial load: <2 seconds
- Page transitions: <500ms
- Search results: <300ms
- Real-time updates: <2s polling interval

### **Optimization**
- Code splitting (lazy loading admin panel)
- Debounced search (300ms)
- React.memo for expensive components
- useMemo for calculations
- Image optimization (lazy loading)
- Bundle size: <1MB total

### **Scalability**
- Support 1000+ concurrent users
- Handle 10,000+ agents
- Process 100,000+ calls/day
- Store unlimited call recordings

---

## 📄 **DOCUMENTATION**

### **User Documentation**
- Getting started guide
- Agent creation tutorial
- Campaign setup guide
- Billing FAQ
- API documentation
- Video tutorials

### **Admin Documentation**
- Admin panel guide
- User management best practices
- Billing troubleshooting
- System monitoring guide
- Security best practices

---

## 🎯 **SUCCESS METRICS**

### **User Metrics**
- User signups
- Active users (DAU, MAU)
- Agent creation rate
- Call volume
- Campaign success rate
- User retention
- Feature adoption

### **Business Metrics**
- MRR (Monthly Recurring Revenue)
- ARR (Annual Recurring Revenue)
- ARPU (Average Revenue Per User)
- Churn rate
- CAC (Customer Acquisition Cost)
- LTV (Lifetime Value)

### **System Metrics**
- Uptime (target: 99.9%)
- Response time (<200ms)
- Error rate (<0.1%)
- Database latency (<50ms)
- Storage usage
- Cost per call

---

## ✅ **FEATURE CHECKLIST**

### **User Features** ✅
- [x] User authentication (signup, login, logout)
- [x] Dashboard with metrics
- [x] AI agent creation (full configuration)
- [x] AI agent management (edit, delete, duplicate)
- [x] Phone number purchase and management
- [x] Call history with filters
- [x] Individual call details
- [x] Live call monitoring
- [x] Analytics dashboard
- [x] Agent testing playground
- [x] Lead management (add, import, export)
- [x] Campaign creation and management
- [x] Campaign detail view
- [x] Account settings
- [x] Billing and payments
- [x] API key management
- [x] Webhook configuration
- [x] White label branding
- [x] Agent marketplace
- [x] Dark mode support
- [x] Mobile responsive design
- [x] Toast notifications
- [x] Error handling
- [x] Session timeout

### **Admin Features** ✅
- [x] Admin dashboard
- [x] User management (view, edit, suspend, delete)
- [x] User impersonation
- [x] Billing & revenue analytics
- [x] Usage analytics
- [x] Audit logs (complete trail)
- [x] Support tools (user lookup)
- [x] Content moderation
- [x] System monitoring
- [x] Failed payment management
- [x] Refund processing
- [x] Resource monitoring
- [x] Backup management
- [x] Alert system

### **Technical Features** ✅
- [x] React 18 + TypeScript
- [x] Tailwind CSS v4
- [x] ShadCN UI components
- [x] Supabase Auth
- [x] Supabase Database
- [x] Supabase Storage
- [x] Error boundaries
- [x] Input sanitization
- [x] Rate limiting
- [x] Code splitting
- [x] Performance optimization
- [x] Accessibility (WCAG AA)
- [x] Security hardening
- [x] Comprehensive documentation

---

## 📝 **CONCLUSION**

This PRD represents a complete, enterprise-grade AI Agent Management Platform with:

- **24 pages** (16 user + 8 admin)
- **Full CRUD** on all entities
- **Real-time monitoring**
- **Advanced analytics**
- **Complete security**
- **Production-ready quality**

All features are implemented and tested. The platform is ready for deployment and can scale to thousands of users and millions of calls.

**Total development effort:** ~300 hours
**Code quality:** Production-grade
**Documentation:** Comprehensive
**Status:** ✅ Complete & Ready
