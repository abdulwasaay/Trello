import { Link } from "react-router";
import CustomButton from "../CustomButtonComp/CustomButton";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from "react";
import { basename } from "../../config/env";
import InputWithDropdown from "../InputFields/InputWithDropDown";
import WebIcon from '@mui/icons-material/Web';
import MenuDropDown from "../DropDownMenuButtons/menuDropdown";
import notificationsDummy from "../../dummydata";
import Notificationss from "../NotificationsComps/Notifications";

const NavbarLatest = ({ tabs }: any) => {
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [availBoards, setAvailableBoards] = useState([
        { title: "WDS-Development", description: "Production Workspace", mainHeading: "" },
        { title: "WDS-Design", description: "Design Workspace" },
    ])
    const [searchResults, setSearchResults] = useState([
        {
            mainTitle: "Cards",
            arr: [
                { title: "testcard | testcard | testcard | testcard ", description: "Design Workspace" },
                { title: "testcard | testcard | testcard | testcard | testcard", description: "Design Workspace" },
                { title: "testcard | testcard | testcard | testcard | testcard", description: "Design Workspace" },
                { title: "testcard | testcard | testcard | testcard | testcard", description: "Design Workspace" },
            ]
        }, {
            mainTitle: "Boards",
            arr: [
                { title: "WDS-Development", description: "Production Workspace", mainHeading: "" },
                { title: "WDS-Design", description: "Design Workspace" },
            ]
        }
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

    const recentBoardsMap: any = (availBoards: any) => {

        // return availBoards.filter((result: any) => result.title.toLowerCase().includes(searchQuery.toLowerCase()))
        return availBoards.map((result: any, index: number) => {
            return (
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
            )
        })
    }

    const searchFunctionality: any = (searchData: any) => {
        const filteredData = searchData?.map((section: any) => ({
            ...section,
            arr: section?.arr?.filter((item: any) =>
                item?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter((section: any) => section?.arr?.length > 0);
        return filteredData?.map((data: any, ind: number) => {
            return (
                <div key={ind}>
                    <p className="text-sm font-normal mb-2 text-[#aab5ca] ml-5">{data?.mainTitle.toUpperCase()}</p>
                    {
                        data?.arr?.map((results: any, ind: number) => {
                            return (
                                <div
                                    key={ind}
                                    className="flex items-center gap-3 pt-2 pb-2 pl-5 pr-2 hover:bg-[#3c3c47] cursor-pointer border-b-[1px] border-b-[#8c8d8f]"
                                >
                                    <img
                                        src={`${basename}assets/images/loginscreen1.PNG`}
                                        alt="loginscreen1"
                                        className="w-8 h-8 opacity-60 rounded-sm"
                                    />
                                    <div>
                                        <h3 className="font-medium text-[#cad1df]">{results?.title}</h3>
                                        <p className="text-sm text-[#aab5ca]">{results?.description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            )
        })
    }


    return (
        <nav className="  border-b-[1px] border-b-[#58595a] bg-[#1D2125] pt-3 pb-3 pl-6 pr-3 flex justify-between items-center fixed top-0 w-full" style={{zIndex:"3"}}>
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
                            {
                                searchQuery && searchQuery?.length > 0 ? (
                                    searchFunctionality(searchResults)

                                ) : (
                                    <div>
                                        <p className="text-sm font-normal mb-2 text-[#aab5ca] ml-5">RECENT BOARDS</p>
                                        {recentBoardsMap(availBoards)}
                                    </div>
                                )
                            }

                        </div>
                    )}
                </InputWithDropdown>
                <MenuDropDown
                    toggleIcon={<NotificationsIcon className="rotate-45 text-[#aab5ca]" />}
                    mainRootStyles={{ maxHeight: "80vh" }}
                >
                    <div className="  pr-[20px]">
                        <h1 className="text-xl text-[#aab5ca] font-medium border-b-[1px] border-b-[#58595a] pb-4">Notifications</h1>
                        <div>
                            {
                                notificationsDummy.map((not: any) => {
                                    return (
                                        <Notificationss
                                            cardContent={not}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </MenuDropDown>
                {/* <HelpOutlineIcon className="text-[#aab5ca]" /> */}
                <MenuDropDown
                    toggleIcon={<p className="bg-[blue] text-[11px] font-bold w-6 h-6 flex justify-center items-center rounded-full">D</p>}
                    mainRootStyles={{ maxHeight: "80vh", width: "300px" }}
                >
                    <div className="">
                        <div className="flex items-center gap-3 border-b-[1px] border-b-[#58595a] pb-4">
                            <p className="bg-[blue] text-[11px] font-bold w-10 h-10 flex justify-center items-center rounded-full">D</p>
                            <div className="">
                                <p className="text-[#aab5ca] text-md font-medium">Test User</p>
                                <p className="text-[#80858f] font-medium text-[13px]">example@gmail.com</p>
                            </div>
                        </div>
                        <div className="mt-3">
                            {
                                tabs?.map((tab: any) => {
                                    if (tab?.link) {
                                        return (
                                            <Link to={tab?.path}>
                                                <span><NotificationsIcon className="rotate-45 text-[#aab5ca]" /></span>  {tab?.name}
                                            </Link>
                                        )
                                    } else {
                                        return (
                                            <button onClick={tab?.clickFunc} className=" flex items-center gap-3 hover:bg-[#515164] text-md text-[#d9e2f3] rounded-md w-full p-2 font-medium">{tab?.icon} {tab?.name}</button>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </MenuDropDown>
            </div>
        </nav>
    );
};

export default NavbarLatest;
