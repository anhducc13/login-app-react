// @flow
import { requestServices } from 'services';

const fetchUsers = (args) => requestServices.customAxios.get('/user/list/', { params: args })
  .then(res => res.data.data);

const fetchUser = (id) => requestServices.customAxios.get(`/user/${id}`)
  .then(res => res.data.data);

const fetchUserActions = ((args) => requestServices.customAxios.get('/user/activity', { params: args })
  .then(res => res.data.data));

const addUser = (params) => requestServices.customAxios.post('/user/', params).then(res => res.data);

const editUser = (id, data) => requestServices.customAxios
  .put(`/user/${id}`, data)
  .then(res => res.data);

const deleteUser = (id) => requestServices.customAxios.delete(`/user/${id}`).then(res => res.data);

const fetchRoles = () => requestServices.customAxios.get('/user/roles/')
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
