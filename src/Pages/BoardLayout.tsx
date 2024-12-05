import BoardsInner from "../Components/Boards/BoardsInnerComp"
import BoardsBar from "../Components/Navbar/BoardsBar"

const BoardLayout = () => {
    return (
        <div className="flex justify-center mt-10 gap-10">
            <BoardsBar />
            <BoardsInner />
        </div>
    )
}

export default BoardLayout