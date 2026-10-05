-- TLC schema integrity fixes (dev Hasura: evident-buffalo-85)
-- Safe to re-run: IF EXISTS / IF NOT EXISTS used where possible.

-- 1. Passwords must not be unique across users.
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_password_key;
DROP INDEX IF EXISTS users_password_key;

-- 2. isLoggedIn stored the string 'NULL' instead of SQL NULL.
UPDATE users SET "isLoggedIn" = NULL
WHERE "isLoggedIn" IS NULL OR "isLoggedIn" IN ('NULL', 'null', '');
ALTER TABLE users ALTER COLUMN "isLoggedIn" DROP DEFAULT;
ALTER TABLE users ALTER COLUMN "isLoggedIn" SET DEFAULT NULL;

-- 3. isAdmin should always be true/false.
UPDATE users SET "isAdmin" = false WHERE "isAdmin" IS NULL;
ALTER TABLE users ALTER COLUMN "isAdmin" SET DEFAULT false;
ALTER TABLE users ALTER COLUMN "isAdmin" SET NOT NULL;

-- 4. Unique volunteer phone (required for phone as identifier).
UPDATE users SET "phoneNumber" = '9000000037'
WHERE id = 37 AND "phoneNumber" = '9999999999';
CREATE UNIQUE INDEX IF NOT EXISTS users_phoneNumber_key
  ON users ("phoneNumber");

-- 5. Birth dates must not default to today.
ALTER TABLE children ALTER COLUMN dob DROP DEFAULT;
ALTER TABLE enrollments ALTER COLUMN dob DROP DEFAULT;

-- 6. Workshop/meeting dates must be set explicitly.
ALTER TABLE workshops ALTER COLUMN start_date DROP DEFAULT;
ALTER TABLE workshops ALTER COLUMN end_date DROP DEFAULT;
ALTER TABLE workshops ALTER COLUMN concluding_date DROP DEFAULT;
ALTER TABLE meetings ALTER COLUMN date DROP DEFAULT;

-- 7. Email FKs on join tables already exist (ON DELETE CASCADE).
-- Recreating them as ON UPDATE CASCADE is blocked by Hasura relationships.
-- Leave as-is until volunteer identity moves to users.id.
