/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Form,
  Input,
  Radio,
  Alert,
  Checkbox,
  DatePicker,
  Upload,
  Icon,
  Button,
  Typography,
  message
} from 'antd';
import { userServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import UserAction from './UserAction';

const { Title } = Typography;


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
    avatar: "",
  }

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [openUserAction, setOpenUserAction] = useState(false);

  useEffect(() => {
    userServices.fetchUser(userId)
      .then(res => {
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
          avatar: res.avatar,
        })
      })
      .catch(err => {
        openNotificationWithIcon('error', 'Error', err.response.data.message);
      })
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

  const handleChangeAvatar = ({ fileList }) => {
    const isJpgOrPng = fileList[0].type === 'image/jpeg' || fileList[0].type === 'image/png';
    const isLt2M = fileList[0].size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    } else if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    } else {
      setData({
        ...data,
        avatarFile: fileList[0].originFileObj,
        avatarFileName: fileList[0].name,
      })
      setAvatar(fileList);
    }
  };


  const handleSubmit = e => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key !== "username" && key !== "email" && key !== "avatar" && key !== "id")
        formData.append(key, data[key])
    });
    if (avatar.length !== 0)
      formData.append("avatar", avatar[0].originFileObj, avatar[0].name);

    userServices.editUser(userId, formData)
      .then(() => {
        setLoading(false);
        openNotificationWithIcon("success", "Success", "Update user success");
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
        <Form.Item label="Active">
          <Checkbox checked={data.isActive} onChange={(e) => setData({ ...data, isActive: e.target.checked })} />
        </Form.Item>
        <Form.Item label="Birthday">
          <DatePicker
            name="birthday"
            onChange={handleChangeDatePicker}
            defaultValue={data.birthday ? moment(new Date(data.birthday)) : moment()}
          />
        </Form.Item>
        <Form.Item label="Avatar">
          <Upload
            listType="picture-card"
            fileList={avatar}
            showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
            beforeUpload={() => false}
            onRemove={() => setAvatar([])}
            onChange={handleChangeAvatar}
          >
            {avatar.length === 0 ? (
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </div>
            ) : null}
          </Upload>
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