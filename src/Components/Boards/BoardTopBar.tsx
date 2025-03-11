import React, { useContext } from "react";
import { WorkSpaceObjContext } from "../../Contexts/WorkSpaceData";
import CustomButton from "../CustomButtonComp/CustomButton";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';


interface BoardTopBarProps {
    SetOPen: (val:boolean) => void
}
const BoardTopBar:React.FC<BoardTopBarProps> = ({SetOPen}) => {
    const { workSpaceObjs } = useContext(WorkSpaceObjContext);
    const workSpaceObj = workSpaceObjs && workSpaceObjs;

    return (
        <div className="bg-[#1D2125] pt-5 pb-5 opacity-80 w-full flex items-center justify-between pl-7 pr-7 relative" >
            <p className="text-white font-bold text-xl">{workSpaceObj?.name}</p>

            <div>
                <CustomButton text={<span className=" flex items-center gap-1"><PersonAddOutlinedIcon style={{fontSize:"22px"}}/> <p className="pt-[1px]">Share</p></span>}  styles={{backgroundColor:"#DCDFE4" , color:"black" , fontWeight:"500"}} onButtonClick={()=> SetOPen(true)} />
            </div>
        </div>
    )
}

export default BoardTopBar