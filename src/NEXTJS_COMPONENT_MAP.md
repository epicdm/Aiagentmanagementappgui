# Next.js Component Mapping

## Directory Structure for Next.js

```
nextjs-project/
├── app/
│   ├── layout.tsx                          # Root layout (ThemeProvider, Toaster)
│   ├── page.tsx                            # Landing page
│   ├── globals.css                         # Copied from /styles/globals.css
│   │
│   ├── auth/
│   │   └── page.tsx                        # Auth page (login/signup)
│   │
│   ├── (authenticated)/                    # Route group (uses AppLayout)
│   │   ├── layout.tsx                      # AppLayout wrapper
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx                    # Dashboard
│   │   │
│   │   ├── agents/
│   │   │   └── page.tsx                    # Agents list
│   │   │
│   │   ├── calls/
│   │   │   ├── page.tsx                    # Calls list
│   │   │   └── [id]/
│   │   │       └── page.tsx                # Call detail
│   │   │
│   │   ├── campaigns/
│   │   │   ├── page.tsx                    # Campaigns list
│   │   │   └── [id]/
│   │   │       └── page.tsx                # Campaign detail
│   │   │
│   │   ├── funnels/
│   │   │   ├── page.tsx                    # Funnels list
│   │   │   └── [id]/
│   │   │       └── page.tsx                # Funnel detail
│   │   │
│   │   ├── leads/
│   │   │   └── page.tsx                    # Leads management
│   │   │
│   │   ├── personas/
│   │   │   └── page.tsx                    # Personas management
│   │   │
│   │   ├── phone-numbers/
│   │   │   └── page.tsx                    # Phone numbers
│   │   │
│   │   ├── live-calls/
│   │   │   └── page.tsx                    # Live calls monitoring
│   │   │
│   │   ├── analytics/
│   │   │   └── page.tsx                    # Analytics dashboard
│   │   │
│   │   ├── testing/
│   │   │   └── page.tsx                    # Agent testing
│   │   │
│   │   ├── social-media/
│   │   │   ├── page.tsx                    # Social media management
│   │   │   ├── calendar/
│   │   │   │   └── page.tsx                # Social media calendar
│   │   │   └── posts/
│   │   │       └── [id]/
│   │   │           └── page.tsx            # Post detail
│   │   │
│   │   ├── marketplace/
│   │   │   └── page.tsx                    # Marketplace
│   │   │
│   │   ├── billing/
│   │   │   └── page.tsx                    # Billing
│   │   │
│   │   └── settings/
│   │       ├── page.tsx                    # General settings
│   │       ├── api-keys/
│   │       │   └── page.tsx                # API keys
│   │       ├── webhooks/
│   │       │   └── page.tsx                # Webhooks
│   │       └── white-label/
│   │           └── page.tsx                # White label
│   │
│   ├── admin/                              # Admin section
│   │   ├── layout.tsx                      # AdminLayout wrapper
│   │   ├── page.tsx                        # Admin dashboard
│   │   ├── users/
│   │   │   └── page.tsx                    # User management
│   │   ├── billing/
│   │   │   └── page.tsx                    # Admin billing
│   │   ├── analytics/
│   │   │   └── page.tsx                    # Admin analytics
│   │   ├── support/
│   │   │   └── page.tsx                    # Support tickets
│   │   ├── system/
│   │   │   └── page.tsx                    # System settings
│   │   ├── content/
│   │   │   └── page.tsx                    # Content management
│   │   └── audit-logs/
│   │       └── page.tsx                    # Audit logs
│   │
│   └── api/                                # API routes
│       ├── auth/
│       │   └── signup/
│       │       └── route.ts                # Sign up endpoint
│       ├── agents/
│       │   ├── route.ts                    # List/create agents
│       │   └── [id]/
│       │       └── route.ts                # Get/update/delete agent
│       ├── campaigns/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── funnels/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── calls/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── leads/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── personas/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── phone-numbers/
│       │   └── route.ts
│       ├── social-posts/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── analytics/
│       │   └── route.ts
│       └── stats/
│           └── route.ts
│
├── components/                             # Shared components
│   ├── providers/
│   │   ├── ThemeProvider.tsx               # "use client"
│   │   └── AuthProvider.tsx                # "use client" (new)
│   │
│   ├── layouts/
│   │   ├── AppLayout.tsx                   # "use client" (has sidebar state)
│   │   └── AdminLayout.tsx                 # "use client" (has navigation state)
│   │
│   ├── pages/                              # Page client components
│   │   ├── LandingPageClient.tsx           # "use client"
│   │   ├── AuthPageClient.tsx              # "use client"
│   │   ├── DashboardPageClient.tsx         # "use client"
│   │   ├── AgentsPageClient.tsx            # "use client"
│   │   └── ...                             # All page clients need "use client"
│   │
│   ├── modals/                             # All modals
│   │   ├── ABTestingModal.tsx              # "use client"
│   │   ├── AgentDetailDialog.tsx           # "use client"
│   │   ├── BulkSchedulerModal.tsx          # "use client"
│   │   ├── ConfirmDialog.tsx               # "use client"
│   │   ├── CreateAgentDialog.tsx           # "use client"
│   │   ├── CreateFunnelWizard.tsx          # "use client"
│   │   ├── CreateSocialPostWizard.tsx      # "use client"
│   │   ├── EditAgentDialog.tsx             # "use client"
│   │   ├── EditFunnelWizard.tsx            # "use client"
│   │   ├── LeadDetailModal.tsx             # "use client"
│   │   └── SocialTemplatesModal.tsx        # "use client"
│   │
│   ├── cards/
│   │   └── AgentCard.tsx                   # "use client" (has onClick)
│   │
│   ├── ErrorBoundary.tsx                   # "use client"
│   │
│   └── ui/                                 # shadcn/ui components
│       └── ...                             # Most need "use client"
│
├── lib/                                    # Utilities (renamed from utils)
│   ├── api.ts                              # API client
│   ├── hooks.ts                            # Custom hooks
│   ├── security.ts                         # Security utilities
│   ├── mock-data.ts                        # Mock data
│   └── supabase/
│       ├── client.ts                       # Client-side Supabase
│       ├── server.ts                       # Server-side Supabase (new)
│       └── info.ts                         # Supabase config
│
├── middleware.ts                           # Auth middleware (new)
├── next.config.js                          # Next.js config (new)
└── tsconfig.json                           # TypeScript config
```

---

## Files That Need "use client"

### 1. All Page Components (100% need it)
```tsx
"use client"

// All files in components/pages/
- DashboardPage.tsx → DashboardPageClient.tsx
- AgentsPage.tsx → AgentsPageClient.tsx
- CallsPage.tsx → CallsPageClient.tsx
- CallDetailPage.tsx → CallDetailPageClient.tsx
- CampaignsPage.tsx → CampaignsPageClient.tsx
- CampaignDetailPage.tsx → CampaignDetailPageClient.tsx
- FunnelsPage.tsx → FunnelsPageClient.tsx
- FunnelDetailPage.tsx → FunnelDetailPageClient.tsx
- LeadsPage.tsx → LeadsPageClient.tsx
- PersonasPage.tsx → PersonasPageClient.tsx
- PhoneNumbersPage.tsx → PhoneNumbersPageClient.tsx
- LiveCallsPage.tsx → LiveCallsPageClient.tsx
- AnalyticsPage.tsx → AnalyticsPageClient.tsx
- TestingPage.tsx → TestingPageClient.tsx
- SocialMediaPage.tsx → SocialMediaPageClient.tsx
- SocialPostDetailPage.tsx → SocialPostDetailPageClient.tsx
- SocialMediaCalendarPage.tsx → SocialMediaCalendarPageClient.tsx
- MarketplacePage.tsx → MarketplacePageClient.tsx
- ApiKeysPage.tsx → ApiKeysPageClient.tsx
- WebhooksPage.tsx → WebhooksPageClient.tsx
- WhiteLabelPage.tsx → WhiteLabelPageClient.tsx
- SettingsPage.tsx → SettingsPageClient.tsx
- BillingPage.tsx → BillingPageClient.tsx

// Admin pages
- AdminDashboardPage.tsx → AdminDashboardPageClient.tsx
- AdminUsersPage.tsx → AdminUsersPageClient.tsx
- AdminBillingPage.tsx → AdminBillingPageClient.tsx
- AdminAnalyticsPage.tsx → AdminAnalyticsPageClient.tsx
- AdminSupportPage.tsx → AdminSupportPageClient.tsx
- AdminSystemPage.tsx → AdminSystemPageClient.tsx
- AdminContentPage.tsx → AdminContentPageClient.tsx
- AdminAuditLogsPage.tsx → AdminAuditLogsPageClient.tsx
```

### 2. All Modal/Dialog Components (100% need it)
```tsx
"use client"

- ABTestingModal.tsx
- AgentDetailDialog.tsx
- BulkSchedulerModal.tsx
- ConfirmDialog.tsx
- CreateAgentDialog.tsx
- CreateFunnelWizard.tsx
- CreateSocialPostWizard.tsx
- EditAgentDialog.tsx
- EditFunnelWizard.tsx
- LeadDetailModal.tsx
- SocialTemplatesModal.tsx
```

### 3. Layout Components (Need it if they have state)
```tsx
"use client"

- AppLayout.tsx (has sidebar state, navigation)
- AdminLayout.tsx (has navigation state)
- ThemeProvider.tsx (uses context)
- ErrorBoundary.tsx (uses state)
```

### 4. Interactive Components
```tsx
"use client"

- AgentCard.tsx (has onClick handlers)
- LandingPage.tsx (has interactive buttons)
- AuthPage.tsx (has form state)
```

### 5. Most shadcn/ui Components (Already have "use client")
All components in `/components/ui/` that are interactive already have "use client" or need it added.

---

## Files That DON'T Need "use client"

### 1. Utility Files (.ts)
```typescript
// No "use client" needed (not React components)

lib/api.ts
lib/security.ts
lib/supabase/info.ts
lib/supabase/client.ts (exports function, not component)
lib/supabase/server.ts (server-only)
lib/mock-data.ts
```

### 2. API Routes (.ts)
```typescript
// Server-side only, no "use client"

app/api/**/route.ts
```

### 3. Next.js Page Files (Server Components by default)
```tsx
// Don't add "use client" to these
// They wrap client components

app/page.tsx
app/auth/page.tsx
app/(authenticated)/dashboard/page.tsx
app/(authenticated)/agents/page.tsx
// etc...
```

### 4. Layout Files (Unless they have state)
```tsx
// Can be server components if they just wrap children

app/layout.tsx (can be server component)
app/(authenticated)/layout.tsx (import AppLayout client component)
app/admin/layout.tsx (import AdminLayout client component)
```

---

## Import Path Changes

### Before (Current)
```tsx
import { apiCall } from '../../utils/api'
import { useAuth } from '../ThemeProvider'
import { Button } from './ui/button'
import { createClient } from '../utils/supabase/client'
```

### After (Next.js)
```tsx
import { apiCall } from '@/lib/api'
import { useAuth } from '@/components/providers/ThemeProvider'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
```

---

## Navigation Changes

### Before (React Router)
```tsx
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'

function Component() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()

  return (
    <>
      <Link to="/agents">Agents</Link>
      <button onClick={() => navigate('/agents')}>Go</button>
    </>
  )
}
```

### After (Next.js)
```tsx
import Link from 'next/link'
import { useRouter, useParams, usePathname } from 'next/navigation'

function Component({ params }: { params: { id: string } }) {
  // For client components using hooks:
  const router = useRouter()
  const pathname = usePathname()
  
  // For server components, id comes from params prop

  return (
    <>
      <Link href="/agents">Agents</Link>
      <button onClick={() => router.push('/agents')}>Go</button>
    </>
  )
}
```

---

## API Call Changes

### Before (Supabase Edge Function)
```tsx
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-9d2dee99/agents`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
)
```

### After (Next.js API Route)
```tsx
const response = await fetch('/api/agents', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Auth handled by middleware/cookies
  },
  body: JSON.stringify(data)
})
```

---

## Environment Variables

### Before (.env)
```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

### After (.env.local)
```env
# Client-side (accessible in browser)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Server-side only (not accessible in browser)
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_DB_URL=...
```

---

## Metadata (SEO)

### Before (React)
```tsx
// Use react-helmet or similar
import { Helmet } from 'react-helmet'

function Page() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div>Content</div>
    </>
  )
}
```

### After (Next.js)
```tsx
// app/dashboard/page.tsx (server component)
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | AI Agent Platform',
  description: 'Manage your AI agents and campaigns'
}

export default function DashboardPage() {
  return <DashboardPageClient />
}
```

---

## Data Fetching Patterns

### Pattern 1: Client-Side (Current approach)
```tsx
"use client"

import { useState, useEffect } from 'react'

export function PageClient() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>
  return <div>{JSON.stringify(data)}</div>
}
```

### Pattern 2: Server-Side (Next.js preferred)
```tsx
// Server Component (no "use client")
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // or 'force-cache', or revalidate options
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{JSON.stringify(data)}</div>
}
```

### Pattern 3: Hybrid (Server fetch + Client interactivity)
```tsx
// app/page.tsx (server component)
async function getInitialData() {
  // Fetch on server
  const data = await fetch('...')
  return data.json()
}

export default async function Page() {
  const initialData = await getInitialData()
  return <PageClient initialData={initialData} />
}
```

```tsx
// components/PageClient.tsx
"use client"

export function PageClient({ initialData }) {
  const [data, setData] = useState(initialData)
  // Can update data with client-side interactions
  return <div>{JSON.stringify(data)}</div>
}
```

---

## Authentication Flow

### Middleware (New file)
```tsx
// middleware.ts
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

  // Protect authenticated routes
  if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Redirect authenticated users away from auth page
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

## Example: Complete Page Migration

### Current Structure
```
/components/pages/AgentsPage.tsx (single file with everything)
```

### Next.js Structure
```
/app/(authenticated)/agents/page.tsx (server component wrapper)
/components/pages/AgentsPageClient.tsx (client component with logic)
```

### Before: AgentsPage.tsx
```tsx
// components/pages/AgentsPage.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { AgentCard } from '../AgentCard'
import { CreateAgentDialog } from '../CreateAgentDialog'
import { apiCall } from '../../utils/api'

export function AgentsPage() {
  const [agents, setAgents] = useState([])
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    loadAgents()
  }, [])

  const loadAgents = async () => {
    const data = await apiCall('/agents')
    setAgents(data)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>AI Agents</h1>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="mr-2" />
          Create Agent
        </Button>
      </div>

      <div className="grid gap-4">
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      <CreateAgentDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={loadAgents}
      />
    </div>
  )
}
```

### After: Split into Server + Client

```tsx
// app/(authenticated)/agents/page.tsx (Server Component)
import { Metadata } from 'next'
import { AgentsPageClient } from '@/components/pages/AgentsPageClient'

export const metadata: Metadata = {
  title: 'AI Agents | AI Agent Platform',
  description: 'Manage your AI agents'
}

export default function AgentsPage() {
  // Could optionally fetch initial data here server-side:
  // const agents = await getAgents()
  // return <AgentsPageClient initialAgents={agents} />
  
  return <AgentsPageClient />
}
```

```tsx
// components/pages/AgentsPageClient.tsx (Client Component)
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AgentCard } from '@/components/AgentCard'
import { CreateAgentDialog } from '@/components/CreateAgentDialog'
import { apiCall } from '@/lib/api'

export function AgentsPageClient() {
  const [agents, setAgents] = useState([])
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    loadAgents()
  }, [])

  const loadAgents = async () => {
    const data = await apiCall('/api/agents') // Note: /api/ prefix
    setAgents(data)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>AI Agents</h1>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="mr-2" />
          Create Agent
        </Button>
      </div>

      <div className="grid gap-4">
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      <CreateAgentDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={loadAgents}
      />
    </div>
  )
}
```

---

## Quick Copy Checklist

When copying files to Next.js:

- [ ] Rename `components/pages/*.tsx` to `*PageClient.tsx`
- [ ] Add `"use client"` to top of client components
- [ ] Change `import { Link } from 'react-router-dom'` to `import Link from 'next/link'`
- [ ] Change `<Link to="/path">` to `<Link href="/path">`
- [ ] Change `useNavigate()` to `useRouter()` from `'next/navigation'`
- [ ] Change `navigate('/path')` to `router.push('/path')`
- [ ] Update imports to use `@/` alias
- [ ] Change `/utils/` to `/lib/`
- [ ] Update API call URLs from Supabase Edge Function to `/api/`
- [ ] Add metadata to server component pages
- [ ] Create page.tsx wrappers for each client component
- [ ] Test that "use client" is in all interactive components

---

## Testing Checklist After Migration

### Authentication
- [ ] Can sign up new users
- [ ] Can sign in existing users
- [ ] Can sign out
- [ ] Protected routes redirect to /auth
- [ ] Auth page redirects to /dashboard when logged in
- [ ] Session persists across page refreshes

### Pages Load
- [ ] Dashboard loads and displays data
- [ ] Agents page loads and displays agents
- [ ] Campaigns page loads
- [ ] Funnels page loads
- [ ] All other pages load without errors

### CRUD Operations
- [ ] Can create agents
- [ ] Can edit agents
- [ ] Can delete agents
- [ ] Can create campaigns
- [ ] Can edit campaigns
- [ ] Can delete campaigns
- [ ] Same for all other entities

### Navigation
- [ ] All sidebar links work
- [ ] Breadcrumbs work
- [ ] Back button works
- [ ] Direct URL navigation works

### Interactivity
- [ ] Modals open and close
- [ ] Forms submit correctly
- [ ] Buttons respond to clicks
- [ ] Dropdowns work
- [ ] Theme toggle works
- [ ] Dark mode persists

### API Routes
- [ ] All endpoints return correct data
- [ ] POST requests create data
- [ ] PUT requests update data
- [ ] DELETE requests delete data
- [ ] Error handling works

---

This mapping should make it straightforward to migrate component by component to Next.js!
