import { WebSocketServer, RawData } from 'ws';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.dev.local' });

interface Message {
    name: string;
    message: string;
}
interface Client {
    userID: string;
    userIP: string;
}

const port = process.env.PORT;

const wss = new WebSocketServer({ port: Number(port) });

const clients: { [id: string]: Client } = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    return s4() + s4() + '-' + s4();
};

wss.on('connection', function connection(ws, request) {
    let userID = getUniqueID();
    let userIP = request.socket.remoteAddress as string;
    console.log(
        new Date() + ' Recieved a new connection from origin ' + userIP + '.'
    );
    clients[userID] = { userID, userIP };

    ws.on('message', function incoming(message: RawData, isBinary: boolean) {
        let parsed: Message = JSON.parse(message.toString());
        wss.clients.forEach(function each(client) {
            client.send(
                JSON.stringify({
                    name: parsed.name,
                    message: parsed.message
                })
            );
        });
    });

    ws.send(
        JSON.stringify({
            name: 'Server',
            message: 'Welcome to the chat server!'
        })
    );
    ws.send(JSON.stringify(clients));
    setInterval(() => {
        ws.send(JSON.stringify(clients));
    }, 1000);

    ws.on('close', () => {
        delete clients[userID];
        console.log('closed connection');
    });
});
