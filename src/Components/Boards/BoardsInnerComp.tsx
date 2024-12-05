import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BoardImagesComp from './BoardImagesComp';
import { basename } from '../../config/env';
import { ModalContext } from '../../Contexts/ModalContext';
import { useContext } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const BoardsInner = () => {
    const { setIsOpen } = useContext(ModalContext);

    const arr = [
        {
            name: "WDS-Design",
            url: `${basename}assets/images/trelloDummy.png`
        },
        {
            name: "WDS-Developmentdsadsaadssdasdsdsadsdsdsdasadsdasdsadsadsdasda",
            url: `${basename}assets/images/trelloDummy.png`
        },
        {
            name: "Web-Design",
            url: `${basename}assets/images/trelloDummy.png`
        }
    ]
    return (
        <div className="w-[910px] border mt-4">
            <div>
                <div className='flex items-center gap-2 ml-1'><AccessTimeIcon style={{ color: "#aab5ca" }} /> <h1 className='text-[#aab5ca] text-xl font-medium'>Recently viewed</h1></div>
                <div className='flex gap-5 mt-4'>
                    {
                        arr.map((ele: any, ind: number) => {
                            return (
                                <BoardImagesComp key={ind} elements={ele} />
                            )
                        })
                    }
                </div>
                <h1 className='text-[#aab5ca] text-xl font-bold mt-6'>YOUR WORKSPACES</h1>
                <div className=' flex mt-5'>
                    <p className='text-[#aab5ca]  text-sm'>You aren't a member of any workspaces yet. </p>
                    <button onClick={() => setIsOpen(true)} className='text-[#7070eb] font-medium ml-2 text-sm'>Create a workspace</button>
                </div>
                <div className='flex items-center gap-2 ml-1 mt-6'><h1 className='text-[#aab5ca] text-xl font-bold '>GUEST WORKSPACES</h1><InfoOutlinedIcon style={{ color: "#aab5ca" }} /></div>
                <div className='flex items-center gap-2 ml-1 mt-5'><GroupOutlinedIcon style={{ color: "#aab5ca" }} /> <h1 className='text-[#cdd6e7] text-lg font-medium'>Recently viewed</h1></div>
                <div className='flex gap-5 mt-4'>
                    {
                        arr.map((ele: any, ind: number) => {
                            return (
                                <BoardImagesComp key={ind} elements={ele} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BoardsInner