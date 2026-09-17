---
name: tlc-seed
description: >
  Seed or repair TLC-MVP dummy workshops, meetings, and enrollments in Hasura
  so participants, meeting attendees, and dashboard months stay consistent.
  Use when the user asks for dummy data, sample enrollments, match enrollments
  to workshops/meetings, last-six-months chart data, or /tlc-seed.
---

# TLC-MVP dummy data

Mutate Hasura with admin secret from `server/.env`. Never echo the secret.

Join shapes (from the Express controllers):

- `workshop_volunteers` / `workshop_lead_volunteers`: `{ user_email }`
- `workshop_participants`: `{ enrollment_id, workshop_id }`
- `meetings_enrollments`: `{ enrollment_id }` (or `{ meeting_id, enrollment_id }` on the join table)
- `meetings_volunteers`: `{ volunteer_email }`
- `children`: `{ name, dob, gender }` nested under enrollment

## Matching rule

For every workshop, **meeting enrollments = that workshop's participants** (same names, same ids). Every meeting must have `workshop_id` set. Meeting volunteers = that workshop's leads + volunteers.

If the user says enrollments are not matched, query workshops → `workshop_participants` vs meetings → `meetings_enrollments` and fix the join rows. Do not insert a second disconnected set of people.

Enrollment detail shows Workshop History (`workshop_participants.workshop`) and Meeting History (`meetings_enrollments.meeting`).

## Dates

- Workshop `start_date` vs today (2026-09-17 in this project): `_gte now()` is upcoming, `_lte now()` is past.
- Dashboard doughnut uses `enrollments.created_at`, not workshop dates. Spread `created_at` across the last six months (including current). Putting every row on today makes "Last 6 Months Enrollments" look empty.

## Workshop / meeting enums

Workshop `types` must be one of the strings in `client/src/Pages/Workshops/WorkshopsDetails/WorkshopsDetails.jsx` (`workshopTypes`). Meeting `type` is `Meeting Type 1`–`4` or `None`.
