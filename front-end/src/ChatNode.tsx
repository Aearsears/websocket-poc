import React, { Component } from 'react';
import './ChatNode.css';

interface Props {
    name: string;
}
class ChatNode extends Component<Props> {
    render() {
        return (
            <div className="container">
                <div className="node">{this.props.name}</div>
                <div className="node">Server</div>
            </div>
        );
    }
}

export default ChatNode;
