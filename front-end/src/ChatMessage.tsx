import React from 'react';
interface Props {
    name: string;
    message: string;
}
function ChatMessage(props: Props) {
    return (
        <p>
            <strong>{props.name}</strong> <em>{props.message}</em>
        </p>
    );
}
export default ChatMessage;
