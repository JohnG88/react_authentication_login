import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import axios from "axios";

const baseURL = 'http://localhost:8000';

const useAxiosPrivate = () => {
    // const refresh = useRefreshToken();
    // console.log("refresh", refresh)
    const { auth, authTokens, setAuthTokens } = useAuth();

    const axiosInstance = axios.create({
        baseURL,
        headers: {Authorization: `Bearer ${authTokens?.access}`}
    });



    axiosInstance.interceptors.request.use(async req => {
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: authTokens?.refresh
        })
        localStorage.setItem('allDataTokens', JSON.stringify(response.data))

        console.log("refresh response", response.data)
        console.log("useAxiosPrivate", authTokens)

        setAuthTokens(response.data)

        console.log("after setAuthTokens", authTokens)

        req.headers.Authorization = `Bearer ${response.data.access}`

        return req
    })


    // useEffect(() => {

    //     const requestIntercept = axiosPrivate.interceptors.request.use(
    //         config => {
    //             if (!config.headers['Authorization']) {
    //                 config.headers['Authorization'] = `Bearer ${authTokens?.access}`;
    //             }
    //             return config;
    //         }, (error) => Promise.reject(error)
    //     );

    //     const responseIntercept = axiosPrivate.interceptors.response.use(
    //         response => response,
    //         async (error) => {
    //             const prevRequest = error?.config;
    //             if (error?.response?.status === 403 && !prevRequest?.sent) {
    //                 prevRequest.sent = true;
    //                 // const newAccessToken = await refresh();
    //                 prevRequest.headers['Authorization'] = `Bearer ${authTokens.access}`;
    //                 return axiosPrivate(prevRequest)
    //             }
    //             return Promise.reject(error);
    //         }
    //     );

    //     // cleanup function to remove responseInterceptor because they can pile up
    //     return () => {
    //         axiosPrivate.interceptors.request.eject(requestIntercept);
    //         axiosPrivate.interceptors.response.eject(responseIntercept);
    //     }
    // }, [authTokens, refresh])

    return axiosInstance;
}

export default useAxiosPrivate;