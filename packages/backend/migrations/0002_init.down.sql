ALTER TABLE users
    DROP COLUMN idIvc;

UPDATE usersEvents
SET attendance = CASE
    WHEN attendance = 'Going' THEN TRUE
    WHEN attendance = 'Not going' THEN FALSE
    ELSE NULL
END;

ALTER TABLE usersEvents
    ALTER COLUMN attendance TYPE BOOLEAN USING (attendance::BOOLEAN);

ALTER TABLE events
    DROP COLUMN typeEvents;

ALTER TABLE mediaFiles
    ADD COLUMN url TEXT NOT NULL;

CREATE TABLE typeFiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE ivcAdmins (
    id SERIAL PRIMARY KEY,
    idIvc INTEGER REFERENCES ivc(id) ON DELETE CASCADE,
    idAdmin INTEGER REFERENCES users(id) ON DELETE CASCADE
);