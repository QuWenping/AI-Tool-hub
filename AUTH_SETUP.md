---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d49fe9e58e84b114ae630734f70cf3ca_598016c3872b11f1a68c525400826444
    ReservedCode1: 54vLS7gNUltqTDN+djOYHkJ0MhMEeg0DW+jGbeyXZQhhU8BlhtcymNO3UhMTirz3WqA0ZC7iaXQbA73m6oNVqnfbZmmwD53UonpDSv4bEL3E3DgeplHMfb0nrIouofQDNPyzpl3REJ5eveXyXmWu5MG+QdsE29TgX5tu06Mj1WeXIJfR5FiQb0nKU7A=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d49fe9e58e84b114ae630734f70cf3ca_598016c3872b11f1a68c525400826444
    ReservedCode2: 54vLS7gNUltqTDN+djOYHkJ0MhMEeg0DW+jGbeyXZQhhU8BlhtcymNO3UhMTirz3WqA0ZC7iaXQbA73m6oNVqnfbZmmwD53UonpDSv4bEL3E3DgeplHMfb0nrIouofQDNPyzpl3REJ5eveXyXmWu5MG+QdsE29TgX5tu06Mj1WeXIJfR5FiQb0nKU7A=
---

# Supabase Auth Setup Guide

This project uses Supabase for GitHub OAuth and email/password sign-in. Follow the steps below to configure it.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up or log in.
2. Create a new project (free tier is sufficient).
3. Note your project's region and set a secure database password.

## 2. Get API Credentials

1. In the Supabase Dashboard, go to **Settings → API**.
2. Copy the **Project URL** (e.g., `https://abc123def.supabase.co`).
3. Copy the **anon public key** (starts with `eyJ...`).
4. Open the `.env` file in the project root and replace the placeholder values:

```
SUPABASE_URL=https://abc123def.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

## 3. Enable Authentication Methods

In the Supabase Dashboard, go to **Authentication → Providers** and configure the following:

### GitHub OAuth

1. Toggle GitHub to **Enabled**.
2. Go to [GitHub Developer Settings → OAuth Apps](https://github.com/settings/developers).
   - Click **New OAuth App**.
   - Set **Homepage URL** to `https://thebestaitoolsreview.com`.
   - Set **Authorization callback URL** to `https://thebestaitoolsreview.com/api/auth/callback`.
   - Register the application.
   - Generate a new **Client Secret**.
   - Copy the **Client ID** and **Client Secret** into the Supabase GitHub provider form.
3. Save.

### Email / Password

1. In **Authentication → Providers**, ensure the **Email** provider is **Enabled**.
2. Under **Authentication → Settings**, choose whether email confirmation is required:
   - If **Confirm email** is disabled, users are signed in immediately after registration.
   - If **Confirm email** is enabled, users must click the confirmation link sent to their inbox before they can sign in.
3. (Optional) Customize the confirmation and password-reset email templates under **Authentication → Email Templates**.

## 4. Build and Deploy

After filling in `.env`, run:

```bash
npx astro build
```

The hybrid output mode ensures static pages remain SSG, while the `/api/auth/*` routes use SSR for the auth flow.

## 5. Local Development

For local testing, add a second GitHub OAuth callback URL pointing to `http://localhost:4321/api/auth/callback` (or your local dev server port) in the GitHub OAuth app settings. Email/password sign-in works locally without extra configuration.

---

**Questions?** Refer to [Supabase Auth Docs](https://supabase.com/docs/guides/auth).
*（内容由AI生成，仅供参考）*
