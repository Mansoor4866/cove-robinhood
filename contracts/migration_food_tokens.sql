-- ==========================================================
-- 🪙 Cove Food Token Economy Migration
-- Run this in Supabase SQL Editor → New Query → Run
-- ==========================================================

-- Add Food Token & Economy columns to companions table
ALTER TABLE companions
  ADD COLUMN IF NOT EXISTS food_tokens        INT DEFAULT 10,
  ADD COLUMN IF NOT EXISTS mana               INT DEFAULT 100,
  ADD COLUMN IF NOT EXISTS spar_wins          INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS days_active        INT DEFAULT 1,
  ADD COLUMN IF NOT EXISTS weekly_score       INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_pet_at        TIMESTAMPTZ DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS last_spar_at       TIMESTAMPTZ DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS last_login_at      TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS week_start_at      TIMESTAMPTZ DEFAULT NOW();

-- Index for weekly leaderboard queries
CREATE INDEX IF NOT EXISTS idx_companions_weekly_score ON companions(weekly_score DESC);

-- Helper: recalculate weekly score on update
CREATE OR REPLACE FUNCTION recalculate_weekly_score()
RETURNS TRIGGER AS $$
BEGIN
  NEW.weekly_score := 
    (NEW.level * 1000) +
    (NEW.exp * 10) +
    (NEW.spar_wins * 25) +
    (NEW.days_active * 50) +
    (COALESCE(NEW.happiness, 100) * 2);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_recalc_score ON companions;
CREATE TRIGGER trigger_recalc_score
  BEFORE UPDATE ON companions
  FOR EACH ROW
  EXECUTE PROCEDURE recalculate_weekly_score();
