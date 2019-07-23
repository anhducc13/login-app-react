import React from 'react';
import { Layout, Icon, Dropdown, Menu, Avatar, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './CustomHeader.scss';

import { authServices } from 'services';
import { toast } from 'react-toastify';


const { Header } = Layout;
const { confirm } = Modal;

const CustomHeader = (props) => {
  const { isCollapse, collapseSider, currentUser } = props;

  const handleLogout = () => {
    confirm({
      title: 'Do you Want Logout User?',
      content: 'Click Cancel to back',
      onOk() {
        authServices.logoutUser()
          .then(() => {
            toast.success(`Logout success. Goodbye!!!`);
            props.history.push('/login');
          })
          .catch((err) => {
            switch (err) {
              case 403:
                props.history.push('/403');
                break;
              case 404:
                props.history.push('/404');
                break;
              default:
                props.history.push('/500');
            }
          })
      },
    });
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">
          <Icon type="user" />
          <span>Profile</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        <Icon type="logout" />
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: '#fff', padding: 0, width: '100%' }}>
      <Icon
        className="trigger"
        type={isCollapse ? 'menu-fold' : 'menu-unfold'}
        onClick={collapseSider}
      />

      <Dropdown overlay={menu} trigger={['click']}>
        <span
          style={{
            cursor: "pointer",
            float: "right",
            marginRight: 20
          }}
        >
          <Avatar src="https://image2.tienphong.vn/w665/Uploaded/2019/pcgycivo/2019_04_19/1_bqtz.jpg" />
          {'  '}
          <span
            style={{
              color: '#4285F4',
            }}
          >
            Ductt
          </span>
        </span>
      </Dropdown>
    </Header>
  )
}

export default CustomHeader;