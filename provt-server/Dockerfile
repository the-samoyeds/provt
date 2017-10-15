FROM node:8.7
LABEL The Samoyeds <github.com/the-samoyeds>

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

EXPOSE 3000
CMD ["npm", "start"]
