import { Box, Modal } from "@mui/material"
import React from "react";
import CloseIcon from '@mui/icons-material/Close';

interface ShareBoardProps {
    opens: boolean;
    setOPen: (val: boolean) => void
}

const ShareBoard: React.FC<ShareBoardProps> = ({ opens, setOPen }) => {

    const style = {
        position: 'absolute',
        marginTop: "50px",
        left: '50%',
        transform: 'translateX(-50%)',
        width: "684px",
        border: '1px solid #58595a',
        boxShadow: 24,
        display: "flex",
        borderRadius: "6px"
    };

    const onCloseHandler = () => {
        setOPen(false)
    }

    return (
        <Modal
            open={opens}
            onClose={() => setOPen(false)}
            aria-labelledby="Share-board-modal"
            aria-describedby="This modal helps to share the board among members and they can manage their tasks efficiently"
        >
            <Box sx={style} className="text-white">
                <div className="bg-[#292b30] px-7 py-5 w-full rounded-md">
                    <div className=" flex justify-between items-center">
                        <h1 className=" text-2xl text-[#aab5ca] font-semibold">Share board</h1>
                        <button type='button' className=" hover:bg-[#3e4041] " onClick={onCloseHandler}><CloseIcon style={{fontSize:"30px"}} className=' text-[#aab5ca] cursor-pointer' /></button>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default ShareBoard