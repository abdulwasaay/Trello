import HomeComp from "../Components/HomeComp/HomeComp"
import BoardsBar from "../Components/Navbar/BoardsBar"

const HomeLayout = () => {
    return (
        <div className="flex justify-center pt-28 gap-10 relative" style={{zIndex:"1"}}>
            <BoardsBar />
            <HomeComp />
        </div>
    )
}

export default HomeLayout