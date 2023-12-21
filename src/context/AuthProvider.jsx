import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("token") ? true : false);
    const [isVerified, setIsVerified] = useState(localStorage.getItem("user_verified") ? localStorage.isverified : false);
    useEffect(() => {
        // effect
        const token = localStorage.getItem("token");
        const verified = localStorage.getItem("user_verified");
        if (token) {
            setIsAuth(true);
            setIsVerified(verified);
        }
    }, []);

    useEffect(() => {
        if (localStorage.token) {
            console.log(import.meta.env.VITE_SERVER_URL , localStorage.token,isVerified)
        }
    }, [])

    useEffect(()=>{
        

    },[])

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
                isVerified,
                setIsVerified
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { AuthContext, AuthProvider };