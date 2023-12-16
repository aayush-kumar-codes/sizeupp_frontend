import  { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileProtect = ({children}) => {
    const {isVerified} = useContext(AuthContext);
    console.log(isVerified) 
    if(!isVerified){
        return <Navigate to="/otp" replace />
    }
    return children
}

ProfileProtect.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProfileProtect