// @flow
import { requestServices } from 'services';

const fetchUsers = () => requestServices.customAxios.get('/auth').then(res => res.data);

export default {
  fetchUsers,
};
