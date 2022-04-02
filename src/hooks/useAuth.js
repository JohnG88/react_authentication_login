import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// usually have to import useContext then import AuthContext then set useContext === AuthContext 
// this is custom hook to useAuth and to pull AuthContext whenever we need it
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;