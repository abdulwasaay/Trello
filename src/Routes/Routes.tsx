import BoardLayout from "../Pages/BoardLayout";
import HomeLayout from "../Pages/HomePage";
import routeLinks from "./RouteLinks";

const privateRoutes = [
    {
        comp: HomeLayout,
        routeLink: routeLinks?.home,
        isHideNav: false,
    },
    {
        comp: BoardLayout,
        routeLink: routeLinks?.boards,
        isHideNav: false,
    }
]

export default privateRoutes