import { requestServices } from 'services';

const loginUser = (payload) => requestServices.customAxios.post('/auth/login',payload).then(res => res.data)

const loginGoogle = (payload) => requestServices.customAxios.post('/auth/loginGoogle/',payload).then(res => res.data)

const registerUser = (payload) => requestServices.customAxios.post('/auth/register',payload).then(res => res.data)

const forgotPasswordUser = (payload) => requestServices.customAxios.post('/auth/forgotPassword',payload)

const updatePasswordUser = (payload) => requestServices.customAxios.post('/auth/updatePassword',payload)

const editProfileUser = (formData) => requestServices.customAxios.post('/auth/editProfile',formData)
  .then(res => res.data.data)

const logoutUser = () => requestServices.customAxios.get('/auth/logout')

const currentUser = () => requestServices.customAxios.get('/auth/currentUser').then(res => res.data)


  export default {
    loginUser,
    loginGoogle,
    currentUser,
    registerUser,
    forgotPasswordUser,
    logoutUser,
    updatePasswordUser,
    editProfileUser
  };
