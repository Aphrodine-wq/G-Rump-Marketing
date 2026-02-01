# Remote Access

G-Rump supports several options for remote access and discovery.

## Tailscale Serve/Funnel

Run the G-Rump backend behind Tailscale for secure remote access:

1. Install [Tailscale](https://tailscale.com/) on your machine.
2. Run the backend: `cd backend && npm run dev`
3. Enable Serve (Tailnet-only): `tailscale serve 3000`
4. Or use Funnel for public HTTPS: `tailscale funnel 3000`

The backend uses standard HTTP; no code changes needed. Tailscale handles TLS and auth.

## SSH Tunnels

For remote gateway control, use SSH port forwarding:

```bash
# Forward local port 3000 to remote
ssh -L 3000:localhost:3000 user@gateway-host
```

Then access G-Rump at `http://localhost:3000` from your local machine.

## Bonjour/mDNS Discovery

When the backend starts with `BONJOUR_ENABLED=true`, it advertises `_grump._tcp.local` on the local network. Electron and other clients can discover G-Rump instances for pairing.

Enable in `.env`:

```
BONJOUR_ENABLED=true
```

The backend will advertise on port 3000 (or `PORT` if set).
