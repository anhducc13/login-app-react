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

  const initialData = {
    id: null,
    email: "",
    username: "",
    fullname: "",
    phoneNumber: "",
    isAdmin: false,
    isActive: false,
    gender: null,
    birthday: "",
  }

  const selectRole = useRef(null);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [openUserAction, setOpenUserAction] = useState(false);
  const [roles, setRoles] = useState([]);
  const [defaultRoles, setDefaultRoles] = useState([])

  useEffect(() => {
    userServices.fetchUser(userId)
      .then(res => {
        const list = [];
        res.roles.map(val => list.push(val.id))
        setDefaultRoles(list)

        setData({
          ...data,
          id: res.id,
          username: res.username,
          email: res.email,
          isActive: res.is_active,
          isAdmin: res.is_admin,
          fullname: res.fullname,
          phoneNumber: res.phone_number,
          gender: res.gender,
          birthday: res.birthday,
          roles: list,
        })
      })
      .catch(err => {
        openNotificationWithIcon('error', 'Error', err.response.data.message);
      })
    userServices.fetchRoles()
      .then(result => setRoles(result))
      .catch(() => setRoles([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeInput = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeDatePicker = (time, timeString) => {
    setData({
      ...data,
      birthday: timeString
    })
  }

  const handleSubmit = e => {
    setLoading(true);
    setErrorText("")
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key !== "username" && key !== "email" && key !== "id")
        formData.append(key, data[key])
    });

    userServices.editUser(userId, formData)
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
          if (response.status > 400 && response.status < 500) {
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
        Edit user:
        {' '}
        {data.username}
      </Title>
      <Button type="link" onClick={() => setOpenUserAction(!openUserAction)}>View all activity</Button>
      {openUserAction ? (
        <UserAction userId={data.id} {...props} />
      ) : null}
      {data.username && !data.isAdmin && (
        <Form {...formItemLayout}>
          <Form.Item label="E-mail">
            <Input disabled value={data.email} name="email" />
          </Form.Item>
          <Form.Item label="Username">
            <Input disabled name="username" value={data.username} onChange={handleChangeInput} />
          </Form.Item>
          <Form.Item label="Fullname">
            <Input name="fullname" value={data.fullname} onChange={handleChangeInput} />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input name="phoneNumber" value={data.phoneNumber} onChange={handleChangeInput} />
          </Form.Item>
          <Form.Item label="Gender">
            <Radio.Group name="gender" value={data.gender} onChange={handleChangeInput}>
              <Radio value={true}>Male</Radio>
              <Radio value={false}>Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Admin">
            <Checkbox checked={data.isAdmin} onChange={(e) => setData({ ...data, isAdmin: e.target.checked })} />
          </Form.Item>
          <Form.Item label="Roles">
            <Select
              ref={selectRole}
              mode="multiple"
              style={{ width: '100%' }}
              defaultValue={defaultRoles}
              placeholder="Please select roles"
              onChange={(value) => setData({ ...data, roles: value})}
            >
              {roles.map(val => (
                <Option key={val.id} value={val.id}>
                  {val.role_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Active">
            <Checkbox checked={data.isActive} onChange={(e) => setData({ ...data, isActive: e.target.checked })} />
          </Form.Item>
          <Form.Item label="Birthday">
            <DatePicker
              name="birthday"
              onChange={handleChangeDatePicker}
              defaultValue={data.birthday ? moment(new Date(data.birthday)) : null}
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
      )}
    </div>
  )
}

export default EditUser;