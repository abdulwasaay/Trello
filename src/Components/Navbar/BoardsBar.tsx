// text-[#579DFF]   img  bg-[#579DFF]
// bg-[#1C2B41]

import { NavLink } from "react-router";
import { basename } from "../../config/env"
import CustomButton from "../CustomButtonComp/CustomButton"
import HomeIcon from '@mui/icons-material/Home';
import "./NavStyle.css"
import WorkSpaceModal from "../WorkSpaces/Workspaces";
import { useContext } from "react";
import { ModalContext } from "../../Contexts/ModalContext";


// hover and Default
// text-[#d9e2f3] hover:bg-[#515164]   img filter brightness-200

// icon
/*<div className={`${boardSelected === ele?.name ? "text-[#579DFF]  bg-[#1C2B41]" : "text-[#d9e2f3] hover:bg-[#515164]"}  flex items-center gap-2  w-56 pt-2 pb-2  rounded-md cursor-pointer `}>
<ele.icon style={{ fontSize: "18px", color: boardSelected === ele?.name ? "#579DFF" : "#363636" }} className={`ml-[13px] ${boardSelected === ele?.name ? "text-[#579DFF] " : "text-[#d9e2f3] filter brightness-200"}`} />
<p className="text-sm ">Home</p>
</div> */

const BoardsBar = () => {
    const { setIsOpen } = useContext(ModalContext);

    const handleClose = () => setIsOpen(false);

    return (
        <div className="">
            <div className=" ">
                <div className="flex flex-col text-[#363636]">
                    <div className=" flex flex-col gap-3 border-b-[1px] border-b-[#8c8d8f] pb-4">
                        <NavLink to="/boards">
                            <div className="flex items-center gap-2  w-56 pt-2 pb-2 text-[#d9e2f3] hover:bg-[#515164] rounded-md cursor-pointer">
                                <img src={`${basename}assets/images/trelloHome.png`} alt="trelloBoards" className="w-3 ml-4 filter brightness-200" />
                                <p className="text-sm ">Boards</p>
                            </div>
                        </NavLink>
                        <NavLink to="/">
                            <div className="flex items-center gap-2  w-56 pt-2 pb-2  rounded-md cursor-pointer text-[#d9e2f3] hover:bg-[#515164]">
                                <HomeIcon style={{ fontSize: "18px" }} className="ml-[13px] text-[#363636] filter brightness-200" />
                                <p className="text-sm ">Home</p>
                            </div>
                        </NavLink>
                    </div>
                    <p className="mt-5 text-[#aab5ca] text-[13px] pl-4 font-medium">Workspaces</p>
                    <CustomButton text="+ Create a Workspace" isCustomHover onButtonClick={() => setIsOpen(true)} styles={{ background: "none", color: "#aab5ca", fontSize: "13px", paddingLeft: "15px", justifyContent: "left", textTransform: "none", marginTop: "10px", boxShadow: "none" }} />
                </div>
            </div>
            <WorkSpaceModal  onCloseHandler={handleClose} />
        </div>
    )
}

export default BoardsBar