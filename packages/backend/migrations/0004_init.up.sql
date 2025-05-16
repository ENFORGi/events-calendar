ALTER TABLE usersEvents ALTER COLUMN attendance DROP DEFAULT;

UPDATE usersEvents SET attendance = CASE
    WHEN attendance = '1' THEN 1
    WHEN attendance = '2' THEN 2
    WHEN attendance = '3' THEN 3
    ELSE NULL
END;

ALTER TABLE usersEvents ALTER COLUMN attendance TYPE INTEGER USING attendance::integer;

ALTER TABLE usersEvents ALTER COLUMN attendance SET DEFAULT 1;

ALTER TABLE events
ALTER COLUMN dateStart TYPE TIMESTAMP,
ALTER COLUMN dateEnd TYPE TIMESTAMP;
