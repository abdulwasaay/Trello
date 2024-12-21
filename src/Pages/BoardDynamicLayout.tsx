import { useSelector } from "react-redux";
import MainBoard from "../Components/DynamicBoard/MainBoard"
import SideBarLatest from "../Components/Navbar/SideBar"
import { useParams } from "react-router";
import NotFound from "../Components/ErrorPages/NotFound";

const BoardDynamicLayout = () => {
    const { workSpaces } = useSelector((state: any) => state.workspaceSlice);
    const { id, boardId } = useParams();
    const ids = id && parseInt(id);
    const boardIds = boardId && parseInt(boardId);
    const isWorkSpaceFound = workSpaces && workSpaces?.length && workSpaces.find((work: any) => work?.workSpace_Id === ids);
    const isBoardFound = isWorkSpaceFound && isWorkSpaceFound?.boards.find((board: any) => board?.id === boardIds);

    if (!isWorkSpaceFound || !isBoardFound) {
        return <NotFound />
    }
    return (
        <div className="flex w-full h-full bg-[#7979eb] bg-opacity-80 pt-[63px] overflow-hidden">
            <SideBarLatest
                workSpaceObj={isWorkSpaceFound}
            />
            <MainBoard />
        </div>
    )
}

export default BoardDynamicLayout