// @flow
import axios from 'axios';
import { errorHandler, errorRequest, errorUndefined } from 'utils/errorHandler';
import { cookiesHelpers } from 'helpers';

export const BASE_API_URL: string = `${process.env.REACT_APP_BASE_API_URL || 'localhost:3000'}`;

const customAxios = axios.create({
  baseURL: BASE_API_URL,
  withCredentials : true,
});

// customAxios.interceptors.request.use(
//   config => {
//     const token = cookiesHelpers.getByName('accessToken');
//     if ( token !== '' ) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );


customAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response)
      return errorHandler(error)
    if (error.request)
      return errorRequest(error)
    return errorUndefined(error)
  },
);

export default { customAxios };
