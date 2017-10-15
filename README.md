# provt

## Development
Install project requirements

```sh
cd provt-ui
npm install
cd ..
cd provt-server
npm install
cd ..
```

Start mongo database

```sh
docker run -p 27017:27017 mongo
```

In a new session start `provt-server`

```sh
cd provt-server
MONGO_URI=mongodb://localhost:27017/provt DEBUG=provt-server:* npm start
```

In another session start `provt-ui`

```sh
cd provt-ui
npm run dev
```
