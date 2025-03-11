import React, { useContext, useState } from "react";
import EachCard from "./EachCard";
import { DraggCardContext } from "../../../Contexts/DraggCardContext";

const CardLists = ({
    listId,
    cardsData,
}: {
    listId: number;
    cardsData: any;
}) => {
    const { setCardDragging, setlistCardDragging } = useContext(DraggCardContext);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, cardId: number, listId: number) => {
        setCardDragging(cardId)
        setlistCardDragging(listId)
        event.dataTransfer.setData("cardId", cardId.toString());
    };

    return (
        <div>
            {cardsData?.map((card: any, ind: number) => (
                <EachCard
                    inListId={listId}
                    ids={ind}
                    key={ind}
                    data={card}
                    onDragStart={handleDragStart}
                />
            ))}
        </div>
    );
};

export default CardLists;
