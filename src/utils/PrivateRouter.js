import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { authServices } from 'services';
import { UserContext } from 'UserContext';

const PrivateRouter = ({ component: Component, ...rest }) => {
  const [user, setUser] = useContext(UserContext);

  async function fetchUser() {
    // try {
      const response = await authServices.currentUser()
      const res = response.data
      return res
    // } catch(err) {
    //   setUser(null)
    // }
  }
  useEffect(() => {
    setUser(fetchUser());
  }, [user])

  return (
    <Route
      {...rest}
      render={(props) => user ?
        <Component {...props} /> :
        (
          <Redirect to='/login' />
        )

      }
    />
  )
}

export default PrivateRouter;
