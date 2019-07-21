import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { cookiesHelpers } from 'helpers';

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => ((cookiesHelpers.getByName('accessToken') !== '') ?
      <Component {...props} /> :
      <Redirect to='/login' />
    )}
  />
)

// (cookiesHelpers.getByName('accessToken') !== ''