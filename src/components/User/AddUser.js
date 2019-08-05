import React, { useState, useEffect } from 'react';
import { Form, Input, Typography, Button, Select, Alert } from 'antd';
import { userServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import { validatorHelpers } from 'helpers';

const { Title } = Typography;
const { Option } = Select;


const AddUser = (props) => {
  const { history } = props;
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

  const initState = {
    value: "",
    helper: ""
  }

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(initState);
  const [username, setUsername] = useState(initState);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState([])
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    userServices.fetchRoles()
      .then(res => setRoles(res))
      .catch(err => {
        openNotificationWithIcon('error', 'Error', err.response.data.message);
      })
  }, [])

  const validateEmail = (value) => {
    const helper = validatorHelpers.validateEmail(value);
    setEmail({ value, helper })
  }
  const validateUsername = (value) => {
    const helper = validatorHelpers.validateUsername(value);
    setUsername({ value, helper })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail(email.value);
    validateUsername(username.value);

    const canNotSubmit = email.value === "" || email.helper !== ""
      || username.value === "" || username.helper !== ""
    if (canNotSubmit) {
      return;
    }
    setLoading(true);
    setErrorText("")
    const params = {
      "email": email.value,
      "username": username.value,
      "roles": userRoles
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
            setErrorText(data.message)
            return;
          }
          if (status === 401) {
            openNotificationWithIcon('error', 'Error', 'Expired session. Please login to continue');
            history.push('/login');
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
        <Form.Item label="E-mail" help={email.helper} validateStatus={email.helper && "error"}>
          <Input name="email" onChange={e => setEmail({ ...email, value: e.target.value })} />
        </Form.Item>
        <Form.Item label="Username" help={username.helper} validateStatus={username.helper && "error"}>
          <Input name="username" onChange={e => setUsername({ ...username, value: e.target.value })} />
        </Form.Item>
        <Form.Item label="Roles">
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            defaultValue={[]}
            placeholder="Please select roles"
            onChange={(value) => setUserRoles(value)}
          >
            {roles.map(val => (
              <Option key={val.id} value={val.id}>
                {val.role_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {errorText && (
          <Form.Item {...tailFormItemLayout}>
            <Alert
              message={errorText}
              type="error"
              closable
              showIcon
            />
          </Form.Item>
        )}
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

export default AddUser;


