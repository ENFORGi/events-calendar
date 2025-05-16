-- -- ==== IVC ====
-- INSERT INTO ivc (name, address) VALUES
--   ('IVC Центр', 'ул. Центральная, 10'),
--   ('IVC Восток', 'ул. Восточная, 15'),
--   ('ИВЦ 1', 'ул. Ленина, 1'),
--   ('ИВЦ 2', 'ул. Пушкина, 10'),
--   ('ИВЦ 3', 'пр. Мира, 25');

-- -- ==== Users ====
-- INSERT INTO users (mail, name, isadmin, idivc) VALUES
--   ('admin@example.com', 'Admin User', true, 1),
--   ('user1@example.com', 'Иван Иванов', false, 1),
--   ('user2@example.com', 'Петр Петров', false, 2),
--   ('admin2@ivc.ru', 'Администратор ИВЦ 2', true, 2),
--   ('user2@ivc.ru', 'Пользователь 2 ИВЦ 2', false, 2),
--   ('user3@ivc.ru', 'Пользователь 3 ИВЦ 3', false, 3);

-- INSERT INTO typeevents (name) VALUES
--   ('Совещание'),
--   ('Тренинг'),
--   ('Презентация'),
--   ('Корпоративное мероприятие'),
--   ('Конференция');

-- INSERT INTO subtypeevents (name, idtypeevents) VALUES
--   ('Плановое совещание', 1),
--   ('Экстренное совещание', 1),
--   ('Технический тренинг', 2),
--   ('Безопасность', 2),
--   ('Продуктовая презентация', 3),
--   ('Демонстрация возможностей', 3),
--   ('Новогодний корпоратив', 4),
--   ('Тимбилдинг', 4),
--   ('Отраслевая конференция', 5),
--   ('Научная конференция', 5);

-- -- ==== Events ====
-- INSERT INTO events (idivc, name, description, datestart, dateend, typeoc, placeadress, usercreater, typeevents) VALUES
--   (1, 'Хакатон', 'Соревнование по программированию', '2025-05-20 10:00:00', '2025-05-20 18:00:00', true, 'IVC Центр, зал 1', 1, 1),
--   (2, 'Конференция', 'Обсуждение новых технологий', '2025-06-15 09:00:00', '2025-06-15 17:00:00', false, 'IVC Восток, конференц-зал', 2, 3);

-- -- ==== Mediafiles ====
-- INSERT INTO mediafiles (id, url) VALUES
--   (1, 1),
--   (2, 2);

-- -- ==== Mediafileforevents ====
-- INSERT INTO mediafileforevents (id, idfile, idevents) VALUES
--   (1, 1, 1),
--   (2, 2, 2);

-- -- ==== Usersevents ====
-- INSERT INTO usersevents (iduser, idevents, attendance, notificationtime) VALUES
--   (2, 1, '1', '2025-05-19 09:00:00'),
--   (3, 2, '2', '2025-06-14 12:00:00');
