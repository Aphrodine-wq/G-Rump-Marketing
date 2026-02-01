# Google OAuth Setup for Electron

The Electron desktop app can prompt users to sign in with Google immediately after onboarding. This requires configuring Google OAuth and Supabase.

## Prerequisites

- Supabase project with Auth enabled
- Google Cloud project

## 1. Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and create or select a project.
2. Enable the **Google+ API** (or **People API**) if needed.
3. Go to **APIs & Services > Credentials**.
4. Click **Create Credentials > OAuth client ID**.
5. Select **Web application** as the application type.
6. Add **Authorized JavaScript origins**:
   - `http://localhost:5173` (dev)
   - `http://localhost:3000` (backend)
   - Your production URLs if applicable
7. Add **Authorized redirect URIs**:
   - `http://localhost:3000/auth/google/callback` (backend callback)
   - Your Supabase callback URL (from Supabase Dashboard > Auth > URL Configuration)
8. Save and copy the **Client ID** and **Client Secret**.

## 2. Supabase Dashboard

1. Go to your [Supabase project](https://supabase.com/dashboard) > **Authentication > Providers**.
2. Enable **Google**.
3. Paste the **Client ID** and **Client Secret** from Google Cloud.
4. In **Authentication > URL Configuration**, add to **Redirect URLs**:
   - `http://localhost:3000/auth/google/callback`
   - `http://localhost:5173/auth/done`

## 3. Backend Environment

Ensure `backend/.env` has:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

The backend uses `SUPABASE_ANON_KEY` or `SUPABASE_SERVICE_KEY` for Google OAuth URL generation and code exchange.

## 4. CORS

The backend `CORS_ORIGINS` (or default) must include `http://localhost:5173` so the OAuth window can fetch the auth URL with credentials.

## Flow

1. User completes onboarding and sees "Sign in with Google".
2. User clicks the button; Electron opens an OAuth window to `/auth/google/start`.
3. That page fetches `GET /auth/google/url` (with credentials) and redirects to Google.
4. User signs in with Google; Google redirects to Supabase, then to `http://localhost:3000/auth/google/callback`.
5. Backend exchanges the code for a session and redirects to `http://localhost:5173/auth/done?access_token=...`.
6. The OAuth window saves the session and closes; the main window proceeds to the app.

## Troubleshooting

- **"OAuth not available in mock mode"**: Configure real Supabase credentials in `backend/.env`.
- **"Failed to start sign-in"**: Verify Google and Supabase are configured; check backend logs.
- **Redirect URI mismatch**: Ensure the callback URL in Google Cloud and Supabase exactly match (including `http` vs `https`, port, path).
