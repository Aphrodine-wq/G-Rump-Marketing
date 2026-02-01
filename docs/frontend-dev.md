# Frontend Developer Guide

**Everything frontend devs need to know (and nothing you don't).**

## Your Focus Areas

As a frontend developer, you care about:
- ✅ Svelte components and UI
- ✅ State management with stores
- ✅ API integration (what the backend provides)
- ✅ Electron desktop app
- ❌ Rust compiler internals
- ❌ Multi-agent orchestration
- ❌ Database schemas

## Quick Setup

```bash
# 1. Quick Start (recommended for UI work)
npm run setup:interactive
# → Choose "Quick Start" (no API keys needed)

# 2. Start only the frontend
npm run dev:frontend

# 3. Open http://localhost:5173
```

**Why Quick Start?** You can build and test the UI with realistic mock responses, no API costs.

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Svelte components
│   │   ├── ChatInterface.svelte
│   │   ├── ArchitectureViewer.svelte
│   │   └── *.svelte
│   ├── stores/             # Svelte stores (state)
│   │   ├── chatStore.ts
│   │   └── preferencesStore.ts
│   ├── lib/                # Utilities
│   ├── routes/             # Page components (if using routing)
│   └── App.svelte          # Root component
├── electron/               # Desktop app
│   └── main.cjs           # Electron main process
└── public/                # Static assets
```

## Key Concepts

### Svelte 5 Runes

We use Svelte 5 with runes (reactivity system):

```svelte
<script>
  // State
  let count = $state(0);
  
  // Derived
  let doubled = $derived(count * 2);
  
  // Effect
  $effect(() => {
    console.log('Count changed:', count);
  });
  
  // Props
  let { message = 'Hello' } = $props();
</script>

<button onclick={() => count++}>
  Count: {count} (doubled: {doubled})
</button>
```

### State Management

Use Svelte stores for shared state:

```typescript
// stores/myStore.ts
import { writable, derived } from 'svelte/store';

// Simple store
export const myData = writable([]);

// Derived store
export const myDataCount = derived(myData, $data => $data.length);

// With actions
function createMyStore() {
  const { subscribe, set, update } = writable([]);
  
  return {
    subscribe,
    add: (item) => update(items => [...items, item]),
    remove: (id) => update(items => items.filter(i => i.id !== id)),
    reset: () => set([])
  };
}

export const myStore = createMyStore();
```

Use in components:

```svelte
<script>
  import { myStore, myDataCount } from '../stores/myStore';
</script>

<p>Items: {$myDataCount}</p>
{#each $myStore as item}
  <div>{item.name}</div>
{/each}
```

### API Integration

Talk to the backend:

```typescript
// lib/api.ts
const API_BASE = '/api'; // Proxied to localhost:3000

export async function sendMessage(message: string) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, mode: 'chat' })
  });
  return res.json();
}

// For streaming (Server-Sent Events)
export function streamMessage(message: string, onChunk: (chunk: string) => void) {
  const eventSource = new EventSource(
    `${API_BASE}/chat/stream?message=${encodeURIComponent(message)}`
  );
  
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onChunk(data.content);
  };
  
  eventSource.onerror = () => eventSource.close();
  
  return () => eventSource.close();
}
```

## Common Tasks

### Add a New Component

```svelte
<!-- components/MyFeature.svelte -->
<script>
  let { title = 'My Feature' } = $props();
  let isOpen = $state(false);
</script>

<div class="my-feature">
  <button onclick={() => isOpen = !isOpen}>
    {title}
  </button>
  
  {#if isOpen}
    <div class="content">
      <slot>Default content</slot>
    </div>
  {/if}
</div>

<style>
  .my-feature {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1rem;
  }
</style>
```

### Add a New Page/Route

```svelte
<!-- routes/MyPage.svelte -->
<script>
  import { onMount } from 'svelte';
  
  let data = $state(null);
  
  onMount(async () => {
    const res = await fetch('/api/my-endpoint');
    data = await res.json();
  });
</script>

{#if data}
  <h1>{data.title}</h1>
  <p>{data.description}</p>
{:else}
  <p>Loading...</p>
{/if}
```

### Style with Tailwind

```svelte
<div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
  <div class="w-12 h-12 bg-blue-500 rounded-full" />
  <div class="flex-1">
    <h3 class="font-semibold text-gray-900">Title</h3>
    <p class="text-sm text-gray-500">Description</p>
  </div>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Action
  </button>
</div>
```

### Handle User Input

```svelte
<script>
  let input = $state('');
  let isSubmitting = $state(false);
  
  async function handleSubmit() {
    if (!input.trim()) return;
    
    isSubmitting = true;
    try {
      await sendMessage(input);
      input = '';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
  <input
    bind:value={input}
    placeholder="Type something..."
    disabled={isSubmitting}
    class="w-full px-4 py-2 border rounded"
  />
  <button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Sending...' : 'Send'}
  </button>
</form>
```

## Electron Desktop App

### Run in Desktop Mode

```bash
cd frontend
npm run electron:dev
```

### Access Electron APIs

```svelte
<script>
  import { onMount } from 'svelte';
  
  let isElectron = $state(false);
  
  onMount(() => {
    // Check if running in Electron
    isElectron = window.electron !== undefined;
    
    if (isElectron) {
      // Call Electron main process
      window.electron.invoke('get-app-version').then(version => {
        console.log('App version:', version);
      });
    }
  });
</script>
```

### Electron IPC

```javascript
// electron/main.cjs (main process)
const { ipcMain } = require('electron');

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('open-file', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'] });
  return result.filePaths;
});
```

```typescript
// lib/electron.ts (preload)
contextBridge.exposeInMainWorld('electron', {
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  on: (channel, callback) => ipcRenderer.on(channel, callback)
});
```

## Testing

### Unit Tests

```typescript
// MyComponent.test.ts
import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MyComponent from './MyComponent.svelte';

describe('MyComponent', () => {
  it('renders with default props', () => {
    render(MyComponent);
    expect(screen.getByText('My Feature')).toBeInTheDocument();
  });
  
  it('toggles on click', async () => {
    render(MyComponent);
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    expect(screen.getByText('Default content')).toBeInTheDocument();
  });
});
```

Run tests:
```bash
cd frontend
npm run test:run
```

### E2E Tests

```typescript
// e2e/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test('user can send a message', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.fill('[placeholder="Ask anything..."]', 'Hello');
  await page.click('button[type="submit"]');
  await expect(page.locator('.message.assistant')).toBeVisible();
});
```

Run E2E:
```bash
cd frontend
npm run test:e2e
```

## Best Practices

### 1. Component Structure

```svelte
<script>
  // 1. Imports
  import { onMount } from 'svelte';
  import MyChild from './MyChild.svelte';
  
  // 2. Props
  let { title, onAction } = $props();
  
  // 3. State
  let count = $state(0);
  
  // 4. Derived
  let doubled = $derived(count * 2);
  
  // 5. Effects
  $effect(() => {
    console.log('Count:', count);
  });
  
  // 6. Functions
  function handleClick() {
    count++;
    onAction?.(count);
  }
</script>

<!-- 7. Template -->
<div>
  <h1>{title}</h1>
  <button onclick={handleClick}>Count: {count}</button>
  <MyChild {doubled} />
</div>

<!-- 8. Styles (scoped) -->
<style>
  h1 { color: blue; }
</style>
```

### 2. Avoid Prop Drilling

Use stores instead of passing props through many layers:

```typescript
// ❌ Bad: Passing through 3+ components
// ComponentA → ComponentB → ComponentC → uses data

// ✅ Good: Store
// Any component can import and use the store directly
```

### 3. Lazy Loading

```svelte
<script>
  import { lazy } from 'svelte-lazy';
  
  const HeavyComponent = lazy(() => import('./HeavyComponent.svelte'));
</script>

{#if showHeavy}
  <HeavyComponent />
{/if}
```

### 4. Error Boundaries

```svelte
<script>
  import { onError } from 'svelte';
  
  let error = $state(null);
  
  onError((err) => {
    error = err;
    console.error('Component error:', err);
  });
</script>

{#if error}
  <div class="error">Something went wrong: {error.message}</div>
{:else}
  <slot />
{/if}
```

## Troubleshooting

**Hot reload not working?**
- Check Vite is running: `npm run dev:frontend`
- Save the file - changes should appear instantly
- Hard refresh if needed: Ctrl+Shift+R

**API calls failing?**
- Backend must be running: `npm run dev:backend` (separate terminal)
- Check `frontend/vite.config.js` proxy settings
- Verify the API endpoint exists in `backend/src/routes/`

**Electron window blank?**
- Backend must be running
- Check console in Electron: Ctrl+Shift+I
- Verify `frontend/dist/` exists (run `npm run build` in frontend)

**Type errors?**
- Run `npm run type-check` in frontend directory
- Check `frontend/tsconfig.json` settings

## Resources

- 📚 [Svelte 5 Docs](https://svelte.dev/docs)
- 🎨 [Tailwind CSS](https://tailwindcss.com/docs)
- ⚡ [Vite Guide](https://vitejs.dev/guide/)
- 🖥️ [Electron Docs](https://www.electronjs.org/docs)

## Next Steps

1. **Explore components:** Look at `frontend/src/components/ChatInterface.svelte`
2. **Try modifications:** Change a color, add a button
3. **Build something:** Create a new component following the examples above
4. **Read more:** `docs/HOW_IT_WORKS.md` for request flow

**Questions?** Check `docs/KNOWN_ISSUES.md` or run `npm run check-all` to verify your setup.
