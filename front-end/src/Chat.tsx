import React, { Component } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ChatNode from './ChatNode';

const URL = 'ws://localhost:4000';
interface State {
    name: string;
    messages: Message[];
    ws: WebSocket | null;
    chatNodes: JSX.Element[];
}
interface Props {}
interface Message {
    name: string;
    message: string;
}
class Chat extends Component<Props, State> {
    state: State = {
        name: 'Bob',
        messages: [],
        ws: null,
        chatNodes: []
    };
    ws!: WebSocket;
    componentDidMount() {
        this.ws = new WebSocket(URL);
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        };

        this.ws.onmessage = (evt) => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data);
            console.log(message);
            if (message.message) {
                this.addMessage(message);
            } else {
                this.setState((state) => ({
                    chatNodes: [message, ...state.chatNodes]
                }));
            }
        };

        this.ws.onclose = () => {
            console.log('disconnected');
            // automatically try to reconnect on connection loss
            this.setState({
                ws: new WebSocket(URL)
            });
        };
        this.ws.onerror = (event: Event) => {
            console.error('error');
        };
    }

    addMessage = (message: Message) => {
        this.setState((state) => ({ messages: [message, ...state.messages] }));
    };

    submitMessage = (messageString: string) => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = { name: this.state.name, message: messageString };
        console.log(JSON.stringify(message));

        this.ws.send(JSON.stringify(message));
        // this.addMessage(message);
    };

    render() {
        return (
            <div>
                <label htmlFor="name">
                    Name:&nbsp;
                    <input
                        type="text"
                        id={'name'}
                        placeholder={'Enter your name...'}
                        value={this.state.name}
                        onChange={(e) =>
                            this.setState({ name: e.target.value })
                        }
                    />
                </label>
                <ChatInput
                    ws={this.ws}
                    onSubmitMessage={(messageString) =>
                        this.submitMessage(messageString)
                    }
                />
                {this.state.messages.map((message, index) => (
                    <ChatMessage
                        key={index}
                        message={message.message}
                        name={message.name}
                    />
                ))}
                <ChatNode name={this.state.name}></ChatNode>
                {this.state.chatNodes.length > 0
                    ? this.state.chatNodes.map((value) => {
                          return <ChatNode name="yes"></ChatNode>;
                      })
                    : null}
            </div>
        );
    }
}

export default Chat;
