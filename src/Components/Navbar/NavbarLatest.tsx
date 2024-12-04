import { Link } from "react-router"
import CustomButton from "../CustomButtonComp/CustomButton"
import TextInputField from "../InputFields/TextInputField"
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from "react";

const NavbarLatest = () => {
    const [hovered, setHovered] = useState(false);
    const imgSource = hovered?"https://trello.com/assets/87e1af770a49ce8e84e3.gif" : "https://trello.com/assets/d947df93bc055849898e.gif";

    return (
        <nav className=" border-b-[1px] border-b-[#8c8d8f]  pt-3 pb-3 pl-6 pr-3 flex justify-between items-center ">
            <div className="flex items-center gap-10">
                <Link to={"/"} className=" pl-3 pr-3 pt-2 pb-2 rounded-sm hover:bg-[#363636]" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                    <img src={imgSource} alt="imgsource" className="w-20 opacity-60"/>
                </Link>
                <CustomButton text={"Create"} onButtonClick={() => console.log("ds")} styles={{ fontWeight: "bold" }} />
            </div>
            <div className="flex items-center gap-3">
                <div className="relative border-none">
                    <TextInputField types="search" name="search"  placeHolder="Search" classes="bg-[black] text-[#aab5ca] font-medium placeholder:text-[#aab5ca]"  styles={{ width:"240px" ,paddingLeft:"40px" , border:`1px solid #aab5ca` , outline:"none" , borderRadius:"5px"}}/>
                    <SearchIcon className="absolute top-2 ml-3 text-[#aab5ca] "/>
                </div>
                <NotificationsIcon className=" rotate-45 text-[#aab5ca]" />
                <HelpOutlineIcon className="text-[#aab5ca]"/>
                <p className="bg-[blue] text-[11px] font-bold w-6 h-6 flex justify-center items-center rounded-full">D</p>
            </div>
        </nav>
    )
}

export default NavbarLatest