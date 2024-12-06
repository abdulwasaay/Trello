import { Link } from "react-router";
import CustomButton from "../CustomButtonComp/CustomButton";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from "react";
import { basename } from "../../config/env";
import InputWithDropdown from "../InputFields/InputWithDropDown";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const NavbarLatest = () => {
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([
        { title: "WDS-Development", description: "Production Workspace" },
        { title: "WDS-Design", description: "Design Workspace" },
    ]);

    const imgSource = hovered ? "https://trello.com/assets/87e1af770a49ce8e84e3.gif" : "https://trello.com/assets/d947df93bc055849898e.gif";

    const handleFocusHandler = () => {
        setFocused(true);
    };

    const handleBlurHandler = () => {
        // Optionally, delay to allow clicks inside the dropdown
        setTimeout(() => setFocused(false), 200);
    };

    const handleSearchChangeHandler = (val: string) => {
        setSearchQuery(val);
        // Optionally filter search results dynamically
    };

    return (
        <nav className=" border-b-[1px] border-b-[#58595a] pt-3 pb-3 pl-6 pr-3 flex justify-between items-center">
            <div className="flex items-center gap-10">
                <Link
                    to={"/"}
                    className="pl-3 pr-3 pt-2 pb-2 rounded-sm hover:bg-[#363636]"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <img src={imgSource} alt="imgsource" className="w-20 opacity-60" />
                </Link>
                <CustomButton text={"Create"} onButtonClick={() => console.log("Create clicked")} styles={{ fontWeight: "bold" }} />
            </div>
            <div className="flex items-center justify-end gap-3 w-full">
                <InputWithDropdown
                    searchValue={searchQuery}
                    handleFocus={handleFocusHandler}
                    handleBlur={handleBlurHandler}
                    classParent={`${focused ? "w-[50%]" : ""}`}
                    classes="bg-[#1D2125] text-[#aab5ca] pt-[6px] pb-[6px] font-medium placeholder:text-[#aab5ca] w-full"
                    isSearchIcon={true}
                    isDropdown
                    styles={{
                        border: `1px solid #aab5ca`,
                        outline: "none",
                        borderRadius: "5px",
                    }}
                    handleSearchChange={handleSearchChangeHandler}
                >
                    {focused && (
                        <div className="absolute bg-[#292b30] w-full max-h-[50vh] overflow-auto mt-3 rounded-md border border-[#58595a] pt-2 pb-4 text-white z-10">
                            <p className="text-sm font-normal mb-2 text-[#aab5ca] ml-5">RECENT BOARDS</p>
                            {searchResults
                                .filter(result => result.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((result, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 pt-2 pb-2 pl-5 pr-2 hover:bg-[#3c3c47] cursor-pointer border-b-[1px] border-b-[#8c8d8f]"
                                    >
                                        <img
                                            src={`${basename}assets/images/loginscreen1.PNG`}
                                            alt="loginscreen1"
                                            className="w-8 h-8 opacity-60 rounded-sm"
                                        />
                                        <div>
                                            <h3 className="font-medium text-[#cad1df]">{result.title}</h3>
                                            <p className="text-sm text-[#aab5ca]">{result.description}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </InputWithDropdown>
                <NotificationsIcon className="rotate-45 text-[#aab5ca]" />
                <HelpOutlineIcon className="text-[#aab5ca]" />
                <p className="bg-[blue] text-[11px] font-bold w-6 h-6 flex justify-center items-center rounded-full">D</p>
            </div>
        </nav>
    );
};

export default NavbarLatest;
