// import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"

import { useEffect } from "react"
import { useNavigate } from "react-router"

const PublicRoutes = ({ children, isAuth }: { children: any, isAuth: Boolean }) => {
    const navigate = useNavigate()
    useEffect((): any => {
        if (isAuth) {
            return navigate("/boards")
        }
    }, [isAuth])

    return children
}

export default PublicRoutes