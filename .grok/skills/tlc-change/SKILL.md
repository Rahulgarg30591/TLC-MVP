---
name: tlc-change
description: >
  Add or change a TLC-MVP endpoint, page, or client API call across the
  Express BFF and the React client. Use when the user adds a route, a
  controller, a GraphQL operation, a page, or an API module, or runs
  /tlc-change.
---

# Change a TLC feature

Routes and the admin vs volunteer table live in `README.md`. Local Node, env, and `API_BASE` live in the `tlc-mvp` skill. Hasura column changes live in the `tlc-schema` skill. Layout lives in the `tlc-ui` skill.

## Slice

Touch only the layers the change needs:

1. `server/src/gql/<domain>/queries.ts` or `mutations.ts` — the Hasura document.
2. `server/src/controllers/<domain>/<action>.ts` — call `getData` from `server/src/utils/getData.ts`. Respond with `{ status, message }` JSON. Hasura is called only through `getData`.
3. `server/src/Routes/<domain>.ts` — mount the controller. New top-level mounts go in `server/src/app.ts`.
4. `client/src/apis/<domain>.js` — call `apiJson` from `client/src/apis/http.js`. Build the URL from `API_BASE` in `client/src/apis/config.js`. Send `Authorization: Bearer ${user.key}`. Pass `signal` inside the `apiJson` options object.
5. `client/src/Pages/<Domain>/` — the screen.

## Who may call it

Match the Admin vs Volunteer table in `README.md`. Middleware is already placed:

- `server/src/app.ts` mounts `/enrollments`, `/meetings`, and `/dashboard` with `auth` (any valid JWT).
- `server/src/Routes/workshops.ts` uses `adminAuth` on create, update, and delete, and `auth` on list and detail.
- `server/src/Routes/volunteers.ts` uses `adminAuth` on invite, verify, role change, and delete, and `auth` on list and detail.
- `PUT /user/:email/update` uses `auth`, and the JWT email must match the path email.

Do not invent a tighter or looser rule unless the task changes who is allowed.

## Finish

`npm start` in `server/` runs committed `server/dist`. After any edit under `server/src`, from `server/` on Node 20 (`tlc-mvp`): `npm run build`. New files use single quotes (`.prettierrc`).
