FROM golang:1.24 as builder

WORKDIR /app


COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server .

FROM alpine:latest
WORKDIR /app

RUN apk add --no-cache postgresql-client libc6-compat

COPY --from=builder /app/server .
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/seeds ./seeds
COPY /entrypoint.sh .

RUN chmod +x entrypoint.sh server

EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]