import { useState } from "react";
import "./AllBoardStyles.css";
import CustomButton from "../../CustomButtonComp/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import EachList from "./EachList";

const BoardsListsLatest = () => {
    const [taskLists, setTaskLists] = useState([
        { name: "Initial Mock" },
        { name: "Priority" },
        { name: "Initial Mock" },
        { name: "Priority" },
        { name: "Priority" },
        { name: "Initial Mock" },
        { name: "Priority" },
        { name: "Priority" },
        { name: "Initial Mock" },
        { name: "Priority" },
    ]);

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

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
                        listTask={taskLists}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoardsListsLatest;
