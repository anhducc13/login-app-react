// import UpdatePassword from 'components/UpdatePassword';
import asyncComponent from "utils/asyncComponent";

const routes = [
  {
    path: '/home',
    exact: true,
    name: 'Home',
    component: asyncComponent(() => import('components/Home')),
  },
  {
    path: '/list-user',
    exact: true,
    name: 'List User',
    component: asyncComponent(() => import('components/User/UserList')),
  },
  {
    path: '/user/add',
    exact: true,
    name: 'Add User',
    component: asyncComponent(() => import('components/User/AddUser')),
  },
  {
    path: '/user/edit/:id',
    exact: true,
    name: 'Edit User',
    component: asyncComponent(() => import('components/User/EditUser')),
  },
  {
    path: '/user/activity/:id',
    exact: true,
    name: 'User Activity',
    component: asyncComponent(() => import('components/User/UserAction')),
  },
  {
    path: '/profile',
    exact: true,
    name: 'Profile',
    component: asyncComponent(() => import('components/Profile/Profile')),
  },
  {
    path: '/profile/update-password',
    exact: true,
    name: 'Update Password',
    component: asyncComponent(() => import('components/Profile/UpdatePassword')),
  },
  {
    path: '/list-category',
    exact: true,
    name: 'List Category',
    component: asyncComponent(() => import('components/Category/CategoryList')),
  },
  {
    path: '/category/add',
    exact: true,
    name: 'Add Category',
    component: asyncComponent(() => import('components/Category/AddCategory')),
  },
  {
    path: '/category/edit/:id',
    exact: true,
    name: 'Edit Category',
    component: asyncComponent(() => import('components/Category/EditCategory')),
  },
];

export default routes;
