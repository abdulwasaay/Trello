import { useState } from "react"
import { basename } from "../../config/env"

const RecentBoards = () => {
    const [boardSelected, setBoardSelected] = useState<string>("Boards");

    const boardArr = [
        { name: "Boards" },
        { name: "Home" },
    ]

    const dynamicBoardEnum: any = {
        Boards: <p className="text-[white]">Board</p>,
        Home: <p className="text-[white]">Home</p>
    }

    const BoardSelecterFunc = (val: string) => {
        setBoardSelected(val)
    }

    return (
        <div className="w-full">
            <div className="flex justify-center border-b-[]">
                <div className="flex flex-col gap-3 border-b-[1px] border-b-[#8c8d8f] pb-7">
                    {
                        boardArr.map((ele: any, ind: number) => {
                            return (
                                <div key={ind} onClick={() => BoardSelecterFunc(ele?.name)} className={`${boardSelected === ele?.name ? "text-[white] bg-blue-500 " : "text-[#aab5ca] hover:bg-[#515164]"}  flex items-center gap-2  w-56 p-2 rounded-md cursor-pointer `}>
                                    <img src={`${basename}assets/images/trelloHome.png`} alt="" className=" w-4 opacity-100" style={{ filter: "brightness(100%)" }} />
                                    <p>{ele?.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {dynamicBoardEnum[boardSelected]}
                </div>
            </div>
        </div>
    )
}

export default RecentBoards