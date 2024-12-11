import MainBoard from "../Components/DynamicBoard/MainBoard"
import SideBarLatest from "../Components/Navbar/SideBar"

const BoardDynamicLayout = () => {
    return (
        <div className="flex w-full h-full bg-[#9e9ef3] pt-[63px] overflow-hidden">
            <SideBarLatest
            />
            <MainBoard />
        </div>
    )
}

export default BoardDynamicLayout