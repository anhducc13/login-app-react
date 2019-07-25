import { requestServices } from 'services';

const loginUser = (payload) => requestServices.customAxios.post('/auth/login',payload).then(res => res.data)

const registerUser = (payload) => requestServices.customAxios.post('/auth/register',payload).then(res => res.data)

const forgotPasswordUser = (payload) => requestServices.customAxios.post('/auth/forgotPassword',payload)

const updatePasswordUser = (payload) => requestServices.customAxios.post('/auth/updatePassword',payload)

const logoutUser = () => requestServices.customAxios.get('/auth/logout')

const currentUser = () => requestServices.customAxios.get('/auth/currentUser').then(res => res.data)


  export default {
    loginUser,
    currentUser,
    registerUser,
    forgotPasswordUser,
    logoutUser,
    updatePasswordUser
  };
