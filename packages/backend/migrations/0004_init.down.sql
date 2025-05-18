ALTER TABLE usersEvents ALTER COLUMN attendance TYPE TEXT USING attendance::text;

ALTER TABLE events
ALTER COLUMN dateStart TYPE DATE USING dateStart::date,
ALTER COLUMN dateEnd TYPE DATE USING dateEnd::date;
