import React, { useState } from 'react';
import { Icon, Modal, Upload, message } from 'antd';
import axios from 'axios';

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const BookImages = ({ bookImages }) => {
  let listImage = [];
  bookImages.map((value, index) =>
    listImage.push({
      uid: index,
      name: 'image.png',
      status: 'done',
      url: value,
    })
  )

  const [fileList, setFileList] = useState([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
  ]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);


  const beforeUpload = (file) => {
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

  const handleCancelPreview = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = (data) => {
    console.log(data);
    setFileList(data.fileList);
  }
  // const handleUpload = (file) => {
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   return axios.post('https://api.imgur.com/3/image', formData, {
  //     "headers": {
  //       "Authorization": "Client-ID bd9081c611b721f",
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //     .then(() => {console.log('asfsdf')})
  //     .catch(() => {})
  // }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div className="clearfix">
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        beforeUpload={beforeUpload}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancelPreview}>
        <img alt="preview_image" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default BookImages;


