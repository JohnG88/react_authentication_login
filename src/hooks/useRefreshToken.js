// import axios from "../api/axios";
// import useAuth from "./useAuth";

// const useRefreshToken = () => {
//     const { setAuth, authTokens, setAuthTokens } = useAuth();
//     console.log("authTokens", authTokens)
//     const {auth} = useAuth()
//     const refresh = async () => {
//         const response = await axios.post("/api/token/refresh/",{
//             refresh: authTokens.refresh
//         });
        
//         localStorage.setItem('newAuthTokens', JSON.stringify(response.data))
//         console.log("Refresh data", response.data)

//         setAuthTokens(response.data);
//         return response.data.access
//     }

//     return refresh;
// };

// export default useRefreshToken;
