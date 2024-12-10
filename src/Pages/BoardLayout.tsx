import BoardsInner from "../Components/Boards/BoardsInnerComp"
import BoardsBar from "../Components/Navbar/BoardsBar"

const BoardLayout = () => {
    return (
        <div className="flex justify-center relative pt-28 gap-10" style={{zIndex:"1"}}>
            <BoardsBar />
            <BoardsInner />
        </div>
    )
}

export default BoardLayout