
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileProtect = ({children}) => {
    console.log(localStorage.user_verified) 
    if(localStorage.user_verified ? false : true){
        return <Navigate to="/otp" replace />
    }
    return children
}

ProfileProtect.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProfileProtect