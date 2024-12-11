import { useState } from "react";
import CustomButton from "../../CustomButtonComp/CustomButton"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

type EachListProps = {
    ids: number,
    dragOverHandler: (event: any, index: number) => void,
    dropHandler: (event: any, index: number) => void,
    dragIndex: number | null,
    listTask: any;
    dragStartHandler: (event: any, index: number) => void,
    dragEndHandler: () => void,
    items: any
}

const EachList = ({
    ids,
    dragOverHandler,
    dropHandler,
    dragIndex,
    dragStartHandler,
    dragEndHandler,
    items,
    listTask
}: EachListProps) => {
    const [positionListStyle, setPositionListStyle] = useState<string>("");
    const [isMakeList, setIsMakeList] = useState<boolean>(false);

    const createCardHandler = (event: any) => {
        // Check if the click happened directly on the parent div
        if (event.target === event.currentTarget) {
            const divRect = event.currentTarget.getBoundingClientRect(); // Get the bounding box of the div
            const clickX = event.clientX - divRect.left; // Calculate X position relative to the div
            const divWidth = divRect.width; // Get the width of the div

            if (clickX < divWidth / 2) {
                setPositionListStyle("left")
            } else {
                setPositionListStyle("right")
            }
        }
    }


    return (
        <>
            {positionListStyle === "left" && <p>sa</p>}
            <div
                key={ids}
                style={{ position: "relative", zIndex: "1" }}
                onDoubleClick={createCardHandler}
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
                    <p className="text-[#aab5ca] text-md font-medium pl-4 pr-4 pt-2 pb-2">{items.name}</p>
                    <CustomButton text={<span className=" flex gap-1 items-center "><AddIcon style={{ fontSize: "19px", marginTop: "-1px" }} /> Add a card</span>} styles={{ width: "100%", paddingLeft: "10px", background: "none", boxShadow: "none", marginTop: "5px", color: "#aab5ca", fontWeight: "bold", textTransform: "none", justifyContent: "left" }} isCustomHover onButtonClick={() => console.log("")} />
                    {/* <button className="text-[#aab5ca] text-md font-medium pl-4 pr-4 pt-2 pb-2 border">sa</button> */}
                </div>
            </div>
            {positionListStyle === "right" && <p>sa</p>}
            {isMakeList ? (
                <div
                    className="w-[300px] min-w-[300px] pl-4 pr-4">
                        <div className="bg-[#2e2e2e] p-2 rounded-md">
                            <input type="text" placeholder="Enter list name..." className="w-full h-[32.5px] bg-[#616161] rounded-md border-[1px] border-[#aab5ca] pl-2 text-[#aab5ca] font-medium text-sm placeholder:text-[#aab5ca] outline-none"/>
                            <div className="mt-3 flex gap-1">
                                <CustomButton text={"Add list"} onButtonClick={() => console.log("Ds")}/>
                                    <button onClick={()=> setIsMakeList(false)} className=" hover:bg-[#616161] pl-2 pr-2 rounded-md"><CloseIcon style={{color:"#aab5ca"}}/></button>
                            </div>
                        </div>
                </div>
            ) : (
                ids === (listTask?.length - 1) && <div className="pl-4 w-[300px] pr-4">
                    <div
                        className="w-[250px] min-w-[250px] border rounded-md"
                    ><CustomButton text={<span className=" flex gap-1 items-center "><AddIcon style={{ fontSize: "19px", marginTop: "-1px" }} /> Add another List</span>} styles={{ width: "100%", backgroundColor: "#ffffff3d", boxShadow: "none", color: "#FFFFFF" }} onButtonClick={() => setIsMakeList(true)} /></div>
                </div>
            )}
        </>
    )
}

export default EachList