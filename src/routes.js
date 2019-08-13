import CustomLoadable from 'utils/CustomLoadable';

const routes = [
  {
    path: '/home',
    exact: true,
    name: 'Home',
    component: CustomLoadable({
      loader: () => import('components/Home'),
    }),
  },
  {
    path: '/list-user',
    exact: true,
    name: 'List User',
    component: CustomLoadable({
      loader: () => import('components/User/UserList'),
    }),
  },
  {
    path: '/user/add',
    exact: true,
    name: 'Add User',
    component: CustomLoadable({
      loader: () => import('components/User/AddUser'),
    }),
  },
  {
    path: '/user/edit/:id',
    exact: true,
    name: 'Edit User',
    component: CustomLoadable({
      loader: () => import('components/User/EditUser'),
    }),
  },
  {
    path: '/profile',
    exact: true,
    name: 'Profile',
    component: CustomLoadable({
      loader: () => import('components/Profile/Profile'),
    }),
  },
  {
    path: '/profile/update-password',
    exact: true,
    name: 'Update Password',
    component: CustomLoadable({
      loader: () => import('components/Profile/UpdatePassword'),
    }),
  },
  {
    path: '/list-category',
    exact: true,
    name: 'List Category',
    component: CustomLoadable({
      loader: () => import('components/Category/CategoryList'),
    }),
  },
  {
    path: '/category/add',
    exact: true,
    name: 'Add Category',
    component: CustomLoadable({
      loader: () => import('components/Category/AddCategory'),
    }),
  },
  {
    path: '/category/edit/:id',
    exact: true,
    name: 'Edit Category',
    component: CustomLoadable({
      loader: () => import('components/Category/EditCategory'),
    }),
  },
  {
    path: '/list-book',
    exact: true,
    name: 'List Book',
    component: CustomLoadable({
      loader: () => import('components/Book/BookList'),
    }),
  },
  {
    path: '/book/add',
    exact: true,
    name: 'List Book',
    component: CustomLoadable({
      loader: () => import('components/Book/AddBook'),
    }),
  },
];

export default routes;
