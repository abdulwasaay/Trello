import { useContext, useEffect, useRef, useState } from "react";
import "./AllBoardStyles.css";
import EachList from "./EachList";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from "../../CustomButtonComp/CustomButton";
import { WorkSpaceObjContext } from "../../../Contexts/WorkSpaceData";
import { useDispatch, useSelector } from "react-redux";
import addList from "../../../Redux/Actions/Middlewares/Lists/AddLists";
import apiErrors from "../../../Constants/apiErrors";
import { toast } from "react-toastify";
import DeleteCookieValue from "../../../Utils/DeleteCookieHandler";
import authCookie from "../../../Constants/cookieName";
import { sessionModalContext } from "../../../Contexts/SessionErrContext";
import adminUserCheck from "../../../Constants/allConstants";
import { setListsData } from "../../../Redux/Slices/Lists";
import getLists from "../../../Redux/Actions/Middlewares/Lists/GetLists";
import moveLists from "../../../Redux/Actions/Middlewares/Lists/move";

const BoardsListsLatest = () => {
    const { lists } = useSelector((state: any) => state.listsSlice);
    const [taskLists, setTaskLists] = useState([
    ]);

    useEffect(() => {
        setTaskLists(lists)
    }, [lists])

    const { user } = useSelector((state: any) => state.authSlice);
    const [isMakeList, setIsMakeList] = useState<boolean>(false);
    const [listInput, setListInput] = useState<string>("");
    const addListRef: any = useRef(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [apiData, setApiData] = useState<any>({});
    const { boardObjs } = useContext(WorkSpaceObjContext);
    const dispatch: any = useDispatch();
    const { setSessionIsOpen, setErrText } = useContext(sessionModalContext);
    const role = user && user?.role;
    const isAdmin = role === adminUserCheck?.isAdmin;
    const { isAddListsLoading } = useSelector((state: any) => state.addListsSlice);

    useEffect(() => {
        document.addEventListener("mouseup", closeListMenu);
        return () => {
            document.removeEventListener("mouseup", closeListMenu);
        };
    }, []);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height based on content
        }
    }, [listInput]);

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

    const moveList = (listFrom: number, listTo: number) => {
        const onMoveListSuccess = (_: any) => {
            GetLists(boardObjs && boardObjs?.id)
            setDraggingIndex(null); // Clear dragging state on drag end
            setApiData({})
        }

        const onMoveListFail = (message: string, response: any) => {
            setDraggingIndex(null); // Clear dragging state on drag end
            setApiData({})
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
        const payload = {
            id: listFrom,
            position: listTo,
            board_id: boardObjs && boardObjs?.id
        }
        dispatch(moveLists({ payload, onMoveListSuccess, onMoveListFail }))
    }

    const closeListMenu = (e: any) => {
        if (addListRef.current && !addListRef.current.contains(e.target)) {
            setIsMakeList(false)
        }
    }

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggingIndex(index);
        const listFrom = lists?.find((_: any, ind: number) => ind === index);
        setApiData({
            fromId: listFrom?.id,
            ...apiData
        })
        event.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        event.preventDefault(); // Allow dropping
        // Move the dragged item automatically when over another list
        if (draggingIndex !== null && draggingIndex !== targetIndex) {
            const listTo = lists?.find((_: any, index: number) => index === targetIndex);
            setApiData({
                ...apiData,
                toId: listTo?.position
            })
            const updatedTaskLists = [...taskLists];
            const [draggedItem] = updatedTaskLists.splice(draggingIndex, 1); // Remove dragged item
            updatedTaskLists.splice(targetIndex, 0, draggedItem); // Insert at target position
            setTaskLists(updatedTaskLists); // Update the state with new order
            setDraggingIndex(targetIndex); // Update the dragging index
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        event.preventDefault();

        if (draggingIndex === null || draggingIndex === targetIndex) return;
        // Save the final new order when dropped
        const listTo = lists?.find((_: any, index: number) => index === targetIndex);
        setApiData({
            ...apiData,
            toId: listTo?.position
        })
        const updatedTaskLists = [...taskLists];
        const [draggedItem] = updatedTaskLists.splice(draggingIndex, 1); // Remove dragged item
        updatedTaskLists.splice(targetIndex, 0, draggedItem); // Insert at target position

        setTaskLists(updatedTaskLists); // Save the state
        // setDraggingIndex(null); // Clear dragging state
    };

    const handleDragEnd = () => {
        if (!apiData.fromId || !apiData.toId) return setDraggingIndex(null)
        if (apiData.fromId === apiData.toId) return setDraggingIndex(null)
        moveList(apiData?.fromId, apiData.toId);
        // const listFrom = lists?.find((_: any, index: number) => index === draggingIndex);
        // const listTo = lists?.find((_: any, index: number) => index === targetIndex);
    };

    // const updateCards = (listId: number, draggedCardId: string, updatedCards: any) => {
    //     const newLists: any = taskLists.map((list: any) => {
    //         if (list.id === listId) {
    //             return { ...list, cards: updatedCards }; // Update the specific list's cards
    //         }
    //         return list;
    //     });

    //     setTaskLists(newLists); // Set the new lists state
    // };

    const addListHandler = (e: any) => {
        e.preventDefault();
        if (listInput.length > 0) {
            const formData = new FormData();
            formData.append("board_id", boardObjs && boardObjs?.id);
            formData.append("name", listInput)

            const onAddListsSuccess = (data: any) => {
                // setTaskLists([...taskLists, { name: listInput }]);
                GetLists(boardObjs && boardObjs?.id)
                setListInput("");
                toast.success(data?.message);
            }

            const onAddListsFail = (message: string, response: any) => {
                if (response?.status === 401) {
                    if (message && message === apiErrors?.authErr) {
                        setErrText(message);
                        setSessionIsOpen(true)
                    } else {
                        DeleteCookieValue(authCookie);
                        window.location.reload();
                    }
                } else {
                    toast.error(message)
                }
            }

            dispatch(addList({ formData, onAddListsSuccess, onAddListsFail }))
        }
    }

    const addListUI = () => {
        return (
            <div
                className="w-[300px] min-w-[300px] pl-4 pr-4">
                <div className="bg-[#2e2e2e] p-2  rounded-md" ref={addListRef}>
                    <textarea
                        ref={textareaRef}
                        placeholder="Enter list name..."
                        value={listInput}
                        className="w-full h-[32.5px] max-h-[256px] m-0 pt-[6px] pb-[6px] pl-[12px] pr-[12px] overflow-hidden text-wrap bg-[#616161] rounded-md border-[1px] border-[#aab5ca]  text-[#aab5ca] font-medium text-sm placeholder:text-[#aab5ca] outline-none resize-none"
                        onChange={(e: any) => setListInput(e.target.value)}
                    />
                    {/* <input type="text" placeholder="Enter list name..." value={listInput} className="w-full h-[32.5px] bg-[#616161] rounded-md border-[1px] border-[#aab5ca] pl-2 text-[#aab5ca] font-medium text-sm placeholder:text-[#aab5ca] outline-none" onChange={(e: any) => setListInput(e.target.value)} /> */}
                    <div className="mt-2 flex gap-1">
                        <CustomButton text={"Add list"} onButtonClick={addListHandler} customDisabledStyles={{ backgroundColor: "#616161" }} loadings={isAddListsLoading} />
                        <button onClick={() => setIsMakeList(false)} className=" hover:bg-[#616161] pl-2 pr-2 rounded-md"><CloseIcon style={{ color: "#aab5ca" }} /></button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full pt-4 pb-4 overflow-x-auto flex-nowrap">
            <div className="flex h-full">
                {taskLists?.map((list, index) => (
                    <EachList
                        key={index}
                        ids={index}
                        dragOverHandler={handleDragOver}
                        dropHandler={handleDrop}
                        dragStartHandler={handleDragStart}
                        dragEndHandler={handleDragEnd}
                        items={list}
                        taskList={taskLists}
                        setTaskList={(updList: any) => setTaskLists(updList)}
                        dragIndex={draggingIndex}
                    // updateCards={updateCards}
                    />
                ))}
                {
                    isAdmin ? (
                        isMakeList ? (
                            addListUI()
                        ) : (<div className="pl-4 w-[300px] pr-4">
                            <div
                                className="w-[250px] min-w-[250px] border rounded-md"
                            ><CustomButton text={<span className=" flex gap-1 items-center "><AddIcon style={{ fontSize: "19px", marginTop: "-1px" }} /> Add another List</span>} styles={{ width: "100%", backgroundColor: "#ffffff3d", boxShadow: "none", color: "#FFFFFF" }} onButtonClick={() => setIsMakeList(true)} /></div>
                        </div>
                        )
                    ) : (
                        <div className="pr-4"></div>
                    )
                }
            </div>
        </div>
    );
};

export default BoardsListsLatest;
