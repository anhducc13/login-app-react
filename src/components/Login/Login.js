import React, { useState } from 'react';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RULES_USERNAME, RULES_PASSWORD } from 'constants/RuleValidators';

const { Password } = Input;


const Login = (props) => {
  const bodyLayout = {
    xs: { span: 22, offset: 1 },
    sm: { span: 16, offset: 4 },
    md: { span: 12, offset: 6 },
    lg: { span: 10, offset: 7 },
    xl: { span: 8, offset: 8},
    xxl: { span: 6, offset: 9},
  }
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, validateFields, resetFields } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        setLoading(true);
        const params = {
          "username": values.username,
          "password": values.password,
        }
        authServices.loginUser(params)
          .then(res => {
            setLoading(false);
            const {data} = res;
            toast.success(`Welcome back, ${data.username}!`);
            props.history.push('/');
          })
          .catch(err => {
            setLoading(false);
            switch (err) {
              case 400:
                resetFields();
                break;
              case 403:
                props.history.push('/403');
                break;
              case 404:
                props.history.push('/404');
                break;
              default:
                props.history.push('/500');
            }
          })
      }
    })
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
          <Form.Item label="Username">
            {getFieldDecorator('username', {
              rules: RULES_USERNAME,
              validateFirst: true,
              validateTrigger: null,
            })(
              <Input size="large" />
            )}
          </Form.Item>
          <Form.Item label="Password">
            {getFieldDecorator('password', {
              rules: RULES_PASSWORD,
              validateFirst: true,
              validateTrigger: null,
            })(
              <Password size="large" />
            )}
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

export default Form.create()(Login);
