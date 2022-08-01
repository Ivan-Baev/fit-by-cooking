import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const GuardedRoute = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return isAuthenticated ? <Outlet /> : <Navigate to="/register" />;
};

export default GuardedRoute;
