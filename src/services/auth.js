import { requestServices } from 'services';

const loginUser = (payload) => requestServices.customAxios.post('/auth/login',payload)

const registerUser = (payload) => requestServices.customAxios.post('/auth/register',payload)

const forgotPasswordUser = (payload) => requestServices.customAxios.post('/auth/forgotPassword',payload)

const logoutUser = () => requestServices.customAxios.get('/auth/logout')

const currentUser = () => requestServices.customAxios.get('/auth/currentUser')


  export default {
    loginUser,
    currentUser,
    registerUser,
    forgotPasswordUser,
    logoutUser
  };