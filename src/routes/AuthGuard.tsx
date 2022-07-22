import { getAuth } from 'firebase/auth';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const user = getAuth();
  return <Outlet />;
  // return user.currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
