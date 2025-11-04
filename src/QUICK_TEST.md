# ⚡ Quick Test Script

## 🎯 Fast Test in 3 Steps

### Step 1: Check if App Starts
```bash
# Run the dev server
npm run dev
```

**Expected:** Server starts without errors, opens at http://localhost:5173

---

### Step 2: Open Browser Console
1. Open browser to `http://localhost:5173`
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Click **"Get Started"** → Sign in

**Expected:** No red errors in console

---

### Step 3: Test New Features

#### Quick Dashboard Test (30 seconds):
1. After login, you should see Dashboard
2. Scroll down - look for:
   - ✅ **Activity Feed** (left side, below charts)
   - ✅ **2 new charts** (Call Volume & Success Rate)
3. Toggle dark mode (moon icon) - charts should update

**✅ Pass:** Charts render, no errors  
**❌ Fail:** Blank cards or console errors

#### Quick Analytics Test (30 seconds):
1. Click **Analytics** in sidebar (chart icon)
2. Scroll through page - count the charts:
   - Should see **8 charts total** (various types)
   - Should see **3 large tables** at bottom
3. Hover over any chart - tooltip should appear

**✅ Pass:** All charts and tables visible  
**❌ Fail:** Missing charts or errors

---

## 🐛 If You See Errors

### Error: "Cannot find module 'recharts'"
**Fix:**
```bash
npm install recharts
# or
yarn add recharts
```

### Error: "Badge is not defined"
**Check:** Badge should be imported. If error persists, comment out Badge usage temporarily.

### Error: "getCallVolumeData is not defined"
**Cause:** Function might be in wrong scope  
**Fix:** I'll fix this if you report it

### Console shows: "No data available"
**Expected:** This happens if no agents exist yet  
**Fix:** Create an agent first (Dashboard → Quick Actions → Create Agent)

---

## 📊 What You Should See

### Dashboard Layout:
```
┌─────────────────────────────────────────┐
│ 6 Metric Cards (existing)              │
├─────────────────────────────────────────┤
│ Quick Actions (existing)                │
├──────────────────┬──────────────────────┤
│ Call Volume      │ Success Rate Chart  │ ← NEW
│ Chart (line)     │ (bar chart)         │ ← NEW
├──────────────────┴──────────────────────┤
│ Activity Feed    │ Recent Calls        │
│ (left)          │ (right)             │
│ ← NEW           │ (existing)          │
└─────────────────────────────────────────┘
```

### Analytics Layout:
```
┌─────────────────────────────────────────┐
│ 4 Metric Cards                          │
├─────────────────────────────────────────┤
│ Call Volume Chart (existing)            │
├─────────────────────────────────────────┤
│ Performance Table (existing)            │
├──────────────────┬─────────────────────┤
│ Chart 2          │ Chart 3            │ ← NEW
│ (Pie)           │ (Bar)              │ ← NEW
├──────────────────┼─────────────────────┤
│ Chart 4          │ Chart 5            │ ← NEW
│ (Line)          │ (Area)             │ ← NEW
├──────────────────┼─────────────────────┤
│ Chart 6          │ Chart 7            │ ← NEW
│ (Bar)           │ (Bar)              │ ← NEW
├──────────────────┼─────────────────────┤
│ Chart 8          │                     │ ← NEW
│ (Bar)           │                     │ ← NEW
├─────────────────────────────────────────┤
│ Table 1: Top Performing Agents          │ ← NEW
├─────────────────────────────────────────┤
│ Table 2: Call Outcome Breakdown         │ ← NEW
├─────────────────────────────────────────┤
│ Table 3: Cost By Service                │ ← NEW
└─────────────────────────────────────────┘
```

---

## ✅ Success = All This Works:

- [ ] App loads without errors
- [ ] Dashboard shows Activity Feed
- [ ] Dashboard shows 2 new charts
- [ ] Analytics shows 8 charts
- [ ] Analytics shows 3 tables
- [ ] Dark mode toggle works
- [ ] No console errors

---

## 🚨 Report Back:

**If Working:**
> "✅ All tests pass! Ready for Day 2."

**If Broken:**
> "❌ Issue: [describe what's broken]"
> "Console error: [paste error message]"

---

## 🎯 Next: Day 2 Preview

Once this works, we'll add:
- **CallsPage:** 6 filters + 4 summary cards + export
- **CallDetailPage:** Recording player + 4 analysis tabs

**Estimated time:** 1-2 hours to implement + test

---

**Start testing now! Let me know results in 2 minutes.** ⚡
