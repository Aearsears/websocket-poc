import { WebSocket, WebSocketServer, RawData } from 'ws';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.dev.local' });

const port = process.env.PORT;

const wss = new WebSocketServer({ port: Number(port) });

// I'm maintaining all active connections in this object
const clients = [{}];

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
    let userIP = request.socket.remoteAddress;
    console.log(
        new Date() + ' Recieved a new connection from origin ' + userIP + '.'
    );
    clients.push({ userID: userIP });

    ws.on(
        'message',
        function incoming(wb: WebSocket, message: RawData, isBinary: boolean) {
            wss.clients.forEach(function each(client) {
                client.send(
                    JSON.stringify({
                        name: 'George',
                        message: 'Message has been received by the server.'
                    })
                );

                ws.send(
                    JSON.stringify({
                        name: 'George',
                        message: message.toString()
                    })
                );
            });
        }
    );

    ws.send(
        JSON.stringify({
            name: 'George',
            message: 'Welcome to the chat server!'
        })
    );
    ws.on('close', () => {
        console.log('closed connection');
    });
});
