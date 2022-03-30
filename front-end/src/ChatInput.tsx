import React, { Component } from 'react';
import PropTypes from 'prop-types';
interface Props {
    onSubmitMessage: (message: string) => void;
    ws: WebSocket;
}
class ChatInput extends Component<Props> {
    static propTypes = {
        onSubmitMessage: PropTypes.func.isRequired
    };
    state = {
        message: ''
    };

    render() {
        return (
            <form
                action="."
                onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmitMessage(this.state.message);
                    this.setState({ message: '' });
                }}
            >
                <input
                    type="text"
                    placeholder={'Enter message...'}
                    value={this.state.message}
                    onChange={(e) => this.setState({ message: e.target.value })}
                />
                <input type="submit" value={'Send'} />
            </form>
        );
    }
}

export default ChatInput;
