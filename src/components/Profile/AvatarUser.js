import React, { useState, useEffect, useRef, useContext } from 'react';
import { Avatar, Button, Modal, Row, Upload, message } from 'antd';
import Cropper from 'react-cropper';
import { firebaseServices, authServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import { UserContext } from 'UserContext';
import 'cropperjs/dist/cropper.css';
import './loading.scss';

export default function AvatarUser(props) {

  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [srcAvatar, setSrcAvatar] = useState("");
  const [srcAvatarEdit, setSrcAvatarEdit] = useState("")
  const [visible, setVisible] = useState(false);
  const crop = useRef(null);

  useEffect(() => {
    if (user && user.avatar) {
      firebaseServices.getDownloadURL(user.avatar)
        .then(src => setSrcAvatar(src))
        .catch(() => setSrcAvatar(""))
    }
  }, [user])

  const handleChange = ({ file }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    } else if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    } else {
      const reader = new FileReader();
      reader.onload = (e) => setSrcAvatarEdit(e.target.result);
      reader.readAsDataURL(file);
      setVisible(true)
    }
  }

  const changeAvatarUser = () => {
    setLoading(true);
    crop.current.cropper.getCroppedCanvas({
      width: 300,
      height: 300,
    }).toBlob(file => {
      firebaseServices.uploadFileImage(file)
        .then(path => {
          authServices.editProfileUser({ avatar: path })
            .then((data) => {
              if(user.avatar)
                firebaseServices.deleteFileImage(user.avatar)
                  .then(() => { })
                  .catch(() => { })
              setUser(data);
              openNotificationWithIcon("success", "Success", "Change Avatar Success");
            })
            .catch((err) => {
              if (err && err.response) {
                const { response } = err;
                if (response.status === 400) {
                  return;
                }
                if (response.status > 400 && response.status < 500) {
                  openNotificationWithIcon("error", "Error", response.data.message);
                  setLoading(false)
                  props.history.push('/403');
                  return;
                }
              }
              setLoading(false)
              props.history.push('/500');
            })
        })
        .catch(() => {
          openNotificationWithIcon("error", "Error", "Please try again")
        })
        .finally(() => {
          setLoading(false);
          setVisible(false);
        })
    });
  }

  return (
    <>
      {loading && (
        <div id="loader-wrapper">
          <div id="loader" />
        </div>
      )}
      <Row type="flex" justify="center" style={{ marginTop: 10 }}>
        <Avatar
          size={200}
          icon={srcAvatar ? '' : 'user'}
          src={srcAvatar || ''}
        />
      </Row>
      <Row type="flex" justify="center" style={{ marginTop: 10 }}>
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleChange}
        >
          <Button
            type="primary"
            shape="round"
            icon="upload"
            size="large"
            block
            style={{ marginTop: 5, fontSize: 14 }}
          >
            Change Avatar
          </Button>
        </Upload>
      </Row>
      <Modal
        title="Edit Avatar"
        visible={visible}
        okText="Save Avatar"
        onCancel={() => setVisible(false)}
        onOk={changeAvatarUser}
      >
        <Cropper
          ref={crop}
          src={srcAvatarEdit}
          style={{ height: 400, width: '100%' }}
          aspectRatio={1 / 1}
          guides={false}
        />
      </Modal>
    </>
  )
}