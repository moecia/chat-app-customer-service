import React from 'react';
import './Banner.css'
import { Row, Col } from 'antd';
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from 'antd';
import { Checkbox } from 'antd';

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
        };
    }

    render() {
        function onChange(e) {
            console.log(`checked = ${e.target.checked}`);
          }

        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <Checkbox onChange={onChange}>Block incoming users</Checkbox>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">
                    <a href="">Logout</a>
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
                            <Avatar shape="square" size={48} icon={<UserOutlined />} />
                        </Dropdown>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Banner;