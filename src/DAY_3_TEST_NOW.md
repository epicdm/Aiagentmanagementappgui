# ⚡ Day 3 - Test Now (3 Minutes)

## 🚀 Quick Test Steps

### AgentsPage (90 seconds):

```bash
1. Go to "AI Agents" in sidebar
2. See 4 stats cards at top?
3. Try Sort dropdown - select "Performance"
4. Try Status filter - select "Active"
5. Click checkbox on ONE agent card
6. Bulk actions bar appears?
7. Click "Select All" - all selected?
8. Click "Activate" button - toast appears?
9. Click more menu (⋮) on agent card
10. See "Activate/Deactivate" + "Delete" options?
11. Check health badge (top right of card) - color-coded?
12. Check performance bar - shows percentage?
13. Toggle dark mode - works?
```

**✅ Pass if:** All 13 items work

---

### PhoneNumbersPage (90 seconds):

```bash
1. Go to "Phone Numbers" in sidebar
2. See 4 stats cards at top?
3. Click "Buy Number" button - dialog opens?
4. Select country (United States)
5. Enter area code "415"
6. Click "Search Available Numbers"
7. Switch to "Available Numbers" tab - see 10 numbers?
8. Click "Purchase" on any number - added to list?
9. Click "Port Number" button - dialog opens?
10. Enter number "+1 555 123 4567"
11. Enter provider "Verizon"
12. Click "Submit" - number added with "pending" status?
13. Find any number card - toggle SMS switch
14. See toast confirmation?
15. Toggle dark mode - works?
```

**✅ Pass if:** All 15 items work

---

## 📸 What You Should See

### AgentsPage:
```
┌─────────────────────────────────────────┐
│ Header + Create Agent                  │
├─────────────────────────────────────────┤
│ [Bot] [Phone] [Chart] [Activity]       │ ← 4 Stats Cards
│  18     234    85%      15 healthy     │
├─────────────────────────────────────────┤
│ [Search] [Sort By ▼] [Status ▼] [Type ▼] │ ← Toolbar
├─────────────────────────────────────────┤
│ ☑ 3 selected  [Activate] [Deactivate] [Delete] │ ← Bulk Actions (when selected)
├─────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│ │☐ [✓ Healthy]                    │   │ ← Agent Cards with:
│ │ Sales Bot│ │Support │ │Qual Bot │   │   - Checkbox (top left)
│ │ ████ 85%│ │ ███ 72%│ │ ██ 65% │   │   - Health badge (top right)
│ │ 234 calls│ │ 156 cal│ │ 89 call│   │   - Performance bar
│ │ Edit [⋮] │ │ Edit [⋮]│ │ Edit [⋮]│   │   - Stats + Actions
│ └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
```

### PhoneNumbersPage:
```
┌─────────────────────────────────────────┐
│ Header  [Port Number] [Buy Number]     │
├─────────────────────────────────────────┤
│ [Phone] [Check] [Globe] [Message]      │ ← 4 Stats Cards
│  12     8       4        10             │
├─────────────────────────────────────────┤
│ ┌───────────────────────────────────┐  │
│ │ 📞 +1 (415) 555-1234   [Active]  │  │ ← Number Cards:
│ │ 🗺️ US                              │  │   - Color icon
│ │                                    │  │   - Status badge
│ │ ✓ Assigned to Sales Bot           │  │   - Assignment box
│ │                                    │  │   - Usage stats
│ │ Usage Stats    | Capabilities     │  │   - Voice + SMS toggle
│ │ 234 calls      | Voice: ✓         │  │
│ │ 12h 34m        | SMS: [●──]       │  │
│ │ $45.67         |                  │  │
│ │                [Assign]            │  │
│ └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

Buy Dialog:
┌─────────────────────────────────────────┐
│ Buy Phone Number                       │
│ ┌─────────────────────────────────┐   │
│ │ [Search Numbers] [Results]      │   │ ← Tabs
│ │                                  │   │
│ │ Country: [United States ▼]      │   │
│ │ Area Code: [415]                │   │
│ │ [Search Available Numbers]      │   │
│ └─────────────────────────────────┘   │
│                                        │
│ Results Tab:                           │
│ 📞 +1 (415) 555-1001 [Purchase $1/mo] │
│ 📞 +1 (415) 555-1002 [Purchase $1/mo] │
│ 📞 +1 (415) 555-1003 [Purchase $1/mo] │
│ ... (10 total)                         │
└─────────────────────────────────────────┘
```

---

## ✅ Quick Checklist

### AgentsPage:
- [ ] 4 stats cards
- [ ] Sort dropdown (4 options)
- [ ] Status filter (3 options)
- [ ] Type filter (3 options)
- [ ] Individual checkboxes
- [ ] Select all checkbox
- [ ] Bulk actions bar
- [ ] Health badges
- [ ] Performance bars
- [ ] More menu works
- [ ] Dark mode

### PhoneNumbersPage:
- [ ] 4 stats cards
- [ ] Buy button opens dialog
- [ ] Search tab works
- [ ] Results tab shows numbers
- [ ] Purchase works
- [ ] Port button opens dialog
- [ ] Port form works
- [ ] Status badges
- [ ] Country badges
- [ ] Assignment display
- [ ] SMS toggle
- [ ] Dark mode

---

## 🐛 Common Issues

**Issue: Bulk actions bar doesn't appear**
- Make sure checkbox is clicked
- Check if selectedAgents state is updating

**Issue: Buy dialog doesn't show numbers**
- Click "Search Available Numbers" first
- Then switch to "Available Numbers" tab

**Issue: Port creates duplicate numbers**
- This is expected - mock implementation
- In production, would check for duplicates

**Issue: SMS toggle doesn't work**
- Check if Switch component is imported
- Should show toast on toggle

**Issue: Health badges not showing**
- Agents need performance values
- Create agents first if none exist

---

## 📊 Report Format

**If All Working:**
```
✅ Day 3 Tests Passed!
- AgentsPage: 11/11 ✅
- PhoneNumbersPage: 12/12 ✅
Ready for Day 4!
```

**If Issues:**
```
❌ Issue Found:
Page: [AgentsPage or PhoneNumbersPage]
Problem: [describe what's broken]
Console: [paste error if any]
```

---

## 🎯 Next After Testing

**If tests pass:**
→ Continue to Day 4 (Testing & Live Calls)

**If tests fail:**
→ Report issues
→ Fix
→ Re-test
→ Then Day 4

---

**Test now! Takes 3 minutes.** ⚡

Full details in `/DAY_3_COMPLETE.md`
