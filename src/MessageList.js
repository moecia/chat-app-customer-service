import React from "react";
import "./MessageList.css";
import UnreadMessage from "./UnreadMessage.js"
import { Row, Col } from "antd";

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            unreadUsers: Number,
            unreadMessages: Number,
        };
    }

    render() {
        return (
            <div className="message-list">
                <Row>
                    <Col span={23} offset={1}>
                        <p>Unread msgs: {this.props.unreadMessages} from {this.props.unreadUsers} users</p>
                    </Col>
                </Row>
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
                <UnreadMessage userName="Luna" lastMessageTime="09:30" lastMessage="Message Message..." />
            </div>
        );
    }
}

export default MessageList;