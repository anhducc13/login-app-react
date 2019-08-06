// @flow
import { requestServices } from 'services';

const fetchCategories = (args) => requestServices.customAxios.get('/category/list/', { params: args })
  .then(res => res.data.data);

const fetchCategory = (id) => requestServices.customAxios.get(`/category/${id}`)
  .then(res => res.data.data);

const addCategory = (params) => requestServices.customAxios.post('/category/', params)
  .then(res => res.data.data);

const editCategory = (id, params) => requestServices.customAxios.put(`/category/${id}`, params)
  .then(res => res.data.data);

const deleteCategory = (id) => requestServices.customAxios.delete(`/category/${id}`)
  .then(res => res.data.data);

export default {
  fetchCategories,
  fetchCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
