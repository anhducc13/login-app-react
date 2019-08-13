// @flow
import { requestServices } from 'services';

const fetchBooks = (args) => requestServices.customAxios.get('/book/list/', { params: args })
  .then(res => res.data.data);

const getAllCategory = () => requestServices.customAxios.get(`/book/allCategory`)
  .then(res => res.data.data);

const fetchCategoryActions = (args) => requestServices.customAxios.get(`/category/activity`, { params: args })
  .then(res => res.data.data);

const addBook = (params) => requestServices.customAxios.post('/book/', params, {headers: {
  'Content-Type': 'application/json',
}})
  .then(res => res.data.data);

const editCategory = (id, params) => requestServices.customAxios.put(`/category/${id}`, params)
  .then(res => res.data.data);

const deleteCategory = (id) => requestServices.customAxios.delete(`/category/${id}`)
  .then(res => res.data.data);

export default {
  fetchBooks,
  getAllCategory,
  addBook,
  editCategory,
  deleteCategory,
  fetchCategoryActions,
};
