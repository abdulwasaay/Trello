
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextInputField from '../InputFields/TextInputField';
import CustomButton from '../CustomButtonComp/CustomButton';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { ModalContext } from '../../Contexts/ModalContext';
import { basename } from '../../config/env';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextBox from '../InputFields/TextBox';
import { useDispatch, useSelector } from 'react-redux';
import AddWorkSpace from '../../Redux/Actions/Middlewares/WorkSpaces/AddWorkSpace';
import { toast } from 'react-toastify';
import getWorkSpace from '../../Redux/Actions/Middlewares/WorkSpaces/GetWorkSpace';
import DeleteCookieValue from '../../Utils/DeleteCookieHandler';
import authCookie from '../../Constants/cookieName';
import { sessionModalContext } from '../../Contexts/SessionErrContext';
import apiErrors from '../../Constants/apiErrors';
import { setWorkSpaces } from '../../Redux/Slices/workSpaces';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    border: '1px solid #58595a',
    boxShadow: 24,
    display: "flex",
};

const workspaceSchema: any = Yup.object().shape({
    name: Yup.string().max(100, "Name is too long"),
    descript: Yup.string().max(500, "Description is too long"),
});

export default function WorkSpaceModal() {
    const { isOpen, setIsOpen } = useContext(ModalContext);
    const dispatch: any = useDispatch();
    const { isLoading } = useSelector((state: any) => state.addWorkSpaceSlice)
    const { setSessionIsOpen, setErrText } = useContext(sessionModalContext);

    const getWorkSpaces = () => {
        const onGetWorkspaceSuccess = (data: any) => {
            dispatch(setWorkSpaces(data))
        }

        const onGetWorkspaceFail = (message: string, response: any) => {
            if (response?.status === 401) {
                console.log("getWorkp auth err" )
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


    const workspaceFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            descript: ""
        },
        onSubmit(values) {
            const formData = new FormData();
            formData.append("name", values?.name);
            formData.append("description", values?.descript);

            const onWorkspaceSuccess = (data: any) => {
                workspaceFormik.resetForm();
                setIsOpen(false);
                getWorkSpaces();
                toast.success(data?.message);
            }

            const onAddWorkspaceFail = (message: string, response: any) => {
                if (response?.status === 401) {
                    console.log("addWorkp auth err" )
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

            dispatch(AddWorkSpace({ formData, onWorkspaceSuccess, onAddWorkspaceFail }))
        },
        validationSchema: workspaceSchema
    })

    const onCloseHandler = () => {
        setIsOpen(false)
        workspaceFormik.resetForm();
    }

    const addWorkSpace = (e: any) => {
        e.preventDefault();
        workspaceFormik.submitForm();
    }

    const currentValue: any = workspaceFormik?.values && workspaceFormik?.values["name"] === "" || workspaceFormik?.values["descript"] === "";
    const isdisabledButton = currentValue ? true : false;

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onCloseHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="backImgWorkStyle bg-[#292b30] p-7 w-[50%]">
                        <h1 className="text-3xl font-semibold text-[#aab5ca] mb-2">
                            Let's build a Workspace
                        </h1>
                        <p className="text-[#aab5ca] text-lg w-[400px] mb-6">
                            Boost your productivity by making it easier for everyone to access
                            boards in one location.
                        </p>
                        <form onSubmit={addWorkSpace}>
                            <div className="mb-4">
                                <label
                                    htmlFor="workspaceName"
                                    className="block text-sm font-medium text-[#aab5ca]"
                                >
                                    Workspace name
                                </label>
                                <TextInputField types="text" name="name" maxLen={101} placeHolder="Taco's Co." formik={workspaceFormik} classes="bg-[#292b30] text-[#aab5ca] font-medium placeholder:text-[#aab5ca] placeholder:opacity-60 placeholder:font-normal  pt-6 pb-6 mt-1 mb-1" styles={{ paddingLeft: "10px", border: `1px solid #aab5ca`, outline: "none", borderRadius: "5px" }} />
                                <label
                                    htmlFor="workspaceName"
                                    className="block text-[11px] font-medium text-[#aab5ca]"
                                >
                                    This is the name of your company, team or organization.
                                </label>
                            </div>

                            {/* <div className="mb-4">
                                <label
                                    htmlFor="workspaceType"
                                    className="block text-sm font-medium text-[#aab5ca]"
                                >
                                    Workspace type
                                </label>
                                <select
                                    id="workspaceType"
                                    className=" cursor-pointer hover:bg-[#35373b] mt-1 block w-full px-[7px]  py-[15px] bg-[#292b30] text-[#aab5ca] placeholder:text-[#aab5ca] font-medium outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    style={{ borderRadius: "5px", border: `1px solid #aab5ca` }}
                                >
                                    <option value="" hidden selected>
                                        Choose an option...
                                    </option>
                                    <option value="Education">Education</option>
                                    <option value="Operations">Operations</option>
                                    <option value="Small Business">Small Business</option>
                                    <option value="Sales CRM">Sales CRM</option>
                                    <option value="Engineering-IT">Engineering-IT</option>
                                    <option value="Human Resources">Human Resources</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div> */}

                            <div className="mb-6">
                                <label
                                    htmlFor="workspaceDescription"
                                    className="block text-sm font-medium text-[#aab5ca]"
                                >
                                    Workspace description
                                </label>
                                <TextBox
                                    ids="workspaceDescription"
                                    placeHolder="Our team organizes everything here."
                                    styles={{ borderRadius: "5px", border: `1px solid #aab5ca` }}
                                    classes="mt-1 block bg-[#292b30] "
                                    name="descript"
                                    formik={workspaceFormik}
                                    maxLen={501}
                                />

                                <label
                                    htmlFor="workspaceDescription"
                                    className="block text-[11px] font-medium text-[#aab5ca] mt-2"
                                >
                                    Get your members on board with a few words about your Workspace.
                                </label>
                            </div>

                            <CustomButton types={"submit"} text={"Continue"} loadings={isLoading} disable={isdisabledButton} onButtonClick={() => console.log("dsd")} styles={{ width: "100%", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "#424447" }} />
                        </form>
                    </div>
                    <div className='bg-blue-100 w-[50%] relative flex items-center justify-center'>
                        <img src={`${basename}assets/images/3dworkspace.png`} alt="3dworkspace" className='w-full' />
                        <button type='button' className=' absolute top-3 right-3' onClick={onCloseHandler}><CloseIcon className=' text-[#aab5ca] cursor-pointer' /></button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}
