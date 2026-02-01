# Messaging Setup (Telegram, Discord, WhatsApp, SMS)

G-Rump supports native messaging on Telegram, Discord, WhatsApp (via Twilio), and SMS/voice (via Twilio). Users can chat with G-Rump and run SHIP (e.g. "ship Build a todo app") from these platforms.

## Prerequisites

- Backend running with at least one AI provider key (`NVIDIA_NIM_API_KEY` or `OPENROUTER_API_KEY`)
- Public HTTPS URL for webhooks (Telegram, Twilio). Local dev: use [ngrok](https://ngrok.com/) or similar.

---

## Telegram

1. **Create a bot** via [@BotFather](https://t.me/botfather). Send `/newbot`, follow prompts. Save the token.

2. **Configure backend** (`backend/.env`):
   ```env
   TELEGRAM_BOT_TOKEN=your-bot-token
   TELEGRAM_WEBHOOK_SECRET=optional-secret  # if set, include in webhook URL
   ```

3. **Set webhook** (replace `{TOKEN}` and `{PUBLIC_URL}`):
   ```bash
   curl "https://api.telegram.org/bot{TOKEN}/setWebhook?url={PUBLIC_URL}/api/messaging/telegram"
   ```
   With secret: `...?url={PUBLIC_URL}/api/messaging/telegram&secret={TELEGRAM_WEBHOOK_SECRET}`

4. **Chat with your bot** in Telegram. Commands:
   - Normal chat: any message
   - SHIP: `ship Build a todo app` or `ship: Create a REST API with auth`

---

## Discord

1. **Create an application** at [Discord Developer Portal](https://discord.com/developers/applications). Add a Bot, copy the token.

2. **Enable Message Content intent**: Bot → Privileged Gateway Intents → enable "Message Content Intent".

3. **Invite the bot** to your server: OAuth2 → URL Generator → scopes: `bot`; permissions: `Send Messages`, `Read Message History`, `View Channels`.

4. **Configure backend** (`backend/.env`):
   ```env
   DISCORD_BOT_TOKEN=your-bot-token
   ```

5. **Run backend** (non-serverless only). The Discord bot starts automatically when `DISCORD_BOT_TOKEN` is set.

**Note:** Discord requires a long-running process (WebSocket). It will not work on Vercel serverless. Use Docker, Railway, or a VPS.

---

## Twilio (SMS, Voice, WhatsApp)

1. **Create a Twilio account** at [twilio.com](https://www.twilio.com).

2. **SMS/Voice**: Get a phone number. Configure webhook URL for "A message comes in": `https://{PUBLIC_URL}/api/messaging/inbound`

3. **WhatsApp**: Use Twilio WhatsApp Sandbox or production. Configure webhook to the same `/api/messaging/inbound` endpoint. Twilio sends `From: whatsapp:+1234567890`.

4. **Configure backend** (`backend/.env`):
   ```env
   MESSAGING_PROVIDER=twilio
   TWILIO_ACCOUNT_SID=your-sid
   TWILIO_AUTH_TOKEN=your-token
   TWILIO_REPLY_TO_NUMBER=+1234567890
   TWILIO_WEBHOOK_SECRET=optional  # require X-Webhook-Secret header if set
   TWILIO_WHATSAPP_NUMBER=+1234567890  # optional; for WhatsApp replies, defaults to TWILIO_REPLY_TO_NUMBER
   ```

5. **Optional:** `PHONE_TO_USER_ID` – JSON map `{"+1234567890":"user-id"}` to route numbers to users. Without it, all use `default`.

---

## Free Agent

Free Agent is a full-capability mode (MoltBot-style) available from the G-Rump app. It uses the same backend but with user-controlled capability toggles and external API allowlist.

### Docker recommended

Free Agent runs best in **Docker** for sandboxing and isolation. Use the **Docker Setup** wizard from the sidebar (or Free Agent screen) to install and run the stack. When Docker is detected, Free Agent uses the containerized backend.

### Capability toggles

In the **Free Agent** screen you can enable or disable tool categories:

- **File system** – read/write files and list directories  
- **Git** – clone, commit, push, branch  
- **Bash** – shell commands  
- **npm** – package installs  
- **Docker** – build and run containers  
- **Cloud** – deploy and provision  
- **Webhooks** – outbound HTTP  
- **Scheduled tasks** – heartbeats  
- **Internet Search** – web search and more  

Disabled categories are not available in Free Agent sessions. Settings are stored in preferences and synced to the backend when signed in.

### External APIs allowlist

Free Agent can call external URLs only if the **host** is in your allowlist. In the Free Agent screen, **External APIs** section, add domains you trust (e.g. `api.example.com`). Outbound HTTP to other hosts is blocked. This applies to user-initiated Free Agent sessions from the G-Rump app.

### Running locally

If you run without Docker, the app treats run mode as **local**. When you start a Free Agent chat locally, you must confirm **every session** with “I understand, continue” before the first message is sent. Running locally gives the AI full access to your system; use Docker for sandboxing.

### Backend

- Set `FREE_AGENT_ENABLED=true` in `backend/.env` when you want the backend to allow full-agent mode for G-Rump app requests (already bypassed for `X-GRump-Client` requests in agent governance).
- Free Agent preferences (capabilities and allowlist) are stored under settings. When the app sends `sessionType: 'freeAgent'` on chat requests, the backend loads the user's settings and applies the capability filter and external-URL allowlist.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Telegram: no response | Check webhook URL is HTTPS; verify `TELEGRAM_BOT_TOKEN`; check backend logs. |
| Discord: bot online but no reply | Enable Message Content intent in Developer Portal. |
| Twilio: 503 | Set `TWILIO_WEBHOOK_SECRET` in production when using Twilio. |
| WhatsApp: no reply | Ensure `TWILIO_WHATSAPP_NUMBER` or `TWILIO_REPLY_TO_NUMBER` has `whatsapp:` prefix when replying to WhatsApp messages (handled automatically). |
