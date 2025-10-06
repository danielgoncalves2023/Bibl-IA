-- Migration to update verse_interactions table structure
-- From is_favorite/is_read booleans to interaction_type enum

-- First, add the new interaction_type column
ALTER TABLE verse_interactions 
ADD COLUMN interaction_type ENUM('read', 'favorite', 'comment', 'observation');

-- Update existing data: favorite records
UPDATE verse_interactions 
SET interaction_type = 'favorite' 
WHERE is_favorite = TRUE;

-- Update existing data: read records  
UPDATE verse_interactions 
SET interaction_type = 'read' 
WHERE is_read = TRUE AND interaction_type IS NULL;

-- Update existing data: comment records
UPDATE verse_interactions 
SET interaction_type = 'comment' 
WHERE comment IS NOT NULL AND comment != '' AND interaction_type IS NULL;

-- Update existing data: observation records
UPDATE verse_interactions 
SET interaction_type = 'observation' 
WHERE observation IS NOT NULL AND observation != '' AND interaction_type IS NULL;

-- Make interaction_type required
ALTER TABLE verse_interactions 
MODIFY COLUMN interaction_type ENUM('read', 'favorite', 'comment', 'observation') NOT NULL;

-- Remove old columns
ALTER TABLE verse_interactions 
DROP COLUMN is_favorite,
DROP COLUMN is_read;