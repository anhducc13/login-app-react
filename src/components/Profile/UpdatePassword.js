import React, { useState } from 'react';
import { Form, Input, Typography, Button } from 'antd';
import { authServices } from 'services';
import { toast } from 'react-toastify';

const { Title } = Typography;
const { Password } = Input;

const UpdatePassword = (props) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 12,
        offset: 6,
      },
    },
  };

  const [loading, setLoading] = useState(false);

  const { getFieldDecorator, getFieldValue, validateFields, resetFields } = props.form;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        setLoading(true);
        const params = {
          "old_password": values.password,
          "new_password": values.newPassword,
        }
        authServices.updatePasswordUser(params)
          .then(() => {
            setLoading(false);
            toast.success(`Update password success!`);
            props.history.push('/');
          })
          .catch(err => {
            setLoading(false);
            if(err === 400) {
              resetFields();
              return;
            }
            if(err === 403) {
              props.history.push('/403');
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
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      padding: 16
    }}
    >
      <Title
        level={2}
        style={{
          marginBottom: 20
        }}
      >
        Update Password
      </Title>
      <Form {...formItemLayout}>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: "Required"
              },
            ],
            validateFirst: true,
            validateTrigger: null,
          })(
            <Password />
          )}
        </Form.Item>
        <Form.Item label="New Password">
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true,
                message: "Required"
              },
            ],
            validateFirst: true,
            validateTrigger: null,
          })(
            <Password />
          )}
        </Form.Item>
        <Form.Item label="Confirm">
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: "Required"
              },
              {
                pattern: new RegExp(getFieldValue('newPassword')),
                message: "Confirm password not match"
              }
            ],
            validateFirst: true,
            validateTrigger: null,
          })(
            <Password />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            block
            icon="save"
            loading={loading}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create()(UpdatePassword);