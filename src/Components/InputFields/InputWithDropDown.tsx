import React from "react";
import SearchIcon from '@mui/icons-material/Search';

type dropdownProps = {
    classes?: string;
    customSearchIcon?: any;
    classParent?: string;
    searchValue: string;
    styleParent?: any;
    styles?: any;
    isDropdown?: boolean;
    isSearchIcon?: boolean;
    handleFocus?: () => void;
    handleBlur?: () => void;
    handleSearchChange: (e: string) => void;
    children?: React.ReactNode; // Children prop
};

const InputWithDropdown = (
    {
        classes = "",
        customSearchIcon = <SearchIcon className="absolute left-0 top-2 ml-2 text-[#aab5ca]" />,
        classParent = "",
        searchValue,
        styleParent = {},
        styles = {},
        isDropdown = false,
        isSearchIcon = false,
        handleFocus = () => { },
        handleBlur = () => { },
        handleSearchChange,
        children = <></>
    }: dropdownProps) => {


    return (

        <div className={`${classParent} ${isSearchIcon && "relative"}`} style={{ ...styleParent }}>
            <input
                type="search"
                name="search"
                value={searchValue}
                placeholder="Search"
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
                onChange={(e: any) => handleSearchChange(e.target.value)}
                className={`bg-[#1D2125] text-[#aab5ca] font-medium placeholder:text-[#aab5ca] ${classes}`}
                style={{
                    paddingLeft: isSearchIcon ? "40px" : "10px",
                    ...styles
                }}
            />
            {isSearchIcon && customSearchIcon}
            {isDropdown && children}
        </div>
    )
}

export default InputWithDropdown