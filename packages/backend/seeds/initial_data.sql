-- -- ==== IVC ====
-- INSERT INTO ivc (id, name, address) VALUES
--   (1, 'IVC Центр', 'ул. Центральная, 10'),
--   (2, 'IVC Восток', 'ул. Восточная, 15');

-- -- ==== Users ====
-- INSERT INTO users (id, mail, name, isadmin, idivc) VALUES
--   (1, 'admin@example.com', 'Admin User', true, 1),
--   (2, 'user1@example.com', 'Иван Иванов', false, 1),
--   (3, 'user2@example.com', 'Петр Петров', false, 2);

-- -- ==== Events ====
-- INSERT INTO events (id, idivc, name, description, datestart, dateend, typeoc, placeadress, usercreater, typeevents) VALUES
--   (1, 1, 'Хакатон', 'Соревнование по программированию', '2025-05-20 10:00:00', '2025-05-20 18:00:00', true, 'IVC Центр, зал 1', 1, 'IT'),
--   (2, 2, 'Конференция', 'Обсуждение новых технологий', '2025-06-15 09:00:00', '2025-06-15 17:00:00', false, 'IVC Восток, конференц-зал', 2, 'Tech');

-- -- ==== Mediafiles ====
-- INSERT INTO mediafiles (id, type) VALUES
--   (1, 1),
--   (2, 2);

-- -- ==== Mediafileforevents ====
-- INSERT INTO mediafileforevents (id, idfile, idevents) VALUES
--   (1, 1, 1),
--   (2, 2, 2);

-- -- ==== Usersevents ====
-- INSERT INTO usersevents (id, iduser, idevents, attendance, notificationtime) VALUES
--   (1, 2, 1, 'true', '2025-05-19 09:00:00'),
--   (2, 3, 2, 'false', '2025-06-14 12:00:00');
