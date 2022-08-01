import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = () => {
  const { user } = useSelector((state: any) => state.UserReducer);
  return user && user !== {} ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
