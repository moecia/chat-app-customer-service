import React from 'react';
import './Banner.css'
import { Row, Col } from 'antd';
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from 'antd';
import { Checkbox } from 'antd';
import { Badge } from 'antd';
import { Modal } from 'antd';

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blockIncomingUser: false,
            isModelVisible: false
        };
    }

    onChange = e => {
        this.setState({ blockIncomingUser: e.target.checked });
    };


    logout() {
        if(this.props.unreadMessageCount === 0) {
            window.open("/logout", "_self");
        } else {
            this.setModelVisibility(true);
        }
    }

    setModelVisibility(isModelVisible) {
        this.setState({ isModelVisible: isModelVisible });
    }

    handleOk() {
        this.setModelVisibility(false);
        window.open("/logout", "_self");
    };
    
    handleCancel() {
        this.setModelVisibility(false);
    };

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <Checkbox onChange={this.onChange}>Block incoming users</Checkbox>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">
                    <p onClick={() => this.logout()}>Logout</p>
                </Menu.Item>
            </Menu>
        )

        return (
            <div className="banner">
                <Row align="">
                    <Col span={4} className="logo-area">
                        TATA LOGO
                    </Col>
                    <Col span={1} offset={19} className="avatar-area">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Badge status={this.state.blockIncomingUser === true ? "warning" : "success"}>
                                <Avatar shape="square" size={48} icon={<UserOutlined />} />
                            </Badge>
                        </Dropdown>
                    </Col>
                </Row>
                <Modal title="Warning" visible={this.state.isModelVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()} okText="Yes">
                    You have {this.props.unreadMessageCount} unread messages from {this.props.unreadUsersCount}. Logging out will automatically end your chats with all users. Confirm logging out? 
                </Modal>
            </div>
        );
    }
}

export default Banner;