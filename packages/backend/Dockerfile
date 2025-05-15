FROM golang:1.24 as builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod tidy

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server .

FROM alpine:latest
WORKDIR /app

RUN apk add --no-cache postgresql-client libc6-compat go 
RUN wget -q https://github.com/golang-migrate/migrate/releases/download/v4.15.2/migrate.linux-amd64.tar.gz && \
    tar -xzf migrate.linux-amd64.tar.gz -C /usr/local/bin && \
    rm migrate.linux-amd64.tar.gz

COPY --from=builder /app/server .
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/seeds ./seeds
COPY --from=builder /app/models ./models
COPY --from=builder /app/repositories ./repositories
COPY --from=builder /app/services ./services
COPY /entrypoint.sh .

RUN chmod +x entrypoint.sh server

EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]