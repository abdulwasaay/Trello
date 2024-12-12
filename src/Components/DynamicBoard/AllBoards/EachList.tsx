import { useEffect, useRef, useState } from "react";
import CustomButton from "../../CustomButtonComp/CustomButton"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

type EachListProps = {
    ids: number,
    dragOverHandler: (event: any, index: number) => void,
    dropHandler: (event: any, index: number) => void,
    dragIndex: number | null,
    dragStartHandler: (event: any, index: number) => void,
    dragEndHandler: () => void,
    items: any,
}

const EachList = ({
    ids,
    dragOverHandler,
    dropHandler,
    dragIndex,
    dragStartHandler,
    dragEndHandler,
    items,
    updateTaskList, // New prop to update the taskLists state
}: EachListProps & { updateTaskList: (index: number, name: string) => void }) => {

    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isAddCard, setIsAddCard] = useState<boolean>(false);
    const [cardDescript, setCardDescript] = useState<string>("");


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // Update the taskLists state in the parent component
        updateTaskList(ids, newValue);
    };
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const addCardRef: any = useRef(null);

    useEffect(() => {
        document.addEventListener("mouseup", closeCardMenu);
        return () => {
            document.removeEventListener("mouseup", closeCardMenu);
        };
    }, []);

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
                        <CustomButton text={"Add card"} onButtonClick={() => console.log("sd")} />
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
                className="w-[300px] min-w-[300px] overflow-auto flex-shrink-0 pl-4"
                onDragOver={(event) => dragOverHandler(event, ids)}
                onDrop={(event) => dropHandler(event, ids)}
            >
                <div
                    className={`bg-[#2e2e2e] p-2 rounded-md  draggable ${dragIndex === ids ? "dragging" : ""}`}
                    draggable
                    style={{ position: "relative", zIndex: "3" }}
                    onDragStart={(event) => dragStartHandler(event, ids)}
                    onDragEnd={dragEndHandler}
                >
                    <input type="text"
                        draggable={false}
                        placeholder=""
                        value={items?.name}
                        readOnly={!isEditable}
                        className="w-full text-[#aab5ca] text-md font-medium pl-4 pr-4 pt-2 pb-2 bg-[#6e6edd]"
                        onFocus={() => setIsEditable(true)}
                        onBlur={() => setIsEditable(false)}
                        onChange={handleInputChange}
                        style={{
                            cursor: isEditable ? "text" : "pointer",
                            backgroundColor: isEditable ? "#35373b" : "#2e2e2e",
                            borderRadius: "10px",
                            border: isEditable ? "1px solid #6e6edd" : "none",
                            outline: "none"
                        }}
                    />
                    {
                        isAddCard ? (
                            addCardUI()
                        ) : (
                            <CustomButton text={<span className=" flex gap-1 items-center "><AddIcon style={{ fontSize: "19px", marginTop: "-1px" }} /> Add a card</span>} styles={{ width: "100%", paddingLeft: "10px", background: "none", boxShadow: "none", marginTop: "5px", color: "#aab5ca", fontWeight: "bold", textTransform: "none", justifyContent: "left" }} isCustomHover onButtonClick={() => setIsAddCard(true)} />
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