import { Route, Routes } from "react-router";
import privateRoutes from "./Routes"
import ProtectedRoutes from "./PrivateRoutes";
import NotFound from "../Components/ErrorPages/NotFound";
import Auth from "../Pages/auth/Auth";
// import { useEffect } from "react"
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GetCookieValue from "../Utils/getCookieHandler";
import authCookie from "../Constants/cookieName";
import { setAuth } from "../Redux/Slices/authSlice";
import { persistor } from "../Redux/store";
import DeleteCookieValue from "../Utils/DeleteCookieHandler";

const RoutesLayout = () => {
    const { isAuth } = useSelector((state: any) => state.authSlice);
    const dispatch = useDispatch();

    useEffect(() => {

        const token = GetCookieValue(authCookie);
        if (token) {
            dispatch(setAuth(true))
        } else {
            dispatch(setAuth(false))
            persistor.purge()
        }
    }, [])

    const logoutHandler = () => {
        DeleteCookieValue(authCookie);
        persistor.purge();
        window.location.reload();
    }




    const navbarArr = [
        { name: "Log out", link: false, clickFunc: logoutHandler, icon: <LogoutIcon className="text-[#d9e2f3]" style={{ fontSize: "20px" }} /> },
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