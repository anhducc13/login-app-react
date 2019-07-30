import React, { useState } from 'react';
import { Form, Input, Typography, Button } from 'antd';
import { authServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import { validatorHelpers } from 'helpers';

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

  const initState = {
    value: "",
    helper: ""
  }

  const [password, setPassword] = useState(initState)
  const [newPassword, setNewPassword] = useState(initState)
  const [repeatPassword, setRepeatPassword] = useState(initState)
  const [errorText, setErrorText] = useState("")

  const validateNewPassword = (value) => {
    const helper = validatorHelpers.validatePassword(value);
    setNewPassword({ value, helper })
  }

  const validateRepeatPassword = (value) => {
    const helper = value === newPassword.value ? "" : "Password repeat is not match"
    setRepeatPassword({ value, helper })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.value === "") {
      setPassword({
        helper: "Please enter password"
      })
    }
    validateNewPassword(newPassword.value)
    validateRepeatPassword(repeatPassword.value)

    const canNotSubmit = password.value === ""
      || newPassword.value === "" || newPassword.helper !== ""
      || repeatPassword.value === "" || repeatPassword.helper !== "";

    if (canNotSubmit) {
      return;
    }
    setLoading(true);
    const params = {
      "old_password": password.value,
      "new_password": newPassword.value,
    }
    authServices.updatePasswordUser(params)
      .then(() => {
        setLoading(false);
        openNotificationWithIcon('success', 'Success', `Update password success!`)
        props.history.push('/profile');
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
          if (status > 400 && status < 500) {
            openNotificationWithIcon('error', 'Error', data.message)
            props.history.push('/403');
            return;
          }
        }
        props.history.push('/500');
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
      <Title
        level={4}
        type="danger"
        style={{
          textAlign: "center"
        }}
      >
        {errorText}
      </Title>
      <Form {...formItemLayout}>
        <Form.Item label="Password" help={password.helper} validateStatus={password.helper && "error"}>
          <Password name="password" onChange={(e) => setPassword({ value: e.target.value })} />
        </Form.Item>
        <Form.Item label="New Password" help={newPassword.helper} validateStatus={newPassword.helper && "error"}>
          <Password name="new-password" onChange={e => validateNewPassword(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Repeat New Password"
          help={repeatPassword.helper}
          validateStatus={repeatPassword.helper && "error"}
        >
          <Password name="repeat-password" onChange={e => validateRepeatPassword(e.target.value)} />
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

export default UpdatePassword;