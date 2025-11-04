import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";
import { generateMockCallLogs, generateDashboardStats, generateMockPhoneNumbers, generateSampleAgents, generateSystemPersonas } from "./mock-data.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-9d2dee99/health", (c) => {
  return c.json({ status: "ok" });
});

// User signup endpoint
app.post("/make-server-9d2dee99/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Create user with admin API
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error for ${email}: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log(`Error during signup: ${error}`);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// Get all agents for a user
app.get("/make-server-9d2dee99/agents", async (c) => {
  console.log('🤖 [BACKEND] GET /agents - Request received');
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    console.log('🤖 [BACKEND] Access token:', accessToken ? 'Present' : 'MISSING');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    console.log('🤖 [BACKEND] User ID:', user?.id || 'NONE');
    
    if (authError || !user) {
      console.log(`🤖 [BACKEND] Authorization error: ${authError?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get all agents for this user
    console.log('🤖 [BACKEND] Fetching agents from KV with prefix:', `agent:${user.id}:`);
    const agentValues = await kv.getByPrefix(`agent:${user.id}:`);
    console.log('🤖 [BACKEND] KV returned', agentValues.length, 'agent values');
    console.log('🤖 [BACKEND] Sample agent value:', agentValues[0] ? JSON.stringify(agentValues[0]).substring(0, 100) : 'NONE');
    let agents = agentValues.filter(agent => agent != null);
    console.log('🤖 [BACKEND] Filtered to', agents.length, 'valid agents');

    // If no agents exist, create sample agents for demo purposes
    if (agents.length === 0) {
      console.log(`🤖 [BACKEND] No agents found for user ${user.id}, creating sample agents`);
      const sampleAgents = generateSampleAgents(user.id);
      console.log(`🤖 [BACKEND] Generated ${sampleAgents.length} sample agents`);
      
      // Store each sample agent in KV
      for (const agent of sampleAgents) {
        console.log(`🤖 [BACKEND] Storing agent ${agent.id} (${agent.name})`);
        await kv.set(`agent:${user.id}:${agent.id}`, agent);
      }
      
      agents = sampleAgents;
      console.log(`🤖 [BACKEND] ✅ Created ${sampleAgents.length} sample agents for user ${user.id}`);
    } else {
      console.log(`🤖 [BACKEND] ✅ Returning ${agents.length} existing agents`);
    }

    console.log('🤖 [BACKEND] Returning agents:', agents.map(a => a.name));
    return c.json({ agents });
  } catch (error) {
    console.log(`🤖 [BACKEND] ❌ Error fetching agents: ${error}`);
    console.log(`🤖 [BACKEND] ❌ Error stack:`, error.stack);
    return c.json({ error: "Internal server error while fetching agents" }, 500);
  }
});

// Create new agent
app.post("/make-server-9d2dee99/agents", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      console.log(`Authorization error while creating agent: ${authError?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const agentData = await c.req.json();
    
    // Validate required fields
    if (!agentData.name || !agentData.type || !agentData.personaId) {
      return c.json({ error: "Name, type, and personaId are required" }, 400);
    }

    // Create agent with unique ID
    const agentId = crypto.randomUUID();
    const agent = {
      id: agentId,
      userId: user.id,
      name: agentData.name,
      type: agentData.type, // inbound, outbound, hybrid
      agentType: agentData.agentType || 'voice',
      personaId: agentData.personaId,
      model: agentData.model || 'gpt-4',
      voice: agentData.voice || 'alloy',
      language: agentData.language || 'en-US',
      systemPrompt: agentData.systemPrompt || '',
      status: agentData.status || 'active',
      channels: agentData.channels || ['voice'],
      phoneNumberId: agentData.phoneNumberId || null,
      temperature: agentData.temperature || 0.7,
      createdAt: new Date().toISOString(),
    };

    // Store agent in KV store
    await kv.set(`agent:${user.id}:${agentId}`, agent);

    return c.json({ agent });
  } catch (error) {
    console.log(`Error creating agent: ${error}`);
    return c.json({ error: "Internal server error while creating agent" }, 500);
  }
});

// Update agent
app.put("/make-server-9d2dee99/agents/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const agentId = c.req.param('id');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      console.log(`Authorization error while updating agent: ${authError?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get existing agent
    const existingAgent = await kv.get(`agent:${user.id}:${agentId}`);
    
    if (!existingAgent) {
      return c.json({ error: "Agent not found" }, 404);
    }

    const updates = await c.req.json();
    
    // Update agent
    const updatedAgent = {
      ...existingAgent,
      ...updates,
      id: agentId,
      userId: user.id,
    };

    await kv.set(`agent:${user.id}:${agentId}`, updatedAgent);

    return c.json({ agent: updatedAgent });
  } catch (error) {
    console.log(`Error updating agent: ${error}`);
    return c.json({ error: "Internal server error while updating agent" }, 500);
  }
});

// Delete agent
app.delete("/make-server-9d2dee99/agents/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const agentId = c.req.param('id');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      console.log(`Authorization error while deleting agent: ${authError?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Delete agent
    await kv.del(`agent:${user.id}:${agentId}`);

    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting agent: ${error}`);
    return c.json({ error: "Internal server error while deleting agent" }, 500);
  }
});

// Get dashboard stats
app.get("/make-server-9d2dee99/dashboard/stats", async (c) => {
  console.log('📊 [BACKEND] GET /dashboard/stats - Request received');
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    console.log('📊 [BACKEND] Access token:', accessToken ? 'Present' : 'MISSING');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    console.log('📊 [BACKEND] User ID:', user?.id || 'NONE');
    
    if (authError || !user) {
      console.log(`📊 [BACKEND] ❌ Authorization error: ${authError?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get agents
    console.log('📊 [BACKEND] Fetching agents from KV...');
    const agentValues = await kv.getByPrefix(`agent:${user.id}:`);
    const agents = agentValues.filter(agent => agent != null);
    console.log('📊 [BACKEND] Found', agents.length, 'agents');
    
    // Get or generate call logs
    console.log('📊 [BACKEND] Fetching calls from KV...');
    let calls = await kv.get(`calls:${user.id}`);
    console.log('📊 [BACKEND] Calls from KV:', calls ? calls.length : 'NULL');
    
    if (!calls && agents.length > 0) {
      console.log('📊 [BACKEND] No calls found, generating mock calls...');
      const agentIds = agents.map(a => a.id).filter(id => id != null);
      console.log('📊 [BACKEND] Agent IDs for calls:', agentIds);
      if (agentIds.length > 0) {
        calls = generateMockCallLogs(user.id, agentIds, 50);
        console.log('📊 [BACKEND] Generated', calls.length, 'mock calls');
        await kv.set(`calls:${user.id}`, calls);
        console.log('📊 [BACKEND] ✅ Stored calls in KV');
      }
    }
    calls = calls || [];
    console.log('📊 [BACKEND] Total calls:', calls.length);
    
    const stats = generateDashboardStats(agents, calls);
    console.log('📊 [BACKEND] Generated stats:', stats);
    console.log('📊 [BACKEND] ✅ Returning stats');
    
    return c.json({ stats });
  } catch (error) {
    console.log(`📊 [BACKEND] ❌ Error fetching dashboard stats: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get call logs
app.get("/make-server-9d2dee99/calls", async (c) => {
  console.log('📞 [BACKEND] GET /calls - Request received');
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const limit = parseInt(c.req.query('limit') || '50');
    console.log('📞 [BACKEND] Access token:', accessToken ? 'Present' : 'MISSING');
    console.log('📞 [BACKEND] Limit:', limit);
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    console.log('📞 [BACKEND] User ID:', user?.id || 'NONE');
    
    if (authError || !user) {
      console.log(`📞 [BACKEND] ❌ Authorization error: ${authError?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get or generate call logs
    console.log('📞 [BACKEND] Fetching calls from KV...');
    let calls = await kv.get(`calls:${user.id}`);
    console.log('📞 [BACKEND] Calls from KV:', calls ? calls.length : 'NULL');
    
    if (!calls) {
      console.log('📞 [BACKEND] No calls found, checking agents...');
      const agentValues = await kv.getByPrefix(`agent:${user.id}:`);
      const agents = agentValues.filter(agent => agent != null);
      console.log('📞 [BACKEND] Found', agents.length, 'agents');
      
      if (agents.length > 0) {
        const agentIds = agents.map(a => a.id).filter(id => id != null);
        console.log('📞 [BACKEND] Agent IDs:', agentIds);
        if (agentIds.length > 0) {
          console.log('📞 [BACKEND] Generating 50 mock calls...');
          calls = generateMockCallLogs(user.id, agentIds, 50);
          console.log('📞 [BACKEND] Generated', calls.length, 'calls');
          await kv.set(`calls:${user.id}`, calls);
          console.log('📞 [BACKEND] ✅ Stored calls in KV');
        } else {
          console.log('📞 [BACKEND] No agent IDs, returning empty array');
          calls = [];
        }
      } else {
        console.log('📞 [BACKEND] No agents found, returning empty array');
        calls = [];
      }
    } else {
      console.log('📞 [BACKEND] ✅ Using existing calls from KV');
    }
    
    const limitedCalls = calls.slice(0, limit);
    console.log('📞 [BACKEND] Returning', limitedCalls.length, 'calls (limited from', calls.length, 'total)');
    
    return c.json({ calls: limitedCalls, total: calls.length });
  } catch (error) {
    console.log(`📞 [BACKEND] ❌ Error fetching calls: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get single call details
app.get("/make-server-9d2dee99/calls/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const callId = c.req.param('id');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const calls = await kv.get(`calls:${user.id}`) || [];
    const call = calls.find((c: any) => c.id === callId);
    
    if (!call) {
      return c.json({ error: "Call not found" }, 404);
    }
    
    return c.json({ call });
  } catch (error) {
    console.log(`Error fetching call: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get phone numbers
app.get("/make-server-9d2dee99/phone-numbers", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get or generate phone numbers
    let phones = await kv.get(`phones:${user.id}`);
    if (!phones) {
      phones = generateMockPhoneNumbers(user.id, 5);
      await kv.set(`phones:${user.id}`, phones);
    }
    
    return c.json({ phoneNumbers: phones });
  } catch (error) {
    console.log(`Error fetching phone numbers: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Assign phone number to agent
app.post("/make-server-9d2dee99/phone-numbers/:id/assign", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const phoneId = c.req.param('id');
    const { agentId } = await c.req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    let phones = await kv.get(`phones:${user.id}`) || [];
    const phoneIndex = phones.findIndex((p: any) => p.id === phoneId);
    
    if (phoneIndex === -1) {
      return c.json({ error: "Phone number not found" }, 404);
    }
    
    phones[phoneIndex].assignedAgentId = agentId;
    phones[phoneIndex].status = agentId ? 'active' : 'idle';
    await kv.set(`phones:${user.id}`, phones);
    
    return c.json({ phoneNumber: phones[phoneIndex] });
  } catch (error) {
    console.log(`Error assigning phone number: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get all personas for a user
app.get("/make-server-9d2dee99/personas", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user personas
    const personaValues = await kv.getByPrefix(`persona:${user.id}:`);
    const personas = personaValues.filter(p => p != null);
    
    // Get or initialize system templates (shared across all users)
    let systemTemplates = await kv.get('personas:system-templates');
    if (!systemTemplates) {
      systemTemplates = generateSystemPersonas();
      await kv.set('personas:system-templates', systemTemplates);
    }
    
    return c.json({ personas: [...systemTemplates, ...personas] });
  } catch (error) {
    console.log(`Error fetching personas: ${error}`);
    return c.json({ error: "Internal server error while fetching personas" }, 500);
  }
});

// Create new persona
app.post("/make-server-9d2dee99/personas", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const personaData = await c.req.json();
    
    if (!personaData.name || !personaData.type) {
      return c.json({ error: "Name and type are required" }, 400);
    }

    const personaId = crypto.randomUUID();
    const persona = {
      id: personaId,
      userId: user.id,
      name: personaData.name,
      type: personaData.type,
      description: personaData.description || '',
      instructions: personaData.instructions || '',
      tone: personaData.tone || 'professional',
      style: personaData.style || 'conversational',
      personalityTraits: personaData.personalityTraits || [],
      channels: personaData.channels || ['voice'],
      tools: personaData.tools || [],
      brandProfileId: personaData.brandProfileId || null,
      isTemplate: false,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`persona:${user.id}:${personaId}`, persona);

    return c.json({ persona });
  } catch (error) {
    console.log(`Error creating persona: ${error}`);
    return c.json({ error: "Internal server error while creating persona" }, 500);
  }
});

// Update persona
app.put("/make-server-9d2dee99/personas/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const personaId = c.req.param('id');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const existingPersona = await kv.get(`persona:${user.id}:${personaId}`);
    
    if (!existingPersona) {
      return c.json({ error: "Persona not found" }, 404);
    }

    if (existingPersona.isTemplate) {
      return c.json({ error: "Cannot edit system templates" }, 403);
    }

    const updates = await c.req.json();
    
    const updatedPersona = {
      ...existingPersona,
      ...updates,
      id: personaId,
      userId: user.id,
      isTemplate: false,
    };

    await kv.set(`persona:${user.id}:${personaId}`, updatedPersona);

    return c.json({ persona: updatedPersona });
  } catch (error) {
    console.log(`Error updating persona: ${error}`);
    return c.json({ error: "Internal server error while updating persona" }, 500);
  }
});

// Delete persona
app.delete("/make-server-9d2dee99/personas/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const personaId = c.req.param('id');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const persona = await kv.get(`persona:${user.id}:${personaId}`);
    
    if (!persona) {
      return c.json({ error: "Persona not found" }, 404);
    }

    if (persona.isTemplate) {
      return c.json({ error: "Cannot delete system templates" }, 403);
    }

    // Check if persona is in use
    const agents = await kv.getByPrefix(`agent:${user.id}:`);
    const inUse = agents.some((agent: any) => agent?.personaId === personaId);
    
    if (inUse) {
      return c.json({ error: "Cannot delete persona: in use by agents" }, 400);
    }

    await kv.del(`persona:${user.id}:${personaId}`);

    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting persona: ${error}`);
    return c.json({ error: "Internal server error while deleting persona" }, 500);
  }
});

// Get brand profile
app.get("/make-server-9d2dee99/brand-profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const brandProfile = await kv.get(`brand-profile:${user.id}`);
    
    return c.json({ brandProfile: brandProfile || null });
  } catch (error) {
    console.log(`Error fetching brand profile: ${error}`);
    return c.json({ error: "Internal server error while fetching brand profile" }, 500);
  }
});

// Update brand profile
app.put("/make-server-9d2dee99/brand-profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const brandData = await c.req.json();
    
    const brandProfile = {
      ...brandData,
      userId: user.id,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`brand-profile:${user.id}`, brandProfile);

    return c.json({ brandProfile });
  } catch (error) {
    console.log(`Error updating brand profile: ${error}`);
    return c.json({ error: "Internal server error while updating brand profile" }, 500);
  }
});

// Extract brand voice from social media (AI extraction)
app.post("/make-server-9d2dee99/brand-profile/extract", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { urls } = await c.req.json();
    
    if (!urls || urls.length === 0) {
      return c.json({ error: "At least one URL is required" }, 400);
    }

    // TODO: Implement actual AI extraction using OpenAI/Anthropic
    // For now, return mock extracted data
    const extractedData = {
      businessDescription: "A modern technology company focused on innovation and customer success.",
      brandVoice: "Professional, innovative, and customer-focused with a friendly tone.",
      toneGuidelines: "Be helpful, clear, and enthusiastic. Avoid jargon unless necessary.",
      targetAudience: "Tech-savvy professionals and businesses looking for AI solutions.",
      keyProducts: ["AI Voice Agents", "Chat Automation", "Multi-channel Support"],
      keyServices: ["Voice AI Integration", "Custom Agent Development", "24/7 Support"],
      companyValues: ["Innovation", "Customer Success", "Transparency", "Excellence"],
      brandPersonality: ["Professional", "Innovative", "Helpful", "Reliable"],
      uniqueSellingPoints: ["Multi-channel AI support", "Easy integration", "Real-time analytics"],
      commonQuestions: [
        "How do I get started?",
        "What channels are supported?",
        "Can I customize the AI agent?",
      ],
      dos: [
        "Always be helpful and professional",
        "Provide clear, actionable information",
        "Use customer's name when appropriate",
      ],
      donts: [
        "Never make promises we can't keep",
        "Avoid technical jargon with non-technical users",
        "Don't share confidential information",
      ],
      extractedAt: new Date().toISOString(),
      sourceUrls: urls,
    };

    return c.json({ extractedData });
  } catch (error) {
    console.log(`Error extracting brand voice: ${error}`);
    return c.json({ error: "Internal server error while extracting brand voice" }, 500);
  }
});

// Get analytics data
app.get("/make-server-9d2dee99/analytics", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const calls = await kv.get(`calls:${user.id}`) || [];
    const agentKeys = await kv.getByPrefix(`agent:${user.id}:`);
    const agents = agentKeys.map(item => item.value).filter(agent => agent != null);
    
    // Calculate analytics
    const totalCalls = calls.length;
    const successfulCalls = calls.filter((c: any) => c && c.outcome === 'success').length;
    const successRate = totalCalls > 0 ? ((successfulCalls / totalCalls) * 100).toFixed(1) : '0';
    const avgDuration = calls.length > 0 
      ? Math.floor(calls.filter((c: any) => c && c.duration).reduce((sum: number, c: any) => sum + c.duration, 0) / calls.length)
      : 0;
    const totalCost = calls.filter((c: any) => c && c.cost).reduce((sum: number, c: any) => sum + parseFloat(c.cost), 0).toFixed(2);
    
    // Group by date for chart
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });
    
    const callsByDate = last30Days.map(date => {
      const count = calls.filter((c: any) => c && c.createdAt && c.createdAt.split('T')[0] === date).length;
      return { date, count };
    });
    
    // Performance by agent
    const agentPerformance = agents.map(agent => {
      if (!agent || !agent.id) return null;
      const agentCalls = calls.filter((c: any) => c && c.agentId === agent.id);
      const agentSuccess = agentCalls.filter((c: any) => c && c.outcome === 'success').length;
      return {
        agentId: agent.id,
        agentName: agent.name || 'Unknown',
        calls: agentCalls.length,
        successRate: agentCalls.length > 0 ? ((agentSuccess / agentCalls.length) * 100).toFixed(1) : '0',
        avgDuration: agentCalls.length > 0 
          ? Math.floor(agentCalls.filter((c: any) => c && c.duration).reduce((sum: number, c: any) => sum + c.duration, 0) / agentCalls.length)
          : 0,
        totalCost: agentCalls.filter((c: any) => c && c.cost).reduce((sum: number, c: any) => sum + parseFloat(c.cost), 0).toFixed(2),
      };
    }).filter(perf => perf != null);
    
    return c.json({ 
      summary: {
        totalCalls,
        successRate,
        avgDuration,
        totalCost,
      },
      callsByDate,
      agentPerformance,
    });
  } catch (error) {
    console.log(`Error fetching analytics: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);