import React from "react";
import "./Message.css";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myMessageHeight: "32px",
            otherMessageHeight: "32px"
        }
        this.myMessage = React.createRef();
        this.otherMessage = React.createRef();
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if(this.myMessage.current !== null && this.myMessage.current.clientHeight !== null) {
                this.setState({
                    myMessageHeight: this.myMessage.current.clientHeight
                });
            }
            if(this.otherMessage.current !== null && this.otherMessage.current.clientHeight !== null) {
                this.setState({
                    otherMessageHeight: this.otherMessage.current.clientHeight
                });
            }
        }, 1);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        let message;
        if(this.props.myMessage === true) {
            message = (
                <div className="message" style={{height: this.state.myMessageHeight}}>
                    <Row justify="end">
                        <div className="message-bubble my-message-bubble" ref = {this.myMessage}>{this.props.message}</div>
                        <Col span={1} >
                            <Avatar className="my-avatar" shape="square" size={32} icon={<UserOutlined />} />
                        </Col>
                    </Row>
                </div>
            )
        } else {
            message = (
                <div className="message" style={{height: this.state.otherMessageHeight}}>
                    <Row>
                        <Col span={1}>
                            <Avatar shape="square" size={32} icon={<UserOutlined />} />
                        </Col>
                        <div className="message-bubble other-message-bubble" ref = {this.otherMessage}>{this.props.message}</div>
                    </Row>
                </div>
            )
        }
        return message;
    }
}

export default Message;
