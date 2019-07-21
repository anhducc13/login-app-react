import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Modal } from 'antd';
import routes from 'routes';
import { authServices } from 'services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const { Header, Content, Footer } = Layout;
const { confirm } = Modal;

export default (props) => {

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
            if(err === 403) {
              props.history.push('/403');
            }
            if(err === 404) {
              props.history.push('/404');
            } 
            props.history.push('/500');
          })
      },
    });
  }

  return (
    <>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/list-user">User</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/book">Book</Link></Menu.Item>
            <Menu.SubMenu
              style={{ float: "right" }}
              key="sub4-5"
              title={<span><Icon type="user" style={{ fontSize: 25 }} /></span>}
            >
              <Menu.Item key="4"><Link to="/update-password">Update Password</Link></Menu.Item>
              <Menu.Item key="5" onClick={handleLogout}>Logout</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64, minHeight: '80vh' }}>
          <Switch>
            {routes.map(route =>
              route.component ? (
                <Route
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  component={route.component}
                />
              ) : null,
            )}
            <Redirect from="/" to="/" />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ductt ©2019 UET</Footer>
      </Layout>

    </>
  );
};
