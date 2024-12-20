// import { useEffect } from "react"

import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import routeLinks from "./RouteLinks"
import NavbarLatest from "../Components/Navbar/NavbarLatest"
import WorkSpaceModal from "../Components/WorkSpaces/Workspaces"
import ErrorModal from "../Components/ErrorPages/AuthErrorModal"
import LoadingNavBar from "../Components/CustomLoadingComps/LoadingNavScheleton"
import { useDispatch, useSelector } from "react-redux"
import getWorkSpace from "../Redux/Actions/Middlewares/WorkSpaces/GetWorkSpace"
import apiErrors from "../Constants/apiErrors"
import DeleteCookieValue from "../Utils/DeleteCookieHandler"
import authCookie from "../Constants/cookieName"
import { sessionModalContext } from "../Contexts/SessionErrContext"
import { setWorkSpaces } from "../Redux/Slices/workSpaces"
import GetCookieValue from "../Utils/getCookieHandler"

const ProtectedRoutes = ({ children, isAuth, hideNav, navArr }: { children: any, isAuth: boolean, hideNav: boolean, navArr: any }) => {
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const { isLoading } = useSelector((state: any) => state.getWorkSpaceSlice);
    const { setSessionIsOpen, setErrText } = useContext(sessionModalContext);
    const token = GetCookieValue(authCookie);

    const getWorkSpaces = () => {
        const onGetWorkspaceSuccess = (data: any) => {
            dispatch(setWorkSpaces(data))
        }

        const onGetWorkspaceFail = (message: string, response: any) => {
            if (response?.status === 401) {
                if (message && message === apiErrors?.authErr) {
                    setErrText(message);
                    setSessionIsOpen(true)
                } else {
                    DeleteCookieValue(authCookie);
                    window.location.reload();
                }
            }
        }

        dispatch(getWorkSpace({ onGetWorkspaceSuccess, onGetWorkspaceFail }))
    }

    useEffect(() => {
        if (token) {
            getWorkSpaces();
        }
    }, [])

    useEffect((): any => {
        if (!isAuth) {
            return navigate(routeLinks?.login)
        }
    }, [isAuth])

    if (token) {
        return <div className="w-full h-full">
            {!hideNav &&
                isLoading ? (
                <LoadingNavBar />
            ) : (
                < NavbarLatest tabs={navArr} />
            )
            }
            <WorkSpaceModal />
            <ErrorModal />
            <div className=" w-full h-full" >
                {children}
            </div>
        </div>
    } else {
        return
    }
}

export default ProtectedRoutes