# Backend Developer Guide

**Everything backend devs need to know (and nothing you don't).**

## Your Focus Areas

As a backend developer, you care about:
- ✅ API routes and endpoints
- ✅ Business logic in services
- ✅ Database operations
- ✅ AI tool definitions
- ✅ Multi-agent orchestration
- ❌ Svelte component styling
- ❌ Electron window management
- ❌ CSS/Tailwind details

## Quick Setup

```bash
# 1. Quick Start (recommended for API development)
npm run setup:interactive
# → Choose "Quick Start" (no API keys needed)

# 2. Start only the backend
npm run dev:backend

# 3. API available at http://localhost:3000
```

**Why Quick Start?** You can develop and test API endpoints with mock AI responses.

## Project Structure

```
backend/
├── src/
│   ├── routes/             # API endpoints (Express routes)
│   │   ├── chat.ts
│   │   ├── agents.ts
│   │   └── *.ts
│   ├── services/           # Business logic
│   │   ├── agentOrchestrator.ts
│   │   └── *.ts
│   ├── tools/              # AI tool definitions
│   │   ├── bashTool.ts
│   │   └── *.ts
│   ├── db/                 # Database layer
│   │   ├── database.ts
│   │   └── migrations/
│   ├── middleware/         # Express middleware
│   │   ├── auth.ts
│   │   └── *.ts
│   ├── config/            # Configuration
│   │   └── env.ts
│   └── index.ts           # Entry point
├── tests/                 # Test files
└── data/                  # SQLite database storage
```

## Key Concepts

### Express Routes

Add new API endpoints:

```typescript
// routes/my-feature.ts
import { Router } from 'express';

const router = Router();

// GET /api/my-feature
router.get('/', async (req, res) => {
  const data = await getMyData();
  res.json({ success: true, data });
});

// POST /api/my-feature
router.post('/', async (req, res) => {
  const { input } = req.body;
  const result = await processInput(input);
  res.json({ success: true, result });
});

// GET /api/my-feature/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const item = await getItemById(id);
  if (!item) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(item);
});

export default router;
```

Register the route:

```typescript
// In src/index.ts or routes/index.ts
import myFeatureRoutes from './routes/my-feature.js';

app.use('/api/my-feature', myFeatureRoutes);
```

### Services (Business Logic)

Keep routes thin, put logic in services:

```typescript
// services/myService.ts
import { db } from '../db/database.js';

export interface MyData {
  id: string;
  name: string;
  createdAt: Date;
}

export async function getMyData(): Promise<MyData[]> {
  return db.prepare('SELECT * FROM my_table').all();
}

export async function getItemById(id: string): Promise<MyData | null> {
  return db.prepare('SELECT * FROM my_table WHERE id = ?').get(id) || null;
}

export async function createItem(name: string): Promise<MyData> {
  const id = crypto.randomUUID();
  const createdAt = new Date();
  
  db.prepare('INSERT INTO my_table (id, name, created_at) VALUES (?, ?, ?)')
    .run(id, name, createdAt.toISOString());
  
  return { id, name, createdAt };
}

export async function processInput(input: string): Promise<string> {
  // Your business logic here
  return input.toUpperCase();
}
```

### Database (SQLite)

```typescript
// db/database.ts
import Database from 'better-sqlite3';
import { env } from '../config/env.js';

export const db = new Database(env.DB_PATH);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Initialize tables
export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS my_table (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}
```

### AI Tools

Define tools that AI agents can use:

```typescript
// tools/myTool.ts
import { z } from 'zod';

export const myToolSchema = z.object({
  query: z.string().describe('The search query'),
  limit: z.number().optional().describe('Max results to return')
});

export type MyToolInput = z.infer<typeof myToolSchema>;

export const myTool = {
  name: 'my_search',
  description: 'Search for items in the database',
  parameters: myToolSchema,
  
  async execute(input: MyToolInput) {
    const { query, limit = 10 } = input;
    
    // Your tool implementation
    const results = db.prepare(
      'SELECT * FROM my_table WHERE name LIKE ? LIMIT ?'
    ).all(`%${query}%`, limit);
    
    return {
      success: true,
      results,
      count: results.length
    };
  }
};
```

### Middleware

```typescript
// middleware/myMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// Authentication middleware
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Validate token...
  req.user = { id: 'user-id', name: 'User' };
  next();
}

// Logging middleware
export function logRequests(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
}

// Error handler
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}
```

## Common Tasks

### Add a New API Endpoint

```typescript
// routes/projects.ts
import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db/database.js';

const router = Router();

const createProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional()
});

// List all projects
router.get('/', async (req, res) => {
  const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
  res.json(projects);
});

// Create a project
router.post('/', async (req, res) => {
  try {
    const data = createProjectSchema.parse(req.body);
    const id = crypto.randomUUID();
    
    db.prepare(
      'INSERT INTO projects (id, name, description, created_at) VALUES (?, ?, ?, ?)'
    ).run(id, data.name, data.description || '', new Date().toISOString());
    
    res.status(201).json({ id, ...data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    throw error;
  }
});

// Get a project
router.get('/:id', async (req, res) => {
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// Delete a project
router.delete('/:id', async (req, res) => {
  const result = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json({ success: true });
});

export default router;
```

### Call AI from Backend

```typescript
// services/aiService.ts
import { route } from '@grump/ai-core';
import { env } from '../config/env.js';
import { mockAI } from './mockAI.js';

export async function generateWithAI(prompt: string, options: any = {}) {
  // Check if mock mode is enabled
  if (env.MOCK_AI_MODE) {
    return mockAI.generateResponse(prompt, options);
  }
  
  // Route to real AI provider
  const { provider, modelId } = route({
    taskType: options.taskType || 'chat',
    preferCapability: options.capability
  });
  
  // Call the provider
  switch (provider) {
    case 'nim':
      return callNVIDIA(modelId, prompt, options);
    case 'openrouter':
      return callOpenRouter(modelId, prompt, options);
    // ... other providers
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

async function callNVIDIA(modelId: string, prompt: string, options: any) {
  const response = await fetch(`${env.NVIDIA_NIM_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.NVIDIA_NIM_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        { role: 'system', content: options.systemPrompt || '' },
        { role: 'user', content: prompt }
      ],
      stream: options.stream || false
    })
  });
  
  return response.json();
}
```

### Create an Agent

```typescript
// services/myAgent.ts
import { generateWithAI } from './aiService.js';
import { myTool } from '../tools/myTool.js';

export class MyAgent {
  name = 'MyAgent';
  description = 'Helps with specific tasks';
  tools = [myTool];
  
  async run(input: string, context: any = {}) {
    const systemPrompt = `You are ${this.name}. ${this.description}
    
Available tools:
${this.tools.map(t => `- ${t.name}: ${t.description}`).join('\n')}

Use tools when needed. Be helpful and concise.`;

    const response = await generateWithAI(input, {
      systemPrompt,
      taskType: 'agent',
      tools: this.tools
    });
    
    return response;
  }
}

// Usage
const agent = new MyAgent();
const result = await agent.run('Search for items about TypeScript');
```

### Add WebSocket Support

```typescript
// routes/ws.ts
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

export function setupWebSocket(server: ReturnType<typeof createServer>) {
  const wss = new WebSocketServer({ server, path: '/ws' });
  
  wss.on('connection', (ws) => {
    console.log('Client connected');
    
    ws.on('message', async (data) => {
      const message = JSON.parse(data.toString());
      
      // Process message
      const response = await processMessage(message);
      
      ws.send(JSON.stringify(response));
    });
    
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
  
  return wss;
}
```

### Background Jobs

```typescript
// services/jobQueue.ts
import { Queue } from 'bullmq';
import { db } from '../db/database.js';

const myQueue = new Queue('my-queue', {
  connection: { host: env.REDIS_HOST, port: env.REDIS_PORT }
});

export async function enqueueJob(data: any) {
  await myQueue.add('process-item', data, {
    delay: 0,
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 }
  });
}

// Worker
import { Worker } from 'bullmq';

const worker = new Worker('my-queue', async (job) => {
  console.log('Processing job:', job.id);
  
  // Your job logic
  await processItem(job.data);
  
  return { success: true };
}, {
  connection: { host: env.REDIS_HOST, port: env.REDIS_PORT }
});
```

## Testing

### Unit Tests

```typescript
// tests/services/myService.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { createItem, getItemById } from '../../src/services/myService.js';
import { initializeDatabase } from '../../src/db/database.js';

describe('myService', () => {
  beforeEach(() => {
    initializeDatabase();
  });
  
  it('creates an item', async () => {
    const item = await createItem('Test Item');
    expect(item.name).toBe('Test Item');
    expect(item.id).toBeDefined();
  });
  
  it('gets item by id', async () => {
    const created = await createItem('Test');
    const fetched = await getItemById(created.id);
    expect(fetched).toEqual(created);
  });
  
  it('returns null for non-existent item', async () => {
    const item = await getItemById('non-existent');
    expect(item).toBeNull();
  });
});
```

### API Tests

```typescript
// tests/routes/projects.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/index.js';

describe('POST /api/projects', () => {
  it('creates a project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({ name: 'My Project', description: 'Test' })
      .expect(201);
    
    expect(res.body.name).toBe('My Project');
    expect(res.body.id).toBeDefined();
  });
  
  it('validates input', async () => {
    await request(app)
      .post('/api/projects')
      .send({ name: '' })
      .expect(400);
  });
});
```

Run tests:
```bash
cd backend
npm test
```

## Environment Variables

Key variables for backend development:

```bash
# backend/.env
NODE_ENV=development
PORT=3000
MOCK_AI_MODE=true          # Enable for testing without API keys
LOG_LEVEL=debug           # Verbose logging

# AI Providers (add at least one for real AI)
NVIDIA_NIM_API_KEY=xxx
OPENROUTER_API_KEY=xxx
GROQ_API_KEY=xxx

# Database
DB_PATH=./data/grump.db

# Optional features
DISABLE_RAG=true          # Skip RAG setup
DISABLE_VOICE=true        # Skip voice setup
REDIS_HOST=localhost      # For job queues
```

## Debugging

### Enable Debug Logging

```bash
LOG_LEVEL=debug npm run dev:backend
```

### Inspect with VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Backend",
  "runtimeExecutable": "npx",
  "runtimeArgs": ["tsx", "watch", "src/index.ts"],
  "cwd": "${workspaceFolder}/backend",
  "envFile": "${workspaceFolder}/backend/.env"
}
```

### Log Requests

```typescript
// middleware/logger.ts
import logger from '../middleware/logger.js';

export function requestLogger(req, res, next) {
  logger.info({
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body
  }, 'Incoming request');
  
  next();
}
```

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000
```

**Database locked?**
```bash
# Remove WAL files
rm backend/data/*.db-wal backend/data/*.db-shm
```

**Type errors?**
```bash
cd backend
npm run type-check
```

**AI not responding?**
- Check `MOCK_AI_MODE` in `.env`
- Verify API key is set
- Check logs for errors

## Resources

- 📚 [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- 🔧 [Zod Validation](https://zod.dev/)
- 💾 [better-sqlite3](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md)
- 🤖 [AI Core Package](../../packages/ai-core/README.md)

## Next Steps

1. **Explore routes:** Look at `backend/src/routes/chat.ts`
2. **Try modifications:** Add a new endpoint
3. **Build something:** Create a service + route combo
4. **Read more:** `docs/AGENT_SYSTEM.md` for multi-agent orchestration

**Questions?** Check `docs/KNOWN_ISSUES.md` or run `npm run check-all` to verify your setup.
