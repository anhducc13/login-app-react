// @flow
import { requestServices } from 'services';

const fetchUsers = (args) => requestServices.customAxios.get('/admin/users/', { params: args })
  .then(res => res.data.data);

const fetchUser = (id) => requestServices.customAxios.get(`/admin/user/${id}`)
  .then(res => res.data.data);

const fetchUserActions = ((args) => requestServices.customAxios.get('/admin/user/action', { params: args })
  .then(res => res.data.data));

const addUser = (params) => requestServices.customAxios.post('/admin/user', params).then(res => res.data);

const editUser = (id, data) => requestServices.customAxios
  .put(`/admin/user/${id}`, data)
  .then(res => res.data);

const deleteUser = (id) => requestServices.customAxios.delete(`/admin/user/${id}`).then(res => res.data);

const fetchRoles = () => requestServices.customAxios.get('/admin/roles/')
  .then(res => res.data.data)

export default {
  fetchUser,
  fetchUsers,
  addUser,
  deleteUser,
  fetchUserActions,
  editUser,
  fetchRoles,
};
