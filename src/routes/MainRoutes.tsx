import Chat from '~/pages/Chat';
import AuthGuard from './AuthGuard';
import Settings from './Settings';

const MainRoutes = {
  path: '/',
  element: <AuthGuard />,
  children: [
    {
      path: '/',
      element: <Chat />,
    },
    {
      path: '/settings',
      element: <Settings />,
    },
  ],
};

export default MainRoutes;
