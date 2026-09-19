-- ==========================================================
-- 🌲 Sherwood Forest / Robin Hood Companions Database Schema
-- Target: PostgreSQL / Supabase
-- Optimized for High-Concurrency & Sub-millisecond Lookups
-- ==========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Companions Table (Core State)
CREATE TABLE IF NOT EXISTS companions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token_id BIGINT UNIQUE,
    name VARCHAR(64) NOT NULL,
    species VARCHAR(64) NOT NULL,
    role VARCHAR(64) NOT NULL,
    rarity VARCHAR(32) DEFAULT 'Common',
    avatar_icon VARCHAR(16) NOT NULL,
    badge VARCHAR(16) NOT NULL,
    description TEXT,
    quote TEXT,
    prime_stat VARCHAR(64) NOT NULL,
    
    -- RPG Vitals
    level INT DEFAULT 1 CHECK (level >= 1),
    exp INT DEFAULT 0 CHECK (exp >= 0 AND exp <= 100),
    max_exp INT DEFAULT 100,
    hunger INT DEFAULT 0 CHECK (hunger >= 0 AND hunger <= 100),
    happiness INT DEFAULT 100 CHECK (happiness >= 0 AND happiness <= 100),
    health INT DEFAULT 100 CHECK (health >= 0 AND health <= 100),
    energy INT DEFAULT 100 CHECK (energy >= 0 AND energy <= 100),
    
    -- Ownership & On-Chain State
    owner_handle VARCHAR(64) NOT NULL UNIQUE,
    owner_address VARCHAR(64),
    
    -- Timestamps
    last_fed_at TIMESTAMPTZ DEFAULT NOW(),
    hatched_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Activity & Interaction Logs Table (Timeline & Card Generator History)
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
    owner_handle VARCHAR(64) NOT NULL,
    action_type VARCHAR(32) NOT NULL, -- 'hatch', 'feed', 'adventure', 'battle'
    prompt_text TEXT,
    response_text TEXT,
    reward_exp INT DEFAULT 0,
    card_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. High-Performance Indexing for Scale (Zero Lag at 1M+ Users)
CREATE INDEX IF NOT EXISTS idx_companions_owner_handle ON companions(LOWER(owner_handle));
CREATE INDEX IF NOT EXISTS idx_companions_level_exp ON companions(level DESC, exp DESC);
CREATE INDEX IF NOT EXISTS idx_companions_last_fed ON companions(last_fed_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_handle ON activity_logs(owner_handle, created_at DESC);

-- 5. Helper Function for Auto-Updating 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companions_updated_at
    BEFORE UPDATE ON companions
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
