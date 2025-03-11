import AttendencePageLatest from "../Pages/AttendencePage";
import BoardDynamicLayout from "../Pages/BoardDynamicLayout";
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
    },
    {
        comp: BoardDynamicLayout,
        routeLink: routeLinks?.dynamicBoard,
        isHideNav: false,
    },
    {
        comp: AttendencePageLatest,
        routeLink: routeLinks?.attendence,
        isHideNav: false,
    }
]

export default privateRoutes