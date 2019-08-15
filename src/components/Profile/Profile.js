import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import {
  Typography,
  Button,
  Row,
  Col,
  Form,
  Input,
  Radio,
  Alert,
  DatePicker,
  Select,
} from 'antd';
import { Link } from 'react-router-dom';
import { authServices, userServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import { UserContext } from 'UserContext';
import AvatarUser from './AvatarUser';



const { Title } = Typography;
const { Option } = Select;

export default function Profile(props) {

  const formItemLayout = {
    labelCol: {
      sm: { span: 24 },
      md: { span: 6 },
    },
    wrapperCol: {
      sm: { span: 24 },
      md: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 24,
        offset: 0,
      },
      md: {
        span: 16,
        offset: 6,
      },
    },
  };

  const [user, setUser] = useContext(UserContext);
  const [dataUser, setDataUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setDataUser(user);
    userServices.fetchRoles()
      .then(result => setRoles(result))
      .catch(() => setRoles([]))
  }, [user])

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
    e.preventDefault();
    setErrorText("")
    if (dataUser.username === "") {
      setErrorText("Please enter username");
      return;
    }
    setLoading(true);
    const payload = {
      'username': dataUser.username,
      'fullname': dataUser.fullname,
      'phone_number': dataUser.phone_number,
      'gender': dataUser.gender,
      'birthday': dataUser.birthday ? new Date(dataUser.birthday) : null,
    }

    authServices.editProfileUser(payload)
      .then((data) => {
        setUser(data);
        setLoading(false);
        openNotificationWithIcon("success", "Success", "Update profile success");
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
            openNotificationWithIcon("error", "Error", response.data.message);
            props.history.push('/403');
            return;
          }
        }
        props.history.push('/500');
      })
  }

  return dataUser && roles.length && (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      padding: 16
    }}
    >
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 16 }}>
          <Row type="flex" justify="center">
            <Title
              level={2}
            >
              Profile:
              {' '}
              {user && user.username}
            </Title>
          </Row>

        </Col>
        <Col sm={{ span: 24 }} md={{ span: 8 }}>
          <Row type="flex" justify="center">
            <Link to="/profile/update-password">
              <Button type="primary" icon="lock" style={{ marginTop: 5, fontSize: 16 }}>
                Update Password
              </Button>
            </Link>
          </Row>

        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 16 }}>
          <Form {...formItemLayout} style={{ marginTop: 10 }}>
            <Form.Item label="E-mail">
              <Input disabled value={dataUser.email} name="email" />
            </Form.Item>
            <Form.Item label="Username">
              <Input name="username" value={dataUser.username} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Roles">
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                value={dataUser.roles}
                placeholder="No role"
                disabled
              >
                {roles.map(val => (
                  <Option key={val.id} value={val.id}>
                    {val.role_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Fullname">
              <Input name="fullname" value={dataUser.fullname} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Phone Number">
              <Input name="phone_number" value={dataUser.phone_number} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Gender">
              <Radio.Group name="gender" value={dataUser.gender} onChange={handleChangeInput}>
                <Radio value>Male</Radio>
                <Radio value={false}>Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Birthday">
              <DatePicker
                name="birthday"
                defaultValue={dataUser.birthday ? moment(new Date(dataUser.birthday)) : null}
                onChange={handleChangeDatePicker}
              />
            </Form.Item>
            {errorText && (
              <Form.Item {...tailFormItemLayout}>
                <Alert
                  message={errorText}
                  type="error"
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

        </Col>
        <Col sm={{ span: 24 }} md={{ span: 8 }}>
          <AvatarUser avatar={dataUser.avatar} {...props} />
        </Col>
      </Row>
    </div>
  )
}
