// import { useEffect } from "react"

import { useEffect } from "react"
import { useNavigate } from "react-router"
import routeLinks from "./RouteLinks"
import NavbarLatest from "../Components/Navbar/NavbarLatest"

const ProtectedRoutes = ({ children, isAuth, hideNav, navArr }: { children: any, isAuth: boolean, hideNav: boolean, navArr: any }) => {
    console.log(navArr)
    const navigate = useNavigate()
    useEffect((): any => {
        if (!isAuth) {
            return navigate(routeLinks?.login)
        }
    }, [isAuth])

    return <div className="">
        {!hideNav && <NavbarLatest />}
        <div className="" >
            {children}
        </div>
    </div>
}

export default ProtectedRoutes