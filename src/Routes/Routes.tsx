import HomeLayout from "../Pages/HomePage";
import routeLinks from "./RouteLinks";

const privateRoutes = [
    {
        comp: HomeLayout,
        routeLink: routeLinks?.home,
        isHideNav: false
    }
]

export default privateRoutes