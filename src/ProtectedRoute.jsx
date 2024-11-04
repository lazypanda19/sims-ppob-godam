import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const isTokenExpired = () => {
    const expirationTime = sessionStorage.getItem('tokenExpiration');
    return expirationTime && new Date().getTime() > parseInt(expirationTime, 10);
};

const ProtectedRoute = ({ children }) => {
    // const token = useSelector((state) => state.auth.token);
    const token = sessionStorage.getItem('token');

    if (!token || isTokenExpired()) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('tokenExpiration');
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;