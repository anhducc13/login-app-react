// @flow
import { requestServices } from 'services';

const fetchUsers = (args) => requestServices.customAxios.get('/admin/users', {params: args}).then(res => res.data);

const addUser = (params) => requestServices.customAxios.post('/admin/user', params).then(res => res.data);

export default {
  fetchUsers,
  addUser
};
