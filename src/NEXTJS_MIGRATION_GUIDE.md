# Next.js Migration Guide

## Overview
This guide provides a complete roadmap for migrating this React/Vite application to Next.js 14+ with App Router.

## Current Architecture
- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **Backend**: Supabase Edge Functions (Hono)
- **Auth**: Supabase Auth
- **Database**: Supabase KV Store
- **State**: React Context + localStorage
- **Styling**: Tailwind CSS v4 + shadcn/ui

## Target Architecture
- **Framework**: Next.js 14+ (App Router)
- **Routing**: Next.js App Router
- **Backend**: Next.js API Routes + Supabase Edge Functions
- **Auth**: Supabase Auth (with Next.js middleware)
- **Database**: Same (Supabase KV Store)
- **State**: React Context + Next.js cookies/sessions
- **Styling**: Same (Tailwind CSS + shadcn/ui)

---

## File Structure Mapping

### Current Structure → Next.js Structure

```
Current                          →  Next.js App Router
────────────────────────────────────────────────────────────
/App.tsx                         →  /app/layout.tsx + /app/page.tsx
/components/AppLayout.tsx        →  /app/(authenticated)/layout.tsx
/components/LandingPage.tsx      →  /app/page.tsx
/components/AuthPage.tsx         →  /app/auth/page.tsx

/components/pages/               →  /app/(authenticated)/
  DashboardPage.tsx              →    dashboard/page.tsx
  AgentsPage.tsx                 →    agents/page.tsx
  CallsPage.tsx                  →    calls/page.tsx
  CallDetailPage.tsx             →    calls/[id]/page.tsx
  CampaignsPage.tsx              →    campaigns/page.tsx
  CampaignDetailPage.tsx         →    campaigns/[id]/page.tsx
  FunnelsPage.tsx                →    funnels/page.tsx
  FunnelDetailPage.tsx           →    funnels/[id]/page.tsx
  LeadsPage.tsx                  →    leads/page.tsx
  PersonasPage.tsx               →    personas/page.tsx
  PhoneNumbersPage.tsx           →    phone-numbers/page.tsx
  LiveCallsPage.tsx              →    live-calls/page.tsx
  AnalyticsPage.tsx              →    analytics/page.tsx
  TestingPage.tsx                →    testing/page.tsx
  SocialMediaPage.tsx            →    social-media/page.tsx
  SocialPostDetailPage.tsx       →    social-media/posts/[id]/page.tsx
  SocialMediaCalendarPage.tsx    →    social-media/calendar/page.tsx
  MarketplacePage.tsx            →    marketplace/page.tsx
  ApiKeysPage.tsx                →    settings/api-keys/page.tsx
  WebhooksPage.tsx               →    settings/webhooks/page.tsx
  WhiteLabelPage.tsx             →    settings/white-label/page.tsx
  SettingsPage.tsx               →    settings/page.tsx
  BillingPage.tsx                →    billing/page.tsx

/components/pages/admin/         →  /app/admin/
  AdminDashboardPage.tsx         →    page.tsx
  AdminUsersPage.tsx             →    users/page.tsx
  AdminBillingPage.tsx           →    billing/page.tsx
  AdminAnalyticsPage.tsx         →    analytics/page.tsx
  AdminSupportPage.tsx           →    support/page.tsx
  AdminSystemPage.tsx            →    system/page.tsx
  AdminContentPage.tsx           →    content/page.tsx
  AdminAuditLogsPage.tsx         →    audit-logs/page.tsx

/components/                     →  /components/
  (All reusable components)      →    (Same structure)
  
/components/ui/                  →  /components/ui/
  (shadcn components)            →    (Same structure)

/utils/                          →  /lib/
  api.tsx                        →    api.ts
  hooks.tsx                      →    hooks.ts
  security.tsx                   →    security.ts
  supabase/                      →    supabase/
    client.tsx                   →      client.ts (add cookies handling)
    info.tsx                     →      info.ts

/supabase/functions/server/      →  /app/api/ (convert to Next.js API routes)
  index.tsx                      →    Various route handlers
  mock-data.tsx                  →    /lib/mock-data.ts
  kv_store.tsx                   →    Keep in Supabase (protected)

/styles/globals.css              →  /app/globals.css
```

---

## Step-by-Step Migration Process

### Phase 1: Project Setup (30 minutes)

1. **Create Next.js Project**
```bash
npx create-next-app@latest ai-agent-platform
cd ai-agent-platform
```

Select options:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Customize default import alias: Yes (@/*)

2. **Install Dependencies**
```bash
npm install @supabase/supabase-js
npm install lucide-react
npm install recharts
npm install sonner@2.0.3
npm install date-fns
npm install @radix-ui/react-* (all the radix UI packages used by shadcn)
```

3. **Copy Environment Variables**
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Phase 2: Copy UI Foundation (1 hour)

1. **Copy Tailwind Config**
   - Copy `/styles/globals.css` → `/app/globals.css`
   - Update Tailwind v4 to v3 syntax if needed

2. **Copy shadcn/ui Components**
   - Copy entire `/components/ui/` → `/components/ui/`
   - Add `"use client"` to all interactive components

3. **Copy Utility Functions**
   - Copy `/utils/` → `/lib/`
   - Rename `.tsx` to `.ts`
   - Update imports from `./utils/` to `@/lib/`

4. **Setup Supabase Client**
   - Create `/lib/supabase/client.ts` with cookie handling
   - Create `/lib/supabase/server.ts` for server components

### Phase 3: Setup Authentication (1 hour)

1. **Create Auth Layout**
```tsx
// app/auth/layout.tsx
export default function AuthLayout({ children }) {
  return <div className="auth-container">{children}</div>
}
```

2. **Create Auth Page**
```tsx
// app/auth/page.tsx
"use client"
import { AuthPage } from '@/components/AuthPage'
export default function Auth() {
  return <AuthPage />
}
```

3. **Create Middleware**
```tsx
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // Check authentication
  // Redirect to /auth if not authenticated
  // Allow access if authenticated
}

export const config = {
  matcher: ['/((?!auth|api|_next/static|_next/image|favicon.ico).*)']
}
```

4. **Create Auth Context**
```tsx
// components/AuthProvider.tsx
"use client"
import { createContext, useContext, useEffect, useState } from 'react'
// Similar to current ThemeProvider pattern
```

### Phase 4: Convert Pages (3-4 hours)

For each page, follow this pattern:

1. **Create route directory**
```bash
mkdir -p app/(authenticated)/dashboard
```

2. **Create page.tsx**
```tsx
// app/(authenticated)/dashboard/page.tsx
import { DashboardPageClient } from '@/components/pages/DashboardPageClient'

export const metadata = {
  title: 'Dashboard | AI Agent Platform',
  description: 'Manage your AI agents'
}

// Optional: Fetch data on server
async function getData() {
  // Server-side data fetching
}

export default function DashboardPage() {
  // const data = await getData() // If server component
  return <DashboardPageClient />
}
```

3. **Create client component**
```tsx
// components/pages/DashboardPageClient.tsx
"use client"
// Copy existing DashboardPage.tsx content here
// Add "use client" directive
```

### Phase 5: Convert API Routes (2-3 hours)

Convert Supabase Edge Functions to Next.js API routes:

**Current:** `/supabase/functions/server/index.tsx`
```tsx
app.post('/make-server-9d2dee99/agents', async (c) => {
  // Handler logic
})
```

**Next.js:** `/app/api/agents/route.ts`
```tsx
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const body = await request.json()
  
  // Handler logic
  
  return NextResponse.json({ data })
}
```

Convert each route:
- `/make-server-9d2dee99/agents` → `/api/agents/route.ts`
- `/make-server-9d2dee99/campaigns` → `/api/campaigns/route.ts`
- `/make-server-9d2dee99/funnels` → `/api/funnels/route.ts`
- etc.

### Phase 6: Update API Client (1 hour)

Update `/lib/api.ts`:

**Before:**
```tsx
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-9d2dee99/agents`,
  {
    headers: {
      Authorization: `Bearer ${publicAnonKey}`
    }
  }
)
```

**After:**
```tsx
const response = await fetch('/api/agents', {
  headers: {
    'Content-Type': 'application/json'
  }
})
```

### Phase 7: Handle Dynamic Routes (1 hour)

Convert detail pages with dynamic parameters:

**Current:** `CallDetailPage.tsx` (uses React Router `useParams`)
```tsx
const { id } = useParams()
```

**Next.js:** `/app/(authenticated)/calls/[id]/page.tsx`
```tsx
export default function CallDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  return <CallDetailPageClient id={params.id} />
}
```

### Phase 8: Update Navigation (30 minutes)

Replace React Router `<Link>` with Next.js `<Link>`:

**Before:**
```tsx
import { Link } from 'react-router-dom'
<Link to="/agents">Agents</Link>
```

**After:**
```tsx
import Link from 'next/link'
<Link href="/agents">Agents</Link>
```

Update `useNavigate()` to `useRouter()`:

**Before:**
```tsx
import { useNavigate } from 'react-router-dom'
const navigate = useNavigate()
navigate('/agents')
```

**After:**
```tsx
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/agents')
```

### Phase 9: Handle Client Components (1 hour)

Add `"use client"` directive to components that use:
- `useState`, `useEffect`, `useContext`
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`localStorage`, `window`, etc.)
- React Router hooks (now Next.js hooks)

**Files that need "use client":**
- All `/components/pages/*PageClient.tsx`
- All modal components
- All dialog components
- All form components
- Context providers
- Components using hooks

### Phase 10: Optimize Images (30 minutes)

Replace `<ImageWithFallback>` with Next.js `<Image>`:

**Before:**
```tsx
<ImageWithFallback src="/image.png" alt="Image" />
```

**After:**
```tsx
import Image from 'next/image'
<Image src="/image.png" alt="Image" width={500} height={300} />
```

### Phase 11: Setup Layouts (1 hour)

Create layout hierarchy:

```tsx
// app/layout.tsx - Root layout
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

// app/(authenticated)/layout.tsx - Authenticated layout
import { AppLayout } from '@/components/AppLayout'

export default function AuthenticatedLayout({ children }) {
  return <AppLayout>{children}</AppLayout>
}

// app/admin/layout.tsx - Admin layout
import { AdminLayout } from '@/components/AdminLayout'

export default function AdminLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>
}
```

### Phase 12: Testing & Validation (2 hours)

1. **Test Authentication Flow**
   - Sign up
   - Sign in
   - Sign out
   - Protected routes

2. **Test All Pages**
   - Navigate to each page
   - Verify data loads
   - Check responsiveness

3. **Test CRUD Operations**
   - Create agents
   - Edit agents
   - Delete agents
   - Repeat for campaigns, funnels, etc.

4. **Test API Routes**
   - Verify all endpoints work
   - Check error handling
   - Validate responses

---

## Key Differences & Gotchas

### 1. Server vs Client Components
- **Default**: Server components (no "use client")
- **Need "use client"**: Interactive components, hooks, event handlers
- **Can't use in server components**: `useState`, `useEffect`, browser APIs

### 2. Data Fetching
- **Server components**: Use `async/await` directly in component
- **Client components**: Use `useEffect` + `useState` or React Query

### 3. Environment Variables
- **Client-side**: Must prefix with `NEXT_PUBLIC_`
- **Server-side**: No prefix needed
- Access via `process.env.VARIABLE_NAME`

### 4. Routing
- **File-based**: Each `page.tsx` creates a route
- **Dynamic routes**: Use `[param]` folders
- **Route groups**: Use `(name)` folders (don't affect URL)

### 5. API Routes
- **Location**: `/app/api/*/route.ts`
- **Methods**: Export `GET`, `POST`, `PUT`, `DELETE` functions
- **Request/Response**: Use Next.js types

### 6. Metadata
- **Server components**: Export `metadata` object
- **Client components**: Use `<Head>` component in layout

### 7. CSS & Styling
- **Global CSS**: Only import in root layout
- **CSS Modules**: Supported (`.module.css`)
- **Tailwind**: Works the same

### 8. Images
- **Optimization**: Use `next/image` for auto-optimization
- **Static**: Place in `/public/` folder

---

## Component-by-Component Guide

### Components Needing "use client"

```tsx
// All these need "use client" directive at the top

// Modal & Dialog Components
ABTestingModal.tsx
AgentDetailDialog.tsx
CreateAgentDialog.tsx
CreateFunnelWizard.tsx
CreateSocialPostWizard.tsx
EditAgentDialog.tsx
EditFunnelWizard.tsx
LeadDetailModal.tsx
SocialTemplatesModal.tsx
BulkSchedulerModal.tsx
ConfirmDialog.tsx

// Interactive Components
AgentCard.tsx (has onClick)
ThemeProvider.tsx (uses context)
ErrorBoundary.tsx (uses state)

// All Page Components
components/pages/* (all of them)
components/pages/admin/* (all of them)
```

### Components That Can Be Server Components

```tsx
// These can remain server components (no "use client")

// Layouts (convert to Next.js layouts)
AdminLayout.tsx → app/admin/layout.tsx
AppLayout.tsx → app/(authenticated)/layout.tsx

// Note: Even layouts may need "use client" if they use state/context
```

### Utility Files (No Changes Needed)

```tsx
// These work as-is, just rename to .ts

utils/security.tsx → lib/security.ts
utils/hooks.tsx → lib/hooks.ts (but may need "use client" if used in client)
components/ui/utils.ts (no change)
```

---

## API Routes Conversion Table

| Current Route | Next.js Route | Method |
|--------------|---------------|--------|
| `/make-server-9d2dee99/signup` | `/api/auth/signup/route.ts` | POST |
| `/make-server-9d2dee99/agents` | `/api/agents/route.ts` | GET, POST |
| `/make-server-9d2dee99/agents/:id` | `/api/agents/[id]/route.ts` | GET, PUT, DELETE |
| `/make-server-9d2dee99/campaigns` | `/api/campaigns/route.ts` | GET, POST |
| `/make-server-9d2dee99/campaigns/:id` | `/api/campaigns/[id]/route.ts` | GET, PUT, DELETE |
| `/make-server-9d2dee99/funnels` | `/api/funnels/route.ts` | GET, POST |
| `/make-server-9d2dee99/funnels/:id` | `/api/funnels/[id]/route.ts` | GET, PUT, DELETE |
| `/make-server-9d2dee99/calls` | `/api/calls/route.ts` | GET, POST |
| `/make-server-9d2dee99/leads` | `/api/leads/route.ts` | GET, POST |
| `/make-server-9d2dee99/personas` | `/api/personas/route.ts` | GET, POST |
| `/make-server-9d2dee99/phone-numbers` | `/api/phone-numbers/route.ts` | GET, POST |
| `/make-server-9d2dee99/social-posts` | `/api/social-posts/route.ts` | GET, POST |
| `/make-server-9d2dee99/analytics` | `/api/analytics/route.ts` | GET |

---

## Quick Reference Checklist

### Before Migration
- [ ] Backup current code
- [ ] Document all environment variables
- [ ] Test all features in current app
- [ ] Export mock data if needed

### During Migration
- [ ] Create Next.js project
- [ ] Install all dependencies
- [ ] Copy `/styles/globals.css`
- [ ] Copy `/components/ui/*`
- [ ] Copy `/utils/*` to `/lib/*`
- [ ] Add "use client" to interactive components
- [ ] Convert pages to Next.js pages
- [ ] Create API routes
- [ ] Update all imports
- [ ] Replace React Router with Next.js navigation
- [ ] Setup middleware for auth
- [ ] Create layouts
- [ ] Test each feature

### After Migration
- [ ] Test authentication flow
- [ ] Test all CRUD operations
- [ ] Test all pages
- [ ] Verify API routes work
- [ ] Check responsive design
- [ ] Verify dark mode works
- [ ] Test error handling
- [ ] Optimize images
- [ ] Add proper metadata
- [ ] Setup deployment

---

## Example: Converting a Page

### Current: DashboardPage.tsx
```tsx
// components/pages/DashboardPage.tsx
import { useState, useEffect } from 'react'
import { useAuth } from '../ThemeProvider'
import { apiCall } from '../../utils/api'

export function DashboardPage() {
  const [stats, setStats] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    const data = await apiCall('/stats')
    setStats(data)
  }

  return <div>Dashboard content...</div>
}
```

### Next.js: Split into Server + Client

```tsx
// app/(authenticated)/dashboard/page.tsx (Server Component)
import { DashboardPageClient } from '@/components/pages/DashboardPageClient'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Dashboard | AI Agent Platform'
}

async function getStats() {
  const supabase = createClient()
  // Fetch data server-side if needed
  return {}
}

export default async function DashboardPage() {
  // const stats = await getStats() // Optional server-side fetch
  return <DashboardPageClient />
}
```

```tsx
// components/pages/DashboardPageClient.tsx (Client Component)
"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '../ThemeProvider'
import { apiCall } from '@/lib/api'

export function DashboardPageClient() {
  const [stats, setStats] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () {
    const data = await apiCall('/api/stats') // Note: /api/ prefix
    setStats(data)
  }

  return <div>Dashboard content...</div>
}
```

---

## Estimated Timeline

| Phase | Duration | Complexity |
|-------|----------|------------|
| Project Setup | 30 min | Easy |
| UI Foundation | 1 hour | Easy |
| Authentication | 1 hour | Medium |
| Convert Pages | 3-4 hours | Medium |
| API Routes | 2-3 hours | Medium |
| Update API Client | 1 hour | Easy |
| Dynamic Routes | 1 hour | Easy |
| Navigation | 30 min | Easy |
| Client Components | 1 hour | Easy |
| Images | 30 min | Easy |
| Layouts | 1 hour | Medium |
| Testing | 2 hours | Medium |
| **TOTAL** | **14-16 hours** | **Medium** |

---

## Troubleshooting

### Common Issues

1. **"use client" errors**
   - Add "use client" to components using hooks/events
   - Check import chains - if A imports B with hooks, A needs "use client"

2. **Hydration errors**
   - Check for `localStorage` use (only in `useEffect`)
   - Ensure server/client HTML matches
   - Use `suppressHydrationWarning` for theme

3. **Module not found**
   - Check import paths use `@/` alias
   - Verify file extensions (.ts vs .tsx)
   - Ensure files are in correct directories

4. **API route errors**
   - Check method exports (GET, POST, etc.)
   - Verify Supabase client creation
   - Check CORS settings

5. **Auth not working**
   - Verify middleware is setup
   - Check cookie configuration
   - Ensure environment variables are set

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase with Next.js](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [shadcn/ui with Next.js](https://ui.shadcn.com/docs/installation/next)

---

## Notes

- Keep Supabase Edge Functions if you prefer (they can coexist with Next.js API routes)
- Some developers prefer server actions over API routes for mutations
- Consider using React Query (TanStack Query) for better data fetching
- Use Next.js Image component for automatic optimization
- Leverage Server Components for better performance where possible
