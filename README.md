# TLC-MVP — The Last Centre

Operations app for [The Last Centre](https://thelastcentre.org/the-last-centre/). Admins and volunteers use it to run workshops, meetings, participant enrollments, and volunteer accounts.

A **volunteer** and an **admin** are accounts. A **participant** is an enrollment record (a person and their children). Participants do not sign in.

The phone number is the account’s contact. Email is optional extra information. Sign-in accepts a 10-digit mobile number, and also an email when the account has one.

---

## Contents

1. [Quick facts](#quick-facts)
2. [How the app is built](#how-the-app-is-built)
3. [Repository layout](#repository-layout)
4. [Prerequisites](#prerequisites)
5. [Local setup](#local-setup)
6. [Dummy accounts](#dummy-accounts)
7. [Roles](#roles)
8. [Flows and use cases](#flows-and-use-cases)
9. [Screens](#screens)
10. [REST API](#rest-api)
11. [Data model](#data-model)
12. [Email](#email)
13. [Tests](#tests)
14. [What can be added](#what-can-be-added)
15. [Limits to know about](#limits-to-know-about)

---

## Quick facts

| | |
|---|---|
| Product | Internal portal for workshops, meetings, enrollments, and volunteers |
| Client | Create React App, React 18, MUI 5, TanStack Query, AG Grid, Chart.js. Port **3000** |
| API | Express + TypeScript, compiled to `server/dist`. Port **8080** |
| Database | Postgres behind **Hasura GraphQL**. The API is the only caller |
| Auth | JWT in `Authorization: Bearer <token>`, 24 hours, stored in `localStorage` |
| Identity | `users.phoneNumber` (required, unique). `users.email` is optional |
| Look | Forest theme from the public site: cream pages, olive buttons, Outfit at 14px |
| Production UI | https://tlc-mvp-app.vercel.app |
| Production API | https://tlc-mvp-server.vercel.app |
| Git | https://github.com/gaurav-celestial/TLC-MVP.git |

There is no root `package.json`. Install and run `client/` and `server/` separately. `e2e/` is a third package for Playwright.

---

## How the app is built

```
Browser  →  http://localhost:3000
              REST + Bearer JWT
                    ↓
Express BFF  →  http://localhost:8080
              GraphQL + x-hasura-admin-secret
                    ↓
Hasura  →  Postgres
           users, Invitations, workshops, meetings,
           enrollments, children, and the join tables
```

Every Hasura call from the API uses the admin secret. The app does not send a Hasura user JWT, and it does not use row-level permissions.

The browser also calls `https://api.postalpincode.in/pincode/{code}` to fill city and state from an Indian pincode.

`client/src/apis/config.js` sets the API host:

```js
export const API_BASE =
  process.env.REACT_APP_API_URL || 'https://tlc-mvp-server.vercel.app';
```

A local UI with no `REACT_APP_API_URL` talks to the deployed API.

---

## Repository layout

```
TLC-MVP/
├── README.md
├── .prettierrc                      # single quotes
├── client/                          # React app (package name: tlcapp)
│   ├── .npmrc                       # legacy-peer-deps=true
│   ├── .env.local                   # gitignored; REACT_APP_API_URL
│   └── src/
│       ├── App.js                   # theme + React Query
│       ├── Theme.js                 # forest palette, Outfit
│       ├── apis/                    # fetch wrappers; API_BASE
│       ├── Components/              # shell, tables, popups, forms
│       ├── Pages/                   # Login, Dashboard, Volunteers, …
│       ├── hooks/                   # useReactQuery, prefetch, alerts
│       └── store/userContext.js
├── server/
│   ├── .env                         # gitignored secrets
│   ├── .env.example
│   ├── schema/                      # SQL applied to Hasura
│   ├── src/                         # TypeScript source
│   │   ├── app.ts
│   │   ├── Routes/
│   │   ├── controllers/
│   │   ├── gql/
│   │   └── middlewares/             # auth, adminAuth
│   └── dist/                        # compiled JS; this is what npm start runs
└── e2e/                             # Playwright, Pixel 5 / mobile-chrome
```

SQL lives in `server/schema/`. Applied files:

| File | What it changed |
|---|---|
| `2026-09-18-integrity-fixes.sql` | Password is no longer unique. `isAdmin` is a real boolean. Volunteer phones are unique |
| `2026-09-24-users-email-optional.sql` | `users.email` may be empty |
| `2026-09-24-account-id-links.sql` | Workshop, meeting, and “enrolled by” links store `users.id` |
| `2026-09-25-invite-by-phone.sql` | Invitations are keyed by phone. Email on an invite is optional |

---

## Prerequisites

- **Node.js 20.16.0** and npm. Load it with nvm before any server command. Node 16 (the copy at `/usr/local/bin/node` on this machine) has no global `fetch`. The API then answers login with “Database is unavailable”.
- A **Hasura** project that already has the TLC tables. This checkout’s `server/.env` points at the dev project. If GraphQL comes back as HTML saying the project is not reachable, wake that project in Hasura Cloud.
- The five server environment variables below. They are already filled in on this machine. They are not in git.
- **Brevo** mail (`MAIL_API_KEY`) only when a flow sends a message: signup verification, password reset, or an invite that includes an email. Phone signup and the invite link the API returns work without mail.

Optional, for the browser tests: Playwright browsers (`npx playwright install` inside `e2e/`).

---

## Local setup

Do these in order. Leave both terminals open.

### 1. Select Node 20.16.0

```bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm install 20.16.0
nvm use 20.16.0
node -v    # v20.16.0
```

Run `nvm use 20.16.0` again in every new terminal before `npm start` in `server/`.

### 2. Server environment

From `server/`, if `.env` is missing:

```bash
cp .env.example .env
```

Fill these keys. Do not commit the file, and do not paste the values into docs or chat.

| Key | Purpose |
|---|---|
| `HASURA_DB_URL` | Hasura GraphQL HTTP endpoint. The **uncommented** line is the live project |
| `HASURA_ADMIN_SECRET` | Sent as `x-hasura-admin-secret` |
| `JWT_SECRET_KEY` | Signs the 24-hour session token |
| `CRYPTO_TICKET` | AES key for invite, verification, and reset tickets |
| `MAIL_API_KEY` | Brevo SMTP password for `infotech@thelastcentre.com` |

`dotenv` loads `server/.env` from the `server/` working directory. The commented Hasura URL in that file is an empty project. Leave it commented.

### 3. Install, build, and start the API

```bash
cd server
npm install
npm run build     # tsc → dist/
npm start         # node ./dist/app.js
```

The API listens on **http://localhost:8080/**. The port is hardcoded.

`npm start` runs the compiled files in `server/dist`, not `server/src`. After any TypeScript change, run `npm run build` again and restart. `npm run server` is the same process under nodemon; it still needs a fresh `dist/`.

### 4. Point the client at that API

Create `client/.env.local` (gitignored):

```
REACT_APP_API_URL=http://localhost:8080
```

Restart the React app after changing this file. Create React App only reads `REACT_APP_*` at startup.

### 5. Install and start the UI

```bash
cd client
npm install       # .npmrc sets legacy-peer-deps=true
npm start         # http://localhost:3000
```

`npm run build` writes a production bundle. `npm test` runs the CRA unit runner.

### 6. Confirm Hasura is awake

Open http://localhost:3000 and sign in with a dummy account from the next section. A login response of “Database is unavailable” means the API process is on the wrong Node version, or Hasura is asleep or unreachable. Wake the project named by the uncommented `HASURA_DB_URL`, then try again.

### 7. Stop both processes

Stop the terminal running `npm start` in `client/` and the one running it in `server/`, or stop whatever is bound to ports 3000 and 8080. The React app and the API need those ports.

---

## Dummy accounts

These two accounts live in the **dev** Hasura database. Both are email-verified and admin-approved, so they can sign in immediately.

The sign-in box is labeled **Phone number**. Typing the email also works. The JSON field is still named `email` in both cases.

| | Admin | Volunteer |
|---|---|---|
| Name | Local Admin | Local Volunteer |
| Phone | `9000000037` | `9000000038` |
| Email | `dev.admin@thelastcentre.com` | `dev.volunteer@thelastcentre.com` |
| Password | `TlcLocal@123` | `TlcVolunteer@123` |
| Role | Admin | Volunteer |

Use the admin account to invite people, approve signups, and create workshops. Use the volunteer account to see the same lists without those admin actions.

Other people already have rows in `users`. Their passwords are not stored in this repository.

Password rules for any new account: at least 8 characters, with 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.

Login succeeds only when all of these are true:

1. The phone or email matches a `users` row.
2. The password matches the bcrypt hash (cost 12).
3. `isVerified` is true. Invite signup sets this. A signup with no email sets it immediately. A signup that includes an email waits for the verification link.
4. `isAdminVerified` is true. An admin approves a public signup. An invited person is already approved.

---

## Roles

The navbar shows **Admin** or **Volunteer** from `user.isAdmin`.

| Action | Admin | Volunteer |
|---|---|---|
| Dashboard, lists, and detail pages | Yes | Yes |
| Edit own profile | Yes | Yes |
| Invite, approve, reject, or delete a volunteer | Yes | No |
| Change someone else’s role | Yes | No |
| Change your own role | No | No |
| Delete your own account | No | No |
| Create, edit, or delete a workshop | Yes | View only |
| Add a volunteer or a lead volunteer on a workshop | Yes, in edit or create | No |
| Create, edit, or delete a meeting | Yes | Yes |
| Create, edit, or delete an enrollment | Yes | Yes |

The server enforces the admin column with `adminAuth` on volunteer invite, verify, role, and delete, and on workshop create, update, and delete. Meetings, enrollments, and the dashboard only require a signed-in user (`auth`).

A session JWT carries `{ id, email, phoneNumber, isAdmin }`. The client keeps it in `localStorage` under `keys`, together with the user’s email, and sends it as `Authorization: Bearer <token>`. Logout clears that storage and sets `users.isLoggedIn` back to null. Reloading the page calls `PUT /user/updateLogStatus` to restore the session.

---

## Flows and use cases

### Sign in

**Who:** any approved admin or volunteer.

1. Open http://localhost:3000.
2. Enter the phone number (or the email) and the password.
3. The app lands on the dashboard and starts loading the first page of volunteers, workshops, meetings, and enrollments in the background.

A wrong password returns “Invalid Credentials”. An unverified email asks the person to use the mail link. An account still waiting on an admin returns 403 and asks them to contact an admin.

### Create an account from the public signup page

**Who:** someone who does not have an invite.

1. Open `/signup`.
2. Phone number is required. Email sits under **Extra information** and can be left blank.
3. Fill name, password, date of birth, year of joining (2012 through the current year), gender, address, and an Indian pincode. City and state fill from the pincode lookup.
4. With no email, the account is marked verified and waits for an admin to approve it.
5. With an email, Brevo sends a verification link. After the person opens it, an admin still has to approve the account before login works.

### Invite a volunteer or another admin

**Who:** an admin, from the Volunteers page.

1. Choose invite and enter a name and a 10-digit phone. Email is optional. Choose whether the new person is an admin.
2. The API stores an invitation and returns a signup path: `/signup?ticket=...&phone=...`. The dialog shows that link so it can be copied.
3. When an email was entered, the same link is also mailed. The mailed link currently points at the production site.
4. The invited person opens the link, completes the form, and can sign in at once. Invite signup sets both `isVerified` and `isAdminVerified`. `isAdmin` is copied from the invitation.
5. Signup matches the invitation on that phone number. The ticket is an AES encryption of the phone. The link inside the invitation email stops working after 5 days.

### Approve or reject a public signup

**Who:** an admin, on the Volunteers list, filtered to people who are not yet approved.

Approving sets `isAdminVerified` and the chosen role. Until that happens, the person cannot sign in.

### Change a role, or remove an account

**Who:** an admin.

Role change calls `PUT /volunteers/updateRole` with the account id. Changing your own role returns 403. Delete calls `DELETE /volunteers/` with a list of ids. Deleting yourself returns an error. Deleting an account also removes invitations for the emails that were on those accounts.

### Edit your own profile

**Who:** the signed-in person, from the profile menu → Edit Profile, or `/editprofile`.

Phone stays required. Email stays under extra information. The save request is `PUT /user/<id>/update`. The id in the URL has to be the signed-in user; another id returns 403. After a successful save the app goes back to the previous page.

The profile menu is the name in the top bar. It closes when you choose an item or click outside it.

### Reset a password

**Who:** a person who has an email on the account.

1. `/forgotPass` asks for that email. Resend is throttled by about 20 seconds.
2. The mail link lands on `/resetPass?reset=<token>`.
3. The new password follows the same strength rules.

A phone-only account has nowhere for that mail to go. Reset still requires an email. See [What can be added](#what-can-be-added).

### Run a workshop

**Who:** everyone can open the list and the view page. An admin creates and edits.

1. The Workshops list filters by upcoming, past, or all, and by a date range. Each row shows counts of leads, volunteers, and participants.
2. Create or edit opens the workshop form: type, venue, city, start, end, and concluding date.
3. On create, and after switching a workshop into edit, two actions appear: **Add volunteer** and **Add lead volunteer**. Each opens the same picker with that role already selected. Membership is stored as `users.id`.
4. Participants on a workshop are enrollment records, linked by `enrollment_id`.
5. View mode tells an admin to switch to edit before staffing the workshop.

Workshop types the form accepts: None, Freedom Workshop, Holy Trail, Leadership Workshop, Talk on Bhagwad Gita, Wisdom Workshop, Free to Grow, Free to Choose Workshop, Integrity, Service & Responsibility Workshop, Confidence Power & Excellence Workshop, Love, Relationship & Romance Workshop, Meditation Retreat, Parent Child - Child Parent Workshop, Krodh Workshop, Tension Workshop, Grounding Series, Enlightenment Workshop.

### Hold a meeting

**Who:** any signed-in admin or volunteer can create, edit, and delete.

A meeting has a type, a date, a venue, a city, an optional workshop, volunteers, and enrollments. Types in the form are None and Meeting Type 1 through Meeting Type 4.

When a meeting belongs to a workshop, the people enrolled in the meeting should be that workshop’s participants, and the volunteers should be that workshop’s leads and volunteers. The detail page shows both lists.

### Enroll a participant

**Who:** any signed-in admin or volunteer.

An enrollment is the participant: name, a unique 10-digit `mobile_number`, optional email, date of birth, gender, address, and pincode. Children are separate rows (name, date of birth, gender) under that enrollment.

`enrolled_by_id` stores the account id of the volunteer who enrolled them. The list can filter by who enrolled the participant. The detail page shows workshop history and meeting history.

Enrollments are not accounts. They do not have passwords, and they do not appear in the volunteer list.

### Read the dashboard

**Who:** any signed-in user.

The dashboard shows counts for volunteers, workshops, enrollments, and meetings, a doughnut of enrollments over the last six calendar months (including the current month), and the upcoming workshops. The chart groups rows by `enrollments.created_at`. The page itself does not scroll; the upcoming list scrolls inside its card.

---

## Screens

Signed out: `/` is login. Unknown paths also show login.

| Path | Page |
|---|---|
| `/` | Login when signed out. Dashboard when signed in |
| `/signup` | Create an account. Invite links add `ticket` and `phone` |
| `/forgotPass` | Ask for a reset mail |
| `/resetPass` | Set a new password (`?reset=`) |
| `/dashboard` | Counts, chart, upcoming workshops |
| `/editprofile` | Edit the signed-in profile |
| `/volunteers` | Search and filters: status, role, gender |
| `/volunteers/detail/:id/:type` | One volunteer. `type` is `view` or `edit` |
| `/workshops` | Workshop list. Optional `success` flash |
| `/workshops/detail/:type` | Create |
| `/workshops/detail/:id/:type` | View or edit |
| `/meetings` | Meeting list |
| `/meetings/details/:type` | Create |
| `/meetings/details/:id/:type` | View or edit |
| `/enrollments` | Enrollment list |
| `/enrollments/details/:type` | Create |
| `/enrollments/details/:id/:type` | View or edit |

The sidebar (a temporary drawer below the `md` breakpoint) links to Dashboard, Volunteers, Workshops, Meetings, and Enrollments.

On a small screen, AG Grid lists use automatic row height so a row can be tapped. The first page of each list is prefetched after sign-in (page 1, 12 rows, default filters). A new search, filter, or page is a new request.

---

## REST API

Local base: `http://localhost:8080`. Production base: `https://tlc-mvp-server.vercel.app`.

Authenticated routes expect `Authorization: Bearer <jwt>`.

### `/user`

| Method | Path | Who | Purpose |
|---|---|---|---|
| POST | `/user/signup` | Public | Create an account. Sends verify mail when an email is present |
| POST | `/user/login` | Public | Body `{ email, password }`. `email` may be a phone number. Returns `{ status, user }` and `user.key` |
| GET | `/user/verifyUser?token=` | Public | Mark the email verified, then redirect |
| POST | `/user/forgotPass` | Public | `{ email }` |
| GET | `/user/verifyReset?token=` | Public | Redirect to `/resetPass?reset=` |
| POST | `/user/resetPass` | Public | `{ token, password }` |
| PUT | `/user/updateLogStatus` | Bearer token | Restore the session, or log out |
| PUT | `/user/:id/update` | Signed in | Update that profile. The id must be the caller |

### `/volunteers`

| Method | Path | Who | Purpose |
|---|---|---|---|
| GET | `/volunteers/searchAndFilter` | Signed in | Paginated list |
| GET | `/volunteers/:id/details` | Signed in | One account, plus workshop and meeting history. An email in the path returns 400 |
| PUT | `/volunteers/updateRole` | Admin | `{ id, isAdmin }` |
| DELETE | `/volunteers/` | Admin | `{ ids: [] }` |
| PUT | `/volunteers/adminVerified` | Admin | Approve a signup |
| POST | `/volunteers/invite` | Admin | `{ name, phoneNumber, email?, isAdmin }`. Returns `signupPath` |
| GET | `/volunteers/verifyInvite?invite=` | Public | Open an invite ticket and redirect to signup |
| POST | `/volunteers/inviteSignup` | Public | Create the already-approved user from the ticket |

### Workshops, meetings, enrollments, dashboard

| Method | Path | Who |
|---|---|---|
| POST | `/workshops/` | Admin |
| GET | `/workshops/` | Signed in |
| GET | `/workshops/:id/details` | Signed in |
| PUT | `/workshops/:id/update` | Admin |
| DELETE | `/workshops/` | Admin |
| POST | `/meetings/` | Signed in |
| GET | `/meetings/` | Signed in |
| GET | `/meetings/:id/details` | Signed in |
| PUT | `/meetings/:id/edit` | Signed in |
| DELETE | `/meetings/` | Signed in |
| POST | `/enrollments/` | Signed in |
| GET | `/enrollments/` | Signed in |
| GET | `/enrollments/:id/details` | Signed in |
| PUT | `/enrollments/:id/edit` | Signed in |
| DELETE | `/enrollments/` | Signed in |
| GET | `/dashboard/` | Signed in |

List calls use `page`, `no_of_records`, and a search value, plus filters the screen cares about: gender, role, approval, past or upcoming, start and end dates (`MM/DD/YYYY`), and who enrolled the participant.

Workshop and meeting save bodies send volunteer **ids**. A new enrollment sends `enrolled_by_id`.

---

## Data model

Hasura source name for this database is `TLC DB`.

### `users`

`id`, `name`, `email` (unique when set, otherwise empty), `password`, `token`, `dob`, `gender`, `phoneNumber` (unique), `yearOfJoining`, `location`, `city`, `state`, `pincode`, `isVerified`, `isAdminVerified`, `isAdmin` (default false), `isPassToBeReset`, `isLoggedIn` (the current JWT, or null).

### `Invitations`

`phone_number` (required, unique), `email` (optional), `name`, `token`, `isAccepted`, `isAdmin`, `created_at`.

### `workshops`

`id`, `types`, `venue`, `venue_city`, `start_date`, `end_date`, `concluding_date`.

Joins:

- `workshop_volunteers` (`workshop_id`, `user_id` → `users.id`)
- `workshop_lead_volunteers` (`workshop_id`, `user_id` → `users.id`)
- `workshop_participants` (`workshop_id`, `enrollment_id`)

### `meetings`

`id`, `date`, `type`, `venue`, `venue_city`, `workshop_id`.

Joins: `meetings_volunteers` (`user_id` → `users.id`), `meetings_enrollments` (`enrollment_id`).

### `enrollments` and `children`

Enrollment: `id`, `name`, `mobile_number` (required, unique, 10 digits), `email` (optional), `dob`, `gender`, `address`, `city`, `state`, `pincode`, `enrolled_by_id` → `users.id`, `created_at`.

Child: `id`, `name`, `dob`, `gender`, `enrollment_id`.

The relationship from an enrollment to the volunteer who enrolled them is `enrollment_done_by`.

---

## Email

Mail is sent through Brevo as `infotech@thelastcentre.com` when `MAIL_API_KEY` is set.

| Flow | Subject | When it sends |
|---|---|---|
| Signup with an email | Verification of TLC Email | Always for that signup |
| Forgot password | Reset Password Link | Always |
| Invite that includes an email | TLC Invitation | Only when the invite has an email |

Tickets are `CryptoJS.AES.encrypt(...)` with `CRYPTO_TICKET`, not JWTs. Verification and invite links in those messages are built against the production Vercel hosts, even when the API is running on localhost. The invite dialog in the app shows a path you can open on localhost yourself.

A signup or invite with no email does not send mail.

---

## Tests

Playwright lives in `e2e/`. The `mobile-chrome` project uses a Pixel 5 viewport against http://localhost:3000, with the API on http://localhost:8080. Both servers have to be running.

```bash
cd e2e
npm install
npx playwright install
npm run test:mobile
```

`e2e/tests/admin.js` reads the admin phone and password from `.grok/skills/tlc-mvp/SKILL.md`. The specs cover phone sign-in, profile and signup fields, volunteer search, and account-id checks (detail by id, profile update, role, workshop and meeting membership).

---

## What can be added

These follow from the way the app works today. None of them are required to run it locally.

**Phone layout.** Below the `md` breakpoint the app still uses the sidebar drawer and AG Grid. A phone-first pass would add a bottom navigation bar, card lists instead of grids, a sticky save button, and full-screen sheets for dialogs. Desktop would keep the sidebar and the grids.

**Deliver the invite to the phone.** The invite already requires a mobile number and returns a signup link. Nothing sends that link as an SMS. The admin copies it, or adds an email and relies on mail.

**Reset a password with a phone number.** Forgot-password only sends mail. An account with no email cannot recover the password from the login screen.

**Decide who may change meetings and enrollments.** Any signed-in volunteer can create, edit, and delete them. Workshops and volunteer administration are already limited to admins. The same limit could be applied here if volunteers should only view.

**Send mail back to the environment you are using.** Verification, reset, and invite messages always link to the production Vercel app and API. Local testing of those links means copying the token onto localhost by hand.

**Tighten the database permissions.** The API uses the Hasura admin secret for every query. Per-role Hasura permissions would keep a volunteer token from reading or writing rows the UI already hides.

**Home-screen install.** A web app manifest would let a phone add the portal to the home screen. A service worker is a separate choice and is not required for that.

**Real meeting names.** The meeting form still offers Meeting Type 1 through 4. Those can be replaced with the names the centre actually uses, the same way workshop types already are.

**Search hint.** The volunteer grid searches by phone and finds people that way. The placeholder still says to search by name or email.

**Google sign-in.** A Google button exists in the login code and is commented out. Turning it on needs an identity provider and a decision about how it maps to the phone number.

---

## Limits to know about

- The API port is 8080, not `process.env.PORT`. On Vercel the serverless function ignores `listen`.
- CORS is open (`cors()` with no origin list).
- `cookie-parser` is installed and unused. Auth is the Bearer token.
- Public signup does not set `isAdmin`. Admin rights come from an invite or from a later role change.
- A few API messages still have typos (“Anuathorized action!”, “User does not exists!”).
- Old list controllers `getAllVolunteers` and `filteredVolunteers` remain in the server, with their routes commented out.
- `VolunteerDetails` still has a leftover `const isAdmin = true` in the client. The server, not that constant, decides who can change a role.
- The login page uses a larger Outfit size for the philosophy panel. Everywhere else, UI text is Outfit at 14px, including grids and the dashboard chart.
- Filled buttons and the selected sidebar item use olive `#5a7030`. Page background is cream `#faf6ef`. Charcoal `#3d3525` is for text.
