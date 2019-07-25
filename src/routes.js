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
    path: '/user/add-user',
    exact: true,
    name: 'Add User',
    component: asyncComponent(() => import('components/User/AddUser')),
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
];

export default routes;
