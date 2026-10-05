-- Invitations can be delivered by phone. Email stays optional for a mail copy.
ALTER TABLE "Invitations" ADD COLUMN IF NOT EXISTS phone_number text;
ALTER TABLE "Invitations" ALTER COLUMN email DROP NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS invitations_phone_number_key
  ON "Invitations" (phone_number)
  WHERE phone_number IS NOT NULL;
