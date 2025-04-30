#!/bin/sh

set -e

timeout=30
while ! pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t 1 >/dev/null 2>&1; do
  timeout=$((timeout-1))
  if [ $timeout -eq 0 ]; then
    echo "PostgreSQL не стал доступен за отведённое время"
    exit 1
  fi
  echo "Ожидание PostgreSQL ($timeout)..."
  sleep 1
done

echo "PostgreSQL готов, выполняем миграции..."
./server