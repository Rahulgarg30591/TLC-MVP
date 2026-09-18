# TLC-MVP — The Last Centre

Internal operations web app for **The Last Centre** (UI copy also says “The Last Center”). Volunteers and admins manage workshops, meetings, enrollments (participants and their children), and volunteer accounts.

This README is a full map of the current codebase (branch `dev`). There is **no seed user and no password in the repo**. Login credentials live only in the Hasura `users` table.

---

## Quick facts

| | |
|---|---|
| Product | Volunteer / workshop / enrollment admin portal |
| Client | Create React App (React 18, MUI 5, React Query, AG Grid) |
| Server | Express + TypeScript BFF on port **8080** |
| Database | **Hasura GraphQL** (Postgres behind Hasura) |
| Email | Brevo SMTP (`smtp-relay.brevo.com:587`) as `infotech@thelastcentre.com` |
| Auth | JWT in `Authorization: Bearer <token>` (24h). Not cookies. |
| Production app | https://tlc-mvp-app.vercel.app |
| Production API | https://tlc-mvp-server.vercel.app |
| Older API URL | https://tlc-two.vercel.app (dead / 404 as of this write-up) |
| Git remote | https://github.com/gaurav-celestial/TLC-MVP.git (fork of shreya-celestial/TLC-MVP) |

The client **hardcodes** `https://tlc-mvp-server.vercel.app` in every API module. Running the UI locally still talks to the **deployed** API unless those URLs are changed.

---

## Repository layout

```
TLC-MVP/
├── README.md
├── .prettierrc                 # { "singleQuote": true }
├── client/                     # React SPA (package name: tlcapp)
│   ├── public/                 # index.html title: "The Last Centre"
│   └── src/
│       ├── App.js              # MUI Theme + React Query
│       ├── Theme.js            # brand colors
│       ├── index.js
│       ├── apis/               # fetch wrappers (hardcoded Vercel host)
│       ├── Components/         # layout, tables, popups, VolunteerForm
│       ├── Pages/              # Login, Dashboard, Volunteers, Workshops, …
│       ├── hooks/              # useReactQuery, useAlerts
│       ├── store/userContext.js
│       └── utils/              # validators, date helpers
└── server/
    ├── src/app.ts              # Express entry
    ├── src/Routes/             # REST routers
    ├── src/controllers/        # one file per endpoint
    ├── src/gql/                # Hasura query/mutation strings
    ├── src/middlewares/        # auth, adminAuth
    ├── src/utils/              # getData, mailer, generateMail
    ├── dist/                   # compiled JS (checked in)
    ├── vercel.json             # @vercel/node, catch-all to src/app.ts
    └── tsconfig.json           # CommonJS → dist/
```

Root `package-lock.json` is empty (no root package.json scripts). Work from `client/` and `server/`.

---

## Architecture

```
Browser (localhost:3000 or tlc-mvp-app.vercel.app)
    │  REST + Bearer JWT
    ▼
Express BFF (localhost:8080 or tlc-mvp-server.vercel.app)
    │  POST GraphQL + x-hasura-admin-secret
    ▼
Hasura (HASURA_DB_URL)
    ▼
Postgres tables: users, Invitations, workshops, enrollments,
                 children, meetings, and join tables
```

The BFF is a privileged proxy: **every** Hasura call uses the admin secret. There is no Hasura user JWT / RLS from the app.

Pincode lookup is a third-party call from the browser: `https://api.postalpincode.in/pincode/{code}`.

---

## How to run locally

### Prerequisites

- Node.js (tested with v20) and npm
- For a **working login**, you also need Hasura env vars (see [Credentials](#credentials--how-to-log-in))

### 1. Client (UI)

```bash
cd client
npm install          # uses .npmrc: legacy-peer-deps=true
npm start            # http://localhost:3000
```

Other scripts: `npm test`, `npm run build`.

This UI still calls **production** (`https://tlc-mvp-server.vercel.app`). That deployment currently returns `FUNCTION_INVOCATION_FAILED` (HTTP 500) on login, so the login page will render but sign-in will fail until either:

- the Vercel API is healthy again, or
- you point the client at a local server (replace `https://tlc-mvp-server.vercel.app` with `http://localhost:8080` in `client/src/apis/*.js`).

### 2. Server (API)

```bash
cd server
cp .env.example .env   # then fill in real values
npm install            # already present in this checkout
npm run build          # tsc → dist/
npm run server         # nodemon ./dist/app.js
# or: npm start        # node ./dist/app.js
```

Listens on **http://localhost:8080/**. Port is hardcoded (not `process.env.PORT`).

`dotenv.config()` loads `server/.env`. That file is gitignored.

---

## Credentials / how to log in

**There are no default emails or passwords in this repository.** Git history, client, and server were searched: nothing to log in with.

Login (`POST /user/login`) only succeeds when **all** of these are true for a `users` row:

1. Email exists
2. Password matches bcrypt hash (cost 12)
3. `isVerified === true` (email link clicked, or invite signup)
4. `isAdminVerified === true` (an admin approved the account, or the user came in via invite)

### Env vars the server needs (not login passwords)

Create `server/.env`:

```
HASURA_DB_URL=                 # Hasura GraphQL HTTP endpoint
HASURA_ADMIN_SECRET=           # sent as header x-hasura-admin-secret
JWT_SECRET_KEY=                # signs session JWTs
CRYPTO_TICKET=                 # AES key for email / invite / reset tickets
MAIL_API_KEY=                  # Brevo SMTP password for infotech@thelastcentre.com
```

These live on the Vercel project for `tlc-mvp-server` and are **not** in git. Get them from:

- Vercel → project `tlc-mvp-server` → Settings → Environment Variables
- or the Hasura Cloud / self-hosted console for the GraphQL URL + admin secret
- Brevo (Sendinblue) SMTP key for `MAIL_API_KEY`

Without `HASURA_*`, the server process will listen but every API call fails.

### How to get an app login (once Hasura is reachable)

**Option A — existing production users.** Ask a TLC admin (mailbox `infotech@thelastcentre.com`) for an account, or use **Forgot password** if that user is already verified + admin-verified and mail is working.

**Option B — invite path (skips email + admin verification).** An existing admin invites you; you open the mail link (valid **5 days**), sign up, and can log in immediately. `isAdmin` is copied from the invitation.

**Option C — first admin, via Hasura console.** Insert a row into `users`:

| Column | Value |
|---|---|
| `email` | your email |
| `password` | bcrypt hash, cost 12 |
| `name` | any |
| `isVerified` | `true` |
| `isAdminVerified` | `true` |
| `isAdmin` | `true` |
| `dob`, `gender`, `phoneNumber`, `yearOfJoining`, `location`, `city`, `state`, `pincode` | required by schema (use dummy valid values) |

Generate the hash from `server/` (bcrypt is already a dependency):

```bash
node -e "require('bcrypt').hash('YourPassword1!', 12).then(console.log)"
```

Password rules in the UI: min 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol.

**Option D — public signup.** `POST /user/signup` creates `isVerified: false`. You must click the Brevo email, then wait for an admin to verify you. You still cannot log in until `isAdminVerified` is true.

---

## Auth and roles

### Session

- Login returns `user` plus `user.key` (JWT).
- Client stores `localStorage.keys = { id: email, key }`.
- JWT payload: `{ email, isAdmin }`, signed with `JWT_SECRET_KEY`, expiry **24h**.
- Full JWT string is also stored on `users.isLoggedIn`. Logout sets it to `null`.
- Reload: `PUT /user/updateLogStatus` with `Authorization: Bearer <key>` and `{ isLoggingOut: false }`.

### Flags on `users`

| Flag | Meaning |
|---|---|
| `isVerified` | Email verified (or invite signup) |
| `isAdminVerified` | Admin approved the account |
| `isAdmin` | Admin privileges |

Navbar shows **Admin** vs **Volunteer** from `user.isAdmin`.

### Who can do what

| Action | Admin | Volunteer |
|---|---|---|
| View dashboard, lists, details | Yes | Yes |
| Invite / verify / reject / delete volunteers | Yes | No |
| Change volunteer role | Yes (not own) | No |
| Create / edit / delete workshops | Yes | View only |
| Create / edit / delete meetings | **UI allows all logged-in users** | same |
| Create / edit / delete enrollments | **UI allows all logged-in users** | same |
| Edit own profile | Yes | Yes |

Server enforces admin on volunteer invite/verify/role/delete and workshop CUD via `adminAuth`. Meetings and enrollments only require a valid JWT (`auth`).

---

## Client routes

Unauthenticated: `/` Login, `/signup`, `/forgotPass`, `/resetPass`. Unknown paths → Login.

Authenticated:

| Path | Page |
|---|---|
| `/`, `/dashboard` | Dashboard |
| `/editprofile` | Edit own profile |
| `/volunteers` | Volunteer list |
| `/volunteers/detail/:email/:type` | View / edit volunteer (`type` = `view` \| `edit`) |
| `/workshops/:createSuccess?` | Workshop list (`success` flash) |
| `/workshops/detail/:type` | Create workshop |
| `/workshops/detail/:id/:type` | View / edit workshop |
| `/meetings/...` | Same pattern as workshops |
| `/enrollments/...` | Same pattern as workshops |

Invite signup lands on `/signup?ticket=<AES>&for=<email>`. Reset lands on `/resetPass?reset=<token>`.

---

## Pages (what they do)

- **Login** — email + password. Google button is commented out.
- **Signup** — `VolunteerForm`: name, email, password, confirm, phone, DOB, year of joining (2012–current), gender, address, Indian pincode → city/state. Invite mode locks email.
- **Forgot / Reset password** — 20s resend throttle on forgot.
- **Dashboard** — counts (volunteers, workshops, enrollments, meetings), doughnut of last ~6 months enrollments, upcoming workshops.
- **Volunteers** — search, filters (status / role / gender), AG Grid. Admin: invite, verify pending, delete, edit.
- **Workshops** — filter past/upcoming/all, date range. Counts of leads, volunteers, participants.
- **Meetings** — type, optional workshop, date, venue, volunteers, enrollments.
- **Enrollments** — participant + children; “Enrolled By” filter (self / others).
- **Edit profile** — all profile fields except email and role.

Brand colors (`Theme.js`): green `#259311`, red `#C1423F`, blue `#005C8E`, orange `#DF6D10`, gray `#E6E6E6`, text `#2F2F2F`. Font: Inter.

---

## REST API (Express)

Base in production: `https://tlc-mvp-server.vercel.app`. Local: `http://localhost:8080`.

Authenticated routes expect `Authorization: Bearer <jwt>`.

### `/user`

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/user/signup` | public | Create unverified user, send verify mail |
| POST | `/user/login` | public | `{ email, password }` → `{ status, user }` |
| GET | `/user/verifyUser?token=` | public | Mark email verified, redirect to app |
| POST | `/user/forgotPass` | public | `{ email }` |
| GET | `/user/verifyReset?token=` | public | Redirect to `/resetPass?reset=` |
| POST | `/user/resetPass` | public | `{ token, password }` |
| PUT | `/user/updateLogStatus` | JWT in handler | Session refresh / logout |
| PUT | `/user/:email/update` | `auth` | Update profile (JWT email must match) |

### `/volunteers`

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/volunteers/searchAndFilter` | `auth` | Paginated list + filters |
| GET | `/volunteers/:email/details` | `auth` | One volunteer + workshop/meeting history |
| PUT | `/volunteers/updateRole` | `adminAuth` | `{ email, isAdmin }` |
| DELETE | `/volunteers/` | `adminAuth` | `{ emails: [] }` (cannot delete self) |
| PUT | `/volunteers/adminVerified` | `adminAuth` | Approve signup |
| POST | `/volunteers/invite` | `adminAuth` | `{ email, name, isAdmin }` |
| GET | `/volunteers/verifyInvite?invite=` | public | 5-day invite → signup redirect |
| POST | `/volunteers/inviteSignup` | public | Create already-verified user from ticket |

### `/workshops` · `/meetings` · `/enrollments` · `/dashboard`

| Method | Path | Auth |
|---|---|---|
| POST/GET `/workshops/` | create list | admin / auth |
| GET `/workshops/:id/details` | | auth |
| PUT `/workshops/:id/update` · DELETE `/workshops/` | | admin |
| CRUD `/meetings/` and `/meetings/:id/details` · `/:id/edit` | | auth (mounted) |
| CRUD `/enrollments/` similarly | | auth (mounted) |
| GET `/dashboard/` | counts + recent enrollments | auth |

List query params used by the client: `page`, `no_of_records`, `value` (search), `gender`, `isAdmin`, `isAdminVerified`, `sort_by`, `order_of_sort`, `pastOrUpcoming`, `start`/`end` or `start_date`/`end_date` (`MM/DD/YYYY`), `enrolled_is_null`, `isNull` (meetings not linked to a workshop).

---

## Data model (Hasura tables)

### `users`

`id`, `name`, `email` (unique), `password` (not unique), `token`, `dob`, `gender`, `phoneNumber` (unique), `yearOfJoining`, `location`, `city`, `state`, `pincode`, `isVerified`, `isAdminVerified`, `isAdmin` (NOT NULL, default false), `isPassToBeReset`, `isLoggedIn` (JWT or SQL NULL)

Integrity notes (applied 2026-09-18, see `server/schema/2026-09-18-integrity-fixes.sql`): unique-on-password removed; `isLoggedIn` no longer defaults to the string `'NULL'`; volunteer phones are unique; DOB/workshop dates no longer default to today. Join tables still key volunteers by **email** (FK to `users.email`); moving those FKs to `users.id` is the later phone-login branch. Unused tables `enrollment_invites`, `enrollment_link_tickets`, `link_tickets` are not referenced by this app.

### `Invitations`

`email`, `name`, `token`, `isAccepted`, `isAdmin`, `created_at`

### `workshops`

`id`, `types`, `venue`, `venue_city`, `start_date`, `end_date`, `concluding_date`

Join: `workshop_volunteers` (`user_email`), `workshop_lead_volunteers` (`user_email`), `workshop_participants` (`enrollment_id`, `workshop_id`)

### `enrollments`

`id` (PK), `name`, `mobile_number` (required, unique, 10-digit India), `email` (optional, unique when set), `dob`, `gender`, `address`, `city`, `state`, `pincode`, `enrolled_by` (volunteer email), `created_at`  
Children: `children` (`id`, `name`, `dob`, `gender`, `enrollment_id`)

New enrollments are identified by **phone**, not email. Workshop/meeting joins still use `enrollment_id`. Volunteer login is still email (later branch).

### `meetings`

`id`, `date`, `type`, `venue`, `venue_city`, `workshop_id`  
Join: `meetings_enrollments`, `meetings_volunteers` (`volunteer_email`)

### Workshop types (client enum)

None, Freedom Workshop, Holy Trail, Leadership Workshop, Talk on Bhagwad Gita, Wisdom Workshop, Free to Grow, Free to Choose Workshop, Integrity, Service & Responsibility Workshop, Confidence Power & Excellence Workshop, Love, Relationship & Romance Workshop, Meditation Retreat, Parent Child - Child Parent Workshop, Krodh Workshop, Tension Workshop, Grounding Series, Enlightenment Workshop.

### Meeting types (client enum)

None, Meeting Type 1–4.

---

## Email

Transporter: Brevo, user `infotech@thelastcentre.com`, password `MAIL_API_KEY`.

| Flow | Subject | Link (hardcoded production host) |
|---|---|---|
| Signup | Verification of TLC Email | `/user/verifyUser?token=` |
| Forgot password | Reset Password Link | `/user/verifyReset?token=` |
| Invite | TLC Invitation | `/volunteers/verifyInvite?invite=` |

Tickets are `CryptoJS.AES.encrypt(email, CRYPTO_TICKET)`, not JWTs. Spaces in query strings are turned back into `+`.

Verify / reset / invite **redirects** always go to `https://tlc-mvp-app.vercel.app`, even if you run locally.

---

## Environment and deploy

Server `vercel.json`: build `src/app.ts` with `@vercel/node`, route `/(.*)` to that file. Set the five env vars on Vercel.

Client has no `REACT_APP_*` variables.

---

## Known quirks (from the code)

1. Client API host is hardcoded to Vercel; local server is unused unless URLs change.
2. Mail and redirect URLs are also hardcoded to Vercel, not localhost.
3. `cookie-parser` is a dependency but unused. Auth is Bearer JWT.
4. CORS is wide open (`cors()` with no origin list).
5. Port 8080 is hardcoded; Vercel serverless ignores `listen` anyway.
6. Public signup does not set `isAdmin` even though the GraphQL mutation declares the variable.
7. Invite signup skips both email verification and admin approval.
8. Meetings and enrollments are not admin-gated in the UI (workshops and volunteers are).
9. `fetch(..., signal)` in several API files passes `AbortSignal` as a **third argument** (ignored by `fetch`; should be in the options object).
10. Typos in API messages: `"Anuathorized action!"`, `"User does not exists!"`.
11. Branding mix: HTML “The Last Centre” vs login “The Last Center”.
12. Dashboard query uses ~7 months of enrollments but the UI says “Last 6 Months”.
13. `VolunteerDetails` has a leftover `const isAdmin = true`.
14. Dead volunteer list controllers exist (`getAllVolunteers`, `filteredVolunteers`) but routes are commented out.
15. Root README previously listed `https://tlc-two.vercel.app/` — that host 404s; current code uses `tlc-mvp-server`.

---

## Tech versions (from package.json)

**Client:** React 18.2, react-router-dom 6.22, MUI 5.15, TanStack Query 5.24, ag-grid 31.1, chart.js 4.4, dayjs, moment, validator.

**Server:** Express 4.18, TypeScript 5.4, bcrypt 5.1, jsonwebtoken 9, crypto-js 4.2, nodemailer 6.9, helmet 7, cors, dotenv, nodemon.
