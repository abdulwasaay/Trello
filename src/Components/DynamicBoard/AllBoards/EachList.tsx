import { useContext, useEffect, useRef, useState } from "react";
import CustomButton from "../../CustomButtonComp/CustomButton"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import adminUserCheck from "../../../Constants/allConstants";
import { useDispatch, useSelector } from "react-redux";
import addCard from "../../../Redux/Actions/Middlewares/Cards/AddCards";
import apiErrors from "../../../Constants/apiErrors";
import DeleteCookieValue from "../../../Utils/DeleteCookieHandler";
import authCookie from "../../../Constants/cookieName";
import { sessionModalContext } from "../../../Contexts/SessionErrContext";
import { toast } from "react-toastify";
import getLists from "../../../Redux/Actions/Middlewares/Lists/GetLists";
import { setListsData } from "../../../Redux/Slices/Lists";
import { WorkSpaceObjContext } from "../../../Contexts/WorkSpaceData";
import CardLists from "../AllCards/CardsLists";
import editList from "../../../Redux/Actions/Middlewares/Lists/EditLists";
import { DraggCardContext } from "../../../Contexts/DraggCardContext";

type EachListProps = {
    ids: number,
    dragOverHandler: (event: any, index: number) => void,
    dropHandler: (event: any, index: number) => void,
    dragIndex: number | null,
    dragStartHandler: (event: any, index: number) => void,
    dragEndHandler: () => void,
    taskList: any;
    items: any,
    setTaskList: (updList: any) => void;
    // updateCards: (listId: number, draggedCardId: string, updatedCards: any) => void
}

const EachList = ({
    ids,
    dragOverHandler,
    dropHandler,
    dragIndex,
    dragStartHandler,
    dragEndHandler,
    taskList,
    setTaskList,
    items,
    // updateCards // New prop to update the taskLists state
}: EachListProps) => {

    const { user } = useSelector((state: any) => state.authSlice);
    const listId = items && items?.id;
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isAddCard, setIsAddCard] = useState<boolean>(false);
    const [cardDescript, setCardDescript] = useState<string>("");
    const { setSessionIsOpen, setErrText } = useContext(sessionModalContext);
    const { listCardDragging, cardDragging, setCardDragging, setlistCardDragging } = useContext(DraggCardContext);
    const role = user && user?.role;
    const isAdmin = role === adminUserCheck?.isAdmin;
    const dispatch: any = useDispatch();
    const { boardObjs } = useContext(WorkSpaceObjContext);
    const boardId = boardObjs && boardObjs?.id
    const [isText, setIsText] = useState<string>("");
    const isDraggStyle = listCardDragging === ids ? "border-[3px] border-[#74ccf7]" : "";
    const [taskLis, setTaskLis] = useState("");

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const addCardRef: any = useRef(null);

    useEffect(() => {
        document.addEventListener("mouseup", closeCardMenu);
        return () => {
            document.removeEventListener("mouseup", closeCardMenu);
        };
    }, []);


    useEffect(() => {
        setIsText(items?.name?.trim().toLowerCase())
    }, [items])

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height based on content
        }
    }, [cardDescript]);

    const closeCardMenu = (e: any) => {
        if (addCardRef.current && !addCardRef.current.contains(e.target)) {
            setIsAddCard(false)
        }
    }

    const GetLists = () => {

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

    const EditLists = () => {
        if (isText.trim().toLowerCase() === items?.name) {
            setIsEditable(false);
            return
        }
        if (!isText.trim().toLowerCase()) {
            setIsEditable(false);
            return
        }

        const jsonData = {
            id: listId,
            name: isText
        }

        const onEditListsSuccess = (_: any) => {
            setIsEditable(false);
            GetLists()
        }

        const onEditListsFail = (message: string, response: any) => {
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

        dispatch(editList({ jsonData, onEditListsSuccess, onEditListsFail }))
    }

    const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        EditLists()
    };

    const handleKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            EditLists()
        }
    }

    const addCardHandler = () => {
        if (cardDescript.length > 0) {
            const formData = new FormData();
            formData.append("list_id", listId);
            formData.append("name", cardDescript)
            formData.append("description", "")

            const onAddCardsSuccess = (data: any) => {
                GetLists();
                toast.success(data?.message);
            }

            const onAddCardsFail = (message: string, response: any) => {
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

            dispatch(addCard({ formData, onAddCardsSuccess, onAddCardsFail }))
        }
    }

    const listUpdateHandler = (updatedLists: any, draggedCard: any) => {
        return updatedLists.map((list: any, index: number) => {
            if (index === listCardDragging) {
                // Create a shallow copy of the source list and its cards
                return {
                    ...list,
                    cards: list.cards.filter((_: any, cardIndex: number) => cardIndex !== cardDragging)  // Remove dragged card
                };
            }

            if (index === ids) {
                // Create a shallow copy of the target list and its cards
                return {
                    ...list,
                    cards: [...list.cards, draggedCard]  // Add dragged card to the target list
                };
            }

            return list;
        });
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        dragOverHandler(event, ids);
        if (listCardDragging !== null && listCardDragging !== ids) {
            // Handle adding the card to this list(even if the list is empty)
            // Make a copy of the current task lists.
            const updatedLists = [...taskList];

            // Get the list of cards for the initial list and target list.
            const sourceCards = [...updatedLists[listCardDragging].cards];
            const targetCards = [...updatedLists[ids].cards];

            // Remove the dragged card from the source list.
            const [draggedCard] = sourceCards.splice(cardDragging, 1);

            // Add the dragged card to the end of the target list.
            targetCards.push(draggedCard);

            const updatedList = listUpdateHandler(updatedLists, draggedCard);

            // // Update the state with the new task lists.
            // console.log(updatedLists , "lists")
            setTaskList(updatedList);

            // Update the dragging list state to the target list.
            setlistCardDragging(ids);
            setCardDragging(targetCards.length - 1)
        }
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        dropHandler(event, ids);
        console.log("dragCard" , "drags")
        // if (listCardDragging !== null && listCardDragging !== ids) {
        //     // Handle adding the card to this list(even if the list is empty)
        //     // Make a copy of the current task lists.
        //     const updatedLists = [...taskList];

        //     // Get the list of cards for the initial list and target list.
        //     const sourceCards = [...updatedLists[listCardDragging].cards];
        //     const targetCards = [...updatedLists[ids].cards];

        //     // Remove the dragged card from the source list.
        //     const [draggedCard] = sourceCards.splice(cardDragging, 1);

        //     // Add the dragged card to the end of the target list.
        //     targetCards.push(draggedCard);

        //     const updatedList = listUpdateHandler(updatedLists, draggedCard);

        //     // // Update the state with the new task lists.
        //     // console.log(updatedLists , "lists")
        //     setTaskList(updatedList);

        // } else {
        //     setlistCardDragging(null);
        //     setCardDragging(null)
        // }
    };

    const addCardUI = () => {
        return (
            <div
                className="w-[300px] min-w-[300px] pr-7">
                <div className="bg-[#2e2e2e] p-2  rounded-md" ref={addCardRef}>
                    <textarea
                        ref={textareaRef}
                        placeholder="Enter a title or paste a link"
                        value={cardDescript}
                        className="w-full h-[60.5px] min-h-[60.5px] max-h-[256px] m-0 pt-[6px] pb-[6px] pl-[12px] pr-[12px] overflow-hidden text-wrap bg-[#616161] rounded-md border-[1px] border-[#aab5ca]  text-[#aab5ca] font-medium text-sm placeholder:text-[#aab5ca] outline-none resize-none"
                        onChange={(e: any) => setCardDescript(e.target.value)}
                    />
                    {/* <input type="text" placeholder="Enter list name..." value={listInput} className="w-full h-[32.5px] bg-[#616161] rounded-md border-[1px] border-[#aab5ca] pl-2 text-[#aab5ca] font-medium text-sm placeholder:text-[#aab5ca] outline-none" onChange={(e: any) => setListInput(e.target.value)} /> */}
                    <div className="mt-2 flex gap-1">
                        <CustomButton text={"Add card"} onButtonClick={addCardHandler} />
                        <button onClick={() => setIsAddCard(false)} className=" hover:bg-[#616161] pl-2 pr-2 rounded-md"><CloseIcon style={{ color: "#aab5ca" }} /></button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            {/* {positionListStyle === "left" && <p>sa</p>} */}
            <div
                key={ids}
                style={{ position: "relative", zIndex: "1" }}
                className="w-[300px] min-w-[300px] overflow-y-auto overflow-x-hidden flex-shrink-0 pl-4"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div
                    className={`bg-[#2e2e2e] p-2 rounded-md  draggable ${dragIndex === ids ? "dragging" : ""} ${isDraggStyle}`}
                    style={{ position: "relative", zIndex: "3" }}
                >
                    <input
                        type="text"
                        placeholder=""
                        value={isText}
                        readOnly={!isEditable}
                        className="w-full text-[#aab5ca] text-md font-medium pl-4 pr-4 pt-2 pb-2 bg-[#6e6edd]"
                        onClick={() => setIsEditable(true)}
                        onKeyDown={handleKeyDown}
                        // onBlur={() => setIsEditable(false)}
                        onBlur={blurHandler}
                        onChange={(e: any) => setIsText(e.target.value)}
                        style={{
                            cursor: isEditable ? "text" : "pointer",
                            backgroundColor: isEditable ? "#35373b" : "#2e2e2e",
                            borderRadius: "10px",
                            border: isEditable ? "1px solid #6e6edd" : "none",
                            outline: "none",
                        }}
                        draggable={isAdmin && !isEditable} // Make input field draggable
                        onDragStart={(event: any) => {
                            if (isAdmin && !isEditable) {
                                dragStartHandler(event, ids); // Call your dragStartHandler
                                const dragElement = event.currentTarget.closest("div") as HTMLElement;

                                if (dragElement) {
                                    const rect = dragElement.getBoundingClientRect();

                                    // Calculate cursor position within the element
                                    const offsetX = event.clientX - rect.left;
                                    const offsetY = event.clientY - rect.top;

                                    // Set the drag image using calculated offsets
                                    event.dataTransfer.setDragImage(dragElement, offsetX, offsetY);
                                }
                            }
                        }}
                        onDragEnd={dragEndHandler} // Call your dragEndHandler
                    />
                    <CardLists
                        listId={ids}
                        cardsData={items?.cards}
                    />
                    {
                        isAdmin && (
                            isAddCard ? (
                                addCardUI()
                            ) : (
                                <CustomButton text={<span className=" flex gap-1 items-center "><AddIcon style={{ fontSize: "19px", marginTop: "-1px" }} /> Add a card</span>} styles={{ width: "100%", paddingLeft: "10px", background: "none", boxShadow: "none", marginTop: "5px", color: "#aab5ca", fontWeight: "bold", textTransform: "none", justifyContent: "left" }} isCustomHover onButtonClick={() => setIsAddCard(true)} />
                            )
                        )
                    }
                    {/* <button className="text-[#aab5ca] text-md font-medium pl-4 pr-4 pt-2 pb-2 border">sa</button> */}
                </div>
            </div>
            {/* {positionListStyle === "right" && <p>sa</p>} */}
        </>
    )
}

export default EachList