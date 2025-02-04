const WebSocket = require('ws');
const readline = require('readline');
const { parseArgs } = require('node:util');

const options = {
    port: {
        type: 'string',
        default: '8080',
    },
    echo:{
        type: 'boolean',
        default: true,
    }
};
const { values: config } = parseArgs({
    args: process.argv.slice(2), options
});

const HOST = '0.0.0.0'
const PORT = +config.port;

const wss = new WebSocket.Server({ port: PORT, host: HOST });

let clients = [];

wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.push(ws);

    ws.on('message', (message) => {
        console.info(`Received message: ${message}`);
        if (config.echo) {
            ws.send(`${message}`);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter(client => client !== ws);
    });
});

function broadcastMessage(message) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

const stdin = readline.createInterface({
    input: process.stdin,
});

stdin.on('line', (input) => {
    if (input.trim().toLowerCase() === 'exit') {
        wss.close();
        stdin.close();
        process.exit();
    }
    console.info(`Broadcasting message to ${clients.length} clients`);
    broadcastMessage(input);
});

console.log(`WebSocket server is running on ws://${HOST}:${PORT}`);
console.log('Type "exit" to stop the server');
