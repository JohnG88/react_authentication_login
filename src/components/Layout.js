import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <main className="App">
        {/* Outlet represents all children(anything nested in component) of Layout component */}
            <Outlet />
        </main>
    )
};

export default Layout;
