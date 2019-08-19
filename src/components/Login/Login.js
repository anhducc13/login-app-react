import React, { useState, useContext } from 'react';
import { Form, Input, Alert, Button, Col, Row, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './Login.scss';
import Title from 'antd/lib/typography/Title';
import { authServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import { UserContext } from 'UserContext';
import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const { Password } = Input;

const Login = props => {
  const bodyLayout = {
    xs: { span: 22, offset: 1 },
    sm: { span: 16, offset: 4 },
    md: { span: 12, offset: 6 },
    lg: { span: 10, offset: 7 },
    xl: { span: 8, offset: 8 },
    xxl: { span: 6, offset: 9 },
  };

  const [state, setState] = useState({
    username: '',
    helperUsername: '',
    password: '',
    helperPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [, setUser] = useContext(UserContext);

  const validateInput = () => {
    let { helperUsername, helperPassword } = state;
    if (state.username === '') helperUsername = 'Please enter username';
    else helperUsername = '';

    if (state.password === '') helperPassword = 'Please enter password';
    else helperPassword = '';

    setState({
      ...state,
      helperUsername,
      helperPassword,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    validateInput();
    setErrorText('');
    if (state.username !== '' && state.password !== '') {
      setLoading(true);
      const params = {
        username: state.username,
        password: state.password,
      };
      authServices
        .loginUser(params)
        .then(data => {
          setLoading(false);
          setUser(data);
          openNotificationWithIcon('success', 'Success', `Welcome back, ${data.username}!`);
          props.history.push('/');
        })
        .catch(err => {
          setLoading(false);
          if (err && err.response) {
            const { status, data } = err.response;
            if (status === 400) {
              setErrorText(data.message);
              return;
            }
            if (status === 404) {
              props.history.push('/404');
              return;
            }
            if (status === 403) {
              if (data.message === 'Account warning') {
                setErrorText(data.message);
                return;
              }
              setErrorText('Account has been block. Please try after');
              return;
            }
            if (status > 400 && status < 500) {
              props.history.push('/403');
              return;
            }
          }
          props.history.push('/500');
        });
    }
  };

  const handleLoginGoogle = res => {
    const params = {
      tokenId: `${res.tokenId}`,
    };
    authServices
      .loginGoogle(params)
      .then(data => {
        setUser(data);
        openNotificationWithIcon('success', 'Success', `Welcome back, ${data.username}!`);
        props.history.push('/');
      })
      .catch(err => {
        if (err && err.response) {
          const { status, data } = err.response;
          if (status === 400) {
            setErrorText(data.message);
            return;
          }
          if (status === 404) {
            props.history.push('/404');
            return;
          }
          if (status === 403) {
            setErrorText(data.message);
            return;
          }
          if (status > 400 && status < 500) {
            props.history.push('/403');
            return;
          }
        }
        props.history.push('/500');
      });
  };

  return (
    <div className="Login">
      <Col {...bodyLayout}>
        <Form className="form-box">
          <Title
            level={2}
            style={{
              padding: '5px',
              textAlign: 'center',
            }}
          >
            Login
          </Title>
          {errorText && <Alert message={errorText} type="error" closable showIcon />}
          <Form.Item label="Username" help={state.helperUsername} validateStatus={state.helperUsername && 'error'}>
            <Input
              size="large"
              name="username"
              value={state.username}
              onChange={e =>
                setState({
                  ...state,
                  username: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Password" help={state.helperPassword} validateStatus={state.helperPassword && 'error'}>
            <Password
              size="large"
              name="password"
              value={state.password}
              onChange={e =>
                setState({
                  ...state,
                  password: e.target.value,
                })
              }
            />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Link to="/forgot-password">Forgot password?</Link>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Link to="/register">Don't have an account?</Link>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              onClick={handleSubmit}
              size="large"
              style={{
                marginTop: 10,
              }}
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="social-divider">
              <span>or</span>
            </div>
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE || ''}
              onSuccess={handleLoginGoogle}
              onFailure={err => console.log(err)}
              cookiePolicy="single_host_origin"
              render={renderProps => (
                <Button
                  block
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  size="large"
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Icon type="google" style={{ color: '#FF7255', fontSize: 20 }} />
                  Login with Google
                </Button>
              )}
            />
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default Login;
