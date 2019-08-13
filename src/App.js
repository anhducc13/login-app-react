import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.scss';
import CustomLoadable from 'utils/CustomLoadable';
import PrivateRouter from 'utils/PrivateRouter';
// import PageError from 'components/PageError';
import { toast } from 'react-toastify';
import { UserProvider } from 'UserContext';

toast.configure();

const browserHistory = createBrowserHistory();

const Login = CustomLoadable({
  loader: () => import('components/Login'),
})
const Register = CustomLoadable({
  loader: () => import('components/Register'),
})
const ForgotPassword = CustomLoadable({
  loader: () => import('components/ForgotPassword'),
})
const DefaultLayout = CustomLoadable({
  loader: () => import('components/DefaultLayout'),
})
const PageError = CustomLoadable({
  loader: () => import('components/PageError'),
})



function App() {
  return (
    <UserProvider>
      <Router history={browserHistory}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            component={Login}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            component={Register}
          />
          <Route
            exact
            path="/forgot-password"
            name="Forgot Password Page"
            component={ForgotPassword}
          />
          <Route
            exact
            path="/403"
            name="403 Page"
            render={() => <PageError status={403} title="403 Page" />}
          />
          <Route
            exact
            path="/404"
            name="404 Page"
            render={() => <PageError status={404} title="THE PAGE CAN'T BE FOUND" />}
          />
          <Route
            exact
            path="/500"
            name="500 Page"
            render={() => <PageError status={500} title="Internal Server Error" />}
          />
          <PrivateRouter
            path="/"
            name="Home"
            component={DefaultLayout}
          />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
