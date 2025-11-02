# 🧪 How to Test - Step by Step

## 🎯 Complete Testing Guide

Follow these exact steps to see your dashboard populate with data:

---

## STEP 1: Sign In

1. Open the application
2. Click **"Get Started"** on landing page
3. Sign in with your account:
   - Email: `your@email.com`
   - Password: `your-password`
4. Click **"Sign In"**

✅ **Expected Result:** You're logged in and see the Dashboard

---

## STEP 2: See Welcome Screen

You should now see:

```
┌─────────────────────────────────────────┐
│  Dashboard                              │
│                                         │
│            🤖                           │
│     (Blue circle with bot icon)         │
│                                         │
│   Welcome to AI Agent Studio!           │
│                                         │
│   Get started by creating your first    │
│   AI voice agent. Build powerful        │
│   conversational experiences in         │
│   minutes.                              │
│                                         │
│   [Create Your First Agent]             │
│      (Big blue button)                  │
│                                         │
└─────────────────────────────────────────┘
```

✅ **Expected Result:** Welcome message with create button

---

## STEP 3: Create Your First Agent

1. Click **"Create Your First Agent"** button
2. A dialog appears

Fill in the form:
- **Agent Name:** Type `"Sales Bot"` (or any name you like)
- **Agent Type:** Select `"Voice Agent"`
- **AI Model:** Select `"GPT-4"`
- **Voice:** Select `"Alloy"` (or any voice)
- **Language:** Keep `"English (US)"`
- **System Prompt:** (Optional) Type something like:
  ```
  You are a helpful sales assistant. Be friendly and professional.
  ```

3. Click **"Create Agent"** button

✅ **Expected Result:** 
- Button changes to "Creating..."
- Wait 1-2 seconds

---

## STEP 4: See Success Message

You should see:
- ✅ **Green toast notification** at top/bottom of screen:
  ```
  ✓ Agent "Sales Bot" created successfully!
  ```
- Dialog closes automatically
- Brief loading spinner appears

✅ **Expected Result:** Success message and loading

---

## STEP 5: Dashboard Populates!

After 1-2 seconds of loading, you should see:

```
┌──────────────────────────────────────────────────┐
│  Dashboard                                       │
│  Welcome back! Here's your account overview      │
│                                                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ 🤖      │ │ 📱      │ │ 💬      │          │
│  │   1     │ │   1     │ │   15    │          │
│  │ Total   │ │ Phone   │ │ Calls   │          │
│  │ Agents  │ │ Numbers │ │ Today   │          │
│  │         │ │assigned │ │ +12% ↗ │          │
│  └─────────┘ └─────────┘ └─────────┘          │
│                                                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ 📊      │ │ 💰      │ │ 💵      │          │
│  │   50    │ │ $12.45  │ │ $127.50 │          │
│  │ Calls   │ │ Cost    │ │ Cost    │          │
│  │ This    │ │ Today   │ │ This    │          │
│  │ Month   │ │midnight │ │ Month   │          │
│  └─────────┘ └─────────┘ └─────────┘          │
│                                                  │
│  Quick Actions                                   │
│  ──────────────                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ 🤖       │ │ 📱       │ │ 📊       │       │
│  │ Manage   │ │ Phone    │ │ Call     │       │
│  │ Agents   │ │ Numbers  │ │ History  │       │
│  │ [Go →]   │ │ [Go →]   │ │ [Go →]   │       │
│  └──────────┘ └──────────┘ └──────────┘       │
│                                                  │
│  Recent Calls                    [View All]      │
│  ─────────────                                   │
│  ┌──────────────────────────────────────────┐  │
│  │ 💬 +1 (555) 123-4567  inbound  •  15m ago│  │
│  │    2:34  $0.63              [success]    │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │ 💬 +1 (555) 234-5678  outbound •  1h ago │  │
│  │    1:52  $0.46              [success]    │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │ 💬 +1 (555) 345-6789  inbound  •  3h ago │  │
│  │    3:15  $0.81              [success]    │  │
│  └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

✅ **Expected Result:** 
- 6 metric cards showing data
- 3 quick action cards
- 5 recent calls listed
- "View All" button visible

**🎉 SUCCESS! Your dashboard is now fully populated!**

---

## STEP 6: View All Calls

1. Click **"View All"** button (or "Call History" in sidebar)
2. You should see:

```
┌──────────────────────────────────────────────────┐
│  Call History                                    │
│  View and analyze your call logs                 │
│                                                  │
│  [🔍 Search] [Outcome ▼] [Direction ▼] [Export]│
│                                                  │
│  Table with 50 calls:                           │
│  ┌─────────────┬──────────┬─────────┬────────┐ │
│  │ Phone       │Direction │Duration │Outcome │ │
│  ├─────────────┼──────────┼─────────┼────────┤ │
│  │+1 555 123.. │inbound   │2:34     │success │ │
│  │+1 555 234.. │outbound  │1:52     │success │ │
│  │+1 555 345.. │inbound   │3:15     │success │ │
│  │... (47 more calls)                          │ │
│  └─────────────┴──────────┴─────────┴────────┘ │
│                                                  │
│  Showing 1-10 of 50        [1] [2] [3] [4] [5] │
└──────────────────────────────────────────────────┘
```

✅ **Expected Result:** Table showing 50 calls with pagination

---

## STEP 7: View Call Details

1. Click on any **successful call** (green "success" badge)
2. You should see a detailed page with:

```
┌──────────────────────────────────────────────────┐
│  ← Back to Calls                                 │
│                                                  │
│  Call Details                                    │
│  +1 (555) 123-4567 • Inbound • 2:34 • $0.63    │
│  15 minutes ago                    [success]     │
│                                                  │
│  🎵 Recording                                    │
│  ▶ ━━━━━━━━━━━━━━━━ 2:34                      │
│                                                  │
│  📊 Metrics                                      │
│  Quality: 4.8/5.0 ⭐  Talk: 2m 15s  CSAT: 4.7  │
│                                                  │
│  💬 Full Transcript                              │
│  Agent: Hello! Thank you for calling...          │
│  [00:00] 😊                                      │
│                                                  │
│  Customer: Hi, I'm interested in...              │
│  [00:05] 😊                                      │
│  ... (full conversation)                         │
│                                                  │
│  🤖 AI Analysis                                  │
│  Summary: Customer inquiry about AI agents...    │
│                                                  │
│  Key Points:                                     │
│  • Interested in customer support                │
│  • Pricing discussed: $0.15/min                  │
│  • Signed up for free trial                      │
│                                                  │
│  Action Items:                                   │
│  📌 Send signup link for free trial              │
│  📌 Follow up in 3 days                          │
└──────────────────────────────────────────────────┘
```

✅ **Expected Result:** Full call details with transcript and AI analysis

---

## STEP 8: Check Your Agent

1. Click **"AI Agents"** in sidebar
2. You should see:

```
┌──────────────────────────────────────────────────┐
│  AI Agents                                       │
│  Manage your voice and chat AI agents            │
│                                                  │
│  [+ Create Agent]                   [Search]     │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │  Sales Bot                                │  │
│  │  Voice Agent • GPT-4 • Alloy             │  │
│  │  🟢 Active                                │  │
│  │  Created: Just now                        │  │
│  │                                           │  │
│  │  [Edit] [Test] [Delete]                  │  │
│  └───────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

✅ **Expected Result:** Your newly created agent is visible

---

## 🎨 Testing Dark Mode

1. Scroll to bottom of sidebar
2. Click the **moon icon** button (🌙 Dark Mode)
3. Everything should turn dark:
   - Background: Dark slate (#0f172a)
   - Cards: Lighter dark (#1e293b)
   - Text: Light/white
   - Icons: Muted colors

4. Click again (☀️ Light Mode) to switch back

✅ **Expected Result:** Smooth transition between themes

---

## 🧪 Advanced Testing

### Test Creating Second Agent:
1. Go to Dashboard
2. Click quick action "Manage Agents"
3. Click "Create Agent"
4. Create another agent: "Support Bot"
5. Dashboard should update to show "2" agents

### Test Deleting Agent:
1. Go to "AI Agents"
2. Click "Delete" on an agent
3. Confirm deletion
4. Dashboard should update

### Test Navigation:
1. Dashboard → Click "Phone Numbers" quick action
2. Should see phone numbers page
3. Click "Dashboard" in sidebar
4. Should return to dashboard with data intact

---

## 🐛 Troubleshooting

### "Dashboard shows welcome message after creating agent"

**Fix:**
1. Refresh the page (F5 or Cmd+R)
2. Check browser console for errors
3. Check network tab - make sure API calls succeeded
4. Try creating another agent

### "Loading spinner never stops"

**Fix:**
1. Check server is running
2. Check browser console for errors
3. Check network tab for failed requests
4. Try refreshing the page

### "Calls not showing up"

**Fix:**
1. Navigate to "Call History" page directly
2. If still empty, check server logs
3. Try creating a new agent (generates fresh calls)
4. Refresh the page

### "Agent created but disappeared"

**Fix:**
1. Navigate to "AI Agents" page
2. Check if agent is there
3. If yes, go back to dashboard
4. Dashboard should show data now

---

## ✅ Success Criteria

After following all steps, you should have:

- ✅ Successfully created at least 1 agent
- ✅ Dashboard showing metrics (agents, calls, costs)
- ✅ 50 sample calls in call history
- ✅ Detailed call information with transcripts
- ✅ AI analysis and insights
- ✅ Dark mode working
- ✅ All navigation working
- ✅ No errors in console

---

## 📊 Expected Numbers

After creating your first agent:

| Metric | Expected Value |
|--------|---------------|
| Total Agents | 1 |
| Phone Numbers | 1 |
| Calls Today | ~10-20 |
| Calls This Month | 50 |
| Cost Today | ~$5-15 |
| Cost This Month | ~$100-150 |
| Recent Calls Shown | 5 |
| Total Calls in History | 50 |

*Note: Numbers may vary slightly due to randomization*

---

## 🎊 You Did It!

If you can see:
- ✅ Populated dashboard
- ✅ 50 calls in call history
- ✅ Full call details with transcripts
- ✅ AI analysis and insights

**Your AI Agent Studio is working perfectly!** 🚀

Now you can:
- Create more agents
- View detailed call analytics
- Test dark mode
- Explore all features
- Monitor live calls
- Manage campaigns
- And much more!

**Congratulations on setting up your complete AI agent management platform!** 🎉
