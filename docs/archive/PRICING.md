# G-Rump Pricing

G-Rump uses a **credit-based pricing model**. Each operation costs credits. Tiers include a monthly credit allowance; overage billing applies for Pro and Team.

## Tiers

| Tier | Monthly | Credits | Key Features |
|------|---------|---------|--------------|
| **Free** | $0 | 100 credits/mo | Basic Free Agent tools, 3 swarm agents, community support |
| **Pro** | $29/mo | 1,000 credits/mo | Cloud & CI/CD tools, 5 swarm agents, priority support, overage billing |
| **Team** | $99/mo | 5,000 credits/mo | Swarm premium included, 10 agents, 24/7 persistent agent, team collaboration |
| **Enterprise** | Custom | Unlimited | All features, 100 agents, dedicated support, SLA |

## Credits per Operation

| Operation | Credits |
|-----------|---------|
| Chat | 1 |
| Architecture | 2 |
| Intent parse | 1 |
| PRD | 3 |
| Plan | 2 |
| SHIP (full run) | 10 |
| Codegen | 20 |
| Swarm run | 15 |

## Swarm Premium

- **Pro**: Swarm add-on available (+$15/mo)
- **Team**: Swarm premium included
- **Enterprise**: Swarm premium included

## Billing

- **Stripe Checkout**: Pro and Team subscriptions
- **Stripe Customer Portal**: Manage subscription, payment methods
- **Usage display**: Settings shows credits used and limit
- **Overage**: Pro and Team can purchase additional credits

## API

- `GET /api/billing/tiers` – tier definitions
- `GET /api/billing/me` – current tier, credits used, limit
- `POST /api/billing/checkout` – create Stripe Checkout session
- `POST /api/billing/portal` – create Stripe Customer Portal session
