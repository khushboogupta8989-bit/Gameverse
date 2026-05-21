# GameVerse — GitHub + Render deployment

Follow these steps in order. Your local site keeps working; production uses separate URLs and env vars on Render.

## Before you start

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (free tier is fine)
- [GitHub](https://github.com) account
- [Render](https://render.com) account
- Git installed on your PC

Your real secrets stay in `backend/.env` locally — that file is **not** pushed to GitHub.

---

## Part 1 — Push code to GitHub

Open PowerShell:

```powershell
cd c:\website\gameverse
git init
git add .
git status
```

Confirm you do **not** see `backend/.env`, `node_modules`, or `backend/node_modules`. If `.env` appears, stop and fix `.gitignore`.

```powershell
git commit -m "Prepare GameVerse for Render deployment"
```

On GitHub: **New repository** → name e.g. `gameverse` → **do not** add README/license → Create.

Replace `YOUR_USERNAME` and `YOUR_REPO`:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Sign in when Git asks (browser or personal access token).

---

## Part 2 — Deploy backend on Render (Web Service)

1. [Render Dashboard](https://dashboard.render.com) → **New +** → **Web Service**
2. Connect your GitHub repo
3. Settings:

| Field | Value |
|--------|--------|
| **Name** | `gameverse-api` (any name) |
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance type** | Free (or paid) |

4. **Environment** (copy values from your local `backend/.env`):

| Key | Example / notes |
|-----|------------------|
| `MONGO_URI` | Same Atlas connection string you use locally |
| `JWT_SECRET` | Same secret as local (or generate a new long random string) |
| `EMAIL_USER` | Optional, for contact form |
| `EMAIL_PASS` | Optional |
| `FRONTEND_URL` | Leave empty for now; add after frontend deploy (step below) |

5. **Create Web Service**. Wait until status is **Live**.
6. Copy the URL, e.g. `https://gameverse-api.onrender.com` — this is your **API URL**.

---

## Part 3 — Deploy frontend on Render (Static Site)

1. **New +** → **Static Site** → same GitHub repo
2. Settings:

| Field | Value |
|--------|--------|
| **Name** | `gameverse` |
| **Root Directory** | *(leave blank — repo root is the React app)* |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |

3. **Environment**:

| Key | Value |
|-----|--------|
| `REACT_APP_API_URL` | `https://YOUR-BACKEND.onrender.com/api` (your API URL + `/api`) |

4. **Create Static Site**. Copy the site URL, e.g. `https://gameverse.onrender.com`.

---

## Part 4 — Link frontend and backend (CORS)

1. Open your **backend** service on Render → **Environment**
2. Set **FRONTEND_URL** to your static site URL, e.g. `https://gameverse.onrender.com`
3. Save — Render will redeploy the API automatically

---

## Part 5 — Verify

- Open the static site URL in the browser
- Home, games, leaderboard should load
- Register / login should work
- If API calls fail: check browser DevTools → Network; confirm `REACT_APP_API_URL` ends with `/api`

**Local dev unchanged:** run backend and `npm start` in the project root as before; localhost URLs still work by default.

---

## Safety checklist

- Never commit `backend/.env` or paste secrets in GitHub issues
- Do not delete your MongoDB Atlas cluster when deploying
- Free Render services sleep after inactivity (first request may be slow)
- Pushing new commits to `main` triggers automatic redeploys on Render
