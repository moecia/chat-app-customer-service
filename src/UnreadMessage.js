import React from "react";
import "./UnreadMessage.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

class UnreadMessage extends React.Component {
    render() {
        return (
            <div className="unread-message" onClick={this.props.onClick} style={{backgroundColor: this.props.bgColor}}>
                <Row>
                    <Col span={2}>
                        <Avatar shape="square" size={32} icon={<UserOutlined />} />
                    </Col>
                    <Col span={18} offset={4}>
                        <Row>
                            <Col span={12}><span>{this.props.username}</span></Col>
                            <Col span={7} offset={5}><span>{this.props.lastMessageTime}</span></Col>
                        </Row>
                        <Row>
                            <Col span={24}><span>{this.props.lastMessage}</span></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default UnreadMessage;