import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { authServices } from 'services';

const PrivateRouter = ({ component: Component, ...rest }) => {
  const [hasSession, setHasSession] = useState(true);

  useEffect(() => {
    authServices.currentUser()
      .then(() => {})
      .catch(() => setHasSession(false))
  }, [])
  return (
    <Route
      {...rest}
      render={(props) => hasSession ?
        <Component {...props} /> :
        (
          <Redirect to='/login' />
        )

      }
    />
  )
}

export default PrivateRouter;

// (cookiesHelpers.getByName('accessToken') !== ''