# Complete Next.js Migration Example

## Example: Agents Page (Full End-to-End)

This document shows a complete migration of the Agents feature from React/Vite to Next.js, including:
- Page component
- API routes
- Database operations
- Modal dialogs
- Navigation

---

## Current Implementation (React/Vite)

### 1. Page Component
**File:** `components/pages/AgentsPage.tsx`

```tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { AgentCard } from '../AgentCard'
import { CreateAgentDialog } from '../CreateAgentDialog'
import { EditAgentDialog } from '../EditAgentDialog'
import { AgentDetailDialog } from '../AgentDetailDialog'
import { ConfirmDialog } from '../ConfirmDialog'
import { toast } from 'sonner@2.0.3'
import { apiCall } from '../../utils/api'

export function AgentsPage() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showCreate, setShowCreate] = useState(false)
  const [editingAgent, setEditingAgent] = useState(null)
  const [viewingAgent, setViewingAgent] = useState(null)
  const [deletingAgent, setDeletingAgent] = useState(null)

  useEffect(() => {
    loadAgents()
  }, [])

  const loadAgents = async () => {
    try {
      setLoading(true)
      const data = await apiCall('/agents')
      setAgents(data)
    } catch (error) {
      console.error('Failed to load agents:', error)
      toast.error('Failed to load agents')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingAgent) return
    try {
      await apiCall(`/agents/${deletingAgent.id}`, { method: 'DELETE' })
      toast.success('Agent deleted successfully')
      setDeletingAgent(null)
      loadAgents()
    } catch (error) {
      console.error('Failed to delete agent:', error)
      toast.error('Failed to delete agent')
    }
  }

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || agent.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">AI Agents</h1>
          <p className="text-muted-foreground">
            Create and manage your AI agents for voice and chat
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="voice">Voice</SelectItem>
            <SelectItem value="chat">Chat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Agents Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {searchQuery || typeFilter !== 'all' 
              ? 'No agents found matching your filters'
              : 'No agents yet. Create your first agent to get started.'}
          </p>
          {!searchQuery && typeFilter === 'all' && (
            <Button onClick={() => setShowCreate(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Agent
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map(agent => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onView={() => setViewingAgent(agent)}
              onEdit={() => setEditingAgent(agent)}
              onDelete={() => setDeletingAgent(agent)}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <CreateAgentDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={() => {
          setShowCreate(false)
          loadAgents()
        }}
      />

      <EditAgentDialog
        open={!!editingAgent}
        agent={editingAgent}
        onClose={() => setEditingAgent(null)}
        onSuccess={() => {
          setEditingAgent(null)
          loadAgents()
        }}
      />

      <AgentDetailDialog
        open={!!viewingAgent}
        agent={viewingAgent}
        onClose={() => setViewingAgent(null)}
      />

      <ConfirmDialog
        open={!!deletingAgent}
        onClose={() => setDeletingAgent(null)}
        onConfirm={handleDelete}
        title="Delete Agent"
        description={`Are you sure you want to delete "${deletingAgent?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}
```

### 2. API Client
**File:** `utils/api.tsx`

```tsx
import { projectId, publicAnonKey } from './supabase/info'

export async function apiCall(endpoint: string, options: any = {}) {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-9d2dee99${endpoint}`,
    {
      ...options,
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    }
  )

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }

  return response.json()
}
```

### 3. Supabase Edge Function
**File:** `supabase/functions/server/index.tsx`

```tsx
// GET /make-server-9d2dee99/agents
app.get('/make-server-9d2dee99/agents', async (c) => {
  const authHeader = c.req.header('Authorization')
  const token = authHeader?.replace('Bearer ', '')
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  )

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const agents = await kv.getByPrefix(`user:${user.id}:agent:`)
  return c.json({ data: agents })
})

// POST /make-server-9d2dee99/agents
app.post('/make-server-9d2dee99/agents', async (c) => {
  const authHeader = c.req.header('Authorization')
  const token = authHeader?.replace('Bearer ', '')
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  )

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const body = await c.req.json()
  const agentId = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const agent = {
    id: agentId,
    ...body,
    userId: user.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  await kv.set(`user:${user.id}:agent:${agentId}`, agent)
  return c.json({ data: agent })
})

// DELETE /make-server-9d2dee99/agents/:id
app.delete('/make-server-9d2dee99/agents/:id', async (c) => {
  const authHeader = c.req.header('Authorization')
  const token = authHeader?.replace('Bearer ', '')
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  )

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const agentId = c.req.param('id')
  await kv.del(`user:${user.id}:agent:${agentId}`)
  
  return c.json({ success: true })
})
```

---

## Next.js Implementation

### Step 1: Create Page Structure

**File:** `app/(authenticated)/agents/page.tsx`

```tsx
import { Metadata } from 'next'
import { AgentsPageClient } from '@/components/pages/AgentsPageClient'

export const metadata: Metadata = {
  title: 'AI Agents | AI Agent Platform',
  description: 'Create and manage your AI agents for voice and chat',
}

export default function AgentsPage() {
  return <AgentsPageClient />
}
```

### Step 2: Create Client Component

**File:** `components/pages/AgentsPageClient.tsx`

```tsx
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AgentCard } from '@/components/AgentCard'
import { CreateAgentDialog } from '@/components/CreateAgentDialog'
import { EditAgentDialog } from '@/components/EditAgentDialog'
import { AgentDetailDialog } from '@/components/AgentDetailDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { toast } from 'sonner@2.0.3'
import { apiCall } from '@/lib/api'

export function AgentsPageClient() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showCreate, setShowCreate] = useState(false)
  const [editingAgent, setEditingAgent] = useState(null)
  const [viewingAgent, setViewingAgent] = useState(null)
  const [deletingAgent, setDeletingAgent] = useState(null)

  useEffect(() => {
    loadAgents()
  }, [])

  const loadAgents = async () => {
    try {
      setLoading(true)
      const data = await apiCall('/api/agents')
      setAgents(data)
    } catch (error) {
      console.error('Failed to load agents:', error)
      toast.error('Failed to load agents')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingAgent) return
    try {
      await apiCall(`/api/agents/${deletingAgent.id}`, { method: 'DELETE' })
      toast.success('Agent deleted successfully')
      setDeletingAgent(null)
      loadAgents()
    } catch (error) {
      console.error('Failed to delete agent:', error)
      toast.error('Failed to delete agent')
    }
  }

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || agent.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">AI Agents</h1>
          <p className="text-muted-foreground">
            Create and manage your AI agents for voice and chat
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="voice">Voice</SelectItem>
            <SelectItem value="chat">Chat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Agents Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {searchQuery || typeFilter !== 'all' 
              ? 'No agents found matching your filters'
              : 'No agents yet. Create your first agent to get started.'}
          </p>
          {!searchQuery && typeFilter === 'all' && (
            <Button onClick={() => setShowCreate(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Agent
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map(agent => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onView={() => setViewingAgent(agent)}
              onEdit={() => setEditingAgent(agent)}
              onDelete={() => setDeletingAgent(agent)}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <CreateAgentDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={() => {
          setShowCreate(false)
          loadAgents()
        }}
      />

      <EditAgentDialog
        open={!!editingAgent}
        agent={editingAgent}
        onClose={() => setEditingAgent(null)}
        onSuccess={() => {
          setEditingAgent(null)
          loadAgents()
        }}
      />

      <AgentDetailDialog
        open={!!viewingAgent}
        agent={viewingAgent}
        onClose={() => setViewingAgent(null)}
      />

      <ConfirmDialog
        open={!!deletingAgent}
        onClose={() => setDeletingAgent(null)}
        onConfirm={handleDelete}
        title="Delete Agent"
        description={`Are you sure you want to delete "${deletingAgent?.name}"? This action cannot be undone.`}
      />
    </div>
  )
}
```

### Step 3: Create API Routes

**File:** `app/api/agents/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as kv from '@/lib/kv-store'

// GET /api/agents - List all agents
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const agents = await kv.getByPrefix(`user:${user.id}:agent:`)
    
    // Sort by creation date (newest first)
    agents.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({
      data: agents,
      count: agents.length
    })

  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch agents', details: error.message },
      { status: 500 }
    )
  }
}

// POST /api/agents - Create new agent
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, type, model, systemPrompt, voice, temperature, maxTokens } = body

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
      temperature: temperature || 0.7,
      maxTokens: maxTokens || 2000,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id
    }

    await kv.set(`user:${user.id}:agent:${agentId}`, agent)

    console.log('Agent created:', agentId)

    return NextResponse.json(
      { data: agent },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json(
      { error: 'Failed to create agent', details: error.message },
      { status: 500 }
    )
  }
}
```

**File:** `app/api/agents/[id]/route.ts`

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
    
    const existingAgent = await kv.get(key)
    if (!existingAgent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    const updates = await request.json()

    const updatedAgent = {
      ...existingAgent,
      ...updates,
      id: agentId,
      userId: user.id,
      updatedAt: new Date().toISOString()
    }

    await kv.set(key, updatedAgent)

    console.log('Agent updated:', agentId)

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

    const agent = await kv.get(key)
    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      )
    }

    await kv.del(key)

    console.log('Agent deleted:', agentId)

    return NextResponse.json(
      { success: true, message: 'Agent deleted successfully' },
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

### Step 4: Update API Client

**File:** `lib/api.ts` (updated)

```typescript
// Helper for API calls
export async function apiCall(endpoint: string, options: any = {}) {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    credentials: 'include' // Important for cookies
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error || `API call failed: ${response.statusText}`)
  }

  const data = await response.json()
  return data.data || data // Handle both { data: ... } and direct responses
}
```

### Step 5: Update Modal Components (Add "use client")

**File:** `components/CreateAgentDialog.tsx`

```tsx
"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner@2.0.3'
import { apiCall } from '@/lib/api'

interface CreateAgentDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateAgentDialog({ open, onClose, onSuccess }: CreateAgentDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'voice',
    model: 'gpt-4',
    systemPrompt: '',
    voice: 'alloy',
    temperature: 0.7,
    maxTokens: 2000
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      await apiCall('/api/agents', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      
      toast.success('Agent created successfully')
      onSuccess()
      
      // Reset form
      setFormData({
        name: '',
        type: 'voice',
        model: 'gpt-4',
        systemPrompt: '',
        voice: 'alloy',
        temperature: 0.7,
        maxTokens: 2000
      })
    } catch (error) {
      console.error('Failed to create agent:', error)
      toast.error(error.message || 'Failed to create agent')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Agent Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="My AI Assistant"
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Agent Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voice">Voice</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="model">AI Model</Label>
            <Select
              value={formData.model}
              onValueChange={(value) => setFormData({ ...formData, model: value })}
            >
              <SelectTrigger id="model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.type === 'voice' && (
            <div>
              <Label htmlFor="voice">Voice</Label>
              <Select
                value={formData.voice}
                onValueChange={(value) => setFormData({ ...formData, voice: value })}
              >
                <SelectTrigger id="voice">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alloy">Alloy</SelectItem>
                  <SelectItem value="echo">Echo</SelectItem>
                  <SelectItem value="fable">Fable</SelectItem>
                  <SelectItem value="onyx">Onyx</SelectItem>
                  <SelectItem value="nova">Nova</SelectItem>
                  <SelectItem value="shimmer">Shimmer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              value={formData.systemPrompt}
              onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
              placeholder="You are a helpful AI assistant..."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Agent'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

---

## What Changed?

### 1. File Structure
- **Before:** Single `AgentsPage.tsx` in `components/pages/`
- **After:** Split into:
  - `app/(authenticated)/agents/page.tsx` (server wrapper)
  - `components/pages/AgentsPageClient.tsx` (client component)

### 2. Imports
- **Before:** `import { Link } from 'react-router-dom'`
- **After:** `import Link from 'next/link'`
- **Before:** `import { apiCall } from '../../utils/api'`
- **After:** `import { apiCall } from '@/lib/api'`

### 3. API Endpoints
- **Before:** `/agents` → `https://{project}.supabase.co/functions/v1/make-server-9d2dee99/agents`
- **After:** `/api/agents` → `http://localhost:3000/api/agents`

### 4. API Routes
- **Before:** Single Hono app in `supabase/functions/server/index.tsx`
- **After:** Separate files:
  - `app/api/agents/route.ts`
  - `app/api/agents/[id]/route.ts`

### 5. Metadata
- **Before:** No built-in metadata
- **After:** Export `metadata` object in server component

### 6. Authentication
- **Before:** Pass token in Authorization header
- **After:** Cookies handled automatically by middleware

---

## Testing the Migration

### 1. Start Next.js Development Server
```bash
npm run dev
```

### 2. Test Authentication
- Navigate to `/auth`
- Sign in with credentials
- Should redirect to `/dashboard`

### 3. Test Agents Page
- Navigate to `/agents`
- Should load without errors
- Should display agents list (or empty state)

### 4. Test Create Agent
- Click "Create Agent" button
- Fill in form
- Submit
- Should create agent and refresh list

### 5. Test Edit Agent
- Click edit on an agent card
- Modify fields
- Save
- Should update agent

### 6. Test Delete Agent
- Click delete on an agent card
- Confirm deletion
- Should remove agent from list

### 7. Test API Endpoints Directly
```bash
# List agents
curl http://localhost:3000/api/agents

# Create agent
curl -X POST http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Agent","type":"voice","model":"gpt-4"}'

# Get agent
curl http://localhost:3000/api/agents/agent_123

# Update agent
curl -X PUT http://localhost:3000/api/agents/agent_123 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'

# Delete agent
curl -X DELETE http://localhost:3000/api/agents/agent_123
```

---

This complete example shows the full migration process from React/Vite to Next.js!
