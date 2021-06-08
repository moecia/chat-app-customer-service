import React from "react";
import "./App.css"
import ChatBox from "./ChatBox"
import Banner from "./Banner"
import UnreadMessage from "./UnreadMessage.js"
import { Layout } from "antd";
import { Row, Col } from "antd";
const { Sider, Content, Header } = Layout;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            unreadMessages: [],
            readMessages: [],
            currentSelected: null
        };
        this.chatBox = React.createRef();
        this.banner = React.createRef();
        setInterval(() => {
            if(!this.banner.current?.state.blockIncomingUser) {
                this.updateUnreadMessageList();
            }
        }, 5000);
    }

    componentDidMount() {
        this.updateUnreadMessageList();
        
    }

    onMessageClicked(messageDetails) { 
        this.setState({ currentSelected: messageDetails });
        this.changeColor(messageDetails);
        if(this.chatBox.current !== null) {
            this.chatBox.current.updateBox(messageDetails.username,
                messageDetails.lastMessageTime,
                messageDetails.userContent);
        }
    }

    changeColor(messageDetails) {
        const isUnreadList = messageDetails.isUnreadList;
        let readMessages = this.state.readMessages;
        let unreadMessages = this.state.unreadMessages;

        let messages = isUnreadList ? unreadMessages : readMessages;
        messages.forEach(message => {
            if(messageDetails.username === message.username) {
                message.messageElement = this.buildMessageElement(message, "gray", isUnreadList);
            } else {
                message.messageElement = this.buildMessageElement(message, "white", isUnreadList);
            }
        });

        if(isUnreadList) {
            unreadMessages = messages;
            readMessages.forEach(x => x.messageElement = this.buildMessageElement(x, "white", false));
        } else {
            readMessages = messages;
            unreadMessages.forEach(x => x.messageElement = this.buildMessageElement(x, "white", true));
        }

        this.setState({
            unreadMessages: unreadMessages,
            readMessages: readMessages
        });
    }

    buildMessageElement(message, bgColor, isUnreadList) {
        return (<UnreadMessage
            fullUsername={message.username}
            username={message.messageElement.props.username}
            lastMessageTime={message.lastMessageTime}
            lastMessage={message.messageElement.props.lastMessage}
            userContent={message.userContent}
            onClick={() => this.onMessageClicked({
                username: message.username,
                lastMessageTime: message.lastMessageTime,
                userContent: message.userContent,
                isUnreadList: isUnreadList
            })}
            bgColor={bgColor}
            key={message.username} />);
    }

    onMessageSent(username) {
        let unreadMsgs = this.state.unreadMessages;
        let readMsgs = this.state.readMessages;
        unreadMsgs.forEach(msg => {
            if(msg.username === username) {
                unreadMsgs = unreadMsgs.filter(item => item.username !== msg.username);
                readMsgs.push(msg);
            }
        });
        this.setState({
            unreadMessages: unreadMsgs,
            readMessages: readMsgs
        })
        this.updateReadMessageList(); 
    }

    updateReadMessageList() {
        let counter = 0;
        let currentUsername = "";
        let currentContent = "";
        let readMessages = [];
        const totalRead = this.state.readMessages.length;

        this.state.readMessages.forEach(readMessage => {
            let lastMessageUrl = "http://44.233.224.103/ipname/" + readMessage.userContent + "/last_message";
            fetch(lastMessageUrl, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json"
                }
            }).then(response => response.json())
                .then(results => {
                    currentUsername = readMessage.username;
                    currentContent = readMessage.userContent;
                    // Last message received time
                    let rawTime = results.timestamp.split(":");
                    let formatTime = rawTime[0] + ":" + rawTime[1];
                    // Last message
                    let last_message = results.last_message;
                    let message = last_message.substring(last_message.lastIndexOf(":") + 1, last_message.length);
                    // Process message html element
                    const messageElement = (<UnreadMessage
                        username={currentUsername.length > 12 ? currentUsername.substring(0, 12) + "..." : currentUsername}
                        lastMessageTime={formatTime}
                        lastMessage={message?.length > 25 ? message.substring(0, 25) + "..." : message}
                        onClick={() => this.onMessageClicked({
                            username: currentUsername, 
                            lastMessageTime: formatTime,
                            userContent: currentContent, 
                            isUnreadList: false
                        })}
                        bgColor="white"
                        key={currentUsername} />);
                    readMessages.push({
                        messageElement: messageElement,
                        username: currentUsername,
                        userContent: currentContent,
                        lastMessage: message,
                        lastMessageDate: results.date,
                        lastMessageTime: formatTime,
                        lastMessageDateTime: results.date + " " + formatTime,
                    });
                    counter++;
                }).then(() => {
                    // Proceed messages when all unread messages are fetched.
                    if(counter === totalRead) {
                        readMessages = readMessages.sort((a,b) => {
                            if(a.lastMessageDateTime > b.lastMessageDateTime) {
                                return -1;
                            } 
                            if (a.lastMessageDateTime < b.lastMessageDateTime) {
                                return 1;
                            }
                            return 0;
                        });
                        this.setState({ readMessages: readMessages });
                        let defaultSelect = {
                            username: readMessages[0].username, 
                            lastMessageTime: readMessages[0].lastMessage,
                            userContent: readMessages[0].userContent, 
                            isUnreadList: false
                        };
                        this.onMessageClicked(this.state.currentSelected === null ? defaultSelect : this.state.currentSelected);
                    }
                });
        });
    }

    updateUnreadMessageList() {
        let unreadMessages = [];
        let currentUsername = "";
        let currentContent = "";
        let counter = 0;
        let totalUnread = 0;
   
        const unreadUserUrl = "http://44.233.224.103/master/raw";
        fetch(unreadUserUrl, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            }
        }).then(response => response.json())
            .then(results => {
                let content = [];
                // TODO: Remove this testuser
                content.push("izuku/123\n");
                totalUnread = results.content.length;
                results.content.forEach(result => {
                    let lastMessageUrl = "http://44.233.224.103/ipname/" + result.replace("\n", "") + "/last_message";
                    fetch(lastMessageUrl, {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            "Accept": "application/json"
                        }
                    }).then(response => response.json())
                        .then(results => {
                            currentUsername = result.replace("\n", "").split("/")[1];
                            currentContent = result.replace("\n", "");
                            // Last message received time
                            let rawTime = results.timestamp.split(":");
                            let formatTime = rawTime[0] + ":" + rawTime[1];
                            // Last message
                            let last_message = results.last_message;
                            let message = last_message.substring(last_message.lastIndexOf(":") + 1, last_message.length);
                            // Process message html element
                            const messageElement = (<UnreadMessage
                                username={currentUsername.length > 12 ? currentUsername.substring(0, 12) + "..." : currentUsername}
                                lastMessageTime={formatTime}
                                lastMessage={message?.length > 25 ? message.substring(0, 25) + "..." : message}
                                onClick={() => this.onMessageClicked({
                                    username: currentUsername, 
                                    lastMessageTime: formatTime,
                                    userContent: currentContent, 
                                    isUnreadList: true
                                })}
                                bgColor="white"
                                key={currentUsername} />);
                            unreadMessages.push({
                                messageElement: messageElement,
                                username: currentUsername,
                                userContent: currentContent,
                                lastMessage: message,
                                lastMessageDate: results.date,
                                lastMessageTime: formatTime,
                                lastMessageDateTime: results.date + " " + formatTime,
                            });
                            counter++;
                        }).then(() => {
                            // Proceed messages when all unread messages are fetched.
                            if(counter === totalUnread) {
                                unreadMessages = unreadMessages.sort((a,b) => {
                                    if(a.lastMessageDateTime > b.lastMessageDateTime) {
                                        return -1;
                                    } 
                                    if (a.lastMessageDateTime < b.lastMessageDateTime) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                this.setState({ unreadMessages: unreadMessages });
                                let defaultSelect = {
                                    username: unreadMessages[0].username, 
                                    lastMessageTime: unreadMessages[0].lastMessage,
                                    userContent: unreadMessages[0].userContent, 
                                    isUnreadList: true
                                };
                                this.onMessageClicked(this.state.currentSelected === null ? defaultSelect : this.state.currentSelected);
                            }
                            // Remove message from Read list if it becomes unread.
                            let readMsgs = this.state.readMessages;
                            readMsgs.forEach(msg => {
                                if(this.state.unreadMessages.find(x => x.username === msg.username)) {
                                    readMsgs = readMsgs.filter(item => item.username !== msg.username);
                                }
                            });
                            this.setState({ readMessages: readMsgs });
                            const readMsgsElements = this.state.readMessages.map(x => x.messageElement);
                            this.setState({ readMessageElements: readMsgsElements });
                        });
                });
            });
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    <Header>
                        <Banner 
                            unreadMessageCount={this.state.unreadMessages.length}
                            unreadUsersCount={this.state.unreadMessages.length}
                            ref={this.banner}></Banner>
                    </Header>
                    <Layout>
                        <Sider>
                            <div className="message-list">
                                <Row>
                                    <Col span={23} offset={1}>
                                        <p>Unread msgs: {this.state.unreadMessages.length} from {this.state.unreadMessages.length} users</p>
                                    </Col>
                                </Row>
                                {this.state.unreadMessages.map(x => x.messageElement)}
                            </div>
                            <div className="message-list">
                                <Row className="read-message">
                                    <Col span={23} offset={1}>
                                        <p>Read Messages</p>
                                    </Col>
                                </Row>
                                {this.state.readMessages.map(x => x.messageElement)}
                            </div>
                        </Sider>
                        <Content>
                            <ChatBox ref={this.chatBox} onMessageSent = {this.onMessageSent.bind(this)}/>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default App;