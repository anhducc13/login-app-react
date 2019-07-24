import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { cookiesHelpers } from 'helpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRouter = ({ component: Component, ...rest }) => {
  const hasSession = cookiesHelpers.getByName('access_token_cookie') !== '';
  return (
    <Route
      {...rest}
      render={(props) => hasSession ?
        <Component {...props} /> :
        (
          <>
            {toast.error("Expired session. Please login to continue!")}
            <Redirect to='/login' />
          </>
        )

      }
    />
  )
}

export default PrivateRouter;
