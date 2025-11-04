# 🚀 AI Agent Management Platform - Claude Code Ready PRD

## 📋 QUICK START FOR CLAUDE

**Current Status:** 95% complete, 24 pages built, all core functionality working  
**Mission:** Enhance existing pages with missing features from this PRD  
**Timeline:** 11 days (see implementation plan below)  
**Tech Stack:** React 18 + TypeScript + Tailwind CSS v4 + Supabase + Shadcn UI

---

## ⚡ CRITICAL INSTRUCTIONS

### DO NOT:
❌ Rebuild pages from scratch  
❌ Change file structure  
❌ Remove existing mock data  
❌ Modify protected files (`/supabase/functions/server/kv_store.tsx`, `/utils/supabase/info.tsx`, `/components/figma/ImageWithFallback.tsx`)  
❌ Create new directories outside `/components/pages/`

### DO:
✅ Read existing page files first before making changes  
✅ Use existing patterns and components  
✅ Enhance incrementally (one page at a time)  
✅ Test after each change  
✅ Follow the 11-day implementation plan  
✅ Use mock data from `/supabase/functions/server/mock-data.tsx`  
✅ Import UI components from `/components/ui/`  
✅ Use icons from `lucide-react`  
✅ Use charts from `recharts`

---

## 📂 EXISTING FILE STRUCTURE

All pages already exist in `/components/pages/`:

### User Pages (16 pages):
- ✅ DashboardPage.tsx - Needs: Activity feed, 2 charts
- ✅ AgentsPage.tsx - Needs: Search/filter, bulk actions
- ✅ CallsPage.tsx - Needs: 6 filters, summary cards
- ✅ CallDetailPage.tsx - Needs: Recording player, analysis tabs
- ✅ AnalyticsPage.tsx - Needs: 8 charts, 3 tables
- ✅ CampaignsPage.tsx - Needs: 6-step wizard, real stats
- ✅ CampaignDetailPage.tsx - Needs: Real-time monitoring
- ✅ LeadsPage.tsx - Needs: Import flow, bulk actions
- ✅ PhoneNumbersPage.tsx - Needs: Purchase flow
- ✅ SettingsPage.tsx - Needs: Complete 5 tabs
- ✅ BillingPage.tsx - Needs: Payment methods CRUD
- ✅ ApiKeysPage.tsx - Needs: Create flow with "show once"
- ✅ WebhooksPage.tsx - Needs: Test feature, logs
- ✅ TestingPage.tsx - Needs: 3 test modes
- ✅ MarketplacePage.tsx - Needs: Template grid, install flow
- ✅ WhiteLabelPage.tsx - Needs: Branding controls, preview
- ✅ LiveCallsPage.tsx - Needs: Live monitoring features

### Admin Pages (8 pages in `/components/pages/admin/`):
- ✅ AdminDashboardPage.tsx - Needs: System health, charts
- ✅ AdminUsersPage.tsx - Needs: Impersonation, actions
- ✅ AdminBillingPage.tsx - Needs: Revenue charts
- ✅ AdminAnalyticsPage.tsx - Needs: Usage charts
- ✅ AdminAuditLogsPage.tsx - Needs: Complete logging
- ✅ AdminSupportPage.tsx - Needs: User lookup
- ✅ AdminContentPage.tsx - Needs: Moderation tools
- ✅ AdminSystemPage.tsx - Needs: Monitoring, alerts

### Supporting Components:
- ✅ CreateAgentDialog.tsx - Needs: 3-step wizard
- ✅ EditAgentDialog.tsx - Working
- ✅ AgentCard.tsx - Working
- ✅ AppLayout.tsx - Working
- ✅ AdminLayout.tsx - Working

---

## 🎯 11-DAY IMPLEMENTATION PLAN

### **DAY 1-3: CORE PAGES** 

#### Day 1: Dashboard & Analytics
**File:** `/components/pages/DashboardPage.tsx`

**Current State:** Basic metrics cards working  
**Needs:**
1. Activity Feed component (right sidebar or bottom section)
   - Real-time activity list
   - Icons for each event type
   - "View all" link
2. Call Volume Chart (line chart, recharts)
   - Last 30 days
   - Hover tooltips
3. Success Rate Chart (bar chart, recharts)
   - By agent comparison

**Implementation:**
```tsx
// Add to DashboardPage.tsx
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Activity Feed Component
const ActivityFeed = () => {
  const activities = mockData.recentActivities; // From mock-data.tsx
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 py-3 border-b last:border-0">
            <activity.icon className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Call Volume Chart
const CallVolumeChart = () => {
  const data = mockData.callVolumeData; // Add to mock-data.tsx
  return (
    <Card>
      <CardHeader>
        <CardTitle>Call Volume (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calls" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
```

**File:** `/components/pages/AnalyticsPage.tsx`

**Needs 8 Charts:**
1. Call Volume Over Time (line)
2. Status Distribution (pie)
3. Calls By Agent (bar)
4. Revenue Trend (line)
5. Average Duration (area)
6. Peak Hours Heatmap (custom)
7. Geographic Distribution (bar)
8. Cost Analysis (stacked bar)

**Needs 3 Tables:**
1. Top Performing Agents
2. Call Outcome Breakdown
3. Cost by Service Type

---

#### Day 2: Calls & Call Detail

**File:** `/components/pages/CallsPage.tsx`

**Needs:**
1. 6 Filter Controls (top bar)
   - Date range picker (shadcn Calendar)
   - Direction dropdown (All/Inbound/Outbound)
   - Status dropdown (All/Completed/Failed/Missed)
   - Agent dropdown (multi-select)
   - Duration filter (slider)
   - Outcome filter
2. 4 Summary Cards (above table)
   - Total Calls Today
   - Average Duration
   - Success Rate
   - Total Cost Today
3. Enhanced pagination
4. Export to CSV button

**Implementation Pattern:**
```tsx
// Add filter state
const [filters, setFilters] = useState({
  dateRange: { from: null, to: null },
  direction: 'all',
  status: 'all',
  agents: [],
  duration: [0, 300],
  outcome: 'all'
});

// Summary Cards Component
const CallsSummaryCards = () => (
  <div className="grid gap-4 md:grid-cols-4 mb-6">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Total Calls Today</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{mockData.callsToday}</div>
        <p className="text-xs text-muted-foreground">+12% from yesterday</p>
      </CardContent>
    </Card>
    {/* Repeat for other 3 metrics */}
  </div>
);
```

**File:** `/components/pages/CallDetailPage.tsx`

**Needs:**
1. Recording Player Component
   - Audio player with waveform (use HTML5 audio)
   - Play/pause, seek, speed controls
   - Download button
2. Full Transcript Section
   - Speaker labels (Agent/Customer)
   - Timestamps
   - Searchable
   - Copy button
3. 4 Analysis Tabs:
   - Overview (call summary, outcome, tags)
   - Transcript (full conversation)
   - Sentiment Analysis (mock sentiment scores)
   - Action Items (extracted from transcript)

---

#### Day 3: Agents & Testing

**File:** `/components/pages/AgentsPage.tsx`

**Needs:**
1. Search functionality (filter by name/description)
2. Type filter dropdown (All/Inbound/Outbound/Hybrid)
3. Status filter (Active/Inactive/Draft)
4. Sort dropdown (Name/Recent/Most Calls)
5. Bulk actions (checkbox selection)
   - Activate/Deactivate selected
   - Delete selected (with confirmation)
   - Export selected

**File:** `/components/pages/TestingPage.tsx`

**Needs 3 Test Modes:**

1. **Voice Call Test**
   - Select agent dropdown
   - Enter phone number
   - "Start Test Call" button
   - Show call status (dialing, connected, ended)
   - Display transcript in real-time
   - Show test results (latency, clarity, accuracy)

2. **Text Simulation**
   - Chat interface
   - Type messages to agent
   - See AI responses
   - Test different scenarios
   - Export conversation

3. **Voice Preview**
   - Select agent & voice
   - Enter sample text
   - "Preview Voice" button
   - Play audio sample
   - Adjust voice settings

**Implementation:**
```tsx
const TestingPage = () => {
  const [testMode, setTestMode] = useState<'voice' | 'text' | 'preview'>('voice');
  
  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <Tabs value={testMode} onValueChange={(v) => setTestMode(v as any)}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="voice">Voice Call</TabsTrigger>
          <TabsTrigger value="text">Text Simulation</TabsTrigger>
          <TabsTrigger value="preview">Voice Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="voice">
          <VoiceCallTest />
        </TabsContent>
        <TabsContent value="text">
          <TextSimulation />
        </TabsContent>
        <TabsContent value="preview">
          <VoicePreview />
        </TabsContent>
      </Tabs>
    </div>
  );
};
```

---

### **DAY 4-5: CAMPAIGNS & LEADS**

#### Day 4: Campaigns

**File:** `/components/pages/CampaignsPage.tsx`

**Needs:**
1. Enhanced Campaign Cards with:
   - Progress bar with percentage
   - 4 stat boxes (Success/Pending/Failed/Cost)
   - Real-time status badge
   - Quick actions (Pause/Resume/Edit)
2. Create Campaign Wizard (6 steps):
   - Step 1: Campaign Name & Type
   - Step 2: Select Agent
   - Step 3: Call Schedule & Window
   - Step 4: Upload Leads (CSV)
   - Step 5: Retry Settings
   - Step 6: Review & Launch

**File:** `/components/pages/CampaignDetailPage.tsx`

**Needs:**
1. Real-time monitoring (updates every 5s)
   - Live call count
   - Success rate (updating)
   - Cost ticker
2. Campaign Timeline (visual progress)
3. Live Calls List (currently active)
4. Outcome Distribution Chart (pie)
5. Pause/Resume/Stop Campaign actions

**Implementation:**
```tsx
// Real-time updates
useEffect(() => {
  const interval = setInterval(() => {
    // Fetch updated campaign stats
    fetchCampaignStats(campaignId);
  }, 5000); // Every 5 seconds
  
  return () => clearInterval(interval);
}, [campaignId]);
```

---

#### Day 5: Leads

**File:** `/components/pages/LeadsPage.tsx`

**Needs:**
1. **Import Flow** (4-step dialog):
   - Step 1: Upload CSV file
   - Step 2: Map columns (phone, name, email, company)
   - Step 3: Duplicate detection & preview
   - Step 4: Import confirmation
2. **Bulk Actions Toolbar** (when rows selected):
   - Add to Campaign
   - Update Status
   - Add Tags
   - Export Selected
   - Delete Selected
3. **Advanced Filters:**
   - Source (Funnel/Campaign/Manual/Import)
   - Status (New/Contacted/Qualified/Converted/Lost)
   - Date range
   - Tags filter
4. **Lead Detail Dialog:**
   - Contact info
   - Activity timeline
   - Tags
   - Notes
   - Quick call button

---

### **DAY 6: SETTINGS & INTEGRATIONS**

#### Settings

**File:** `/components/pages/SettingsPage.tsx`

**Complete 5 Tabs:**

1. **Account Tab:**
   - Name, Email (read-only)
   - Company Name
   - Timezone selector
   - Profile photo upload

2. **Notifications Tab:**
   - Email notifications (checkboxes)
     - [ ] New calls
     - [ ] Campaign completion
     - [ ] Failed calls
     - [ ] Weekly summary
   - SMS notifications (toggle)
   - Webhook notifications (toggle)

3. **Preferences Tab:**
   - Default agent
   - Default voice
   - Default call window
   - Auto-retry settings
   - Call recording (on/off)

4. **Integrations Tab:**
   - Connected apps list
   - Zapier connection
   - CRM integrations
   - Calendar sync

5. **Security Tab:**
   - Change password
   - 2FA setup (toggle)
   - Active sessions list
   - API key management link

---

#### Billing

**File:** `/components/pages/BillingPage.tsx`

**Needs:**
1. **Payment Methods Section:**
   - Cards list (Visa ****1234)
   - Add Card button → Dialog with card form
   - Set as default action
   - Remove card (with confirmation)
2. **Top-up Balance Dialog:**
   - Amount selector ($50, $100, $250, Custom)
   - Payment method selector
   - Confirm button
3. **Invoices Table:**
   - Date, Amount, Status, Download PDF
   - Filter by date
   - Search

---

#### API Keys & Webhooks

**File:** `/components/pages/ApiKeysPage.tsx`

**Needs:**
1. **Create Key Dialog:**
   - Name input
   - Permissions (future)
   - Expiration date (optional)
   - "Create" button
2. **Show Key Once Alert:**
   - After creation, show full key in alert dialog
   - "Copy to clipboard" button
   - Warning: "Save this key now. You won't see it again."
   - "I've saved my key" confirmation checkbox
3. **Keys List:**
   - Name, Prefix (sk_live_****1234), Created, Last Used
   - Revoke button (with confirmation)

**File:** `/components/pages/WebhooksPage.tsx`

**Needs:**
1. **Test Webhook Feature:**
   - "Send Test Payload" button
   - Select event type
   - Shows request/response
   - Success/failure indicator
2. **Webhook Logs Table:**
   - Timestamp, Event, Status (200/400/500), Response Time
   - View payload button (dialog)
   - Retry failed webhook
   - Auto-refresh toggle

---

### **DAY 7: MARKETPLACE & WHITE LABEL**

**File:** `/components/pages/MarketplacePage.tsx`

**Needs:**
1. **Template Grid:**
   - Search bar
   - Category filters (Agents/Personas/Funnels/Campaigns)
   - Sort (Popular/Recent/Name)
2. **Template Cards:**
   - Preview image
   - Name & description
   - Category badge
   - Rating stars (if available)
   - "Use Template" button
3. **Template Detail Dialog** (5 tabs):
   - Overview (description, features)
   - Preview (screenshot/demo)
   - Configuration (what it includes)
   - Reviews (user ratings)
   - Installation (how to use)

**File:** `/components/pages/WhiteLabelPage.tsx`

**Needs:**
1. **Branding Controls:**
   - Logo upload (light & dark)
   - Primary color picker
   - Secondary color picker
   - Font selection (optional)
2. **Preview Mode:**
   - Toggle to see changes live
   - Shows dashboard with custom branding
   - Switch between light/dark mode
3. **Custom Domain:**
   - Input field
   - DNS instructions
   - Verification status
4. **Email Branding:**
   - Header logo
   - Footer text
   - Color scheme

---

### **DAY 8-10: ADMIN PANEL (8 Pages)**

#### Day 8: Admin Dashboard & Users

**File:** `/components/pages/admin/AdminDashboardPage.tsx`

**Needs:**
1. **5 System Metrics:**
   - Total Users
   - Total Calls (all users)
   - Active Agents
   - System Uptime
   - Revenue Today
2. **2 Charts:**
   - User Growth (line chart, last 90 days)
   - Revenue Trend (area chart)
3. **System Health Table:**
   - Service (API, Database, Voice Provider, Storage)
   - Status (🟢 Healthy / 🟡 Degraded / 🔴 Down)
   - Response Time
   - Last Check

**File:** `/components/pages/admin/AdminUsersPage.tsx`

**Needs:**
1. **User Impersonation:**
   - "Impersonate" button in actions
   - Opens confirmation dialog
   - Logs impersonation event
   - Shows banner when impersonating
   - "Exit Impersonation" button
2. **User Actions:**
   - Adjust billing (add credits, change plan)
   - Suspend account (with reason)
   - Delete account (with confirmation)
   - Send email
3. **User Detail Panel:**
   - Account info
   - Usage stats
   - Billing history
   - Activity log

---

#### Day 9: Admin Billing & Analytics

**File:** `/components/pages/admin/AdminBillingPage.tsx`

**Needs:**
1. **4 Revenue Cards:**
   - MRR (Monthly Recurring Revenue)
   - Total Revenue (all time)
   - ARPU (Average Revenue Per User)
   - Churn Rate
2. **Charts:**
   - Revenue by plan (pie)
   - MRR growth (line)
   - Payment success rate (bar)
3. **Failed Payments Table:**
   - User, Amount, Reason, Date, Retry button

**File:** `/components/pages/admin/AdminAnalyticsPage.tsx`

**Needs:**
1. **Usage Heatmap:**
   - Calls by hour & day of week
   - Color intensity shows volume
2. **Cost Breakdown Chart:**
   - By service (Calls, SMS, Storage)
   - Stacked bar chart
3. **Recommendations Panel:**
   - AI-generated insights
   - Cost optimization tips
   - Usage anomalies

---

#### Day 10: Admin Audit, Support, Content, System

**File:** `/components/pages/admin/AdminAuditLogsPage.tsx`

**Needs Complete Logging:**
1. **Log Every Action:**
   - User login/logout
   - Agent created/edited/deleted
   - Campaign started/stopped
   - Settings changed
   - Admin impersonation
   - Billing changes
2. **Severity Levels:**
   - Info (🔵 blue)
   - Warning (🟡 yellow)
   - Error (🔴 red)
   - Critical (🟣 purple)
3. **Filters:**
   - Severity
   - User
   - Action type
   - Date range
4. **Export:**
   - CSV export
   - JSON export
   - Filter before export

**File:** `/components/pages/admin/AdminSupportPage.tsx`

**Needs:**
1. **User Lookup:**
   - Search by email/phone/user ID
   - Shows user details instantly
   - Quick actions (view dashboard, impersonate, email)
2. **Error Tracking:**
   - Recent errors by user
   - Stack traces (if available)
   - Frequency chart

**File:** `/components/pages/admin/AdminContentPage.tsx`

**Needs:**
1. **Moderation Tabs:**
   - Agents (flagged/reported)
   - Personas (review queue)
   - Funnels (spam detection)
2. **Review Dialog:**
   - Content preview
   - Approve/Reject buttons
   - Ban user option
   - Reason textarea

**File:** `/components/pages/admin/AdminSystemPage.tsx`

**Needs:**
1. **Server Monitoring:**
   - CPU usage chart (real-time)
   - Memory usage chart
   - Disk space
   - Network traffic
2. **Server Status Table:**
   - Server name, Status, Uptime, Load
3. **Backups:**
   - Last backup date/time
   - Backup size
   - "Run Backup Now" button
   - Restore point list

---

### **DAY 11: POLISH & TESTING**

1. **Test Every Page:**
   - Load without errors
   - Dark mode works
   - Mobile responsive
   - All buttons functional
   - Forms validate properly
   - Mock data displays correctly

2. **Fix TypeScript Errors:**
   - Run `tsc --noEmit` to check
   - Fix any type errors

3. **Performance Check:**
   - No console errors
   - Fast page loads
   - Smooth animations

4. **Final Review:**
   - All 24 pages complete
   - All features working
   - Documentation updated

---

## 🎨 DESIGN SYSTEM (Already Implemented)

### Colors (from `/styles/globals.css`):
- Primary: `hsl(var(--primary))`
- Secondary: `hsl(var(--secondary))`
- Accent: `hsl(var(--accent))`
- Muted: `hsl(var(--muted))`
- Destructive: `hsl(var(--destructive))`

### Dark Mode:
Use: `className="bg-white dark:bg-slate-900"`

### Components (from `/components/ui/`):
All ShadCN components available. Import like:
```tsx
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
```

### Icons:
```tsx
import { Phone, Bot, Clock, DollarSign } from 'lucide-react';
```

### Charts:
```tsx
import { LineChart, BarChart, PieChart, AreaChart } from 'recharts';
```

---

## 📊 MOCK DATA STRUCTURE

**File:** `/supabase/functions/server/mock-data.tsx`

Add data as needed:
```tsx
export const mockData = {
  // Existing data...
  
  // Add for Activity Feed (Day 1)
  recentActivities: [
    {
      id: '1',
      type: 'call_completed',
      icon: Phone,
      description: 'Agent "Sales AI" completed call with +1 (555) 123-4567',
      timestamp: '2 minutes ago',
      userId: 'user1'
    },
    // ... more activities
  ],
  
  // Add for Charts (Day 1)
  callVolumeData: [
    { date: 'Jan 1', calls: 45 },
    { date: 'Jan 2', calls: 52 },
    // ... 30 days
  ],
  
  successRateByAgent: [
    { agent: 'Sales AI', rate: 87 },
    { agent: 'Support Bot', rate: 92 },
    // ...
  ],
  
  // ... etc for each feature
};
```

---

## ✅ TESTING CHECKLIST

After implementing each page, verify:

- [ ] Page loads without errors
- [ ] Dark mode toggle works
- [ ] Mobile responsive (375px, 768px, 1024px+)
- [ ] All buttons have onClick handlers
- [ ] All forms validate input
- [ ] Mock data displays correctly
- [ ] Navigation works
- [ ] Icons render
- [ ] Charts render (if applicable)
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Smooth transitions/animations

---

## 🚨 COMMON PATTERNS TO FOLLOW

### State Management:
```tsx
const [data, setData] = useState<Type[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Fetching Data:
```tsx
import { api } from '../utils/api';

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await api.getAgents();
      setData(result);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Dialogs:
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Tables:
```tsx
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.value}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## 🎯 PAGE-BY-PAGE QUICK REFERENCE

| Day | Page | File | Key Features to Add |
|-----|------|------|---------------------|
| 1 | Dashboard | DashboardPage.tsx | Activity feed, 2 charts |
| 1 | Analytics | AnalyticsPage.tsx | 8 charts, 3 tables |
| 2 | Calls | CallsPage.tsx | 6 filters, summary cards |
| 2 | Call Detail | CallDetailPage.tsx | Recording player, analysis tabs |
| 3 | Agents | AgentsPage.tsx | Search/filter, bulk actions |
| 3 | Testing | TestingPage.tsx | 3 test modes |
| 4 | Campaigns | CampaignsPage.tsx | 6-step wizard, enhanced cards |
| 4 | Campaign Detail | CampaignDetailPage.tsx | Real-time monitoring |
| 5 | Leads | LeadsPage.tsx | Import flow, bulk actions |
| 6 | Settings | SettingsPage.tsx | Complete 5 tabs |
| 6 | Billing | BillingPage.tsx | Payment methods, top-up |
| 6 | API Keys | ApiKeysPage.tsx | Create flow, show once |
| 6 | Webhooks | WebhooksPage.tsx | Test feature, logs |
| 7 | Marketplace | MarketplacePage.tsx | Template grid, detail dialog |
| 7 | White Label | WhiteLabelPage.tsx | Branding controls, preview |
| 8 | Admin Dashboard | AdminDashboardPage.tsx | 5 metrics, 2 charts, health table |
| 8 | Admin Users | AdminUsersPage.tsx | Impersonation, user actions |
| 9 | Admin Billing | AdminBillingPage.tsx | 4 revenue cards, charts |
| 9 | Admin Analytics | AdminAnalyticsPage.tsx | Heatmap, cost breakdown |
| 10 | Admin Audit | AdminAuditLogsPage.tsx | Complete logging, filters |
| 10 | Admin Support | AdminSupportPage.tsx | User lookup, error tracking |
| 10 | Admin Content | AdminContentPage.tsx | Moderation tabs, review |
| 10 | Admin System | AdminSystemPage.tsx | Monitoring, backups |

---

## 🎬 GETTING STARTED

1. **Read this entire PRD**
2. **Explore the existing codebase:**
   ```bash
   # Look at existing page structure
   cat components/pages/DashboardPage.tsx
   
   # Check mock data
   cat supabase/functions/server/mock-data.tsx
   
   # Review UI components
   ls components/ui/
   ```

3. **Start with Day 1:**
   - Open `/components/pages/DashboardPage.tsx`
   - Add Activity Feed component
   - Add Call Volume Chart
   - Add Success Rate Chart
   - Test in browser

4. **Move to next feature**
5. **Test after each change**
6. **Update mock data as needed**

---

## 💬 FINAL NOTES

- **Take it slow:** One page/feature at a time
- **Test frequently:** Check each change before moving on
- **Ask questions:** If unclear, ask for clarification
- **Use existing patterns:** Follow the code style already in place
- **Don't break things:** The 95% that works should keep working
- **Have fun:** You're building something amazing! 🚀

---

**Ready? Let's start with Day 1 - Dashboard & Analytics!** 🎯
