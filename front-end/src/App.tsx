import React from 'react';
import logo from './logo.svg';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Chat from './Chat';
//
const client = new W3CWebSocket('ws://localhost:4000');

client.onopen = () => {
    console.log('WebSocket Client Connected');
};

client.onmessage = (message) => {
    console.log(message);
};
client.onerror = function () {
    console.log('Connection Error');
};

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <Chat />
        </div>
    );
}

export default App;
