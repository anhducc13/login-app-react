import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.scss';
import asyncComponent from "utils/asyncComponent";
import PrivateRouter from 'utils/PrivateRouter';
import PageError from 'components/PageError';
import { toast } from 'react-toastify';
import { UserProvider } from 'UserContext';

toast.configure();

const browserHistory = createBrowserHistory();

function App() {
  return (
    <UserProvider>
      <Router history={browserHistory}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            component={asyncComponent(() => import('components/Login'))}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            component={asyncComponent(() => import('components/Register'))}
          />
          <Route
            exact
            path="/forgot-password"
            name="Forgot Password Page"
            component={asyncComponent(() => import('components/ForgotPassword'))}
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
            component={asyncComponent(() => import('components/DefaultLayout'))}
          />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
