import { createContext,useEffect,useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("token") ? true : false);

    useEffect(() => {
        // effect
        const token = localStorage.getItem("token");
        if(token){
            setIsAuth(true);
        }
    },[]);

    return (
        <AuthContext.Provider 
            value={{
                isAuth,
                setIsAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export {AuthContext,AuthProvider};