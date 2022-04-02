import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();

    const location = useLocation();
    // console.log("Auth active", auth.user)
    // console.log("Auth entries", Object.entries(auth))
    // console.log("Auth", auth)
    // console.log("Auth keys", Object.keys(auth))

    // const createAuthArray = Object.keys(auth).map((k) => auth[k])

    // console.log('Create auth array', createAuthArray)
    

    // const findActive = auth?.user.find(auth?.user.active)
    // console.log("Find Active", findActive)
    // console.log("Auth", auth?.user.find(active => allowedRoles?.includes(active)))


    return (
        // <Outlet /> will show all components(if user is authorized) in App.js under RequireAuth Route
        // Below is if user is logged in then show all authorized components else send to login page
        // replace is to(how it is setup below), replace login with previous url from where they came from
        // so scenario is you on home page and you click login, register, etc, if state={{from: location}} replace wasn't there then it would just keep referring to login page, state location replaced is used then it will send them back to home page(or wherever page they came from before)
        // auth.groups has array and allowedRoles(which is passed through App.js) has an array and it will compare the two arrays
        auth?.groups?.find(group => allowedRoles?.includes(group))

        // Object.entries(auth)?.find(role => allowedRoles?.includes(role === true))
        // createAuthArray?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to ="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login"  state={{ from: location }} replace />
    );
}

const RequireStaffAuth = () => {
    const { auth } = useAuth()
    const location = useLocation();

    return (
        auth?.staff
            ? <Outlet />
                : auth?.user
                    ? <Navigate to ="/unauthorized" state={{ from: location }} replace />
                    : <Navigate to="/login"  state={{ from: location }} replace />
    )
}

const RequireSuperAuth = () => {
    const { auth } = useAuth()
    const location = useLocation();

    return (
        auth?.super
            ? <Outlet />
                : auth?.user
                    ? <Navigate to ="/unauthorized" state={{ from: location }} replace />
                    : <Navigate to="/login"  state={{ from: location }} replace />
    )
}

export {RequireAuth, RequireStaffAuth, RequireSuperAuth}