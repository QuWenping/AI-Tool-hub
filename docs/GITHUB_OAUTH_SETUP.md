# GitHub OAuth Sign-In Diagnostic Checklist

## Step 1: Check Your Browser Console
When you click "Sign in" → "Continue with GitHub", check the **browser console** (F12) for these logs:

```
[Auth] Starting github OAuth sign-in...
[Auth] Response status: 200
[Auth] Response data: { url: "https://github.com/login/oauth/authorize?..." }
```

If you see **different logs**, that's your problem. Copy them here.

---

## Step 2: Verify Supabase Configuration

1. Go to https://app.supabase.com → Select your project
2. Navigate to **Authentication → Providers**
3. Look for **GitHub** in the list

### Is GitHub enabled?
- [ ] YES → Continue to Step 3
- [ ] NO → Click GitHub, toggle ON, and save

### Does GitHub have credentials?
- [ ] YES (shows green checkmark) → Continue to Step 3
- [ ] NO → See Step 3 to add them

---

## Step 3: Add GitHub OAuth Credentials to Supabase

1. Go to https://github.com/settings/developers (logged in as YOUR account)
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in:
   - **Application name**: `AI Tool Hub` (or any name)
   - **Homepage URL**: `https://thebestaitoolsreview.com`
   - **Authorization callback URL**: `https://thebestaitoolsreview.com/api/auth/callback`
4. Click **Register application**
5. You'll see:
   - **Client ID** (e.g., `abc123def456`)
   - **Client Secret** button → Click to reveal

6. Copy both values into Supabase:
   - Go to https://app.supabase.com → Your Project
   - **Authentication → Providers → GitHub**
   - Paste **Client ID** into "Client ID"
   - Paste **Client Secret** into "Client Secret"
   - Click **Save**

---

## Step 4: For Local Development

Add a SECOND OAuth callback in GitHub:

1. https://github.com/settings/developers → Your OAuth App
2. Under "Authorization callback URLs", add:
   ```
   http://localhost:4321/api/auth/callback
   ```
   (or whatever port Astro is using locally)
3. Click **Update application**

---

## Step 5: Test Locally

1. Terminal: `npm run dev`
2. Browser: `http://localhost:4321`
3. Click "Sign in" → "Continue with GitHub"
4. You should be redirected to GitHub login
5. After login, you should be redirected back with a session cookie

---

## If It Still Fails

Share the **browser console output** when you click "Sign in". Include:
- The full error message
- The URL that was generated (if any)
- Response status code

Then I can pinpoint the exact issue.

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "OAuth provider returned no URL" | GitHub OAuth app isn't enabled in Supabase |
| Redirects to GitHub but fails to return | Callback URL doesn't match in GitHub settings |
| "Invalid credentials" | Client ID or Secret is wrong |
| Page just reloads with no error | Browser cookies disabled or CORS issue |

