-- Point volunteer membership and "enrolled by" at users.id.
-- Email stays on the account as optional contact, and on invitations for mail.

ALTER TABLE workshop_volunteers ADD COLUMN IF NOT EXISTS user_id integer;
ALTER TABLE workshop_lead_volunteers ADD COLUMN IF NOT EXISTS user_id integer;
ALTER TABLE meetings_volunteers ADD COLUMN IF NOT EXISTS user_id integer;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS enrolled_by_id integer;

UPDATE workshop_volunteers wv
SET user_id = u.id
FROM users u
WHERE wv.user_email = u.email AND wv.user_id IS NULL;

UPDATE workshop_lead_volunteers wv
SET user_id = u.id
FROM users u
WHERE wv.user_email = u.email AND wv.user_id IS NULL;

UPDATE meetings_volunteers mv
SET user_id = u.id
FROM users u
WHERE mv.volunteer_email = u.email AND mv.user_id IS NULL;

UPDATE enrollments e
SET enrolled_by_id = u.id
FROM users u
WHERE e.enrolled_by IS NOT NULL AND e.enrolled_by = u.email AND e.enrolled_by_id IS NULL;

ALTER TABLE workshop_volunteers DROP CONSTRAINT IF EXISTS workshop_volunteers_user_email_fkey;
ALTER TABLE workshop_volunteers DROP CONSTRAINT IF EXISTS workshop_volunteers_workshop_id_user_email_key;
ALTER TABLE workshop_volunteers DROP COLUMN IF EXISTS user_email;
ALTER TABLE workshop_volunteers ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE workshop_volunteers
  ADD CONSTRAINT workshop_volunteers_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE workshop_volunteers
  ADD CONSTRAINT workshop_volunteers_workshop_id_user_id_key UNIQUE (workshop_id, user_id);

ALTER TABLE workshop_lead_volunteers DROP CONSTRAINT IF EXISTS workshop_lead_volunteers_user_email_fkey;
ALTER TABLE workshop_lead_volunteers DROP CONSTRAINT IF EXISTS workshop_lead_volunteers_user_email_workshop_id_key;
ALTER TABLE workshop_lead_volunteers DROP COLUMN IF EXISTS user_email;
ALTER TABLE workshop_lead_volunteers ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE workshop_lead_volunteers
  ADD CONSTRAINT workshop_lead_volunteers_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE workshop_lead_volunteers
  ADD CONSTRAINT workshop_lead_volunteers_user_id_workshop_id_key UNIQUE (user_id, workshop_id);

ALTER TABLE meetings_volunteers DROP CONSTRAINT IF EXISTS meetings_volunteers_volunteer_email_fkey;
ALTER TABLE meetings_volunteers DROP CONSTRAINT IF EXISTS meetings_volunteers_volunteer_email_meeting_id_key;
ALTER TABLE meetings_volunteers DROP COLUMN IF EXISTS volunteer_email;
ALTER TABLE meetings_volunteers ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE meetings_volunteers
  ADD CONSTRAINT meetings_volunteers_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE meetings_volunteers
  ADD CONSTRAINT meetings_volunteers_user_id_meeting_id_key UNIQUE (user_id, meeting_id);

ALTER TABLE enrollments DROP CONSTRAINT IF EXISTS enrollments_enrolled_by_fkey;
ALTER TABLE enrollments DROP COLUMN IF EXISTS enrolled_by;
ALTER TABLE enrollments
  ADD CONSTRAINT enrollments_enrolled_by_id_fkey
  FOREIGN KEY (enrolled_by_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL;
