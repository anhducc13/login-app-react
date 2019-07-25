import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { cookiesHelpers } from 'helpers';
import openNotificationWithIcon from 'helpers/notification';

const PrivateRouter = ({ component: Component, ...rest }) => {
  const hasSession = cookiesHelpers.getByName('access_token_cookie') !== '';
  return (
    <Route
      {...rest}
      render={(props) => hasSession ?
        <Component {...props} /> :
        (
          <>
            {openNotificationWithIcon('error', 'Error', 'Expired session. Please login to continue!')}
            <Redirect to='/login' />
          </>
        )

      }
    />
  )
}

export default PrivateRouter;
