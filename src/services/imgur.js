import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.imgur.com/3/image',
  timeout: 4000,
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
  },
});

const uploadImage = file => {
  const formData = new FormData();
  formData.append('image', file);
  return instance.post('', formData).then(res => res.data.data.link);
};

export default {
  uploadImage,
};
