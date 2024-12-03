import { LoadingButton } from '@mui/lab';
import React from "react"

interface ButtonProps {
    text: String | any;
    styles?: any;
    loadings?: Boolean;
    types?: any;
    onButtonClick: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ text, types = 'button', styles = {}, loadings = false, onButtonClick }) => {

    const loading: any = loadings;

    return (
        <LoadingButton
            variant="contained"
            type={types}
            style={{ ...styles, fontSize: "15px", textTransform: "capitalize" }}
            loading={loading}
            onClick={onButtonClick}
        >

            {text}
        </LoadingButton>
    )
}

export default CustomButton