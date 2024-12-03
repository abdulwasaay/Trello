// import { useEffect } from "react"

import { useEffect } from "react"
import { useNavigate } from "react-router"
import routeLinks from "./RouteLinks"

const ProtectedRoutes = ({ children, isAuth, hideNav, navArr }: { children: any, isAuth: boolean, hideNav: boolean, navArr: any }) => {
    console.log(navArr)
    const navigate = useNavigate()
    useEffect((): any => {
        if (!isAuth) {
            return navigate(routeLinks?.login)
        }
    }, [isAuth])

    return <div className="">
        {!hideNav && <h1>ds</h1>}
        <div className="" >
            {children}
        </div>
    </div>
}

export default ProtectedRoutes