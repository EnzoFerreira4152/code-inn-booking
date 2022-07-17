import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';



export const AdminRoute = ({ children }) => {

    const { user } = useContext(AuthContext);
    const { pathname, search } = useLocation();
    
    localStorage.setItem('lastPath', pathname + search );
    
    return (user.logged && user.jwt && user.authority === 'ROLE_ADMIN')
        ? children
        : <Navigate to='/'/>
}