import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Col,
  Row,
} from 'antd';
import { Link } from 'react-router-dom';
import './Register.scss';
import Title from 'antd/lib/typography/Title';
import { authServices } from 'services';
import { validatorHelpers } from 'helpers';
import openNotificationWithIcon from 'helpers/notification';

const { Password } = Input;


const Register = (props) => {
  const bodyLayout = {
    xs: { span: 22, offset: 1 },
    sm: { span: 16, offset: 4 },
    md: { span: 12, offset: 6 },
    lg: { span: 10, offset: 7 },
    xl: { span: 8, offset: 8 },
    xxl: { span: 6, offset: 9 },
  }
  const [loading, setLoading] = useState(false);

  const initState = {
    value: "",
    helper: ""
  }

  const [email, setEmail] = useState(initState);
  const [username, setUsername] = useState(initState);
  const [password, setPassword] = useState(initState);
  const [repeatPassword, setRepeatPassword] = useState(initState);

  const [errorText, setErrorText] = useState("")

  const validateUsername = (value) => {
    const helper = validatorHelpers.validateUsername(value);
    setUsername({ value, helper })
  }

  const validateEmail = (value) => {
    const helper = validatorHelpers.validateEmail(value);
    setEmail({ value, helper })
  }

  const validatePassword = (value) => {
    const helper = validatorHelpers.validatePassword(value);
    setPassword({ value, helper })
  }

  const validateRepeatPassword = (value) => {
    const helper = value === password.value ? "" : "Password repeat is not match";
    setRepeatPassword({ value, helper })
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail(email.value);
    validateUsername(username.value);
    validatePassword(password.value)
    validateRepeatPassword(repeatPassword.value)

    const canNotSubmit = email.value === "" || email.helper !== ""
      || username.value === "" || username.helper !== ""
      || password.value === "" || password.helper !== ""
      || repeatPassword.value === "" || repeatPassword.helper !== "";
    if (canNotSubmit) {
      return;
    }
    setLoading(true);
    const params = {
      "username": username.value,
      "email": email.value,
      "password": password.value,
    }
    authServices.registerUser(params)
      .then(res => {
        setLoading(false);
        const { data } = res;
        openNotificationWithIcon('success', 'Success',
          `Please verify account in email ${data.email} to login system`)
        props.history.push('/login');
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
          if (status > 400 && status < 500) {
            props.history.push('/403');
            return;
          }
        }
        props.history.push('/500');
      })
  }



  return (
    <div className="Register">
      <Col {...bodyLayout}>
        <Form className="form-box">
          <Title
            level={2}
            style={{
              padding: "5px",
              textAlign: "center"
            }}
          >
            Register
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
          <Form.Item label="E-mail" help={email.helper} validateStatus={email.helper && "error"}>
            <Input size="large" name="email" onChange={e => validateEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Username" help={username.helper} validateStatus={username.helper && "error"}>
            <Input size="large" name="username" onChange={e => validateUsername(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password" help={password.helper} validateStatus={password.helper && "error"}>
            <Password size="large" name="password" onChange={e => validatePassword(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Repeat Password"
            help={repeatPassword.helper}
            validateStatus={repeatPassword.helper && "error"}
          >
            <Password size="large" name="repeat-password" onChange={e => validateRepeatPassword(e.target.value)} />
          </Form.Item>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Link to="/login">Have an account? Login</Link>
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default Register;
