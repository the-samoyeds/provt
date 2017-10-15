# Builder
FROM node:8.7 as builder

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

# RUN set -x && \
#   curl -fsSLo /dist/static/jquery.js https://code.jquery.com/jquery-3.1.1.slim.min.js && \
#   curl -fsSLo /dist/static/tether.min.js https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js

# COPY ./build/* /app/build/
COPY . /app
RUN npm run build

# COPY . /app

# Runtime
FROM busybox
LABEL The Samoyeds <github.com/the-samoyeds>

COPY --from=builder /app/dist /app/dist

VOLUME /app/dist
