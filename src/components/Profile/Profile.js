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
import { authServices } from 'services';
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
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [defaultRoles, setDefaultRoles] = useState([])

  useEffect(() => {
    const listRole = []
    if(user && user.roles)
      user.roles.map(val => listRole.push(val.id))
    setDefaultRoles(listRole)
  }, [user])

  const handleChangeInput = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeDatePicker = (time, timeString) => {
    setUser({
      ...user,
      birthday: timeString
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("fullname", user.fullname || "")
    formData.append("phoneNumber", user.phone_number || "")
    formData.append("gender", user.gender || "")
    formData.append("birthday", user.birthday || "")

    authServices.editProfileUser(formData)
      .then((data) => {
        setUser(data);
        setLoading(false);
        openNotificationWithIcon("success", "Success", "Update pprofile success");
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

  return (
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
        {user && (
          <>
            <Col sm={{ span: 24 }} md={{ span: 16 }}>
              <Form {...formItemLayout} style={{ marginTop: 10 }}>
                <Form.Item label="E-mail">
                  <Input disabled value={user.email} name="email" />
                </Form.Item>
                <Form.Item label="Username">
                  <Input disabled name="username" value={user.username} onChange={handleChangeInput} />
                </Form.Item>
                <Form.Item label="Roles">
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    value={defaultRoles}
                    placeholder="Please select roles"
                    disabled
                  >
                    {user.roles.map(val => (
                      <Option key={val.id} value={val.id}>
                        {val.role_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Fullname">
                  <Input name="fullname" value={user.fullname} onChange={handleChangeInput} />
                </Form.Item>
                <Form.Item label="Phone Number">
                  <Input name="phone_number" value={user.phone_number} onChange={handleChangeInput} />
                </Form.Item>
                <Form.Item label="Gender">
                  <Radio.Group name="gender" value={user.gender} onChange={handleChangeInput}>
                    <Radio value={true}>Male</Radio>
                    <Radio value={false}>Female</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Birthday">
                  <DatePicker
                    name="birthday"
                    defaultValue={user.birthday ? moment(new Date(user.birthday)) : null}
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
              <AvatarUser avatar={user.avatar} {...props} />
            </Col>
          </>
        )}
      </Row>
    </div>
  )
}
