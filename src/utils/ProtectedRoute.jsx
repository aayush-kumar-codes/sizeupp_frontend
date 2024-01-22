import  { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({children}) => {
    const {isAuth} = useContext(AuthContext);
    if(!isAuth){
        return <Navigate to="/login" replace />
    }
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute