import { Link, useNavigate } from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext, useState } from "react";
import { basename } from "../../config/env";
import InputWithDropdown from "../InputFields/InputWithDropDown";
import WebIcon from '@mui/icons-material/Web';
import MenuDropDown from "../DropDownMenuButtons/menuDropdown";
import notificationsDummy from "../../dummydata";
import Notificationss from "../NotificationsComps/Notifications";
import CreateBoardLatest from "../Boards/CreateBoardComp";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { ModalContext } from "../../Contexts/ModalContext";
import { useSelector } from "react-redux";
import NameAbbreviator from "../../Utils/NameAbbreviator";
import profileColors from "../../Constants/profileConstants";
import adminUserCheck from "../../Constants/allConstants";
import Register from "../RegisterComp/Register";

const NavbarLatest = ({ tabs }: { tabs: any }) => {
    const navigate = useNavigate();
    const { setIsOpen } = useContext(ModalContext);
    const { user } = useSelector((state: any) => state.authSlice);
    const { workSpaces } = useSelector((state: any) => state.workspaceSlice);
    const fullName = user && user?.name && user?.name;
    const email = user && user?.email && user?.email;
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const role = user && user?.role;
    const isAdmin = role === adminUserCheck?.isAdmin;
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

    const workobs = [
        { workName: "Production workspace" },
        { workName: "Pulse Digital" },
    ]

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
                    className="flex items-center gap-3 pt-2 pb-2 pl-5 pr-2 hover:bg-[#3c3c47] cursor-pointer "
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
                <div key={ind} style={{ marginTop: "10px" }}>
                    <p className="text-sm font-normal mb-2 text-[#aab5ca] ml-5">{data?.mainTitle.toUpperCase()}</p>
                    {
                        data?.arr?.map((results: any, ind: number) => {
                            return (
                                <div
                                    key={ind}
                                    className="flex items-center gap-3 pt-2 pb-2 pl-5 pr-2 hover:bg-[#3c3c47] cursor-pointer "
                                >
                                    {
                                        data?.mainTitle.toLowerCase() === "cards" ? (
                                            <WebIcon />
                                        ) : (
                                            <img
                                                src={`${basename}assets/images/loginscreen1.PNG`}
                                                alt="loginscreen1"
                                                className="w-8 h-8 opacity-60 rounded-sm"
                                            />
                                        )
                                    }
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
        <nav className="  border-b-[1px] border-b-[#58595a] bg-[#1D2125] pt-3 pb-3 pl-6 pr-3 flex justify-between items-center fixed top-0 w-full" style={{ zIndex: "3" }}>
            <div className="flex items-center gap-10">
                <img src={imgSource} alt="imgsource" className="w-[80px] opacity-60 cursor-pointer" onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)} onClick={() => navigate("/")} />
                <MenuDropDown
                    mainRootStyles={{ maxHeight: "51vh", width: "360px" }}
                    listStyles={{ padding: "0" }}
                    toggleIcon={<span className="flex items-center gap-1">Workspaces <KeyboardArrowDownIcon /></span>}
                    customButtStyles={{ fontWeight: "500", color: "#aab5ca", borderRadius: "3px", padding: "5px 10px" }}
                    customButtClasses=" hover:bg-[#37393f] bg-none outline-none"
                >
                    <div className="pb-6">
                        {
                            isAdmin && <button className="text-start hover:bg-[#37393f] p-4" onClick={(e: any) => {
                                setIsOpen(true)
                            }}>
                                <h4 className="font-normal text-[#cad1df] text-md flex items-center gap-3"><span><GroupOutlinedIcon /></span> Create Workspace</h4>
                                <p className="text-[#aab5ca] font-normal text-sm pt-1">A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.</p>
                            </button>
                        }

                        <div className="pl-4 pr-4">
                            <p className="text-[#aab5ca] font-medium text-md mt-3 mb-5">Workspaces</p>
                            <div className=" flex flex-col gap-5">
                                {
                                    workSpaces?.map((works: any, ind: number) => {
                                        const formattedTitle = works?.boards[0]?.name.replace(/\s+/g, '-');
                                        return (
                                            <Link key={ind} to={`/boards/${works?.workSpace_Id}/${works?.boards[0]?.id}/${formattedTitle}`}>
                                                <div className="flex gap-4 items-center" key={ind}>
                                                    <div className="w-14 h-14 flex justify-center items-center bg-slate-600 rounded-md text-3xl font-medium">{works?.name.charAt(0)}</div>
                                                    <p className="text-[#aab5ca] text-md font-medium">{works?.name}</p>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </MenuDropDown>
                {
                    isAdmin ? <MenuDropDown
                        mainRootStyles={{ maxHeight: "67vh", width: "350px" }}
                        listStyles={{ paddingTop: "10px", paddingBottom: "10px" }}
                        toggleIcon={"Create"}
                        customButtStyles={{ fontWeight: "500", color: "white", backgroundColor: "#3f51b5", borderRadius: "3px", padding: "5px 10px", zIndex: "3", position: "relative" }}
                    >
                        <CreateBoardLatest />
                    </MenuDropDown>
                        : <div></div>
                }
                {
                    isAdmin ? <MenuDropDown
                        mainRootStyles={{ maxHeight: "67vh", width: "350px" }}
                        listStyles={{ paddingTop: "10px", paddingBottom: "10px" }}
                        toggleIcon={"Add User"}
                        customButtStyles={{ whiteSpace: "nowrap", fontWeight: "500", color: "white", backgroundColor: "#3f51b5", borderRadius: "3px", padding: "5px 10px", zIndex: "3", position: "relative" }}
                    >
                        <Register />
                    </MenuDropDown>
                        : <div></div>
                }
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
                                notificationsDummy.map((not: any, ind: number) => {
                                    return (
                                        <Notificationss
                                            key={ind}
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
                    toggleIcon={<p className=" text-[11px] font-bold w-6 h-6 flex justify-center items-center rounded-full" style={{ backgroundColor: fullName && profileColors[fullName?.charAt(0)].bg, color: fullName && profileColors[fullName?.charAt(0)].tx }}>{NameAbbreviator(fullName)}</p>}
                    mainRootStyles={{ maxHeight: "80vh", width: "300px" }}
                >
                    <div className="">
                        <div className="flex items-center gap-3 border-b-[1px] border-b-[#58595a] pb-4">
                            <p className=" text-[15px] font-bold w-10 h-10 flex justify-center items-center rounded-full" style={{ backgroundColor: fullName && profileColors[fullName?.charAt(0)].bg, color: fullName && profileColors[fullName?.charAt(0)].tx }}>{NameAbbreviator(fullName)}</p>
                            <div className="">
                                <p className="text-[#aab5ca] text-md font-medium">{fullName}</p>
                                <p className="text-[#80858f] font-medium text-[13px]">{email}</p>
                            </div>
                        </div>
                        <div className="mt-3">
                            {
                                tabs?.map((tab: any, ind: number) => {
                                    if (tab?.link) {
                                        return (
                                            <Link to={tab?.path} key={ind}>
                                                <span><NotificationsIcon className="rotate-45 text-[#aab5ca]" /></span>  {tab?.name}
                                            </Link>
                                        )
                                    } else {
                                        return (
                                            <button key={ind} onClick={tab?.clickFunc} className=" flex items-center gap-3 hover:bg-[#515164] text-md text-[#d9e2f3] rounded-md w-full p-2 font-medium">{tab?.icon} {tab?.name}</button>
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
