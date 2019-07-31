/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  Upload,
  Icon,
  Button,
  Typography,
  message
} from 'antd';
import { userServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';

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
    email: "",
    username: "",
    fullname: "",
    phoneNumber: "",
    gender: null,
    birthday: "",
    avatarFileName: "",
    avatarFile: null
  }

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState([]);

  useEffect(() => {
    userServices.fetchUser(userId)
      .then(res => {
        setData({
          ...data,
          username: res.username,
          email: res.email,
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

  const handleRemoveAvatar = () => {
    setAvatar([])
    setData({
      ...data,
      avatarFileName: "",
      avatarFile: null,
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
      if (key !== "avatarName" && key !== "avatarFileName" && key !== "email")
        formData.append(key, data[key])
    });
    if (data.avatarFileName)
      formData.append("avatar", data.avatarFile, data.avatarFileName);
    
    userServices.editUser(userId, formData)
      .then(() => {
        setLoading(false);
        openNotificationWithIcon("success", "Success", "Update user success");
      })
      .catch(() => {setLoading(false)})
    
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
      <Form {...formItemLayout}>
        <Form.Item label="E-mail">
          <Input disabled value={data.email} name="email" />
        </Form.Item>
        <Form.Item label="Username">
          <Input name="username" value={data.username} onChange={handleChangeInput} />
        </Form.Item>
        <Form.Item label="Fullname">
          <Input name="fullname" onChange={handleChangeInput} />
        </Form.Item>
        <Form.Item label="Phone Number">
          <Input name="phoneNumber" onChange={handleChangeInput} />
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group name="gender" onChange={handleChangeInput}>
            <Radio value={true}>Male</Radio>
            <Radio value={false}>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Birthday">
          <DatePicker name="birthday" onChange={handleChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Avatar">
          <Upload
            listType="picture-card"
            fileList={avatar}
            showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
            beforeUpload={() => false}
            onRemove={handleRemoveAvatar}
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