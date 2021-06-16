import React from "react";
import Message from "./Message"
import "./ChatBox.css";
import { Row, Col } from "antd";
import { List } from "antd";
import { SmileOutlined, MessageOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Button } from "antd";

const { TextArea } = Input;

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: String,
            userTime: String,
            userContent: String,
            textValue: "",
            messages: [],
            scripts: [],
            quickReplies: []
        }
        //this.dealer = new WebSocket("ws://44.233.224.103:8765");
        //this.dealer.onopen = function(event) {
        //    console.log("WS Opened.");
        //}
    }


    updateBox(username, userTime, userContent) {
        let prevMessageCount = this.state.messages?.length;
        let currMessageCount = 0;
        const messages = [];
        const scripts= [];
        const quickReplies = [];
        const userContentUrl = "http://44.233.224.103/admin/ipname/" + userContent + "/get_content";
        fetch(userContentUrl, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            }
        }).then(response => response.json())
            .then(results => {
                let count = 0;
                results.post_raw.forEach(post => {
                    const line = post.substring(post.lastIndexOf(":") + 2, post.length - 1);
                    if(post.includes("user:") === true) {
                        messages.push(<Message message={line} myMessage={false} key={`userline${count}`}/>);
                    } else if(post.includes("bot:")  === true) {
                        messages.push(<Message message={line} myMessage={true} key={`usline${count}`}/>);
                    }
                    count++;
                });
                results.propose_raw.forEach(propose => {
                    if(propose.startsWith("0,0")) {
                        quickReplies.push(propose);
                    } else {
                        scripts.push(propose);
                    }
                })
            }).catch(function (e) {
                console.log("fetch fail");
            }).then(() => {
                const today = new Date();
                const time = this.formatTime(today.getHours()) + ":" + this.formatTime(today.getMinutes());
                this.setState({
                    username: username,
                    userTime: time,
                    userContent: userContent,
                    messages: messages.reverse(),
                    scripts: scripts,
                    quickReplies: quickReplies
                });
                currMessageCount = this.state.messages.length;
                // Scroll to the bottom if new chatbox is loaded or received new message.
                if(prevMessageCount !== currMessageCount) {
                    this.scrollToTheBottom();
                }
            });
    }

    formatTime(time) {
        return (time < 10 ? "0" : "") + time;
    }
    
    scrollToTheBottom() {
        var element = document.getElementById("message-area");
        element.scrollTop = element.scrollHeight;
    }

    onChange = e => {
        this.setState({
            textValue: e.target.value
        });
    };

    processSubmit = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("post", `http://44.233.224.103/admin/ipname/${this.state.userContent}`);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //this.dealer.send(`${this.state.userContent} admin_post_message ${this.state.textValue}`);  
        xhr.send(`content=${this.state.textValue}&disable=&bt1`);
        this.updateBox(this.state.username, "", this.state.userContent);
        this.setState({
            textValue: ""
        });
        this.props.onMessageSent(this.state.username);
    }

    processEndChat = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("post", `http://44.233.224.103/admin/ipname/${this.state.userContent}/end_chat`);
        xhr.send();
    }

    render() {
        return (
            <div className="chat-box">
                <Row className="user-information">
                    <Col span={6} className="username-display">{this.state.username}</Col>
                    <Col span={18} className="last-msg-time-display">{this.state.username}"s current time is {this.state.userTime}</Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <Row className="message-area border" id="message-area" >
                            <Col span={24}>
                                {this.state.messages}
                            </Col>
                        </Row>
                        <Row className="tool-bar border">
                            <Col span={24}>
                                <Row>
                                    <Col span={24} className="tool-bar">
                                        <SmileOutlined />
                                        <MessageOutlined />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="reply-area border">
                            <Col span={24}>
                                <TextArea showCount maxLength={200} rows={4} value={this.state.textValue} onChange={this.onChange} />
                                <div className="buttons">
                                    <Button onClick={ this.processEndChat }>End Chat</Button>
                                    <Button onClick={ this.processSubmit }>Send</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row className="quick-reply">
                            <Col span={24}>
                                <List
                                    header={<div><b>Script suggestions</b></div>}
                                    bordered
                                    dataSource={this.state.scripts}
                                    renderItem={item => (
                                        <List.Item className="message-item"
                                            onClick={() => { this.setState({ textValue: item }) }}
                                            key={item}>{item}</List.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className="quick-reply">
                            <Col span={24}>
                                <List
                                    header={<div><b>Quick replies</b></div>}
                                    bordered
                                    dataSource={this.state.quickReplies}
                                    renderItem={item => (
                                        <List.Item className="message-item"
                                            onClick={() => { this.setState({ textValue: item }) }}
                                            key={item}>{item}</List.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChatBox;
