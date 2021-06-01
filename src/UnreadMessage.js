import React from "react";
import "./UnreadMessage.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { Card } from "antd";

class UnreadMessage extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            avatarUrl: String,
            userName: String,
            lastMessage: String,
            lastMessageTime: String
        };
    }

    onMessageClicked() {
        alert("Clicked");
    }

    render() {
        return (
            <div className="unread-message" onClick={() => this.onMessageClicked()}>
                <Card>
                <Row>
                    <Col span={2}>
                        <Avatar shape="square" size={32} icon={<UserOutlined />} />
                    </Col>
                    <Col span={18} offset={4}>
                        <row>
                            <Col span={24}>{this.props.userName} {this.props.lastMessageTime}</Col>
                        </row>
                        <row>
                            <Col span={24}>{this.props.lastMessage}</Col>
                        </row>
                    </Col>
                </Row>
                </Card>
            </div>
        );
    }
}

export default UnreadMessage;