import React, { useState, useContext } from 'react';
import {
  Form,
  Input,
  Button,
  Col,
  Row,
} from 'antd';
import { Link } from 'react-router-dom';
import './Login.scss';
import Title from 'antd/lib/typography/Title';
import { authServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import { UserContext } from 'UserContext';

const { Password } = Input;


const Login = (props) => {

  const bodyLayout = {
    xs: { span: 22, offset: 1 },
    sm: { span: 16, offset: 4 },
    md: { span: 12, offset: 6 },
    lg: { span: 10, offset: 7 },
    xl: { span: 8, offset: 8 },
    xxl: { span: 6, offset: 9 },
  }

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [helperUsername, setHelperUsername] = useState("")
  const [helperPassword, setHelperPassword] = useState("")
  const [errorText, setErrorText] = useState("")

  const [, setUser] = useContext(UserContext);

  const validateInput = () => {
    if (username === "")
      setHelperUsername("Please enter username");
    else
      setHelperUsername("");

    if (password === "")
      setHelperPassword("Please enter password")
    else
      setHelperPassword("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validateInput();
    setErrorText("")
    if (username !== "" && password !== "") {
      setLoading(true);
      const params = {
        "username": username,
        "password": password,
      }
      authServices.loginUser(params)
        .then(res => {
          setLoading(false);
          const { data } = res;
          setUser(data);
          openNotificationWithIcon('success', 'Success', `Welcome back, ${data.username}!`)
          props.history.push('/');
        })
        .catch(err => {
          setLoading(false);
          if (err && err.response) {
            const { status, data } = err.response;
            if (status === 400) {
              setErrorText(data.message)
              return;
            }
            if (status === 404) {
              props.history.push('/404');
              return;
            }
            if (status === 403) {
              if (data.message === "Account warning") {
                setErrorText("You enter wrong password 3 times. 5 times, account will be block")
                return;
              }
              setErrorText("Account has been block. Please try after")
              return;
            }
            if (status > 400 && status < 500) {
              props.history.push('/403');
              return;
            }
          }
          props.history.push('/500');
        })
    }
  }

  return (
    <div className="Login">
      <Col {...bodyLayout}>
        <Form className="form-box">
          <Title
            level={2}
            style={{
              padding: "5px",
              textAlign: "center"
            }}
          >
            Login
          </Title>
          <Title
            level={4}
            type="danger"
            style={{
              textAlign: "center"
            }}
          >
            {errorText}
          </Title>
          <Form.Item label="Username" help={helperUsername} validateStatus={helperUsername && "error"}>
            <Input size="large" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password" help={helperPassword} validateStatus={helperPassword && "error"}>
            <Password size="large" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Link to="/forgot-password">Forgot password?</Link>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
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
        </Form>
      </Col>
    </div>
  );
};


export default Login;
