-- ============================================================
-- SUPABASE PRODUCTION TABLE SETUP — Form Submissions
-- ============================================================
-- Run this ENTIRE script in: Supabase Dashboard > SQL Editor
-- It is safe to run multiple times (uses IF NOT EXISTS).
-- ============================================================


-- ─────────────────────────────────────────────────────────────
-- TABLE 1: contact_submissions  (Contact Page form)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salutation      TEXT,
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  subject         TEXT,
  car_reference   TEXT,
  message         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookups by email and date
CREATE INDEX IF NOT EXISTS idx_contact_email      ON contact_submissions (email);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions (created_at DESC);


-- ─────────────────────────────────────────────────────────────
-- TABLE 2: tradein_submissions  (Trade-In / Inzahlungnahme form)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tradein_submissions (
  id                                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Personal info
  name                              TEXT NOT NULL,
  email                             TEXT NOT NULL,
  phone                             TEXT,
  address                           TEXT,
  -- Vehicle basics
  vin                               TEXT,
  license_plate                     TEXT,
  first_registration                TEXT,
  mileage                           TEXT,
  expected_price                    TEXT,
  -- Condition & history
  accident_free                     TEXT,
  accident_damage                   TEXT,
  previous_owners                   TEXT,
  repainted                         TEXT,
  repainted_details                 TEXT,
  replaced_engine_or_gearbox        TEXT,
  replaced_engine_or_gearbox_details TEXT,
  exterior_color                    TEXT,
  is_metallic                       BOOLEAN DEFAULT FALSE,
  interior_color                    TEXT,
  service_history                   TEXT,
  last_inspection_km                TEXT,
  last_inspection_date              TEXT,
  tuv_valid_until                   TEXT,
  -- Equipment / other
  upholstery                        TEXT,
  financing                         TEXT,
  financing_details                 TEXT,
  smokers_car                       TEXT,
  re_import                         TEXT,
  -- Extra
  message                           TEXT,
  created_at                        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookups by email and date
CREATE INDEX IF NOT EXISTS idx_tradein_email      ON tradein_submissions (email);
CREATE INDEX IF NOT EXISTS idx_tradein_created_at ON tradein_submissions (created_at DESC);


-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS) — MUST be enabled for production
-- ─────────────────────────────────────────────────────────────
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tradein_submissions ENABLE ROW LEVEL SECURITY;


-- ─────────────────────────────────────────────────────────────
-- POLICIES: Anonymous users can INSERT only (website visitors)
-- ─────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'anon_insert_contact' AND tablename = 'contact_submissions'
  ) THEN
    CREATE POLICY anon_insert_contact
      ON contact_submissions
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'anon_insert_tradein' AND tablename = 'tradein_submissions'
  ) THEN
    CREATE POLICY anon_insert_tradein
      ON tradein_submissions
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;


-- ─────────────────────────────────────────────────────────────
-- POLICIES: Authenticated users can READ all (admin dashboard)
-- ─────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'auth_read_contact' AND tablename = 'contact_submissions'
  ) THEN
    CREATE POLICY auth_read_contact
      ON contact_submissions
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'auth_read_tradein' AND tablename = 'tradein_submissions'
  ) THEN
    CREATE POLICY auth_read_tradein
      ON tradein_submissions
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;


-- ─────────────────────────────────────────────────────────────
-- DONE! Verify tables were created:
-- ─────────────────────────────────────────────────────────────
SELECT
  table_name,
  (SELECT count(*) FROM information_schema.columns c WHERE c.table_name = t.table_name) AS column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN ('contact_submissions', 'tradein_submissions');
