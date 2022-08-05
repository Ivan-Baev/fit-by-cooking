import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const GuardedRoute = () => {
	const { user } = useContext(AuthContext);

	return user.email ? <Outlet /> : <Navigate to="/register" />;
};

export default GuardedRoute;
