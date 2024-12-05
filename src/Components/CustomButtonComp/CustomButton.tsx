import { LoadingButton } from '@mui/lab';
import React from "react"

interface ButtonProps {
    isCustomHover?: boolean;
    disable?: boolean;
    text: String | any;
    styles?: any;
    loadings?: Boolean;
    types?: any;
    onButtonClick: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ isCustomHover = false, disable = false, text, types = 'button', styles = {}, loadings = false, onButtonClick }) => {

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
                    background: "#424447",
                    color: "white",
                    opacity: "0.4"
                }
            }}
        >

            {text}
        </LoadingButton>
    )
}

export default CustomButton