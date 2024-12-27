import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Tooltip } from '@mui/material';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { ws_color } from '../../Constants/allConstants';
import { WorkSpaceObjContext } from '../../Contexts/WorkSpaceData';

const SideBarLatest = () => {
    const [isClose, setIsClose] = useState<boolean>(false);
    const [hiddenStyle, setHiddenStyle] = useState<string>("block");
    const [hiddenStyleButton, setHiddenStyleButton] = useState<string>("none");
    const { workSpaceObjs } = useContext(WorkSpaceObjContext);
    const workSpaceObj = workSpaceObjs && workSpaceObjs;

    const sideBartransition = (close: boolean) => {
        setIsClose(close)
        if (close) {
            setHiddenStyle("none");
            setHiddenStyleButton("block");
        } else {
            setTimeout(() => {
                setHiddenStyle("block");
                setHiddenStyleButton("none");
            }, 70)
        }
    }

    return (
        <div className="text-white bg-[#1D2125] opacity-90 sticky" style={{ width: isClose ? "30px" : "270px", transition: "0.3s ease", zIndex: 3 }}>
            <button className='flex justify-center items-center p-[2px] mt-6 rounded-full bg-[#37393f] border-[1px] border-[#58595a] relative left-4' style={{ display: hiddenStyleButton }} onClick={() => sideBartransition(false)}><KeyboardArrowLeftIcon /></button>
            <div style={{ display: hiddenStyle }}>
                <div className="flex justify-between items-center pt-3 pb-3 pl-4 pr-4 border-b-[1px] border-b-[#58595a]" >
                    <div className="flex gap-4 items-center">
                        <div className="w-11 h-11 flex justify-center items-center bg-slate-600 rounded-md text-xl font-medium">{workSpaceObj?.name?.charAt(0)}</div>
                        <Tooltip title={workSpaceObj?.name}>
                            <p className="text-[#aab5ca] text-md font-medium w-[11ch] overflow-hidden whitespace-nowrap text-ellipsis">{workSpaceObj?.name}</p>
                        </Tooltip>
                    </div>
                    <button className='flex justify-center items-center p-1 rounded-md hover:bg-[#37393f]' onClick={() => sideBartransition(true)}><KeyboardArrowLeftIcon /></button>
                </div>
                <div className='mt-3' >
                    <p className="text-[#aab5ca] text-md font-medium pl-4 pr-4">Your Boards</p>
                    <div className='mt-4'>
                        {
                            workSpaceObj && workSpaceObj?.boards?.map((board: any, ind: number) => {
                                const formattedTitle = board?.name.replace(/\s+/g, '-');
                                return (
                                    <NavLink to={`/boards/${workSpaceObj?.workSpace_Id}/${board?.id}/${formattedTitle}`}>
                                        <div key={ind} className='flex items-center gap-3 cursor-pointer hover:bg-[#515164] pl-4 pr-4 pt-2 pb-2'>
                                            <div className=' w-9 h-6 opacity-80 rounded-sm' style={{ backgroundColor: ws_color }}></div>
                                            <Tooltip title={board?.name}>
                                                <p className="text-[#aab5ca] text-md font-medium w-[17ch] overflow-hidden whitespace-nowrap text-ellipsis">{board?.name}</p>
                                            </Tooltip>
                                        </div>
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>

    )
}

export default SideBarLatest