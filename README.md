# AI Powered Virtual FashionStylist / StyleMind AI

This repository contains StyleMind — an AI-assisted fashion/styling web app. It includes a React + Vite frontend, a Node/Express backend (for user, conversation and clothes APIs), and a small FastAPI service used for product recommendations.

This README documents how the project is structured, how to run it locally, required environment variables, available API endpoints, and common troubleshooting steps.

## Table of contents
- Project overview
- Tech stack
- Project structure
- Prerequisites
- Frontend (development & build)
- Backend (Node/Express)
- Recommendations service (FastAPI)
- Environment variables
- API endpoints (summary)
- Common troubleshooting
- Security / Secrets
- Contributing

## Project overview

StyleMind AI helps users discover outfits and styling guidance. Major functionality:

- Chat-based AI assistant and conversation storage
- Outfit studio (customize outfit items, analyze outfit details)
- Product recommendation service (FastAPI) that returns similar items
- Persistence for users, conversations, clothes, and saved outfits via the Node backend

## Tech stack

- Frontend: React 18 + Vite, TailwindCSS
- Backend (API): Node.js + Express
- Recommendation microservice: Python + FastAPI (uses scikit-learn TF-IDF cosine similarity on product data)
- Data store: MongoDB (used by the Node backend; Mongoose connection present in `Backend/db`)
- HTTP client: Axios

## Project structure (top-level)

Key files/folders:

- `package.json` — frontend app scripts and dependencies (Vite)
- `vite.config.mjs` — Vite dev server config (port 4028)
- `src/` — React source code (pages, components, services)
- `Backend/` — Express server and related routes
	- `Backend/index.js` — backend entrypoint (default port: 5000)
	- `Backend/routes/` — API routes (conversations, clothes, outfits, auth)
- `fastapi/` — small Python recommendation service (`main.py`) listening on port 8000 by default

See the repository root for additional files and infrastructure.

## Prerequisites

- Node.js (recommended v16+)
- npm or yarn
- Python 3.9+ (for the FastAPI recommendations service)
- MongoDB (local or remote) for the Express backend

## Frontend — run locally

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm start
# opens Vite dev server on port 4028 by default
```

Notes:
- `src/index.jsx` sets `axios.defaults.withCredentials = true` so the frontend will send credentials/cookies when `withCredentials` is used in requests.
- Vite configuration currently listens on port `4028` (see `vite.config.mjs`). You may add proxy rules to forward `/api` to the Node backend if desired.

## Backend (Node/Express) — run locally

1. Move into the backend folder (if you run it separately) or run from project root if the app expects to start it there.

```bash
# from repo root
cd Backend
npm install
node index.js
# or use nodemon in development
```

2. Default settings

- The Express server uses `dotenv` and listens on the `PORT` environment variable or `5000` by default.
- `Backend/index.js` mounts API routes:
	- `/api/conversations`
	- `/api/clothes`
	- `/api/wadrope` (outfits)
	- `/api/auth` (authentication and saved outfits)

3. CORS

- The backend uses `cors({ credentials: true, origin: process.env.CLIENT_URL || 'http://localhost:4028' })`. Ensure `CLIENT_URL` or the default origin matches your Vite dev server origin when testing with cookies/credentials.

## Recommendations service (FastAPI)

The `fastapi/main.py` file implements a simple recommendation endpoint using TF-IDF and cosine similarity. It exposes:

- POST `/recommend` — body: `{ "item_name": "<product name>" }` — returns `{ "recommendations": [ ... ] }`.

Run the service (example using uvicorn):

```bash
cd fastapi
pip install -r requirements.txt   # create this file if needed (pandas, scikit-learn, fastapi, uvicorn)
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Important notes on CORS:
- `fastapi/main.py` includes `CORSMiddleware` and a list of allowed origins. If your frontend makes cross-origin XHR/Fetch requests with credentials, ensure `allow_credentials=True` and that the frontend origin is included in `allow_origins`.

## Environment variables

Common environment variables used by the project (non-exhaustive):

- For backend (`Backend/.env`):
	- `PORT` — backend port (default 5000)
	- `CLIENT_URL` — frontend origin for CORS (e.g., `http://localhost:4028`)
	- `MONGODB_URI` — MongoDB connection string
	- `JWT_SECRET` — authentication signing secret (if used)
	- `HUGGING_FACE_TOKEN` — (if using Hugging Face APIs) keep secret

- For FastAPI service: no strong secret required but the recommendation data JSON file must be present (see `fastapi/main.py` which reads `new.json`).

Do NOT commit real secrets to git. Use `.env` and add to `.gitignore`. Provide `.env.example` files with placeholder values instead.

## API endpoints (summary)

Express backend (examples):

- `GET /api/clothes` — fetch clothing items (used by the Outfit Studio component)
- `POST /api/auth/save-outfit` — save selected outfit for the logged-in user (uses cookies/credentials)
- `GET/POST /api/conversations` — conversation storage and retrieval
- Additional routes are mounted at `/api/wadrope` and `/api/auth` for outfits and auth respectively.

Recommendations service (FastAPI):

- `POST /recommend` — takes `item_name` and returns similar product recommendations

## Running the whole app (typical local dev)

1. Ensure MongoDB is available and `Backend/.env` is configured
2. Start the FastAPI recommendations service:

```bash
cd fastapi
uvicorn main:app --reload --port 8000
```

3. Start the Node backend

```bash
cd Backend
node index.js
```

4. Start the frontend (from repo root)

```bash
npm start
```

If the frontend makes requests directly to `http://127.0.0.1:8000` for recommendations, confirm CORS is correctly configured on the FastAPI side.

## Troubleshooting

- CORS errors when calling `http://127.0.0.1:8000/recommend` from `http://localhost:4028`:
	- Ensure `fastapi/main.py` includes `CORSMiddleware` with `allow_credentials=True` and that the frontend origin is listed in `allow_origins`.
	- If using cookies/credentials from the browser, the request must use `withCredentials` (axios) and backend must permit credentials.

- 404 / API endpoint not found:
	- Confirm the Express backend is running on the expected port and that the correct route is used from the frontend. Consider adding a Vite proxy in `vite.config.mjs` so `/api` is forwarded to `http://localhost:5000` during development.

- GitHub push blocked by push protection (secret scanning):
	- If you see a GH013 push error referencing secrets (e.g., Hugging Face token), remove secrets from the commit history, add `.env` to `.gitignore`, revoke exposed tokens, and replace them with new tokens stored in environment variables.
	- Git history rewrite example (dangerous — read docs first): use `git filter-repo` or `git filter-branch` to remove sensitive files from history, then force-push once resolved.

## Security

- Never commit real API keys or tokens. Add `.env` and `Backend/.env` to `.gitignore`.
- If a secret has been pushed, rotate/revoke it immediately.

## Contributing

- Please open issues for bugs or feature requests. When contributing code:
	- Follow the existing style conventions
	- Do not include secrets in commits
	- Add small, focused PRs

## Notes and next steps

- Add `README` sections for testing, CI, and production deployment if you plan to deploy.
- Consider adding a `docker-compose` setup that brings MongoDB, the Node API, and the FastAPI service up locally for reproducible development.

---

If you want, I can now:

1. Create `.env.example` and `Backend/.env.example` with placeholders.
2. Add a Vite proxy configuration to `vite.config.mjs` (forward `/api` to backend and optionally `/recommend` to 8000).
3. Add step-by-step commands to `README` for Windows (PowerShell/CMD) and Bash.

Tell me which of these you'd like me to do next and I will update files accordingly.

