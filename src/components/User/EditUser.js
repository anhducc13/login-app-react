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
    avatarName: "",
    avatarFile: null
  }

  const [data, setData] = useState(initialData);
  const [loadingImage, setLoadingImage] = useState(false);
  const [show, setImageUrl] = useState("");

  useEffect(() => {
    userServices.fetchUser(userId)
      .then(res => {
        setData({
          ...data,
          email: res.email,
          username: res.username
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

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChangeImage = info => {
    setData({
      ...data,
      avatarName: "dsvfsdf"
    })
    if (info.file.status === 'uploading') {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoadingImage(false);
      console.log(info)
      // getBase64(info.file.originFileObj, imgUrl => setImageUrl(imgUrl));
    }
  }

  const handleRemoveImage = () => {
    setData({
      ...data,
      avatarName: ""
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(data)
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
        Edit User:
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
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            // showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChangeImage}
            onRemove={handleRemoveImage}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            {!data.avatarName ? (
              <div>
                <Icon type={loadingImage ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
              </div>
            ): null}
          </Upload>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" block onClick={handleSubmit}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditUser;