import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useNavigate, useLocation} from "react-router-dom";

import useRefreshToken from "../hooks/useRefreshToken"

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/api/all-users/', {
                    signal: controller.signal
                });
                console.log("users: ", response.data)
                isMounted && setUsers(response.data)
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }

        getUsers()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>{user?.username}</li>
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
            {/* <button onClick={() => refresh()}>Refresh</button> */}
            <br />
        </article>
    );
};

export default Users;
