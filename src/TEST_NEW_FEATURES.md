# ✅ TEST GUIDE - New Features

## 🚀 Quick Test Instructions

### **1. Start the Application**
```bash
npm run dev
```

### **2. Sign In**
- Use any email/password (or create account)
- Platform will load the dashboard

---

## 🧪 TEST SALES FUNNELS

### **Step 1: Navigate to Sales Funnels**
1. Look at the left sidebar
2. Click **"Sales Funnels"** (should be 2nd item with TrendingUp icon)

### **Step 2: View Funnel List**
You should see:
- ✅ Page title "Sales Funnels" with subtitle
- ✅ "Create Funnel" button (top right)
- ✅ Search bar and status filter
- ✅ 4 summary stat cards
- ✅ 3 sample funnels in grid layout

### **Step 3: Inspect Funnel Cards**
Each card should show:
- ✅ Funnel name and description
- ✅ Status badge (● Live)
- ✅ Entry points with icons (phone, web form, chat)
- ✅ Stats: Calls, Qualified, Booked, Conversion %
- ✅ Conversion progress bar
- ✅ Three action buttons: Test, Analytics, Settings
- ✅ Dropdown menu (⋮) with options

### **Step 4: Test Interactions**
Try these:
1. **Search**: Type "home" → Should filter to Home Buyer funnel
2. **Filter**: Change status filter → Should update results
3. **Click "Test" button** → Should show toast: "Test call feature coming soon!"
4. **Click "Analytics" button** → Should show toast: "Funnel detail page coming soon..."
5. **Click dropdown menu** → Should show: View Analytics, Edit, Settings, Pause, Delete
6. **Click "Create Funnel"** → Should show toast: "Funnel creation wizard coming soon!"
7. **Click "Delete"** → Should remove funnel from list

### **Step 5: Check Responsive Design**
- Resize browser window
- Should adapt from 3 columns → 2 columns → 1 column
- Mobile menu should work

---

## 🎨 TEST SOCIAL MEDIA

### **Step 1: Navigate to Social Media**
1. Look at the left sidebar
2. Click **"Social Media"** (should be 3rd item with Share2 icon)

### **Step 2: View Connected State**
You should see:
- ✅ Page title "AI Social Media" with subtitle
- ✅ "Create Post" button (top right)
- ✅ Tabs: Overview, Posts, Calendar, Analytics
- ✅ 4 summary stat cards
- ✅ "Connected Accounts" section
- ✅ LinkedIn account card (Sarah Johnson)
- ✅ "Add Account" card (dashed border)
- ✅ "Recent Posts" section with 2 posts

### **Step 3: Inspect Connected Account**
LinkedIn account card should show:
- ✅ Blue LinkedIn icon
- ✅ Account name "Sarah Johnson" and handle "@sarah-johnson"
- ✅ Green "● Connected" badge
- ✅ Followers count: 2,456
- ✅ Avg Engagement: 4.2%
- ✅ Brand voice description (italic text)
- ✅ "Analyze Voice" button
- ✅ "Settings" button

### **Step 4: Inspect Posts**
Recent posts should show:
- ✅ Post #1: Scheduled badge, future date
- ✅ Post #2: Published badge, engagement metrics (2,134 views, 156 likes)
- ✅ Platform icons (LinkedIn)
- ✅ Content preview (truncated with ellipsis)

### **Step 5: Test Interactions**
Try these:
1. **Click "Create Post"** → Should show toast: "Content creation wizard coming soon!"
2. **Click "Analyze Voice"** → Should show toast: "Analyzing brand voice..." then "Complete!"
3. **Click "Connect Account"** (on Add Account card) → Should show toast: "Account connection coming soon!"
4. **Click different tabs** → Should show placeholder content with icons
5. **Click "Settings" on account** → Should show toast

### **Step 6: Test Empty State** (Optional)
To see the empty state:
1. Comment out the mock account in loadData()
2. Reload page
3. Should see:
   - ✅ 4 platform icons (LinkedIn, Twitter, Facebook, Instagram)
   - ✅ "Connect your social media accounts" heading
   - ✅ Description text
   - ✅ 4 connection buttons (2x2 grid)
   - ✅ Each button has platform icon and name

---

## 🎯 WHAT TO LOOK FOR

### **Visual Quality:**
- ✅ Clean, modern design
- ✅ Consistent spacing and alignment
- ✅ Proper icon sizes and colors
- ✅ Smooth hover effects
- ✅ Professional typography

### **Dark Mode:**
1. **Toggle dark mode** (button in sidebar)
2. Both pages should look good in dark mode
3. Check:
   - ✅ Background colors invert properly
   - ✅ Text remains readable
   - ✅ Cards have subtle backgrounds
   - ✅ Icons adapt to theme
   - ✅ Borders are visible

### **Functionality:**
- ✅ All buttons are clickable
- ✅ Toast notifications appear
- ✅ Navigation works smoothly
- ✅ Search and filters work
- ✅ No console errors
- ✅ Loading states show briefly

### **Responsive:**
Test these breakpoints:
- **Desktop (1280px+)**: 3-column grid for funnels, 2-column for social
- **Tablet (768px-1279px)**: 2-column grid
- **Mobile (<768px)**: 1-column grid, mobile menu

---

## 🐛 COMMON ISSUES & FIXES

### **Issue: Pages don't appear in navigation**
**Fix:** Refresh the browser, navigation should auto-update

### **Issue: Mock data doesn't load**
**Fix:** Check browser console for errors, data loads in useEffect

### **Issue: Toasts don't show**
**Fix:** Ensure Toaster component is present in App.tsx

### **Issue: Dark mode doesn't work**
**Fix:** ThemeProvider should wrap the entire app

### **Issue: Icons are missing**
**Fix:** Ensure lucide-react is installed: `npm install lucide-react`

---

## ✅ SUCCESS CHECKLIST

After testing, you should be able to confirm:

### **Sales Funnels:**
- [ ] Page loads without errors
- [ ] 3 funnels are visible
- [ ] Search and filter work
- [ ] All buttons respond
- [ ] Dropdown menu works
- [ ] Stats display correctly
- [ ] Dark mode works
- [ ] Mobile responsive

### **Social Media:**
- [ ] Page loads without errors
- [ ] Connected account shows
- [ ] Recent posts display
- [ ] Tabs switch correctly
- [ ] All buttons respond
- [ ] Stats display correctly
- [ ] Dark mode works
- [ ] Mobile responsive

---

## 📸 EXPECTED SCREENSHOTS

### **Sales Funnels - Desktop**
```
┌─────────────────────────────────────────────────────┐
│  Sales Funnels                    [Create Funnel]   │
│  Automate lead qualification                        │
├─────────────────────────────────────────────────────┤
│  [Search...] [Filter]                               │
├─────────────────────────────────────────────────────┤
│  [Total: 3] [Calls: 479] [Leads: 154] [Conv: 30%]  │
├─────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ Home Buyer   │  │ SaaS Demo    │  │ Support   │ │
│  │ Qual         │  │ Booking      │  │ Triage    │ │
│  │ ● Live       │  │ ● Live       │  │ ● Live    │ │
│  │ 156 calls    │  │ 89 calls     │  │ 234 calls │ │
│  │ 50% conv     │  │ 41% conv     │  │ 0% conv   │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
```

### **Social Media - Desktop**
```
┌─────────────────────────────────────────────────────┐
│  AI Social Media                  [Create Post]     │
│  Generate authentic content                         │
├─────────────────────────────────────────────────────┤
│  [Overview] [Posts] [Calendar] [Analytics]          │
├─────────────────────────────────────────────────────┤
│  [24 Posts] [12.4K Reach] [5.2% Eng] [+340 Foll]   │
├─────────────────────────────────────────────────────┤
│  Connected Accounts:                                │
│  ┌─────────────────────┐  ┌──────────────────────┐ │
│  │ 🔵 LinkedIn         │  │ [+] Add Account      │ │
│  │ Sarah Johnson       │  │                      │ │
│  │ ● Connected         │  │ Connect another      │ │
│  │ 2,456 followers     │  │ social account       │ │
│  │ Brand Voice: Prof.. │  │                      │ │
│  │ [Analyze] [Settings]│  │ [Connect Account]    │ │
│  └─────────────────────┘  └──────────────────────┘ │
│                                                     │
│  Recent Posts:                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │ 🔵 [Scheduled]                              │   │
│  │ AI isn't replacing marketers...             │   │
│  │ Scheduled for Nov 6                         │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🎉 SUCCESS!

If everything works as described, you've successfully tested:
- ✅ 2 new major features
- ✅ 2 new navigation items
- ✅ ~1,000 lines of new code
- ✅ Complete UI/UX implementation
- ✅ Dark mode support
- ✅ Mobile responsiveness

**Next:** Provide feedback and we'll build the creation wizards! 🚀
