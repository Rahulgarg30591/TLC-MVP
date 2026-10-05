-- Volunteer and admin email is optional extra information.
-- Phone (users.phoneNumber) stays required and unique.
-- Postgres unique indexes allow many NULLs, so accounts without email do not collide.

ALTER TABLE users ALTER COLUMN email DROP NOT NULL;
