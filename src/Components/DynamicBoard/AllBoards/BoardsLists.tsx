import { useEffect, useRef, useState } from "react";
import "./AllBoardStyles.css";
import EachList from "./EachList";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from "../../CustomButtonComp/CustomButton";

const BoardsListsLatest = () => {
    const [taskLists, setTaskLists] = useState([
        { name: "Initial Mock" },
        { name: "Priority" },
        { name: "Initial Mock2" },
        { name: "Priority3" },
        { name: "Priority4" },
        { name: "Initial Mock5" },
        { name: "Priority6" },
        { name: "Priority7" },
        { name: "Initial Mock8" },
        { name: "Priority9" },
    ]);

    const [isMakeList, setIsMakeList] = useState<boolean>(false);
    const [listInput, setListInput] = useState<string>("");
    const addListRef: any = useRef(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

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

    const closeListMenu = (e: any) => {
        if (addListRef.current && !addListRef.current.contains(e.target)) {
            setIsMakeList(false)
        }
    }

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggingIndex(index);
        event.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
        event.preventDefault(); // Allow dropping

        // Move the dragged item automatically when over another list
        if (draggingIndex !== null && draggingIndex !== targetIndex) {
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
        const updatedTaskLists = [...taskLists];
        const [draggedItem] = updatedTaskLists.splice(draggingIndex, 1); // Remove dragged item
        updatedTaskLists.splice(targetIndex, 0, draggedItem); // Insert at target position

        setTaskLists(updatedTaskLists); // Save the state
        setDraggingIndex(null); // Clear dragging state

    };

    const handleDragEnd = () => {
        setDraggingIndex(null); // Clear dragging state on drag end

    };

    const updateTaskList = (index: number, name: string) => {
        const updatedTaskLists = [...taskLists];
        updatedTaskLists[index].name = name;
        setTaskLists(updatedTaskLists);
    };

    const addListHandler = (e: any) => {
        e.preventDefault();
        if (listInput.length > 0) {
            setTaskLists([...taskLists, { name: listInput }]);
            setListInput("");
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
                        <CustomButton text={"Add list"} onButtonClick={addListHandler} />
                        <button onClick={() => setIsMakeList(false)} className=" hover:bg-[#616161] pl-2 pr-2 rounded-md"><CloseIcon style={{ color: "#aab5ca" }} /></button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full pt-4 pb-4 overflow-x-auto flex-nowrap">
            <div className="flex h-full">
                {taskLists.map((list, index) => (
                    <EachList
                        key={index}
                        ids={index}
                        dragOverHandler={handleDragOver}
                        dropHandler={handleDrop}
                        dragStartHandler={handleDragStart}
                        dragEndHandler={handleDragEnd}
                        items={list}
                        dragIndex={draggingIndex}
                        updateTaskList={updateTaskList} // Pass the function
                    />
                ))}
                {isMakeList ? (
                    addListUI()
                ) : (
                    <div className="pl-4 w-[300px] pr-4">
                        <div
                            className="w-[250px] min-w-[250px] border rounded-md"
                        ><CustomButton text={<span className=" flex gap-1 items-center "><AddIcon style={{ fontSize: "19px", marginTop: "-1px" }} /> Add another List</span>} styles={{ width: "100%", backgroundColor: "#ffffff3d", boxShadow: "none", color: "#FFFFFF" }} onButtonClick={() => setIsMakeList(true)} /></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardsListsLatest;
