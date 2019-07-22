import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Col,
  Row,
} from 'antd';
import { Link } from 'react-router-dom';
import './ForgotPassword.scss';
import Title from 'antd/lib/typography/Title';
import { authServices } from 'services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = (props) => {
  const bodyLayout = {
    xs: { span: 22, offset: 1 },
    sm: { span: 16, offset: 4 },
    md: { span: 12, offset: 6 },
    lg: { span: 10, offset: 7 }
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
          "email": values.email,
        }
        authServices.forgotPasswordUser(params)
          .then(() => {
            setLoading(false);
            toast.success(`Please check email ${values.email} to receive new password`);
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
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: "Required"
                },
              ],
              validateFirst: true,
              validateTrigger: null,
            })(
              <Input size="large" />
            )}
          </Form.Item>
          <Form.Item label="Username">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: "Required"
                },
              ],
              validateFirst: true,
              validateTrigger: null,
            })(
              <Input size="large" />
            )}
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

export default Form.create()(ForgotPassword);
