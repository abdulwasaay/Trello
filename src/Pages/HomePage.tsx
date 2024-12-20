import HomeComp from "../Components/HomeComp/HomeComp"
import BoardsBar from "../Components/Navbar/BoardsBar"

const HomeLayout = () => {
    return (
        <div className="flex justify-center pt-28 w-full relative" style={{ zIndex: "1" }}>
            <div>
                <BoardsBar />
                <HomeComp />
            </div>
        </div>
    )
}

export default HomeLayout