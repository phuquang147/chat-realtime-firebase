import { useRoutes } from 'react-router-dom';
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';
import NotFoundRoute from './NotFoundRoute';

export default function Routes() {
  return useRoutes([MainRoutes, AuthenticationRoutes, NotFoundRoute]);
}
