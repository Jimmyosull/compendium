FROM golang:1.23-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /app/backend

FROM alpine:latest
WORKDIR /root/
COPY --from=build /app/backend .

# todo: remove for final?
EXPOSE 8001
CMD ["./backend"]