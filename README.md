# Websocket debug server

Listenes for websocket clients, prints reveived messages and broadcasts from STDIN.

## Run

```sh
docker run -it -p 8080:8080 --rm aroglahcim/websocket-debug-server
```

```sh
docker compose run --service-ports server
```

or 

```
node index.js
```

## Exit

Type `exit` to close server.
