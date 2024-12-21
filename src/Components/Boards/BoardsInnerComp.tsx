import BoardImagesComp from './BoardImagesComp';
import { ModalContext } from '../../Contexts/ModalContext';
import { useContext } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { useSelector } from 'react-redux';
import CustomLoader from '../CustomLoadingComps/CustomLoader';
import adminUserCheck from '../../Constants/allConstants';
import AddBoardManage from './AddBoardManage';
import { Link } from 'react-router';

const BoardsInner = () => {
    const { setIsOpen } = useContext(ModalContext);
    const { user } = useSelector((state: any) => state.authSlice);
    const role = user && user?.role;
    const isAdmin = role === adminUserCheck?.isAdmin;
    const { workSpaces } = useSelector((state: any) => state.workspaceSlice);
    const { isLoading } = useSelector((state: any) => state.getWorkSpaceSlice);

    if (isLoading) {
        return (
            <CustomLoader />
        )
    }

    return (
        <div className="w-[910px] mt-4 pb-3 ml-[270px]">
            <div>
                <div className='flex items-center gap-2 ml-1 '><h1 className='text-[#aab5ca] text-xl font-bold '>WORKSPACES</h1><InfoOutlinedIcon style={{ color: "#aab5ca" }} /></div>
                {
                    workSpaces && !workSpaces.length ?
                        (
                            < div className=' flex mt-5' >
                                <p className='text-[#aab5ca]  text-sm'>You aren't a member of any workspaces yet. </p>
                                {isAdmin && < button onClick={() => setIsOpen(true)} className='text-[#7070eb] font-medium ml-2 text-sm'>Create a workspace</button>}
                            </div >
                        ) : (
                            workSpaces?.map((work: any, ind: number) =>
                            (
                                <div key={ind} className='mb-14'>
                                    <div className='flex items-center gap-2 ml-1 mt-5'><GroupOutlinedIcon style={{ color: "#aab5ca" }} /> <h1 className='text-[#cdd6e7] text-lg font-medium'>{work?.name}</h1></div>
                                    <div className='flex gap-5 flex-wrap mt-4'>
                                        {
                                            work?.boards && !work?.boards.length ? (
                                                < div className=' flex' >
                                                    {
                                                        isAdmin ? (
                                                            <div>
                                                                <p className='text-[#aab5ca]  text-sm'>You aren't a member of any boards yet. </p>
                                                                <AddBoardManage workId={work?.workSpace_Id} />
                                                            </div>
                                                        ) : (
                                                            <p className='text-[#aab5ca]  text-sm'>You aren't a member of any boards yet. </p>
                                                        )
                                                    }
                                                </div >
                                            ) : (
                                                work?.boards?.map((ele: any, ind: number) => {
                                                    const formattedTitle = ele?.name.replace(/\s+/g, '-');

                                                    return (
                                                        <Link to={`/boards/${work?.workSpace_Id}/${ele?.id}/${formattedTitle}`} key={ind}>
                                                            <BoardImagesComp key={ind} elements={ele} />
                                                        </Link>
                                                    )
                                                })
                                            )
                                        }
                                    </div>
                                </div>
                            )
                            )
                        )
                }
            </div>
        </div >
    )
}

export default BoardsInner