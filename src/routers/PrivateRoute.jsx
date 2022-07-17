
   
import { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';



export const PrivateRoute = ({ children }) => {

    const { user } = useContext(AuthContext);
    const { pathname, search } = useLocation();
    
    localStorage.setItem('lastPath', pathname + search );
    
    return (user.logged && user.jwt)
        ? children
        : <Navigate to="/login?redirectionType=booking"/>
}