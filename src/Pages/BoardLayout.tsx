import BoardsInner from "../Components/Boards/BoardsInnerComp"
import BoardsBar from "../Components/Navbar/BoardsBar"

const BoardLayout = () => {
    return (
        <div className="flex justify-center w-full relative pt-28" style={{ zIndex: "1" }}>
            <div>
                <BoardsBar />
                <BoardsInner />
            </div>
        </div>
    )
}

export default BoardLayout