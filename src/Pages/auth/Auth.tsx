import { memo } from "react"
import PublicRoutes from "../../Routes/PublicRoutes"
import { Route, Routes } from "react-router"
import NotFound from "../../Components/ErrorPages/NotFound"
import routeLinks from "../../Routes/RouteLinks"
import LoginComp from "../../Components/LoginComp/Login"

const Auth = () => {
    const isAuth = true;

    return (
        <Routes>
            <Route
                path={routeLinks?.login}
                element={
                    <PublicRoutes isAuth={isAuth}>
                        <LoginComp />
                    </PublicRoutes>
                }
            />

            <Route path="*" Component={NotFound} />
        </Routes>
    )
}

export default memo(Auth)