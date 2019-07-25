import React, { useContext } from 'react';
import { Layout, Icon, Dropdown, Menu, Avatar, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './CustomHeader.scss';
import { UserContext } from 'UserContext';
import openNotificationWithIcon from 'helpers/notification';
import { authServices } from 'services';


const { Header } = Layout;
const { confirm } = Modal;

const CustomHeader = (props) => {
  const { isCollapse, collapseSider } = props;
  const [user, setUser] = useContext(UserContext);

  const handleLogout = () => {
    confirm({
      title: 'Do you Want Logout User?',
      content: 'Click Cancel to back',
      onOk() {
        authServices.logoutUser()
          .then(() => {
            setUser(null);
            openNotificationWithIcon('success', 'Success', `Logout success. Goodbye!!!`)
            props.history.push('/login');
          })
          .catch((err) => {
            if(err && err.response) {
              const { status, data } = err.response;
              if(status === 404) {
                props.history.push('/404');
                return;
              } 
              if (status > 400 && status < 500) {
                openNotificationWithIcon('error', 'Error', data.message)
                props.history.push('/403');
                return;
              }
            }
            props.history.push('/500');
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
            {user && user.username}
          </span>
        </span>
      </Dropdown>
    </Header>
  )
}

export default CustomHeader;