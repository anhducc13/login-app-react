import React, { useState } from 'react';
import { Form, Input, Typography, Button, Checkbox } from 'antd';
import { userServices } from 'services';
import { RULES_USERNAME, RULES_EMAIL } from 'constants/RuleValidators';
import openNotificationWithIcon from 'helpers/notification';

const { Title } = Typography;


const AddUser = (props) => {
  const { form, history } = props;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      lg: { span: 8 },
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
      lg: {
        span: 8,
        offset: 6,
      },
    },
  };

  const [loading, setLoading] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const { getFieldDecorator, validateFields, resetFields } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((error, values) => {
      if (!error) {
        setLoading(true);
        const params = {
          "email": values.email,
          "username": values.username,
          "is_admin": isAdmin
        }
        userServices.addUser(params)
          .then(() => {
            setLoading(false);
            openNotificationWithIcon('success', 'Success', 'Create user success!')
            history.push('/list-user');
          })
          .catch(err => {
            setLoading(false);
            if (err && err.response) {
              const { status, data } = err.response;
              if (status === 400) {
                resetFields();
                setIsAdmin(false)
                return;
              }
              if (status === 404) {
                history.push('/404');
                return;
              }
              if (status > 400 && status < 500) {
                openNotificationWithIcon('error', 'Error', data.message)
                history.push('/403');
                return;
              }
            }
            history.push('/500');
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
        Add New User
      </Title>
      <Form {...formItemLayout}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: RULES_EMAIL,
            validateFirst: true,
            validateTrigger: null,
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: RULES_USERNAME,
            validateFirst: true,
            validateTrigger: null,
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Checkbox checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)}>
            Admin
          </Checkbox>
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
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create()(AddUser);


