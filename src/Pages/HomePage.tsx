import HomeComp from "../Components/HomeComp/HomeComp"
import BoardsBar from "../Components/Navbar/BoardsBar"

const HomeLayout = () => {
    return (
        <div className="flex justify-center mt-10 gap-10">
            <BoardsBar />
            <HomeComp />
        </div>
    )
}

export default HomeLayout