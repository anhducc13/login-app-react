import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './CustomSider.scss';


const { Sider } = Layout;

const CustomSider = ({ collapse }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapse}
      theme="light"
    >
      <div className="logo">
        <h3>DUCTT</h3>
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/home">
            <Icon type="home" />
            <span>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/list-user">
            <Icon type="user" />
            <span>User</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/list-category">
            <Icon type="folder" />
            <span>Category</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/list-book">
            <Icon type="book" />
            <span>Book</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default CustomSider;