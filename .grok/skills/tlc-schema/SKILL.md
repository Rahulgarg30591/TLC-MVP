---
name: tlc-schema
description: >
  Change TLC-MVP Hasura tables, columns, or constraints. Use when the user
  mentions Hasura schema, SQL, a new column, a unique key, foreign keys, or
  phone login, or runs /tlc-schema.
---

# Hasura schema changes

Which Hasura project is live, and the empty project to leave alone, are in the `tlc-mvp` skill. Dummy rows and join-object shapes are in the `tlc-seed` skill. The table list is in `README.md`. Wiring a column through the API and UI is the `tlc-change` skill.

## Where the change goes

- Add a file `server/schema/YYYY-MM-DD-<what>.sql`. The applied example is `server/schema/2026-09-18-integrity-fixes.sql`.
- Run it against the Hasura project in the uncommented `HASURA_DB_URL` in `server/.env`. Read secrets from that file. Never print `HASURA_ADMIN_SECRET` or any other secret.
- Update the matching `server/src/gql` documents in the same change. A column that exists only in Hasura never reaches the UI.

## Keys already decided

- `enrollments.mobile_number` is required, unique, and how a participant is identified. Enrollment email is optional.
- For volunteers and admins, `users.phoneNumber` is the required unique contact. `users.email` is optional extra information (`server/schema/2026-09-24-users-email-optional.sql`). Sign-in accepts a phone number or, when the account has one, an email.
- Workshop volunteers, workshop leads, meeting volunteers, and `enrollments.enrolled_by_id` store `users.id` (`server/schema/2026-09-24-account-id-links.sql`). Volunteer detail, profile update, role change, and delete also use that id.
- Invitations, email verification, and password reset still use an email address because that is where the message is sent.
