# Next.js API Route Templates

## Overview
This document provides templates for converting Supabase Edge Functions (Hono) to Next.js API routes.

---

## Basic Structure Comparison

### Current: Supabase Edge Function (Hono)
```tsx
// supabase/functions/server/index.tsx
import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { createClient } from 'jsr:@supabase/supabase-js@2'

const app = new Hono()
app.use('*', cors())

// GET endpoint
app.get('/make-server-9d2dee99/agents', async (c) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  )
  
  const { data, error } = await supabase
    .from('kv_store_9d2dee99')
    .select('*')
  
  if (error) {
    return c.json({ error: error.message }, 500)
  }
  
  return c.json({ data })
})

// POST endpoint
app.post('/make-server-9d2dee99/agents', async (c) => {
  const body = await c.req.json()
  // ... handle creation
  return c.json({ data })
})

Deno.serve(app.fetch)
```

### Next.js: API Route
```tsx
// app/api/agents/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/agents
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('kv_store_9d2dee99')
      .select('*')
    
    if (error) {
      console.error('Error fetching agents:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/agents
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createClient()
    
    // ... handle creation
    
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## Template 1: List/Create Resources

### File: `/app/api/agents/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as kv from '@/lib/kv-store'

// GET /api/agents - List all agents
export async function GET(request: NextRequest) {
  try {
    // Get user from session
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch agents for this user
    const agents = await kv.getByPrefix(`user:${user.id}:agent:`)

    return NextResponse.json({
      data: agents,
      count: agents.length
    })

  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    )
  }
}

// POST /api/agents - Create new agent
export async function POST(request: NextRequest) {
  try {
    // Get user from session
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, type, model, systemPrompt, voice } = body

    // Validate required fields
    if (!name || !type || !model) {
      return NextResponse.json(
        { error: 'Missing required fields: name, type, model' },
        { status: 400 }
      )
    }

    // Create agent
    const agentId = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const agent = {
      id: agentId,
      name,
      type,
      model,
      systemPrompt: systemPrompt || '',
      voice: voice || 'alloy',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id
    }

    // Save to KV store
    await kv.set(`user:${user.id}:agent:${agentId}`, agent)

    return NextResponse.json(
      { data: agent },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    )
  }
}
```

---

## Template 2: Get/Update/Delete Single Resource

### File: `/app/api/agents/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as kv from '@/lib/kv-store'

// GET /api/agents/:id - Get single agent
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const agentId = params.id
    const agent = await kv.get(`user:${user.id}:agent:${agentId}`)

    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: agent })

  } catch (error) {
    console.error(`Error fetching agent ${params.id}:`, error)
    return NextResponse.json(
      { error: 'Failed to fetch agent' },
      { status: 500 }
    )
  }
}

// PUT /api/agents/:id - Update agent
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const agentId = params.id
    const key = `user:${user.id}:agent:${agentId}`
    
    // Get existing agent
    const existingAgent = await kv.get(key)
    if (!existingAgent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    // Parse updates
    const updates = await request.json()

    // Merge updates
    const updatedAgent = {
      ...existingAgent,
      ...updates,
      id: agentId, // Prevent ID change
      userId: user.id, // Prevent userId change
      updatedAt: new Date().toISOString()
    }

    // Save
    await kv.set(key, updatedAgent)

    return NextResponse.json({ data: updatedAgent })

  } catch (error) {
    console.error(`Error updating agent ${params.id}:`, error)
    return NextResponse.json(
      { error: 'Failed to update agent' },
      { status: 500 }
    )
  }
}

// DELETE /api/agents/:id - Delete agent
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const agentId = params.id
    const key = `user:${user.id}:agent:${agentId}`

    // Check if exists
    const agent = await kv.get(key)
    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    // Delete
    await kv.del(key)

    return NextResponse.json(
      { success: true, message: 'Agent deleted' },
      { status: 200 }
    )

  } catch (error) {
    console.error(`Error deleting agent ${params.id}:`, error)
    return NextResponse.json(
      { error: 'Failed to delete agent' },
      { status: 500 }
    )
  }
}
```

---

## Template 3: Authentication Endpoint

### File: `/app/api/auth/signup/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Create admin client (needs service role key)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since we don't have email setup
      user_metadata: {
        name: name || email.split('@')[0]
      }
    })

    if (error) {
      console.error('Signup error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        user: data.user,
        message: 'Account created successfully'
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Unexpected signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
```

---

## Template 4: Statistics/Analytics Endpoint

### File: `/app/api/stats/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as kv from '@/lib/kv-store'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch all resources for user
    const [agents, campaigns, calls, leads] = await Promise.all([
      kv.getByPrefix(`user:${user.id}:agent:`),
      kv.getByPrefix(`user:${user.id}:campaign:`),
      kv.getByPrefix(`user:${user.id}:call:`),
      kv.getByPrefix(`user:${user.id}:lead:`)
    ])

    // Calculate stats
    const totalCalls = calls.length
    const activeAgents = agents.filter(a => a.status === 'active').length
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length
    const totalLeads = leads.length

    // Calculate call duration
    const totalDuration = calls.reduce((sum, call) => {
      return sum + (call.duration || 0)
    }, 0)

    // Calculate conversion rate
    const convertedLeads = leads.filter(l => l.status === 'converted').length
    const conversionRate = totalLeads > 0 
      ? (convertedLeads / totalLeads) * 100 
      : 0

    const stats = {
      totalCalls,
      totalCallMinutes: Math.round(totalDuration / 60),
      activeAgents,
      activeCampaigns,
      totalLeads,
      conversionRate: Math.round(conversionRate * 10) / 10
    }

    return NextResponse.json({ data: stats })

  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
```

---

## Template 5: Complex Query with Filters

### File: `/app/api/calls/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as kv from '@/lib/kv-store'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const agentId = searchParams.get('agentId')
    const status = searchParams.get('status')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Fetch all calls
    let calls = await kv.getByPrefix(`user:${user.id}:call:`)

    // Apply filters
    if (agentId) {
      calls = calls.filter(call => call.agentId === agentId)
    }

    if (status) {
      calls = calls.filter(call => call.status === status)
    }

    if (startDate) {
      calls = calls.filter(call => 
        new Date(call.timestamp) >= new Date(startDate)
      )
    }

    if (endDate) {
      calls = calls.filter(call => 
        new Date(call.timestamp) <= new Date(endDate)
      )
    }

    // Sort by timestamp (newest first)
    calls.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    // Apply pagination
    const total = calls.length
    const paginatedCalls = calls.slice(offset, offset + limit)

    return NextResponse.json({
      data: paginatedCalls,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })

  } catch (error) {
    console.error('Error fetching calls:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calls' },
      { status: 500 }
    )
  }
}
```

---

## Template 6: Batch Operations

### File: `/app/api/campaigns/batch/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as kv from '@/lib/kv-store'

// DELETE /api/campaigns/batch - Delete multiple campaigns
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { ids } = await request.json()

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty ids array' },
        { status: 400 }
      )
    }

    // Build keys to delete
    const keys = ids.map(id => `user:${user.id}:campaign:${id}`)

    // Delete in batch
    await kv.mdel(keys)

    return NextResponse.json({
      success: true,
      deleted: ids.length,
      message: `Deleted ${ids.length} campaign(s)`
    })

  } catch (error) {
    console.error('Error in batch delete:', error)
    return NextResponse.json(
      { error: 'Failed to delete campaigns' },
      { status: 500 }
    )
  }
}

// PATCH /api/campaigns/batch - Update multiple campaigns
export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { ids, updates } = await request.json()

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty ids array' },
        { status: 400 }
      )
    }

    // Fetch all campaigns
    const keys = ids.map(id => `user:${user.id}:campaign:${id}`)
    const campaigns = await kv.mget(keys)

    // Update each campaign
    const updatedCampaigns = campaigns.map((campaign, index) => {
      if (!campaign) return null
      return {
        ...campaign,
        ...updates,
        id: ids[index], // Preserve ID
        userId: user.id, // Preserve userId
        updatedAt: new Date().toISOString()
      }
    }).filter(Boolean)

    // Save in batch
    const kvPairs = updatedCampaigns.map((campaign, index) => ({
      key: keys[index],
      value: campaign
    }))
    await kv.mset(kvPairs)

    return NextResponse.json({
      success: true,
      updated: updatedCampaigns.length,
      data: updatedCampaigns
    })

  } catch (error) {
    console.error('Error in batch update:', error)
    return NextResponse.json(
      { error: 'Failed to update campaigns' },
      { status: 500 }
    )
  }
}
```

---

## Supabase Client Setup for Next.js

### File: `/lib/supabase/server.ts` (NEW)

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
            // Handle error (cookies() can only be called in Server Components)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle error
          }
        },
      },
    }
  )
}
```

### File: `/lib/supabase/client.ts` (UPDATED)

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

---

## KV Store for Next.js

### File: `/lib/kv-store.ts`

```typescript
// This is a wrapper around Supabase KV operations
// It maintains compatibility with existing code

import { createClient } from '@supabase/supabase-js'

// Use service role key for server-side operations
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
    if (error.code === 'PGRST116') return null // Not found
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

  // Map results back to original key order
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

---

## Route Conversion Reference

| Current Hono Route | Next.js API Route | Methods |
|--------------------|-------------------|---------|
| `/make-server-9d2dee99/agents` | `/app/api/agents/route.ts` | GET, POST |
| `/make-server-9d2dee99/agents/:id` | `/app/api/agents/[id]/route.ts` | GET, PUT, DELETE |
| `/make-server-9d2dee99/campaigns` | `/app/api/campaigns/route.ts` | GET, POST |
| `/make-server-9d2dee99/campaigns/:id` | `/app/api/campaigns/[id]/route.ts` | GET, PUT, DELETE |
| `/make-server-9d2dee99/campaigns/batch` | `/app/api/campaigns/batch/route.ts` | DELETE, PATCH |
| `/make-server-9d2dee99/funnels` | `/app/api/funnels/route.ts` | GET, POST |
| `/make-server-9d2dee99/funnels/:id` | `/app/api/funnels/[id]/route.ts` | GET, PUT, DELETE |
| `/make-server-9d2dee99/calls` | `/app/api/calls/route.ts` | GET, POST |
| `/make-server-9d2dee99/calls/:id` | `/app/api/calls/[id]/route.ts` | GET, PUT, DELETE |
| `/make-server-9d2dee99/leads` | `/app/api/leads/route.ts` | GET, POST |
| `/make-server-9d2dee99/leads/:id` | `/app/api/leads/[id]/route.ts` | GET, PUT, DELETE |
| `/make-server-9d2dee99/personas` | `/app/api/personas/route.ts` | GET, POST |
| `/make-server-9d2dee99/personas/:id` | `/app/api/personas/[id]/route.ts` | GET, PUT, DELETE |
| `/make-server-9d2dee99/phone-numbers` | `/app/api/phone-numbers/route.ts` | GET, POST |
| `/make-server-9d2dee99/social-posts` | `/app/api/social-posts/route.ts` | GET, POST |
| `/make-server-9d2dee99/social-posts/:id` | `/app/api/social-posts/[id]/route.ts` | GET, PUT, DELETE |
| `/make-server-9d2dee99/analytics` | `/app/api/analytics/route.ts` | GET |
| `/make-server-9d2dee99/stats` | `/app/api/stats/route.ts` | GET |
| `/make-server-9d2dee99/signup` | `/app/api/auth/signup/route.ts` | POST |

---

## Quick Conversion Steps

1. **Create directory structure**
   ```bash
   mkdir -p app/api/agents
   mkdir -p app/api/agents/[id]
   ```

2. **Create route.ts file**
   ```bash
   touch app/api/agents/route.ts
   touch app/api/agents/[id]/route.ts
   ```

3. **Copy handler logic**
   - Copy from Hono handler
   - Wrap in Next.js function (GET, POST, etc.)
   - Update imports
   - Update error handling

4. **Test endpoint**
   ```bash
   # Instead of:
   https://{projectId}.supabase.co/functions/v1/make-server-9d2dee99/agents
   
   # Use:
   http://localhost:3000/api/agents
   ```

---

These templates should make it straightforward to convert any Supabase Edge Function to a Next.js API route!
