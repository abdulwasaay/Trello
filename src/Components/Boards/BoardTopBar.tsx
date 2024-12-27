import { useContext } from "react";
import { WorkSpaceObjContext } from "../../Contexts/WorkSpaceData";

const BoardTopBar = () => {
    const { workSpaceObjs } = useContext(WorkSpaceObjContext);
    const workSpaceObj = workSpaceObjs && workSpaceObjs;

    return (
        <div className="bg-[#1D2125] pt-5 pb-5 opacity-80 w-full flex items-center pl-7 relative" >
            <p className="text-white font-bold text-xl">{workSpaceObj?.name}</p>
        </div>
    )
}

export default BoardTopBar