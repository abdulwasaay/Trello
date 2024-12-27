import { useDispatch, useSelector } from "react-redux";
import MainBoard from "../Components/DynamicBoard/MainBoard"
import SideBarLatest from "../Components/Navbar/SideBar"
import { useParams } from "react-router";
import NotFound from "../Components/ErrorPages/NotFound";
import { useContext, useEffect } from "react";
import { WorkSpaceObjContext } from "../Contexts/WorkSpaceData";
import getLists from "../Redux/Actions/Middlewares/Lists/GetLists";
import apiErrors from "../Constants/apiErrors";
import DeleteCookieValue from "../Utils/DeleteCookieHandler";
import authCookie from "../Constants/cookieName";
import { sessionModalContext } from "../Contexts/SessionErrContext";
import { setListsData } from "../Redux/Slices/Lists";

const BoardDynamicLayout = () => {
    const { workSpaces } = useSelector((state: any) => state.workspaceSlice);
    const { id, boardId } = useParams();
    const ids = id && parseInt(id);
    const boardIds = boardId && parseInt(boardId);
    const isWorkSpaceFound = workSpaces && workSpaces?.length && workSpaces.find((work: any) => work?.workSpace_Id === ids);
    const isBoardFound = isWorkSpaceFound && isWorkSpaceFound?.boards.find((board: any) => board?.id === boardIds);
    const { setWorkSpaceObj, setBoardObjs } = useContext(WorkSpaceObjContext);
    const { setSessionIsOpen, setErrText } = useContext(sessionModalContext);
    const dispatch: any = useDispatch();

    const GetLists = (boardId: any) => {

        const onGetListsSuccess = (data: any) => {
            dispatch(setListsData(data))
        }

        const onGetListsFail = (message: string, response: any) => {
            if (response?.status === 401) {
                if (message && message === apiErrors?.authErr) {
                    setErrText(message);
                    setSessionIsOpen(true)
                } else {
                    DeleteCookieValue(authCookie);
                    window.location.reload();
                }
            }
        }

        dispatch(getLists({ boardId, onGetListsSuccess, onGetListsFail }))
    }

    useEffect(() => {
        setWorkSpaceObj(isWorkSpaceFound)
        setBoardObjs(isBoardFound)
        GetLists(boardIds)
    }, [boardId, id])

    if (!isWorkSpaceFound || !isBoardFound) {
        return <NotFound />
    }
    return (
        <div className="flex w-full h-full bg-[#7979eb] bg-opacity-80 pt-[63px] overflow-hidden">
            <SideBarLatest
            />
            <MainBoard />
        </div>
    )
}

export default BoardDynamicLayout