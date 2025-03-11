import React, { useContext, useEffect, useRef } from "react";
import "./AllCards.css"
import { DraggCardContext } from "../../../Contexts/DraggCardContext";

interface EachCardProps {
    ids: number;
    data: any;
    onDragStart: (event: React.DragEvent<HTMLDivElement>, cardId: number, listId: number) => void;
    inListId: number;
}

const EachCard: React.FC<EachCardProps> = ({ data, onDragStart, ids, inListId }) => {
    const { cardDragging, listCardDragging, setCardDragging, setlistCardDragging } = useContext(DraggCardContext);
    const dragRef = useRef<HTMLDivElement>(null);
    const isDraggStyle = listCardDragging === inListId ? cardDragging === ids ? "draggingCard" : "" : "";
    // useEffect(()=>{
    //     console.log(isDraggStyle , "drags")
    // },[cardDragging])

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        if (dragRef.current) {
            onDragStart(event, ids, inListId);
            const rect = dragRef.current.getBoundingClientRect();
            const dragImage = dragRef.current.cloneNode(true) as HTMLElement;

            // Temporarily append the drag image to the body
            dragImage.style.position = "absolute";
            dragImage.style.top = "-9999px"; // Move it off-screen
            dragImage.style.width = "270px"; // Move it off-screen

            document.body.appendChild(dragImage);

            // Calculate cursor offset relative to the element
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;

            // Set the drag image with correct offsets
            event.dataTransfer.setDragImage(dragImage, offsetX, offsetY);

            // Clean up the drag image after dragging starts
            setTimeout(() => document.body.removeChild(dragImage), 0);
        }
    };


    return (
        <div
            ref={dragRef}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={() => console.log("drags")}
            onDrop={() => console.log("drags")}
            className={`bg-[#616161] mt-2 mb-2 rounded-md p-2 cursor-pointer draggableCard ${isDraggStyle}`}
        >
            <h1 className="text-[#aab5ca] text-md font-medium break-words">{data?.title}</h1>
        </div>
    );
}

export default EachCard