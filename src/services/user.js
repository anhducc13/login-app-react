// @flow
import { requestServices } from 'services';

const fetchUsers = () => requestServices.customAxios.get('/admin/users').then(res => res.data);

export default {
  fetchUsers,
};
