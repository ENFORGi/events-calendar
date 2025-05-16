CREATE TABLE typeEvents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL
);

CREATE TABLE subTypeEvents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    idTypeEvents INTEGER REFERENCES typeEvents(id) ON DELETE CASCADE
);

ALTER TABLE events DROP COLUMN typeEvents;
ALTER TABLE events ADD COLUMN typeEvents INTEGER;
ALTER TABLE events ADD CONSTRAINT fk_typeevents FOREIGN KEY (typeEvents) REFERENCES typeEvents(id) ON DELETE CASCADE;

ALTER TABLE mediaFiles
    DROP COLUMN type;

ALTER TABLE mediaFiles
    ADD COLUMN url VARCHAR(255) NOT NULL;

ALTER TABLE usersEvents ALTER COLUMN attendance TYPE VARCHAR(255) USING attendance::text;

UPDATE usersEvents SET attendance = CASE
    WHEN attendance = 'Going' THEN '1'
    WHEN attendance = 'Not going' THEN '2'
    ELSE '3'
END;
