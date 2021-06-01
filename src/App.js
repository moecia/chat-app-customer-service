import React from "react";
import "./App.css"
import MessageList from "./MessageList"
import ChatBox from "./ChatBox"
import Banner from "./Banner"
import { Layout } from "antd";
const { Sider, Content, Header } = Layout;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
        };
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    <Header><Banner></Banner></Header>
                    <Layout>
                    <Sider><MessageList unreadMessages={29} unreadUsers={20} /></Sider>
                    <Content><ChatBox username = "Luna" userTime="2021/05/06 15:20:00"/></Content>
                </Layout>
                </Layout>
            </div>
        );
    }
}

export default App;