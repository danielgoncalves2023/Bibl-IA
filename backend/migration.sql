-- Migration to update verse_interactions table structure (PostgreSQL)
-- From is_favorite/is_read booleans to interaction_type enum

-- Create enum type if it doesn't exist
DO $$ BEGIN
    CREATE TYPE interaction_type_enum AS ENUM ('read', 'favorite', 'comment', 'observation');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- First, add the new interaction_type column
ALTER TABLE verse_interactions 
ADD COLUMN interaction_type interaction_type_enum;

-- Add content column for comments and observations
ALTER TABLE verse_interactions 
ADD COLUMN content TEXT;

-- Update existing data: favorite records
UPDATE verse_interactions 
SET interaction_type = 'favorite'::interaction_type_enum 
WHERE is_favorite = TRUE;

-- Update existing data: read records  
UPDATE verse_interactions 
SET interaction_type = 'read'::interaction_type_enum
WHERE is_read = TRUE AND interaction_type IS NULL;

-- Update existing data: comment records
UPDATE verse_interactions 
SET interaction_type = 'comment'::interaction_type_enum,
    content = comment
WHERE comment IS NOT NULL AND comment != '' AND interaction_type IS NULL;

-- Update existing data: observation records
UPDATE verse_interactions 
SET interaction_type = 'observation'::interaction_type_enum,
    content = observation
WHERE observation IS NOT NULL AND observation != '' AND interaction_type IS NULL;

-- Set default for any remaining NULL values
UPDATE verse_interactions 
SET interaction_type = 'read'::interaction_type_enum
WHERE interaction_type IS NULL;

-- Make interaction_type required
ALTER TABLE verse_interactions 
ALTER COLUMN interaction_type SET NOT NULL;

-- Remove old columns
ALTER TABLE verse_interactions 
DROP COLUMN IF EXISTS is_favorite,
DROP COLUMN IF EXISTS is_read,
DROP COLUMN IF EXISTS comment,
DROP COLUMN IF EXISTS observation;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_verse_interactions_type ON verse_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_verse_interactions_user_verse ON verse_interactions(user_id, verse_id);