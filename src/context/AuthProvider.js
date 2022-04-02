import { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('allDataTokens') ? JSON.parse(localStorage.getItem('allDataTokens')) : null)

    return (
        <AuthContext.Provider value={{ auth, setAuth, authTokens, setAuthTokens }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;