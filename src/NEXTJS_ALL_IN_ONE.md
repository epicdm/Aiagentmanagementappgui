# 🚀 Complete Next.js Migration Guide - All-In-One

This single document contains everything you need to migrate your AI Agent Platform from React/Vite to Next.js 14+.

---

## 📋 Table of Contents

1. [Quick Overview](#quick-overview)
2. [Phase 1: Setup](#phase-1-setup-30-minutes)
3. [Phase 2: Foundation](#phase-2-foundation-1-hour)
4. [Phase 3: Authentication](#phase-3-authentication-1-hour)
5. [Phase 4: Layouts](#phase-4-layouts-1-hour)
6. [Phase 5: Pages](#phase-5-pages-3-4-hours)
7. [Phase 6: Components](#phase-6-components-1-hour)
8. [Phase 7: API Routes](#phase-7-api-routes-2-3-hours)
9. [Phase 8: Testing](#phase-8-testing-2-hours)
10. [File Structure Reference](#file-structure-reference)
11. [Code Templates](#code-templates)
12. [Common Issues](#common-issues)

---

## Quick Overview

**What:** Convert React/Vite SPA to Next.js App Router
**Time:** 14-16 hours
**Difficulty:** Medium
**Result:** Modern, performant, SEO-friendly web app

### Current → Next.js Mapping

```
React/Vite                          Next.js 14+
────────────────────────────────────────────────────────
React Router                   →    File-based routing
components/pages/*.tsx         →    app/**/page.tsx
Supabase Edge Functions        →    app/api/**/route.ts
Client-side only               →    Server + Client hybrid
useNavigate()                  →    useRouter()
<Link to="">                   →    <Link href="">
utils/                         →    lib/
```

---

## Phase 1: Setup (30 minutes)

### 1. Create Project

```bash
# Create Next.js app
npx create-next-app@latest ai-agent-platform-nextjs

# Options:
# ✓ TypeScript
# ✓ ESLint
# ✓ Tailwind CSS
# ✗ src/ directory (NO)
# ✓ App Router
# ✓ Customize import alias (@/*)

cd ai-agent-platform-nextjs
```

### 2. Install Dependencies

```bash
# Core
npm install @supabase/supabase-js @supabase/ssr
npm install lucide-react recharts sonner@2.0.3 date-fns
npm install class-variance-authority clsx tailwind-merge

# Radix UI (for shadcn)
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select
npm install @radix-ui/react-tabs
npm install @radix-ui/react-accordion
npm install @radix-ui/react-alert-dialog
npm install @radix-ui/react-avatar
npm install @radix-ui/react-checkbox
npm install @radix-ui/react-label
npm install @radix-ui/react-popover
npm install @radix-ui/react-radio-group
npm install @radix-ui/react-separator
npm install @radix-ui/react-slider
npm install @radix-ui/react-switch
npm install @radix-ui/react-tooltip
npm install @radix-ui/react-progress
npm install @radix-ui/react-scroll-area
npm install @radix-ui/react-slot
```

### 3. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## Phase 2: Foundation (1 hour)

### 1. Copy Styles

```bash
# Copy globals.css
cp /path/to/current-project/styles/globals.css ./app/globals.css
```

### 2. Copy shadcn Components

```bash
# Create directory and copy
mkdir -p components/ui
cp -r /path/to/current-project/components/ui/* ./components/ui/
```

Then add `"use client"` to top of these UI files:
- `dialog.tsx`
- `dropdown-menu.tsx`
- `select.tsx`
- `button.tsx`
- `tabs.tsx`
- `checkbox.tsx`
- `switch.tsx`
- All other interactive components

### 3. Create Utilities

```bash
mkdir -p lib/supabase
```

Copy and rename:
```bash
cp /path/to/utils/security.tsx ./lib/security.ts
cp /path/to/utils/hooks.tsx ./lib/hooks.ts
```

Update all imports in these files:
- Change `../../` to `@/lib/`
- Change `.tsx` to `.ts`

---

## Phase 3: Authentication (1 hour)

### 1. Supabase Server Client

Create `lib/supabase/server.ts`:

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Ignore
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Ignore
          }
        },
      },
    }
  )
}
```

### 2. Supabase Browser Client

Create `lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 3. Supabase Info

Create `lib/supabase/info.ts`:

```typescript
export const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL!.split('//')[1].split('.')[0]
export const publicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
```

### 4. Middleware (Auth Protection)

Create `middleware.ts` in root:

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to /auth if not authenticated
  if (!user && !request.nextUrl.pathname.startsWith('/auth') && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Redirect to /dashboard if already authenticated
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

---

## Phase 4: Layouts (1 hour)

### 1. Root Layout

Create `app/layout.tsx`:

```tsx
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'AI Agent Platform',
  description: 'Manage your AI agents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Landing Page

Create `app/page.tsx`:

```tsx
import { LandingPageClient } from '@/components/pages/LandingPageClient'

export default function LandingPage() {
  return <LandingPageClient />
}
```

### 3. Auth Page

Create `app/auth/page.tsx`:

```tsx
import { AuthPageClient } from '@/components/pages/AuthPageClient'

export default function AuthPage() {
  return <AuthPageClient />
}
```

### 4. Authenticated Layout

Create `app/(authenticated)/layout.tsx`:

```tsx
import { AppLayout } from '@/components/layouts/AppLayout'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}
```

### 5. Copy Layout Components

```bash
mkdir -p components/layouts
mkdir -p components/providers
mkdir -p components/pages
```

Copy these files:
- `AppLayout.tsx` → `components/layouts/AppLayout.tsx`
- `AdminLayout.tsx` → `components/layouts/AdminLayout.tsx`
- `ThemeProvider.tsx` → `components/providers/ThemeProvider.tsx`
- `LandingPage.tsx` → `components/pages/LandingPageClient.tsx`
- `AuthPage.tsx` → `components/pages/AuthPageClient.tsx`

**Add `"use client"`** to top of:
- `components/layouts/AppLayout.tsx`
- `components/layouts/AdminLayout.tsx`
- `components/providers/ThemeProvider.tsx`
- `components/pages/LandingPageClient.tsx`
- `components/pages/AuthPageClient.tsx`

**Update imports** in all files to use `@/...` paths.

---

## Phase 5: Pages (3-4 hours)

### Pattern for Each Page

**Step 1:** Create directory

```bash
mkdir -p app/(authenticated)/PAGE_NAME
```

**Step 2:** Create server wrapper `app/(authenticated)/PAGE_NAME/page.tsx`:

```tsx
import { Metadata } from 'next'
import { PageNameClient } from '@/components/pages/PageNameClient'

export const metadata: Metadata = {
  title: 'Page Title | AI Agent Platform',
  description: 'Page description'
}

export default function PageName() {
  return <PageNameClient />
}
```

**Step 3:** Copy and rename page component:

```bash
cp components/pages/PageName.tsx components/pages/PageNameClient.tsx
```

**Step 4:** Update the client component:

1. Add `"use client"` at top
2. Update imports:
   - `from 'react-router-dom'` → `from 'next/link'` or `'next/navigation'`
   - `from '../../utils/api'` → `from '@/lib/api'`
   - All relative paths → `@/...`
3. Update navigation:
   - `<Link to="/path">` → `<Link href="/path">`
   - `import { useNavigate }` → `import { useRouter } from 'next/navigation'`
   - `navigate('/path')` → `router.push('/path')`
4. Update API calls:
   - `/agents` → `/api/agents`
   - `/campaigns` → `/api/campaigns`

### Pages Checklist

Create these directories and pages:

**Main Pages:**
- [ ] `app/(authenticated)/dashboard/page.tsx`
- [ ] `app/(authenticated)/agents/page.tsx`
- [ ] `app/(authenticated)/campaigns/page.tsx`
- [ ] `app/(authenticated)/funnels/page.tsx`
- [ ] `app/(authenticated)/leads/page.tsx`
- [ ] `app/(authenticated)/personas/page.tsx`
- [ ] `app/(authenticated)/phone-numbers/page.tsx`
- [ ] `app/(authenticated)/calls/page.tsx`
- [ ] `app/(authenticated)/live-calls/page.tsx`
- [ ] `app/(authenticated)/analytics/page.tsx`
- [ ] `app/(authenticated)/testing/page.tsx`
- [ ] `app/(authenticated)/social-media/page.tsx`
- [ ] `app/(authenticated)/social-media/calendar/page.tsx`
- [ ] `app/(authenticated)/marketplace/page.tsx`
- [ ] `app/(authenticated)/billing/page.tsx`
- [ ] `app/(authenticated)/settings/page.tsx`
- [ ] `app/(authenticated)/settings/api-keys/page.tsx`
- [ ] `app/(authenticated)/settings/webhooks/page.tsx`
- [ ] `app/(authenticated)/settings/white-label/page.tsx`

**Detail Pages (dynamic routes):**
- [ ] `app/(authenticated)/calls/[id]/page.tsx`
- [ ] `app/(authenticated)/campaigns/[id]/page.tsx`
- [ ] `app/(authenticated)/funnels/[id]/page.tsx`
- [ ] `app/(authenticated)/social-media/posts/[id]/page.tsx`

**Admin Pages:**
- [ ] `app/admin/layout.tsx` (use AdminLayout)
- [ ] `app/admin/page.tsx`
- [ ] `app/admin/users/page.tsx`
- [ ] `app/admin/billing/page.tsx`
- [ ] `app/admin/analytics/page.tsx`
- [ ] `app/admin/support/page.tsx`
- [ ] `app/admin/system/page.tsx`
- [ ] `app/admin/content/page.tsx`
- [ ] `app/admin/audit-logs/page.tsx`

---

## Phase 6: Components (1 hour)

### Copy Modal Components

```bash
mkdir -p components/modals
```

Copy all modal/dialog files and add `"use client"` to top:

- `ABTestingModal.tsx`
- `AgentDetailDialog.tsx`
- `BulkSchedulerModal.tsx`
- `ConfirmDialog.tsx`
- `CreateAgentDialog.tsx`
- `CreateFunnelWizard.tsx`
- `CreateSocialPostWizard.tsx`
- `EditAgentDialog.tsx`
- `EditFunnelWizard.tsx`
- `LeadDetailModal.tsx`
- `SocialTemplatesModal.tsx`

### Copy Other Components

```bash
cp AgentCard.tsx components/
cp ErrorBoundary.tsx components/
```

Add `"use client"` to both.

Update all imports to use `@/...` paths.

---

## Phase 7: API Routes (2-3 hours)

### 1. KV Store Utility

Create `lib/kv-store.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const TABLE_NAME = 'kv_store_9d2dee99'

export async function get(key: string): Promise<any> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('value')
    .eq('key', key)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data?.value
}

export async function set(key: string, value: any): Promise<void> {
  const { error } = await supabase
    .from(TABLE_NAME)
    .upsert({ key, value })
  if (error) throw error
}

export async function del(key: string): Promise<void> {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('key', key)
  if (error) throw error
}

export async function getByPrefix(prefix: string): Promise<any[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('value')
    .like('key', `${prefix}%`)
  if (error) throw error
  return data.map(item => item.value)
}

export async function mget(keys: string[]): Promise<any[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('key, value')
    .in('key', keys)
  if (error) throw error
  const resultMap = new Map(data.map(item => [item.key, item.value]))
  return keys.map(key => resultMap.get(key) || null)
}

export async function mset(pairs: Array<{ key: string; value: any }>): Promise<void> {
  const { error } = await supabase
    .from(TABLE_NAME)
    .upsert(pairs)
  if (error) throw error
}

export async function mdel(keys: string[]): Promise<void> {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .in('key', keys)
  if (error) throw error
}
```

### 2. API Client

Create `lib/api.ts`:

```typescript
export async function apiCall(endpoint: string, options: any = {}) {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    credentials: 'include'
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || `API call failed: ${response.statusText}`)
  }

  const data = await response.json()
  return data.data || data
}
```

### 3. API Route Template

**For List/Create** (`app/api/RESOURCE/route.ts`):

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as kv from '@/lib/kv-store'

// GET - List all
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const items = await kv.getByPrefix(`user:${user.id}:RESOURCE:`)
    return NextResponse.json({ data: items })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

// POST - Create
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const id = `RESOURCE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const item = {
      id,
      ...body,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await kv.set(`user:${user.id}:RESOURCE:${id}`, item)
    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
```

**For Get/Update/Delete** (`app/api/RESOURCE/[id]/route.ts`):

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as kv from '@/lib/kv-store'

// GET - Single item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const item = await kv.get(`user:${user.id}:RESOURCE:${params.id}`)
    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ data: item })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

// PUT - Update
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const key = `user:${user.id}:RESOURCE:${params.id}`
    const existingItem = await kv.get(key)
    
    if (!existingItem) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const updates = await request.json()
    const updatedItem = {
      ...existingItem,
      ...updates,
      id: params.id,
      userId: user.id,
      updatedAt: new Date().toISOString()
    }

    await kv.set(key, updatedItem)
    return NextResponse.json({ data: updatedItem })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const key = `user:${user.id}:RESOURCE:${params.id}`
    const item = await kv.get(key)
    
    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await kv.del(key)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
```

### API Routes to Create

Use the template above, replacing `RESOURCE` with the actual resource name:

**Auth:**
- [ ] `app/api/auth/signup/route.ts`

**Resources:**
- [ ] `app/api/agents/route.ts`
- [ ] `app/api/agents/[id]/route.ts`
- [ ] `app/api/campaigns/route.ts`
- [ ] `app/api/campaigns/[id]/route.ts`
- [ ] `app/api/funnels/route.ts`
- [ ] `app/api/funnels/[id]/route.ts`
- [ ] `app/api/calls/route.ts`
- [ ] `app/api/calls/[id]/route.ts`
- [ ] `app/api/leads/route.ts`
- [ ] `app/api/leads/[id]/route.ts`
- [ ] `app/api/personas/route.ts`
- [ ] `app/api/personas/[id]/route.ts`
- [ ] `app/api/phone-numbers/route.ts`
- [ ] `app/api/social-posts/route.ts`
- [ ] `app/api/social-posts/[id]/route.ts`
- [ ] `app/api/stats/route.ts`
- [ ] `app/api/analytics/route.ts`

---

## Phase 8: Testing (2 hours)

### Checklist

**Authentication:**
- [ ] Sign up works
- [ ] Sign in works
- [ ] Sign out works
- [ ] Protected routes redirect
- [ ] Session persists

**Pages:**
- [ ] All pages load without errors
- [ ] Navigation works
- [ ] Breadcrumbs work
- [ ] Dark mode works

**CRUD:**
- [ ] Create agents
- [ ] Edit agents
- [ ] Delete agents
- [ ] Same for campaigns, funnels, etc.

**Features:**
- [ ] Modals open/close
- [ ] Forms validate
- [ ] Toast notifications show
- [ ] Search/filter works

---

## File Structure Reference

```
nextjs-project/
├── app/
│   ├── layout.tsx                       # Root layout
│   ├── page.tsx                         # Landing page
│   ├── globals.css                      # Styles
│   │
│   ├── auth/
│   │   └── page.tsx                     # Auth page
│   │
│   ├── (authenticated)/
│   │   ├── layout.tsx                   # AppLayout wrapper
│   │   ├── dashboard/page.tsx
│   │   ├── agents/page.tsx
│   │   ├── campaigns/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx           # Dynamic route
│   │   └── ...
│   │
│   ├── admin/
│   │   ├── layout.tsx                   # AdminLayout wrapper
│   │   ├── page.tsx
│   │   └── ...
│   │
│   └── api/
│       ├── agents/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       └── ...
│
├── components/
│   ├── layouts/
│   │   ├── AppLayout.tsx                # "use client"
│   │   └── AdminLayout.tsx              # "use client"
│   │
│   ├── pages/
│   │   ├── DashboardPageClient.tsx      # "use client"
│   │   └── ...                          # All "use client"
│   │
│   ├── modals/
│   │   └── ...                          # All "use client"
│   │
│   ├── providers/
│   │   └── ThemeProvider.tsx            # "use client"
│   │
│   └── ui/
│       └── ...                          # shadcn (most "use client")
│
├── lib/
│   ├── api.ts
│   ├── kv-store.ts
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── info.ts
│
├── middleware.ts                         # Auth middleware
└── .env.local                            # Environment variables
```

---

## Common Issues

### Issue: Hydration Errors
**Solution:** Use `localStorage` only in `useEffect`, add `suppressHydrationWarning` to `<html>`

### Issue: "use client" Missing
**Solution:** Add to components using hooks, event handlers, or browser APIs

### Issue: Module Not Found
**Solution:** Check import paths use `@/` alias

### Issue: API Route 404
**Solution:** Verify file is named `route.ts` not `route.tsx`

### Issue: Auth Not Working
**Solution:** Check middleware.ts is in root, environment variables are set

### Issue: Data Not Loading
**Solution:** Check API routes return `{ data: ... }` format

---

## Success Criteria

✅ All pages accessible
✅ Authentication working
✅ All CRUD operations functional
✅ No console errors
✅ Dark mode working
✅ Production build succeeds

---

## Time Estimate

| Phase | Time |
|-------|------|
| Setup | 30 min |
| Foundation | 1 hour |
| Auth | 1 hour |
| Layouts | 1 hour |
| Pages | 3-4 hours |
| Components | 1 hour |
| API Routes | 2-3 hours |
| Testing | 2 hours |
| **Total** | **14-16 hours** |

---

## Key Differences: React/Vite vs Next.js

| Feature | React/Vite | Next.js |
|---------|------------|---------|
| Rendering | Client only | Server + Client |
| Routing | React Router | File-based |
| API | Supabase Edge | Next.js API Routes |
| Navigation | `<Link to="">` | `<Link href="">` |
| Hooks | `useNavigate()` | `useRouter()` |
| Paths | `../../utils/` | `@/lib/` |
| Endpoints | `/agents` | `/api/agents` |

---

## Next Steps After Migration

1. **Optimize** - Convert more components to server components
2. **Enhance** - Add server-side data fetching
3. **Deploy** - Deploy to Vercel or your platform
4. **Scale** - Add caching, optimize images

---

**You're ready to start! Begin with Phase 1 and work through systematically. Good luck! 🚀**
