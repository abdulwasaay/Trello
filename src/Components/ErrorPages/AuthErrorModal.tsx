import { Box, Modal } from "@mui/material"
import { sessionModalContext } from "../../Contexts/SessionErrContext";
import { useContext } from "react";
import CustomButton from "../CustomButtonComp/CustomButton";
import apiErrors from "../../Constants/apiErrors";
import { setAuth } from "../../Redux/Slices/authSlice";
import { persistor } from "../../Redux/store";
import { useDispatch } from "react-redux";
import DeleteCookieValue from "../../Utils/DeleteCookieHandler";
import authCookie from "../../Constants/cookieName";

const ErrorModal = () => {
    const { sessionIsOpen, setSessionIsOpen, errText } = useContext(sessionModalContext);
    const dispatch: any = useDispatch();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "450px",
        border: '1px solid #58595a',
        outline: "none",
        boxShadow: 24,
        display: "flex",
        borderRadius: "6px"
    };

    const onCloseHandler = () => {
        if (errText && errText === apiErrors?.authErr) {
            setSessionIsOpen(false);
            DeleteCookieValue(authCookie);
            dispatch(setAuth(false))
            persistor.purge();
            window.location.reload();
        }
    }

    return (
        <Modal
            open={sessionIsOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="w-full p-3 bg-[#292b30]">
                    <h1 className="text-[#cdd6e7] text-4xl border-b-[1px] border-b-[#cdd6e7] pb-5">Session Expired</h1>
                    <p className="text-[#aab5ca] text-lg mt-3">For your security, your session has timed out. Please log in again to continue.</p>
                    <CustomButton text={"Continue"} onButtonClick={onCloseHandler} styles={{ width: "100%", marginTop: "20px" }} />
                </div>
            </Box>
        </Modal>
    )
}

export default ErrorModal