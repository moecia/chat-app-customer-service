import React from "react";
import "./Message.css";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            avatar: String,
            username: String,
            message: String,
            myMessage: true
        };
    }

    render() {
        let message;
        if(this.props.myMessage === true) {
            message = (
                <div className="my-message">
                    <Row justify="end">
                        <div className="message-bubble my-message-bubble">Test</div>
                        <Col span={1} >
                            <Avatar className="my-avatar" shape="square" size={32} icon={<UserOutlined />} />
                        </Col>
                    </Row>
                </div>
            )
        } else {
            message = (
                <div className="other-message">
                    <Row>
                        <Col span={1}>
                            <Avatar shape="square" size={32} icon={<UserOutlined />} />
                        </Col>
                        <div className="message-bubble other-message-bubble">Test</div>
                    </Row>
                </div>
            )
        }
        return message;
    }
}

export default Message;
