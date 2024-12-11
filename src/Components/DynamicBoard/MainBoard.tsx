import BoardTopBar from "../Boards/BoardTopBar"
import BoardsListsLatest from "./AllBoards/BoardsLists"

const MainBoard = () => {
    return (
        <div className="flex flex-col w-full overflow-x-auto relative" style={{zIndex:1}}>
            <BoardTopBar />
            <BoardsListsLatest />
        </div>
    )
}

export default MainBoard