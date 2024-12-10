import MainBoard from "../Components/DynamicBoard/MainBoard"
import SideBarLatest from "../Components/Navbar/SideBar"

const BoardDynamicLayout = () => {
    return (
        <div className="flex w-full h-full bg-[pink]">
            <SideBarLatest
            />
            <MainBoard />
        </div>
    )
}

export default BoardDynamicLayout