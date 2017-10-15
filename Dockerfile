# Builder
FROM node:8.7 as builder

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

# Final Image
FROM busybox
LABEL The Samoyeds <github.com/the-samoyeds>

COPY --from=builder /app/dist /app/dist
VOLUME /app/dist
