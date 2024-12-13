import { memo } from "react"
import PublicRoutes from "../../Routes/PublicRoutes"
import { Route, Routes } from "react-router"
import NotFound from "../../Components/ErrorPages/NotFound"
import routeLinks from "../../Routes/RouteLinks"
import LoginComp from "../../Components/LoginComp/Login"
import { useDispatch, useSelector } from "react-redux"
import onLogin from "../../Redux/Actions/Middlewares/Login"
import { toast } from "react-toastify"
import { onLoginReducer } from "../../Redux/Slices/authSlice"
import SetCookie from "../../Utils/setCookieHandler"

const Auth = () => {
    const { isAuth } = useSelector((state: any) => state.authSlice);
    const dispatch: any = useDispatch()

    const onLoginHandler = (formData: any) => dispatch(onLogin({ formData, onLoginSuccess, onFail }));


    const onLoginSuccess = (data: any) => {
        toast.success(data?.message);
        const userInfo = data?.data;
        const userPayload = {
            id: userInfo?.id,
            name: userInfo?.name,
            email: userInfo?.email,
            role: userInfo?.role,
        }
        SetCookie("token", data?.token, 30);
        dispatch(onLoginReducer(userPayload));
    }

    const onFail = (message: string) => {
        toast.error(message)
    }

    return (
        <Routes>
            <Route
                path={routeLinks?.login}
                element={
                    <PublicRoutes isAuth={isAuth}>
                        <LoginComp submitHandler={onLoginHandler} />
                    </PublicRoutes>
                }
            />

            <Route path="*" Component={NotFound} />
        </Routes>
    )
}

export default memo(Auth)