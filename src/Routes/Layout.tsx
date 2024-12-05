import { Route, Routes } from "react-router";
import routeLinks from "./RouteLinks";
import privateRoutes from "./Routes"
import ProtectedRoutes from "./PrivateRoutes";
import NotFound from "../Components/ErrorPages/NotFound";
import Auth from "../Pages/auth/Auth";
// import { useEffect } from "react"

const RoutesLayout = () => {
    const isAuth = true;
    // const dispatch = useDispatch();
    // const { isAuth } = useSelector((state: any) => state.authSlice);

    // useEffect(() => {

    //     const token = GetCookieValue(authCookie);
    //     if (token) {
    //         dispatch(setAuth(true))
    //     } else {
    //         dispatch(setAuth(false))
    //         persistor.purge()
    //     }
    // }, [])

    // const logoutHandler = () => {
    //     DeleteCookieValue("token")
    //     window.location.reload()
    // }




    const navbarArr = [
        { name: "Boards", link: true, path: routeLinks?.boards, icon: "" },
        { name: "Home", link: true, path: routeLinks?.home, icon: "" },
    ]


    return (
        <Routes>
            <Route path="/*" Component={Auth} />
            {
                privateRoutes?.map((route: any, ind: any) => (
                    <Route
                        key={ind}
                        element={<ProtectedRoutes isAuth={isAuth} hideNav={route?.isHideNav} navArr={navbarArr}><route.comp /></ProtectedRoutes>}
                        path={route?.routeLink}
                    />

                ))
            }
            <Route path="*" Component={NotFound} />
        </Routes>
    )
}

export default RoutesLayout