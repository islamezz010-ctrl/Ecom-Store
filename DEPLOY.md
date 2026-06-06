# Deployment Checklist — Backend on Render, Frontend on Vercel

This file lists the exact steps, commands, and environment variables to deploy the backend to Render and the frontend to Vercel.

## 1 — Prepare repository

- Ensure your repo is pushed to GitHub (or Git provider) and is up to date.
- Confirm the following files exist in the repo root:
  - [server/.env.example](server/.env.example)
  - [vercel.json](vercel.json)

To push changes locally:

```bash
git add .
git commit -m "chore: prepare for render/vercel deployment"
git push origin main
```

Replace `main` with your branch name if different.

## 2 — Backend (Render)

1. Sign in to Render and create a new **Web Service**.
2. Connect the Git repo and choose the branch to deploy.
3. Set **Root Directory** to `/server`.
4. Build & Start:
   - Build Command: leave blank or `npm install`
   - Start Command: `npm run start` (uses `server/package.json` `start` script)
5. Health Check Path: `/health`
6. Environment variables (set under Service → Environment):
   - `MONGO_URI` — MongoDB connection string
   - `STRIPE_SECRET_KEY` — Stripe secret key
   - `JWT_SECRET` — JWT signing secret
   - `GOOGLE_CLIENT_ID` — Google OAuth client id
   - `GOOGLE_CLIENT_SECRET` — Google OAuth client secret
   - `CORS_ORIGIN` — comma-separated allowed origins (include your Vercel URL)
   - `CLIENT_URL` — frontend URL (e.g., `https://your-app.vercel.app`)
   - `NODE_ENV=production`

Notes:

- Ensure `CORS_ORIGIN` includes your Vercel URL (https, no trailing slash).
- Render will provide a service URL like `https://your-service.onrender.com` — use that as the backend URL in Vercel's `VITE_API_URL`.

## 3 — Frontend (Vercel)

1. Sign in to Vercel and import your Git repo.
2. Configure project settings:
   - Framework Preset: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Environment variables (Project → Settings → Environment Variables):
   - `VITE_API_URL` = `https://<your-render-service>.onrender.com`
   - `VITE_STRIPE_PUBLISHABLE_KEY` = your Stripe publishable key
   - `VITE_GOOGLE_CLIENT_ID` = your Google client id

4. Deploy. After deploy completes, open the Vercel URL.

## 4 — Post-deploy checks

- Backend health: `https://<your-render-service>/health` should return `{ status: "ok" }`.
- Open the frontend and verify product list, login, and checkout flows.
- Use browser DevTools Network tab to confirm calls go to the Render URL and that cookies are set as `Secure` with `SameSite=None` (production).
- If cookies are not being set, ensure:
  - The frontend is served over HTTPS
  - `CORS_ORIGIN` contains the exact origin of the frontend
  - Server sets `secure: true` and `sameSite: 'none'` when `NODE_ENV=production` (already implemented)

## 5 — Quick troubleshooting

- CORS errors: confirm `CORS_ORIGIN` includes the calling origin (no trailing slash).
- Stripe redirects incorrect: confirm `CLIENT_URL` is set on Render and points to the Vercel URL.
- Local testing: leave `VITE_API_URL` unset locally (client falls back to `http://localhost:5000`).

## 6 — Useful commands

Start server locally (server folder):

```bash
cd server
npm run dev
```

Start client locally:

```bash
npm run dev
```

Build client locally:

```bash
npm run build
```

## 7 — Where changes were made for deployment

- `src/lib/api.js` — centralizes backend URL via `VITE_API_URL`.
- Client pages updated to import `API` and use `${API}` for fetch calls.
- `vercel.json` — SPA rewrite for client-side routing.
- `server/index.js` — cookie settings and Stripe redirect use `CLIENT_URL`.
- `server/.env.example` — added `CORS_ORIGIN` and `CLIENT_URL` placeholders.

---

If you want, I can:

- create a Git branch and prepare a clean commit message (I cannot push automatically), or
- add a small CI workflow that runs lint and builds PRs before merge.
