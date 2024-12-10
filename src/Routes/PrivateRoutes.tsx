// import { useEffect } from "react"

import { useEffect } from "react"
import { useNavigate } from "react-router"
import routeLinks from "./RouteLinks"
import NavbarLatest from "../Components/Navbar/NavbarLatest"
import WorkSpaceModal from "../Components/WorkSpaces/Workspaces"

const ProtectedRoutes = ({ children, isAuth, hideNav, navArr }: { children: any, isAuth: boolean, hideNav: boolean, navArr: any }) => {
    console.log(navArr)
    const navigate = useNavigate()
    useEffect((): any => {
        if (!isAuth) {
            return navigate(routeLinks?.login)
        }
    }, [isAuth])

    return <div className="w-full h-full">
        {!hideNav && <NavbarLatest tabs={navArr}/>}
        <WorkSpaceModal />
        <div className=" w-full h-full" >
            {children}
        </div>
    </div>
}

export default ProtectedRoutes