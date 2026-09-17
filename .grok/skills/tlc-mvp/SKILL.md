---
name: tlc-mvp
description: >
  Run and debug The Last Centre (TLC-MVP) locally: Node 20, Express :8080,
  React :3000, Hasura, env files, and the local admin login. Use when the
  user mentions TLC, TLC-MVP, The Last Centre, tlc-mvp-app, local login,
  Hasura hibernation, or /tlc-mvp.
---

# TLC-MVP local run

Repo: `/Users/rahulgarg/Projects/TLC_App/TLC-MVP`
Architecture, routes, and tables live in the repo `README.md` — do not copy them here.

## Runtime (required)

1. Load nvm and use **Node 20.16.0** before any server command:
   `export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 20.16.0`
2. Never start the API with `/usr/local/bin/node` (v16). It has no global `fetch`; `getData` fails and login returns "Database is unavailable".
3. Client: `cd client && npm start` → http://localhost:3000
4. Server: `cd server && npm run build && npm start` → http://localhost:8080
5. Client must call the local API. `client/.env.local` is `REACT_APP_API_URL=http://localhost:8080`. API modules import `API_BASE` from `client/src/apis/config.js`. Restart CRA after changing env.

## Secrets

- Server env: `server/.env` (gitignored). Keys: `HASURA_DB_URL`, `HASURA_ADMIN_SECRET`, `JWT_SECRET_KEY`, `CRYPTO_TICKET`, `MAIL_API_KEY`.
- Never print those values in chat, README, or commits.
- Active Hasura in `.env` is the **uncommented** `HASURA_DB_URL` (dev: `evident-buffalo-85.hasura.app`). If GraphQL returns HTML "Project not reachable", tell the user to unhibernate it in Hasura Cloud. Do not fail silently.
- Commented prod Hasura `test-project-tlc.hasura.app` has **no schema** — do not switch to it.

## Local login

Known local admin (created for this machine):

- Email: `dev.admin@thelastcentre.com`
- Password: `TlcLocal@123`
- Role: admin (`isVerified` + `isAdminVerified` + `isAdmin`)

Existing real users (passwords unknown): `rgarg@celestialsys.com`, `shreya.celestialsys@gmail.com`, `gauravyadav.mern@gmail.com`, `anishchaurasia2002@gmail.com`, `shivani.pruthi13@gmail.com`.

Login requires all three flags true. Public signup is not enough.

## Dashboard doughnut

`past_six_months_enrollments` is filtered by `enrollments.created_at`. The chart in `DoughnutChart.js` buckets the last **6 calendar months including the current month**, matching year + month. Dummy enrollments must have `created_at` spread across those months or the doughnut looks empty.
