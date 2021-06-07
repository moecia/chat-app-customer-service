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
            unreadMessageElements: [],
            currentSelected: -1
        };
        this.chatBox = React.createRef();
        this.banner = React.createRef();
        setInterval(() => {
            if(!this.banner.current?.state.blockIncomingUser) {
                this.updateMessageList();
            }
        }, 5000);
    }

    componentDidMount() {
        this.updateMessageList();
    }

    onMessageClicked(i) { 
        this.setState({ currentSelected: i });
        this.changeColor(i);
        if(this.chatBox.current !== null) {
            this.chatBox.current.updateBox(this.state.unreadMessages[i].username,
                this.state.unreadMessages[i].lastMessageTime,
                this.state.unreadMessages[i].userContent);
        }
    }

    changeColor(i) {
        const messages = this.state.unreadMessageElements;
        this.setState({
            unreadMessageElements: []
        });
        const msgs = []
        for(let j = 0; j < messages.length; ++j) {
            const username = messages[j].props.username;
            const lastMessageTime = messages[j].props.lastMessageTime;
            const lastMessage = messages[j].props.lastMessage;
            const isRead = messages[j].props.isRead;    
            if(j === i) {
                msgs.push(<UnreadMessage
                    username={username}
                    lastMessageTime={lastMessageTime}
                    lastMessage= {lastMessage}
                    isRead = {isRead}
                    onClick={()=>this.onMessageClicked(j)}
                    bgColor="rgb(188, 188, 188)"/>);
            } else {
                msgs.push(<UnreadMessage
                    username={username}
                    lastMessageTime={lastMessageTime}
                    lastMessage= {lastMessage}
                    isRead = {isRead}
                    onClick={()=>this.onMessageClicked(j)}
                    bgColor="white"/>);
            }
        }
        this.setState({
            unreadMessageElements: msgs
        });
    }

    updateMessageList() {
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
                            // Read status
                            let isRead = results.bold === 1 ? true : false;
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
                                isRead={isRead}
                                onClick={() => this.onMessageClicked(counter)}
                                bgColor="white"
                                key={`${currentUsername}_${counter}`} />);
                            unreadMessages.push({
                                messageElement: messageElement,
                                username: currentUsername,
                                userContent: currentContent,
                                lastMessage: message,
                                lastMessageDate: results.date,
                                lastMessageTime: formatTime,
                                lastMessageDateTime: results.date + " " + formatTime,
                                readStatus: isRead
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
                                const unreadElements = [];
                                unreadMessages.forEach(unreadMessage => unreadElements.push(unreadMessage.messageElement));
                                this.setState({
                                    unreadMessages: unreadMessages,
                                    unreadMessageElements: unreadElements
                                });
                                this.onMessageClicked(this.state.currentSelected === -1 ? 0 : this.state.currentSelected);
                            }
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
                                {this.state.unreadMessageElements}
                            </div>
                        </Sider>
                        <Content>
                            <ChatBox ref={this.chatBox} updateMessageList = {this.updateMessageList.bind(this)}/>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default App;