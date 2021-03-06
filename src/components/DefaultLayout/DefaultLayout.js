import React, { useState } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import routes from 'routes';
import CustomSider from 'components/CustomSider';
import CustomHeader from 'components/CustomHeader';
import PrivateRouter from 'utils/PrivateRouter';

const { Content, Footer } = Layout;

const DefaultLayout = (props) => {

  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <Layout>
        <CustomSider collapse={collapse} {...props} />
        <Layout>
          <CustomHeader
            isCollapse={collapse}
            collapseSider={() => setCollapse(!collapse)}
            {...props} 
          />
          <Content style={{ padding: '0 50px', marginTop: 64, minHeight: '80vh' }}>
            <Switch>
              {routes.map(route =>
                route.component ? (
                  <PrivateRouter
                    key={route.name}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    component={route.component}
                  />
                ) : null,
              )}
              <Redirect from="/" to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ductt ©2019 UET</Footer>
        </Layout>
      </Layout>

    </>
  );
};

export default DefaultLayout;