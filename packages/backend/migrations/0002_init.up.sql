ALTER TABLE users
    ADD COLUMN idIvc INTEGER REFERENCES ivc(id) ON DELETE CASCADE;

ALTER TABLE usersEvents
    ALTER COLUMN attendance TYPE VARCHAR(50);

UPDATE usersEvents SET attendance = CASE 
    WHEN attendance = 't' THEN 'Going' 
    WHEN attendance = 'f' THEN 'Not going' 
    ELSE attendance 
END;

ALTER TABLE events
    ADD COLUMN typeEvents VARCHAR(50);

ALTER TABLE mediaFiles
    DROP COLUMN url;

DROP TABLE IF EXISTS typeFiles CASCADE;
DROP TABLE IF EXISTS ivcAdmins CASCADE;