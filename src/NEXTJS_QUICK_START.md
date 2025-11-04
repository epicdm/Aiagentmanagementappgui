# Next.js Migration Quick Start

## 🚀 Fast Track Migration Process

Follow this checklist to migrate your AI Agent Platform from React/Vite to Next.js in ~14-16 hours.

---

## Pre-Migration Checklist

- [ ] Backup your current code
- [ ] Document all environment variables
- [ ] Test all features in current app
- [ ] Take screenshots of key pages
- [ ] Note any custom configurations

---

## Phase 1: Setup (30 minutes)

### 1. Create Next.js Project
```bash
# In a new directory
npx create-next-app@latest ai-agent-platform-nextjs

# Select these options:
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
npm install @supabase/supabase-js @supabase/ssr
npm install lucide-react
npm install recharts
npm install sonner@2.0.3
npm install date-fns
npm install class-variance-authority clsx tailwind-merge

# Install all Radix UI packages (for shadcn)
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

### 3. Setup Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

- [ ] Project created
- [ ] Dependencies installed
- [ ] Environment variables configured

---

## Phase 2: Copy Foundation (1 hour)

### 1. Copy Tailwind Config
```bash
# Copy from current project
cp /path/to/styles/globals.css ./app/globals.css

# Update tailwind.config imports if needed
```

### 2. Copy shadcn/ui Components
```bash
mkdir -p components/ui

# Copy all UI components
cp -r /path/to/components/ui/* ./components/ui/
```

### 3. Add "use client" to UI Components
Add `"use client"` to top of these files in `components/ui/`:
- dialog.tsx
- dropdown-menu.tsx
- select.tsx
- button.tsx (if it has interactive features)
- All other interactive components

### 4. Create Utility Directories
```bash
mkdir -p lib/supabase
```

### 5. Copy and Update Utilities
```bash
# Copy utilities
cp /path/to/utils/security.tsx ./lib/security.ts
cp /path/to/utils/hooks.tsx ./lib/hooks.ts
```

Update imports in these files:
- Change relative paths to `@/lib/...`
- Remove `.tsx` extension references

- [ ] globals.css copied
- [ ] shadcn components copied
- [ ] "use client" added to UI components
- [ ] Utilities copied and updated

---

## Phase 3: Setup Auth (1 hour)

### 1. Create Supabase Clients

**lib/supabase/server.ts**
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

**lib/supabase/client.ts**
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**lib/supabase/info.ts**
```typescript
export const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL!.split('//')[1].split('.')[0]
export const publicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
```

### 2. Create Middleware

**middleware.ts** (root level)
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

  if (!user && !request.nextUrl.pathname.startsWith('/auth') && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

### 3. Create Auth Provider

**components/providers/ThemeProvider.tsx**
```tsx
"use client"

// Copy from current ThemeProvider.tsx
// Add "use client" directive
// Update imports to use @/lib/...
```

- [ ] Supabase clients created
- [ ] Middleware created
- [ ] Auth provider created

---

## Phase 4: Setup Layouts (1 hour)

### 1. Root Layout

**app/layout.tsx**
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

**app/page.tsx**
```tsx
import { LandingPageClient } from '@/components/pages/LandingPageClient'

export default function LandingPage() {
  return <LandingPageClient />
}
```

### 3. Auth Page

**app/auth/page.tsx**
```tsx
import { AuthPageClient } from '@/components/pages/AuthPageClient'

export default function AuthPage() {
  return <AuthPageClient />
}
```

### 4. Authenticated Layout

**app/(authenticated)/layout.tsx**
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

# Copy and add "use client"
cp /path/to/components/AppLayout.tsx ./components/layouts/AppLayout.tsx
cp /path/to/components/AdminLayout.tsx ./components/layouts/AdminLayout.tsx
cp /path/to/components/ThemeProvider.tsx ./components/providers/ThemeProvider.tsx
```

Add `"use client"` to:
- components/layouts/AppLayout.tsx
- components/layouts/AdminLayout.tsx
- components/providers/ThemeProvider.tsx

Update imports in these files to use `@/...` paths.

- [ ] Root layout created
- [ ] Landing page created
- [ ] Auth page created
- [ ] Authenticated layout created
- [ ] Layout components copied

---

## Phase 5: Convert Pages (3-4 hours)

### For Each Page, Follow This Pattern:

#### 1. Create Directory
```bash
mkdir -p app/(authenticated)/PAGE_NAME
```

#### 2. Create Server Wrapper
**app/(authenticated)/PAGE_NAME/page.tsx**
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

#### 3. Copy and Rename Page Component
```bash
cp /path/to/components/pages/PageName.tsx ./components/pages/PageNameClient.tsx
```

#### 4. Update Page Component
- Add `"use client"` at the top
- Update all imports:
  - `react-router-dom` → `next/link` and `next/navigation`
  - `../../utils/api` → `@/lib/api`
  - Relative paths → `@/...` paths
- Update navigation:
  - `<Link to="...">` → `<Link href="...">`
  - `useNavigate()` → `useRouter()` from `'next/navigation'`
  - `navigate('...')` → `router.push('...')`
- Update API calls:
  - `/agents` → `/api/agents`

### Pages to Convert (Check off as you complete):

**Main Pages**
- [ ] dashboard
- [ ] agents
- [ ] campaigns
- [ ] funnels
- [ ] leads
- [ ] personas
- [ ] phone-numbers
- [ ] calls
- [ ] live-calls
- [ ] analytics
- [ ] testing
- [ ] social-media
- [ ] social-media/calendar
- [ ] marketplace
- [ ] billing
- [ ] settings
- [ ] settings/api-keys
- [ ] settings/webhooks
- [ ] settings/white-label

**Detail Pages (with [id])**
- [ ] calls/[id]
- [ ] campaigns/[id]
- [ ] funnels/[id]
- [ ] social-media/posts/[id]

**Admin Pages**
- [ ] admin (dashboard)
- [ ] admin/users
- [ ] admin/billing
- [ ] admin/analytics
- [ ] admin/support
- [ ] admin/system
- [ ] admin/content
- [ ] admin/audit-logs

---

## Phase 6: Copy Components (1 hour)

### 1. Copy Modal Components
```bash
mkdir -p components/modals

# Copy all modal components
cp /path/to/components/*Modal.tsx ./components/modals/
cp /path/to/components/*Dialog.tsx ./components/modals/
cp /path/to/components/*Wizard.tsx ./components/modals/
```

### 2. Add "use client" and Update Imports
For each modal/dialog component:
- Add `"use client"` at top
- Update imports to `@/...` paths
- Update API calls to `/api/...`

### Modal Components Checklist:
- [ ] ABTestingModal.tsx
- [ ] AgentDetailDialog.tsx
- [ ] BulkSchedulerModal.tsx
- [ ] ConfirmDialog.tsx
- [ ] CreateAgentDialog.tsx
- [ ] CreateFunnelWizard.tsx
- [ ] CreateSocialPostWizard.tsx
- [ ] EditAgentDialog.tsx
- [ ] EditFunnelWizard.tsx
- [ ] LeadDetailModal.tsx
- [ ] SocialTemplatesModal.tsx

### 3. Copy Other Components
```bash
# Copy card components
cp /path/to/components/AgentCard.tsx ./components/
```

Add "use client" if they have onClick or state:
- [ ] AgentCard.tsx
- [ ] ErrorBoundary.tsx

---

## Phase 7: Create API Routes (2-3 hours)

### 1. Create KV Store Utility

**lib/kv-store.ts**
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

export async function getByPrefix(prefix: string): Promise<any[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('value')
    .like('key', `${prefix}%`)

  if (error) throw error

  return data.map(item => item.value)
}
```

### 2. Create API Client

**lib/api.ts**
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

### 3. Convert API Routes

Use the templates from `NEXTJS_API_TEMPLATES.md` to create:

**Auth Routes:**
- [ ] app/api/auth/signup/route.ts

**Resource Routes (List/Create):**
- [ ] app/api/agents/route.ts
- [ ] app/api/campaigns/route.ts
- [ ] app/api/funnels/route.ts
- [ ] app/api/calls/route.ts
- [ ] app/api/leads/route.ts
- [ ] app/api/personas/route.ts
- [ ] app/api/phone-numbers/route.ts
- [ ] app/api/social-posts/route.ts

**Resource Routes (Get/Update/Delete):**
- [ ] app/api/agents/[id]/route.ts
- [ ] app/api/campaigns/[id]/route.ts
- [ ] app/api/funnels/[id]/route.ts
- [ ] app/api/calls/[id]/route.ts
- [ ] app/api/leads/[id]/route.ts
- [ ] app/api/personas/[id]/route.ts
- [ ] app/api/social-posts/[id]/route.ts

**Stats/Analytics Routes:**
- [ ] app/api/stats/route.ts
- [ ] app/api/analytics/route.ts

**Batch Routes (if needed):**
- [ ] app/api/campaigns/batch/route.ts
- [ ] app/api/funnels/batch/route.ts

---

## Phase 8: Testing (2 hours)

### 1. Test Authentication
- [ ] Sign up new user
- [ ] Sign in existing user
- [ ] Sign out
- [ ] Protected route redirects
- [ ] Session persists

### 2. Test Each Page
- [ ] Dashboard loads
- [ ] Agents page loads
- [ ] Campaigns page loads
- [ ] Funnels page loads
- [ ] Leads page loads
- [ ] All other pages load

### 3. Test CRUD Operations
- [ ] Create agent
- [ ] Edit agent
- [ ] Delete agent
- [ ] Create campaign
- [ ] Edit campaign
- [ ] Delete campaign
- [ ] Create funnel
- [ ] Edit funnel
- [ ] Delete funnel

### 4. Test Navigation
- [ ] Sidebar links work
- [ ] Breadcrumbs work
- [ ] Back/forward buttons work
- [ ] Direct URL navigation works

### 5. Test Features
- [ ] Theme toggle works
- [ ] Dark mode persists
- [ ] Modals open/close
- [ ] Forms validate
- [ ] Toasts show
- [ ] Search/filter works
- [ ] Pagination works

### 6. Test API Routes
```bash
# Test with curl or Postman
curl http://localhost:3000/api/agents
curl http://localhost:3000/api/campaigns
curl http://localhost:3000/api/stats
```

---

## Phase 9: Polish & Deploy (1 hour)

### 1. Final Checks
- [ ] All console errors fixed
- [ ] All TypeScript errors resolved
- [ ] All imports working
- [ ] No unused files
- [ ] Environment variables documented

### 2. Performance
- [ ] Images optimized (use next/image)
- [ ] Lazy loading where appropriate
- [ ] Server components where possible

### 3. SEO
- [ ] Metadata added to all pages
- [ ] Proper HTML structure
- [ ] Alt text on images

### 4. Deploy
```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Deploy to Vercel (recommended for Next.js)
npx vercel

# Or deploy to your platform of choice
```

---

## Common Issues & Solutions

### Issue: Hydration Errors
**Solution:** Check for `localStorage` usage - only access in `useEffect`

### Issue: "use client" Missing
**Solution:** Add `"use client"` to components using hooks/events

### Issue: Module Not Found
**Solution:** Check import paths use `@/` alias

### Issue: API Route 404
**Solution:** Verify file is `route.ts` not `route.tsx`

### Issue: Auth Not Working
**Solution:** Check middleware is setup and cookies are configured

### Issue: Data Not Loading
**Solution:** Check API routes return correct format `{ data: ... }`

---

## Time Estimates

| Phase | Duration |
|-------|----------|
| Setup | 30 min |
| Foundation | 1 hour |
| Auth | 1 hour |
| Layouts | 1 hour |
| Pages | 3-4 hours |
| Components | 1 hour |
| API Routes | 2-3 hours |
| Testing | 2 hours |
| Polish | 1 hour |
| **TOTAL** | **14-16 hours** |

---

## Success Criteria

✅ All pages accessible and rendering
✅ Authentication flow working
✅ All CRUD operations functional
✅ Navigation working correctly
✅ No console errors
✅ Responsive design working
✅ Dark mode functional
✅ Production build successful

---

## Next Steps After Migration

1. **Optimize Performance**
   - Convert more components to server components
   - Add loading states
   - Implement React Suspense

2. **Enhance Features**
   - Add server-side data fetching
   - Implement server actions for forms
   - Add streaming for large datasets

3. **Improve DX**
   - Setup ESLint rules
   - Add pre-commit hooks
   - Document API routes

4. **Scale**
   - Add caching strategies
   - Optimize images
   - Setup CDN

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [shadcn/ui](https://ui.shadcn.com)
- [Vercel Deployment](https://vercel.com/docs)

---

Good luck with your migration! 🚀
