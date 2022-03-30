import { WebSocketServer } from 'ws';
import express, { Express, Request, Response } from 'express';
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

wss.on('connection', function connection(ws, req) {
    let userID = getUniqueID();
    let userIP = req.socket.remoteAddress;
    console.log(
        new Date() + ' Recieved a new connection from origin ' + userIP + '.'
    );
    // You can rewrite this part of the code to accept only the requests from allowed origin
    clients.push({ userID: userIP });

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
    ws.on('close', () => {
        console.log('closed connection');
    });
});
