import { useState } from "react"
import BoardTopBar from "../Boards/BoardTopBar"
import BoardsListsLatest from "./AllBoards/BoardsLists"
import ShareBoard from "./AllBoards/ShareBoard";

const MainBoard = () => {
    const [isOPen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col w-full overflow-x-auto relative" style={{ zIndex: 1 }}>
            <BoardTopBar SetOPen={setIsOpen} />
            <BoardsListsLatest />
            <ShareBoard opens={isOPen} setOPen={setIsOpen} />
        </div>
    )
}

export default MainBoard