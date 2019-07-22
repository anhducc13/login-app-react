// import UpdatePassword from 'components/UpdatePassword';
import asyncComponent from "utils/asyncComponent";

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: asyncComponent(() => import('components/Home')),
  },
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
    path: '/profile/update-password',
    exact: true,
    name: 'Update Password',
    component: asyncComponent(() => import('components/Profile/UpdatePassword')),
  },
];

export default routes;
