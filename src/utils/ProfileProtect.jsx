
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileProtect = ({children}) => {
    if(localStorage.getItem("user_verified") === 'false' || localStorage.getItem("user_verified") == 'undefined'){
        console.log(localStorage.token)
        if(localStorage.token){
            return <Navigate to="/otp" replace />
        }else{
            return <Navigate to="/login" replace />
        }
    }
    return children
}

ProfileProtect.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProfileProtect