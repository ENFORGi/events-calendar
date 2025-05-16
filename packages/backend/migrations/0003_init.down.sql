ALTER TABLE events
    DROP CONSTRAINT IF EXISTS fk_typeevents;

ALTER TABLE events DROP CONSTRAINT IF EXISTS fk_typeevents;
ALTER TABLE events ALTER COLUMN typeEvents TYPE VARCHAR;

DROP TABLE IF EXISTS subTypeEvents;
DROP TABLE IF EXISTS typeEvents;

UPDATE usersEvents
SET attendance = CASE
    WHEN attendance = '1' THEN 'Going'
    WHEN attendance = '2' THEN 'Not going'
    ELSE NULL
END;

ALTER TABLE mediaFiles 
    DELETE COLUMN url

ALTER TABLE mediaFiles 
    ADD COLUMN type VARCHAR(255) NOT NULL