import { DndContext } from "@dnd-kit/core"
import BoardTopBar from "../Boards/BoardTopBar"
import BoardsListsLatest from "./AllBoards/BoardsLists"

const MainBoard = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <BoardTopBar />
            <DndContext>
                <BoardsListsLatest />
            </DndContext>
        </div>
    )
}

export default MainBoard