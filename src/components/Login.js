import { useRef, useState, useEffect } from "react";

// with the useAuth hook we can remove useContext from above and erase line below, ill keep it here as a reminder.
// import AuthContext from "../context/AuthProvider";

import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

// import axios from "../api/axios";
import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
    // And line below will be replaced
    // const { setAuth } = useContext(AuthContext)
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    // look for location's state and if it has a from property, a pathname property or "/" root page
    // so user is sent to page they wanted to go after logging in
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    // useEffect to empty any error message if user state or password state changes
    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user, pwd);

        try {
            const response = await axios.post(
                "/api/token/",
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            // use shift + alt + down arrow to copy this line to next line
            console.log(JSON.stringify(response?.data));
            // this line will show everything
            // console.log(JSON.stringify(response));
            const access = response?.data?.access;
            const refresh = response?.data?.refresh;
            localStorage.setItem('allDataTokens', JSON.stringify(response.data))
            // const superuser = response?.data?.user?.is_superuser
            // const active = response?.data?.user?.is_active
            // const staff = response?.data?.user?.is_staff
            console.log("accessToken", access);
            console.log("refreshToken", refresh);
            const groups = response?.data?.groups;
            console.log("Groups", groups)
            setAuth({ user, pwd, groups });
            setUser("");
            setPwd("");
            // setSuccess(true);
            // replaces success page, with from, and from is where user wanted to go
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <section>
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    // this line is to clear form on submission
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    // this line is to clear form on submission
                    value={pwd}
                    required
                />

                <button>Sign In</button>
            </form>
            <p>
                Need an Account?
                <br />
                <span className="line">
                    {/* put router link here */}
                    <a href="#">Sign Up</a>
                </span>
            </p>
        </section>
    );
};

export default Login;
