# Работа с миграциями в проекте Events Calendar

## Основные понятия

- **Миграция** — это скрипт с изменениями структуры базы данных (создание таблиц, изменение колонок, индексов и т.д.).
- Миграции бывают двух типов:
  - **Up** — применяют изменения к базе.
  - **Down** — откатывают изменения, сделанные соответствующей миграцией.
- Каждая миграция имеет номер (версию) и состоит из двух файлов:  
  `XXXX_description.up.sql` — для применения  
  `XXXX_description.down.sql` — для отката

---

## Где хранятся миграции

- Папка с миграциями расположена внутри проекта:  
  `./migrations/` (в корне репозитория на хосте, маппится в `/app/migrations/` в контейнере).
- Примеры файлов:  
  `./migrations/0001_init.up.sql`  
  `./migrations/0001_init.down.sql`

---

## Как подключиться к базе из контейнера backend

Формат строки подключения:

```bash
postgres://<user_name>:<password>@<container_name>:<port>/<database_name>?sslmode=disable
```

Пример:

```bash
postgres://admin:admin@db:5432/events_calendar?sslmode=disable
```

- `<user_name>` — имя пользователя БД (например, `admin`).
- `<password>` — пароль пользователя (например, `admin`).
- `<container_name>` — имя сервиса базы данных в `docker-compose.yml` (например, `db`).
- `<port>` — порт PostgreSQL (обычно `5432`).
- `<database_name>` — имя базы данных (например, `events_calendar`).

---

## Основные команды для работы с миграциями

### 1. Применить все новые миграции (up)

```bash
migrate -path /app/migrations -database "postgres://admin:admin@db:5432/events_calendar?sslmode=disable" up
```

### 2. Откатить последнюю миграцию (down)

```bash
migrate -path /app/migrations -database "postgres://admin:admin@db:5432/events_calendar?sslmode=disable" down
```

### 3. Создать новую миграцию

```bash
migrate create -ext sql -dir /app/migrations -seq <migration_name>
```

Пример:

```bash
migrate create -ext sql -dir /app/migrations -seq add_users_table
```

Это создаст два файла:  
`/app/migrations/0002_add_users_table.up.sql`  
`/app/migrations/0002_add_users_table.down.sql`

---

## Создание Dockerfile для проекта

Ниже приведен пример `Dockerfile` для backend-сервиса на Go с поддержкой golang-migrate. Dockerfile использует многоступенчатую сборку для минимизации размера образа и включает установку утилиты `migrate`.

### Dockerfile

```dockerfile
# Этап 1: Сборка приложения
FROM golang:1.23-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем go.mod и go.sum для кэширования зависимостей
COPY go.mod go.sum ./

# Загружаем зависимости
RUN go mod download

# Копируем весь исходный код
COPY . .

# Компилируем приложение
# CGO_ENABLED=0 отключает CGO для статической сборки
# -o events_calendar задает имя выходного бинарного файла
RUN CGO_ENABLED=0 GOOS=linux go build -o events_calendar ./cmd/main.go

# Этап 2: Создание финального образа
FROM alpine: Anch64

# Устанавливаем необходимые пакеты
RUN apk add --no-cache bash

# Устанавливаем утилиту golang-migrate
RUN wget -O /usr/bin/migrate https://github.com/golang-migrate/migrate/releases/download/v4.17.1/migrate.linux-amd64.tar.gz && \
    tar -xzf /usr/bin/migrate.linux-amd64.tar.gz -C /usr/bin && \
    rm /usr/bin/migrate.linux-amd64.tar.gz

# Копируем скомпилированный бинарник из этапа сборки
COPY --from=builder /app/events_calendar /app/events_calendar

# Копируем папку с миграциями
COPY migrations /app/migrations

# Указываем рабочую директорию
WORKDIR /app

# Команда по умолчанию для запуска приложения
CMD ["/app/events_calendar"]
```

### Разъяснение структуры Dockerfile

1. **Многоступенчатая сборка**:
   - **Первый этап (`builder`)**: Используется образ `golang:1.23-alpine` для сборки Go-приложения.
     - Устанавливается рабочая директория `/app`.
     - Копируются `go.mod` и `go.sum` для кэширования зависимостей.
     - Загружаются зависимости с помощью `go mod download`.
     - Копируются все исходные файлы.
     - Компилируется приложение с флагами `CGO_ENABLED=0` и `GOOS=linux` для создания статического бинарника.
   - **Второй этап**: Используется минималистичный образ `alpine` для финального контейнера.
     - Устанавливаются необходимые пакеты (`bash` для удобства работы в контейнере).
     - Устанавливается утилита `migrate` версии 4.17.1.
     - Копируются скомпилированный бинарник и папка с миграциями.
     - Устанавливается рабочая директория `/app`.
     - Задается команда по умолчанию для запуска приложения.

2. **Почему Alpine?**  
   Образ `alpine` легковесный (~5 МБ), что уменьшает размер итогового образа. Это важно для быстрого развертывания и экономии ресурсов.

3. **Установка golang-migrate**:
   - Утилита загружается напрямую с GitHub (`migrate.linux-amd64.tar.gz`).
   - Файл распаковывается в `/usr/bin` и становится доступным как команда `migrate`.

4. **Копирование миграций**:
   - Папка `./migrations` с хоста копируется в `/app/migrations` в контейнере.
   - Это позволяет использовать миграции внутри контейнера.

---

## Пример docker-compose.yml

Для работы backend и базы данных вместе создайте файл `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://admin:admin@db:5432/events_calendar?sslmode=disable
    volumes:
      - ./migrations:/app/migrations

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=admin
      - POSTGRES_DB=events_calendar
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Разъяснение docker-compose.yml

- **Сервис `backend`**:
  - Собирается из `Dockerfile` в текущей директории.
  - Порт `8080` маппится на хост.
  - Зависит от сервиса `db`.
  - Переменная окружения `DATABASE_URL` задает строку подключения.
  - Папка `./migrations` монтируется в `/app/migrations` для удобной разработки.

- **Сервис `db`**:
  - Используется образ `postgres:16-alpine`.
  - Задаются учетные данные (`admin:admin`) и имя базы (`events_calendar`).
  - Порт `5432` маппится на хост.
  - Данные сохраняются в Docker-томе `postgres_data`.

---

## Как использовать

1. **Собрать и запустить контейнеры**:

```bash
docker-compose up --build
```

2. **Применить миграции**:
   - Подключитесь к контейнеру backend:

```bash
docker-compose exec backend bash
```

- Выполните команду миграции:

```bash
migrate -path /app/migrations -database "postgres://admin:admin@db:5432/events_calendar?sslmode=disable" up
```

3. **Создать новую миграцию**:
   - В контейнере backend выполните:

```bash
migrate create -ext sql -dir /app/migrations -seq <migration_name>
```

4. **Проверить логи**:

```bash
docker-compose logs backend
```

5. **Остановить и удалить контейнеры**:

```bash
docker-compose down
```

---

## Полезные советы

- **Кэширование зависимостей**: Копирование `go.mod` и `go.sum` отдельно от остального кода ускоряет сборку, так как зависимости кэшируются.
- **Переменные окружения**: Храните строку подключения (`DATABASE_URL`) в `.env` файле и используйте `env_file` в `docker-compose.yml` для безопасности.
- **Логирование миграций**: Добавьте флаг `-verbose` в команду `migrate` для подробных логов:

```bash
migrate -path /app/migrations -database "<connection_string>" up -verbose
```

- **Тестирование миграций**: Перед применением миграций проверяйте их на тестовой базе данных.
- **Обновление миграций в разработке**: Монтирование папки `./migrations` позволяет изменять файлы миграций на хосте без пересборки контейнера.

---

## Устранение неполадок

1. **Ошибка "database connection refused"**:
   - Убедитесь, что сервис `db` запустился раньше `backend` (проверьте `depends_on`).
   - Проверьте правильность `DATABASE_URL`.

2. **Ошибка "migrate: command not found"**:
   - Убедитесь, что утилита `migrate` установлена в Dockerfile.
   - Проверьте, что путь `/usr/bin` доступен в `$PATH`.

3. **Миграции не применяются**:
   - Проверьте, что файлы миграций находятся в `/app/migrations`.
   - Убедитесь, что имена файлов соответствуют формату `XXXX_description.up.sql`.

4. **Большой размер образа**:
   - Используйте многоступенчатую сборку (как в примере).
   - Удаляйте временные файлы (например, `migrate.linux-amd64.tar.gz`) в Dockerfile.