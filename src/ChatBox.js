import React from "react";
import Message from "./Message"
import "./ChatBox.css";
import { Row, Col } from "antd";
import { Card } from "antd";
import { List, Typography, Divider } from "antd";
import { SmileOutlined, MessageOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Button } from 'antd';

const { TextArea } = Input;

const scripts = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
];

const quickReplies = [
    "Good good good!",
    "Good good good!",
    "Good good good!",
    "Good good good!",
    "Good good good!",
    "Good good good!",
    "Good good good!"
];

const onChange = e => {
    console.log('Change:', e.target.value);
  };

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            username: String,
            userTime: String,
        }
    }

    render() {
        return (
            <div className="chat-box">
                <Row className="user-information">
                    <Col span={6} className="username-display">{this.props.username}</Col>
                    <Col span={18} className="last-msg-time-display">{this.props.username}"s current time is {this.props.userTime}</Col>
                </Row>
                <Row className="message-area border">
                    <Col span={24}>
                        <Message myMessage={true}></Message>
                        <Message myMessage={false}></Message>
                        <Message myMessage={true}></Message>
                        <Message myMessage={true}></Message>
                    </Col>
                </Row>
                <Row className="quick-reply ">
                    <Col span={12}>
                        <List
                            header={<div><b>Script suggestions</b></div>}
                            bordered
                            dataSource={scripts}
                            renderItem={item => (
                                <List.Item className = "message-item">
                                    <Typography.Text mark></Typography.Text> {item}
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>
                        <List
                            header={<div><b>Quick replies</b></div>}
                            bordered
                            dataSource={quickReplies}
                            renderItem={item => (
                                <List.Item className = "message-item">
                                    <Typography.Text mark></Typography.Text> {item}
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
                <Row className = "tool-bar border">
                    <Col span={24}>
                        <Row>
                            <Col span={24} className = "tool-bar">
                                <SmileOutlined />
                                <MessageOutlined />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className = "reply-area border">
                    <Col span={24}>
                        <TextArea showCount maxLength={200} onChange={onChange} rows={8}/>
                        <div className="buttons">
                            <Button>End Chat</Button>
                            <Button>Send</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChatBox;