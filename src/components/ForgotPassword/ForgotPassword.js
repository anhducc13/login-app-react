import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Alert,
  Col,
  Row,
} from 'antd';
import { Link } from 'react-router-dom';
import './ForgotPassword.scss';
import Title from 'antd/lib/typography/Title';
import { authServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';


const ForgotPassword = (props) => {
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
  const [email, setEmail] = useState("")
  const [helperUsername, setHelperUsername] = useState("")
  const [helperEmail, setHelperEmail] = useState("")
  const [errorText, setErrorText] = useState("")

  const validateInput = () => {
    if (username === "")
      setHelperUsername("Please enter username");
    else
      setHelperUsername("");

    if (email === "")
      setHelperEmail("Please enter email")
    else
      setHelperEmail("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validateInput();
    setErrorText("");
    if (username !== "" && email !== "") {
      const params = {
        "username": username,
        "email": email,
      }
      authServices.forgotPasswordUser(params)
        .then(() => {
          setLoading(false);
          openNotificationWithIcon('success', 'Success',
            `Please check email ${email} to receive new password`)
          props.history.push('/login');
        })
        .catch(err => {
          setLoading(false);
          if (err && err.response) {
            const { status, data } = err.response;
            if (status >= 400 && status < 500) {
              setErrorText(data.message)
              return;
            }
          }
          props.history.push('/500');
        })
    }
  }



  return (
    <div className="ForgotPass">
      <Col {...bodyLayout}>
        <Form className="form-box">
          <Title
            level={2}
            style={{
              padding: "5px",
              textAlign: "center"
            }}
          >
            Forgot Password
          </Title>
          {errorText && (
            <Alert
              message={errorText}
              type="error"
              closable
              showIcon
            />
          )}
          <Form.Item label="E-mail" help={helperEmail} validateStatus={helperEmail && "error"}>
            <Input size="large" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Username" help={helperUsername} validateStatus={helperUsername && "error"}>
            <Input size="large" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Link to="/login">Back to login page?</Link>
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default ForgotPassword;
