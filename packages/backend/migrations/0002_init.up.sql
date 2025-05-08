ALTER TABLE users
    ADD COLUMN idIvc INTEGER REFERENCES ivc(id) ON DELETE CASCADE;

UPDATE usersEvents SET attendance = CASE 
    WHEN attendance = TRUE THEN 'Заменить на нужные данные' 
    WHEN attendance = FALSE THEN 'Заменить на нужные данные' 
    ELSE attendance 
END;

ALTER TABLE events
    ADD COLUMN typeEvents VARCHAR(50);

ALTER TABLE mediaFiles
    DROP COLUMN url;

DROP TABLE IF EXISTS typeFiles CASCADE;
DROP TABLE IF EXISTS ivcAdmins CASCADE;