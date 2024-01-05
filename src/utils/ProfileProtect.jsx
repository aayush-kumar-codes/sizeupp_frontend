
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileProtect = ({ children }) => {
    console.log(localStorage.getItem("user_verified")== 'undefined')
    if (localStorage.user_verified == 'undefined' ||  !JSON.parse(localStorage.getItem("user_verified")) ) {
        return <Navigate to="/otp" replace />
    }
    return children
}

ProfileProtect.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProfileProtect