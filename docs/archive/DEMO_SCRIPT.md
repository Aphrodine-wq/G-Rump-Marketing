# G-Rump 5-Minute Demo Script

A repeatable first-impression demo: open app, complete or skip setup, then try Architecture or Demo mode.

## Prerequisites

- Backend running: `cd backend && npm start` (or `npm run dev`)
- Desktop app: `cd frontend && npm run electron:dev` (or web: `cd frontend && npm run dev` → http://localhost:5173)
- At least one AI provider key in `backend/.env`: `NVIDIA_NIM_API_KEY` or `OPENROUTER_API_KEY`

## Steps (about 5 minutes)

1. **Launch** – Open the desktop app or web app. If first run, you see the onboarding carousel.
2. **Onboarding** – Complete the setup (preferences, tech stack) or click **Skip** to go straight to chat.
3. **Empty state** – You see “Welcome to G-Rump” with Quick Start, Take a Tour, Try Demo, See Examples.
4. **Option A – Architecture** – In the chat input, type: *“Design a microservices architecture for an e-commerce platform with user service, product catalog, and order management.”* Send. Wait for the response with a Mermaid diagram. Show **Export Architecture** or **Export PRD** if available.
5. **Option B – Try Demo** – Click **Try Demo**. Confirm the toast “Demo workspace ready.” Switch to Code mode and follow the demo steps (if the backend returned steps).
6. **Shortcuts** – Mention: **Ctrl+B** toggles sidebar, **/** or **Ctrl+Shift+L** focuses chat, **Ctrl+K** opens command palette. (Also listed in Settings → Keyboard shortcuts.)
7. **Wrap** – “That’s the core flow: describe → diagram/PRD → optional codegen. For more, see docs.g-rump.com and the roadmap in docs/ROADMAP.md.”

## Troubleshooting

- **No diagram / timeout** – Check `NVIDIA_NIM_API_KEY` or `OPENROUTER_API_KEY` in `backend/.env`; check backend logs for 4xx/5xx.
- **Try Demo fails** – Ensure backend is up and `POST /api/demo/start` is reachable; check network/CORS.
- **Export not visible** – Export buttons appear when the response includes an architecture or PRD block.

## Links

- [Getting Started](GETTING_STARTED.md)
- [Getting started (Local vs Docker)](GETTING_STARTED.md)
- [Roadmap](ROADMAP.md)
