# Demo E2E Script

Automated Playwright script for repeatable demo: Architecture → Spec (PRD) → Code.

## Prerequisites

- Backend running: `cd backend && npm run dev` (or `npm run start:prod`)
- Frontend dev server: `cd frontend && npm run dev` (or Playwright starts it)
- At least one AI provider key in `backend/.env`: `NVIDIA_NIM_API_KEY` or `OPENROUTER_API_KEY`

## Run Demo E2E

```bash
cd frontend
npm run test:e2e -- e2e/tests/full-demo.spec.ts
```

Or run in CI mode (headless, with backend):

```bash
cd frontend
npm run test:e2e:ci -- e2e/tests/full-demo.spec.ts
```

## Scripted Flow

1. **Launch** – Open app, skip onboarding if shown
2. **Try Demo** – Clicks "Try Demo" button (Architecture + PRD with prebaked data)
3. **Full Demo** – Clicks "Full Demo" button (Architecture → PRD → Code generation)

## Related Specs

| Spec | Covers |
|------|--------|
| `full-demo.spec.ts` | Try Demo, Full Demo, Code mode visibility |
| `critical-journeys.spec.ts` | Intent → Architecture → PRD → Code flow |
| `ship-codegen.spec.ts` | SHIP and codegen flows |
| `swarm.spec.ts` | Agent swarm UI |

## Manual Demo

See [DEMO_SCRIPT.md](DEMO_SCRIPT.md) for manual 5-minute demo steps.
