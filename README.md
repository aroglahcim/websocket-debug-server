# Websocket debug server

Listenes for websocket clients, prints received messages and broadcasts from STDIN.

## Run

```sh
npx @aroglahcim/websocket-debug-server
```

or

```sh
docker run -it -p 8080:8080 --rm aroglahcim/websocket-debug-server
```

or

```sh
docker compose run --service-ports server
```

or 

```
node index.js
```

## Exit

Type `exit` to close server.
