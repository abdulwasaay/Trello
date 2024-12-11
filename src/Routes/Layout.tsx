import { Route, Routes } from "react-router";
import privateRoutes from "./Routes"
import ProtectedRoutes from "./PrivateRoutes";
import NotFound from "../Components/ErrorPages/NotFound";
import Auth from "../Pages/auth/Auth";
// import { useEffect } from "react"
import LogoutIcon from '@mui/icons-material/Logout';

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
        { name: "Log out", link: false, clickFunc: () => console.log("s"), icon: <LogoutIcon className="text-[#d9e2f3]" style={{ fontSize: "20px" }} /> },
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