# 🚀 Quick Reference Card

## 📁 **Key Files**

### **Entry Points**
- `/App.tsx` - Main application routing
- `/styles/globals.css` - Global styles & theme

### **Layouts**
- `/components/AppLayout.tsx` - User app layout
- `/components/AdminLayout.tsx` - Admin panel layout

### **Security & Utils**
- `/utils/security.tsx` - XSS prevention, validation, rate limiting
- `/utils/hooks.tsx` - Custom React hooks (debounce, session timeout, etc.)
- `/utils/api.tsx` - API utilities
- `/components/ErrorBoundary.tsx` - Error handling

### **Documentation**
- `/PRODUCTION_READY.md` - ⭐ Full production readiness report
- `/BEST_PRACTICES_AUDIT.md` - Complete best practices audit
- `/ADMIN_PANEL_GUIDE.md` - Admin panel user guide
- `/GETTING_STARTED.md` - Quick start guide

---

## 🎨 **Design System Quick Ref**

### **Colors**
```tsx
Primary:   bg-blue-600    text-blue-600
Success:   bg-green-600   text-green-600
Warning:   bg-yellow-600  text-yellow-600
Error:     bg-red-600     text-red-600
Admin:     bg-red-600     text-red-600
Neutral:   bg-slate-600   text-slate-600
```

### **Typography**
```tsx
<h1 className="text-3xl">Display</h1>
<h2 className="text-2xl">Heading 1</h2>
<h3 className="text-xl">Heading 2</h3>
<p className="text-base">Body</p>
<small className="text-sm">Small</small>
```

### **Spacing**
```tsx
p-4   // padding: 1rem (16px)
m-4   // margin: 1rem (16px)
gap-4 // gap: 1rem (16px)
```

---

## 🔧 **Custom Hooks**

```tsx
import { useDebounce, useSessionTimeout, useOnlineStatus } from './utils/hooks';

// Debounce search input
const debouncedSearch = useDebounce(searchQuery, 300);

// Auto-logout after inactivity
useSessionTimeout(() => handleLogout(), 30 * 60 * 1000);

// Check online status
const isOnline = useOnlineStatus();
```

---

## 🔐 **Security Utils**

```tsx
import { 
  sanitizeHTML, 
  sanitizeInput, 
  validatePassword,
  RateLimiter 
} from './utils/security';

// Prevent XSS
const safe = sanitizeHTML(userInput);

// Validate password
const { isValid, strength, feedback } = validatePassword(password);

// Rate limiting
const limiter = new RateLimiter(100, 60000); // 100 req/min
if (limiter.isAllowed(userId)) {
  // Allow request
}
```

---

## 🎯 **Common Patterns**

### **Loading State**
```tsx
{isLoading ? (
  <div className="space-y-4">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
  </div>
) : (
  <YourContent />
)}
```

### **Error Handling**
```tsx
try {
  const result = await api.call();
  toast.success("Success!");
} catch (error) {
  console.error('Error:', error);
  toast.error("Failed to complete action");
}
```

### **Confirmation Dialog**
```tsx
<ConfirmDialog
  open={showConfirm}
  onOpenChange={setShowConfirm}
  title="Delete Agent?"
  description="This action cannot be undone."
  variant="destructive"
  icon="delete"
  onConfirm={handleDelete}
/>
```

### **Toast Notifications**
```tsx
import { toast } from "sonner";

toast.success("Agent created!");
toast.error("Failed to save");
toast.warning("Low balance");
toast.info("New feature available");
```

---

## 📊 **Page Structure Template**

```tsx
export function YourPage({ accessToken }: { accessToken: string }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const result = await api.getData(accessToken);
      setData(result);
    } catch (err) {
      setError("Failed to load data");
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;
  if (!data.length) return <EmptyState />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl">Page Title</h1>
      {/* Content */}
    </div>
  );
}
```

---

## 🚀 **Component Usage**

### **ShadCN Components**
```tsx
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Dialog } from "./components/ui/dialog";
import { Select } from "./components/ui/select";

<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="destructive">Delete</Button>

<Badge variant="default">Active</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Error</Badge>

<Card className="p-6">
  <h3 className="mb-4">Title</h3>
  <p>Content</p>
</Card>
```

---

## 🎨 **Status Colors**

```tsx
// Active/Success
className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"

// Warning
className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"

// Error/Destructive
className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"

// Info/Default
className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"

// Neutral/Secondary
className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
```

---

## 📱 **Responsive Breakpoints**

```tsx
// Mobile First
className="text-sm sm:text-base md:text-lg lg:text-xl"

// Grid Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Flex Responsive
className="flex flex-col md:flex-row gap-4"

// Hide on Mobile
className="hidden md:block"

// Show only on Mobile
className="block md:hidden"
```

---

## 🔄 **State Management**

```tsx
// Local State
const [value, setValue] = useState(initial);

// Derived State
const filteredItems = useMemo(() => 
  items.filter(item => item.active),
  [items]
);

// Effect
useEffect(() => {
  // Run on mount or dependency change
  return () => {
    // Cleanup
  };
}, [dependency]);

// Callback
const handleClick = useCallback(() => {
  // Handler
}, [dependency]);
```

---

## 🌐 **API Calls**

```tsx
// GET
const data = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
}).then(r => r.json());

// POST
await fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});

// With Error Handling
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Request failed');
  const data = await response.json();
  return data;
} catch (error) {
  console.error('API Error:', error);
  toast.error('Failed to fetch data');
  throw error;
}
```

---

## ��� **Dark Mode**

```tsx
import { useTheme } from './components/ThemeProvider';

const { theme, toggleTheme } = useTheme();

// Theme-aware classes
<div className="bg-white dark:bg-slate-900">
  <p className="text-slate-900 dark:text-white">Text</p>
</div>
```

---

## 🔍 **Search & Filter**

```tsx
const [searchQuery, setSearchQuery] = useState("");
const debouncedQuery = useDebounce(searchQuery, 300);

const filtered = items.filter(item =>
  item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
);

<Input
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

---

## 📊 **Charts with Recharts**

```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData}>
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#3b82f6" />
  </LineChart>
</ResponsiveContainer>
```

---

## 🎯 **Navigation**

```tsx
// In App.tsx - Already set up
const handleNavigate = (page: string) => {
  setCurrentPage(page);
};

// From any component
<Button onClick={() => onNavigate('agents')}>
  View Agents
</Button>
```

---

## ✅ **Form Validation**

```tsx
import { validatePassword, isValidEmail } from './utils/security';

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!isValidEmail(email)) {
    toast.error("Invalid email");
    return;
  }
  
  const passwordCheck = validatePassword(password);
  if (!passwordCheck.isValid) {
    toast.error(passwordCheck.feedback[0]);
    return;
  }
  
  // Submit form
};
```

---

## 🚨 **Error Boundary Usage**

```tsx
// Already wrapped in App.tsx
// All components are protected

// To add custom fallback:
<ErrorBoundary 
  fallback={<YourCustomErrorUI />}
>
  <YourComponent />
</ErrorBoundary>
```

---

## 💾 **Local Storage**

```tsx
import { useLocalStorage } from './utils/hooks';

// Persists across sessions
const [settings, setSettings] = useLocalStorage('app-settings', {
  theme: 'light',
  notifications: true
});
```

---

## 🎨 **Icons**

```tsx
import { 
  User, Settings, LogOut, 
  Plus, Edit, Trash2, 
  CheckCircle, AlertCircle 
} from 'lucide-react';

<User className="h-5 w-5" />
<Settings className="h-4 w-4 text-blue-600" />
```

---

## 📋 **Table Pattern**

```tsx
<table className="w-full">
  <thead className="border-b dark:border-slate-700">
    <tr className="text-left text-sm text-slate-500">
      <th className="p-4">Name</th>
      <th className="p-4">Status</th>
      <th className="p-4">Actions</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item) => (
      <tr key={item.id} className="border-b dark:border-slate-700">
        <td className="p-4">{item.name}</td>
        <td className="p-4">
          <Badge>{item.status}</Badge>
        </td>
        <td className="p-4">
          <Button size="sm">Edit</Button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

---

## 🎯 **Quick Commands**

### **Add New Page**
1. Create `/components/pages/NewPage.tsx`
2. Add route in `/App.tsx`
3. Add navigation item in `/components/AppLayout.tsx`

### **Add New Admin Page**
1. Create `/components/pages/admin/AdminNewPage.tsx`
2. Add route in `/App.tsx` admin section
3. Add navigation in `/components/AdminLayout.tsx`

### **Add New Component**
1. Create `/components/NewComponent.tsx`
2. Import where needed
3. Use with proper props

### **Add New Utility**
1. Add to `/utils/[category].tsx`
2. Export function
3. Import and use

---

## 📚 **Documentation Files**

- `PRODUCTION_READY.md` - ⭐ Start here
- `BEST_PRACTICES_AUDIT.md` - Full audit
- `ADMIN_PANEL_GUIDE.md` - Admin guide
- `GETTING_STARTED.md` - Quick start
- `HOW_TO_TEST.md` - Testing guide

---

## 🔧 **Environment Variables**

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 🚀 **Deploy Checklist**

- [ ] Environment variables set
- [ ] Production build tested
- [ ] All features working
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] SSL certificate installed
- [ ] DNS configured
- [ ] Security headers set

---

## ⚡ **Performance Tips**

1. Use `React.memo` for expensive components
2. Use `useMemo` for expensive calculations
3. Use `useCallback` for event handlers
4. Debounce search inputs (300ms)
5. Lazy load images
6. Code split large routes
7. Optimize bundle size

---

## 🔐 **Security Reminders**

1. Always sanitize user input
2. Validate on client AND server
3. Never store sensitive data in localStorage
4. Use HTTPS in production
5. Implement rate limiting
6. Log security events
7. Keep dependencies updated

---

## 📞 **Need Help?**

1. Check `/PRODUCTION_READY.md` for overview
2. Check `/BEST_PRACTICES_AUDIT.md` for details
3. Review component examples in `/components/`
4. Check utility functions in `/utils/`

---

**Happy Coding! 🚀**
