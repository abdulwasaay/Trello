import React, { useContext, useState } from 'react';
import CustomButton from '../CustomButtonComp/CustomButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import addBoard from '../../Redux/Actions/Middlewares/Boards/AddBoard';
import { toast } from 'react-toastify';
import apiErrors from '../../Constants/apiErrors';
import DeleteCookieValue from '../../Utils/DeleteCookieHandler';
import authCookie from '../../Constants/cookieName';
import { sessionModalContext } from '../../Contexts/SessionErrContext';
import { setWorkSpaces } from '../../Redux/Slices/workSpaces';
import getWorkSpace from '../../Redux/Actions/Middlewares/WorkSpaces/GetWorkSpace';


interface addBoardProps {
    workId: any
}
const AddBoardManage: React.FC<addBoardProps> = ({ workId }) => {
    const [addButtonText, setAddButtonText] = useState("button");
    const [textInput, setTextInput] = useState("");
    const dispatch: any = useDispatch();
    const { setSessionIsOpen, setErrText } = useContext(sessionModalContext);
    const { isLoading } = useSelector((state: any) => state.addBoardSlice)

    const customButtonText = () => {
        return (
            <div >
                <AddIcon />
            </div>
        )
    }

    const getWorkSpaces = () => {
        const onGetWorkspaceSuccess = (data: any) => {
            dispatch(setWorkSpaces(data))
        }

        const onGetWorkspaceFail = (message: string, response: any) => {
            if (response?.status === 401) {
                if (message && message === apiErrors?.authErr) {
                    setErrText(message);
                    setSessionIsOpen(true)
                } else {
                    DeleteCookieValue(authCookie);
                    window.location.reload();
                }
            } else {
                toast.error(message)
            }
        }

        dispatch(getWorkSpace({ onGetWorkspaceSuccess, onGetWorkspaceFail }))
    }

    const addBoardHandler = (e: any) => {
        e.preventDefault();
        if (textInput && textInput.length) {
            const formData = new FormData();
            formData.append("workspace_id", workId);
            formData.append("name", textInput);
            formData.append("description", "");
            const onAddBoardSuccess = (data: any) => {
                setTextInput("");
                getWorkSpaces()
                toast.success(data?.message);
            }

            const onAddBoardFail = (message: string, response: any) => {
                if (response?.status === 401) {
                    if (message && message === apiErrors?.authErr) {
                        setErrText(message);
                        setSessionIsOpen(true)
                    } else {
                        DeleteCookieValue(authCookie);
                        window.location.reload();
                    }
                } else {
                    toast.error(message)
                }
            }
            dispatch(addBoard({ formData, onAddBoardSuccess, onAddBoardFail }))
        }
    }

    const addButtonLayout = () => {
        return (
            <div className='w-[230px] h-32 bg-[#64748b] pl-2 pr-2 pt-1'>
                <div className=' w-full flex justify-end'><button type='button' onClick={() => setAddButtonText("button")}><CloseIcon style={{ textAlign: "right" }} /></button></div>
                <form className='mt-2' onSubmit={addBoardHandler}>
                    <input required type='text' placeholder='Enter Board title' onChange={(e: any) => setTextInput(e.target.value)} className='w-full border-none outline-none p-1 pl-2 font-medium rounded-sm' maxLength={50} />
                    <CustomButton types={"submit"}
                        text={"Add Board"}
                        loadings={isLoading}
                        onButtonClick={() => console.log("DS")}
                        styles={{ width: "100%", marginTop: "10px", backgroundColor: "gray" }}
                    />
                </form>
            </div>
        )
    }

    const addBoardManage: any = {
        button: <CustomButton
            types={"button"}
            text={customButtonText()}
            onButtonClick={() => setAddButtonText("add")}
            styles={{ width: "230px", height: "8rem", backgroundColor: "#64748b" }}
        />,
        add: addButtonLayout()
    }

    return (
        <div className='mt-3'>
            {addBoardManage[addButtonText]}
        </div>
    )
}

export default AddBoardManage