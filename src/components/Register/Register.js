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
import { RULES_EMAIL, RULES_USERNAME, RULES_PASSWORD } from 'constants/RuleValidators';
import { authServices } from 'services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Password } = Input;


const Register = (props) => {
  const bodyLayout = {
    xs: { span: 22, offset: 1 },
    sm: { span: 16, offset: 4 },
    md: { span: 12, offset: 6 },
    lg: { span: 10, offset: 7 }
  }
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, getFieldValue, validateFields, resetFields } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        setLoading(true);
        const params = {
          "username": values.username,
          "email": values.email,
          "password": values.password,
        }
        authServices.registerUser(params)
          .then(res => {
            setLoading(false);
            const data = res.data;
            toast.success(`Please verify account in email ${data.email} to login system`);
            props.history.push('/login');
          })
          .catch(err => {
            setLoading(false);
            if(err === 400) {
              resetFields();
              return;
            }
            if(err === 404) {
              props.history.push('/404');
            } 
            props.history.push('/500');
          })
      }
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
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: RULES_EMAIL,
              validateFirst: true,
              validateTrigger: null,
            })(
              <Input size="large" />
            )}
          </Form.Item>
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
          <Form.Item label="Confirm Password">
            {getFieldDecorator('confirm-password', {
              rules: [
                {
                  required: true,
                  message: "Required"
                },
                {
                  pattern: new RegExp(getFieldValue('password')),
                  message: "Confirm password not match"
                }
              ],
              validateFirst: true,
              validateTrigger: null,
            })(
              <Password size="large" />
            )}
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

export default Form.create()(Register);
