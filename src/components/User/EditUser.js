/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import {
  Form,
  Input,
  Radio,
  Alert,
  Checkbox,
  DatePicker,
  Button,
  Typography,
  Select,
} from 'antd';
import { userServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import UserAction from './UserAction';

const { Title } = Typography;
const { Option } = Select;


const EditUser = (props) => {

  const formItemLayout = {
    labelCol: {
      sm: { span: 24 },
      md: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 24 },
      md: { span: 12 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 24,
        offset: 0,
      },
      md: {
        span: 12,
        offset: 4,
      },
    },
  };

  const userId = props.match.params.id;

  const selectRole = useRef(null);
  const [dataUser, setDataUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [openUserAction, setOpenUserAction] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    userServices.fetchUser(userId)
      .then(res => {
        setDataUser(res)
      })
      .catch(err => {
        if (err && err.response) {
          openNotificationWithIcon('error', 'Error', err.response.data.message);
          props.history.push('/home');
          return;
        }
        props.history.push('/500');
      })
    userServices.fetchRoles()
      .then(result => setRoles(result))
      .catch(() => setRoles([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeInput = e => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeDatePicker = (time, timeString) => {
    setDataUser({
      ...dataUser,
      birthday: new Date(timeString)
    })
  }

  const handleSubmit = e => {
    setLoading(true);
    setErrorText("")
    e.preventDefault();

    const payload = {
      'fullname': dataUser.fullname,
      'phone_number': dataUser.phone_number,
      'gender': dataUser.gender,
      'birthday': dataUser.birthday,
      'is_active': dataUser.is_active,
      'roles': dataUser.roles
    }

    userServices.editUser(userId, payload)
      .then(() => {
        setLoading(false);
        openNotificationWithIcon("success", "Success", "Update user success");
        props.history.push('/list-user');
      })
      .catch((err) => {
        setLoading(false);
        if (err && err.response) {
          const { response } = err;
          if (response.status === 400) {
            setErrorText(response.data.message)
            return;
          }
          if (response.status === 401) {
            openNotificationWithIcon('error', 'Error', "Expired session. Please login to continue");
            props.history.push('/login');
            return;
          }
          if (response.status > 400 && response.status < 500) {
            props.history.push('/403');
            return;
          }
        }
        props.history.push('/500');
      })
  }

  return dataUser && (
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
        Edit user:
        {' '}
        {dataUser.username}
      </Title>
      <Button type="link" onClick={() => setOpenUserAction(!openUserAction)}>View all activity</Button>
      {openUserAction ? (
        <UserAction userId={dataUser.id} {...props} />
      ) : null}
      <Form {...formItemLayout}>
        <Form.Item label="E-mail">
          <Input disabled value={dataUser.email} name="email" />
        </Form.Item>
        <Form.Item label="Username">
          <Input disabled name="username" value={dataUser.username} />
        </Form.Item>
        <Form.Item label="Fullname">
          <Input name="fullname" value={dataUser.fullname} onChange={handleChangeInput} />
        </Form.Item>
        <Form.Item label="Phone Number">
          <Input name="phone_number" value={dataUser.phone_number} onChange={handleChangeInput} />
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group name="gender" value={dataUser.gender} onChange={handleChangeInput}>
            <Radio value={true}>Male</Radio>
            <Radio value={false}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Roles">
          <Select
            ref={selectRole}
            mode="multiple"
            style={{ width: '100%' }}
            value={dataUser.roles}
            placeholder="Please select roles"
            onChange={(value) => setDataUser({ ...dataUser, roles: value })}
          >
            {roles.map(val => (
              <Option key={val.id} value={val.id}>
                {val.role_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Active">
          <Checkbox
            checked={dataUser.is_active}
            onChange={(e) => setDataUser({ ...dataUser, is_active: e.target.checked })} 
          />
        </Form.Item>
        <Form.Item label="Birthday">
          <DatePicker
            name="birthday"
            onChange={handleChangeDatePicker}
            defaultValue={dataUser.birthday ? moment(new Date(dataUser.birthday)) : null}
          />
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
          <Button loading={loading} type="primary" htmlType="submit" block onClick={handleSubmit}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditUser;