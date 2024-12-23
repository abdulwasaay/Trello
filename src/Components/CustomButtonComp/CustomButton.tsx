import { LoadingButton } from '@mui/lab';
import React from "react"

interface ButtonProps {
    isCustomHover?: boolean;
    disable?: boolean;
    text: String | any;
    styles?: any;
    loadings?: Boolean;
    types?: any;
    onButtonClick: (e?: any) => void;
    customDisabledStyles?: any;
}

const CustomButton: React.FC<ButtonProps> = ({ isCustomHover = false, customDisabledStyles = {}, disable = false, text, types = 'button', styles = {}, loadings = false, onButtonClick }) => {

    const loading: any = loadings;

    return (
        <LoadingButton
            variant="contained"
            type={types}
            style={{ fontSize: "15px", textTransform: "capitalize", ...styles }}
            loading={loading}
            onClick={onButtonClick}
            className={`${isCustomHover && "hover:!bg-[#515164]"} `}
            disabled={disable}
            sx={{
                "&.Mui-disabled": {
                    background: loading ? "" : "#424447",
                    color: loading ? "" : "white",
                    opacity: loading ? "" : "0.4",
                    ...customDisabledStyles
                }
            }}
        >

            {text}
        </LoadingButton>
    )
}

export default CustomButton