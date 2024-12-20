import { useRef } from "react";
import CustomButton from "../CustomButtonComp/CustomButton"
import TextInputField from "../InputFields/TextInputField"
import HidePassHandler from "../../Utils/hidePassHandler";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useFormik } from "formik";
import SignupSchema from "./RegisterFormik";
import { useDispatch, useSelector } from "react-redux";
import onRegister from "../../Redux/Actions/Middlewares/Register";
import { toast } from "react-toastify";

const Register = () => {

    const dispatch: any = useDispatch();
    const { isRegisterLoading } = useSelector((state: any) => state.registerSlice);
    const eyeVisibilityRef = useRef<any>(null);
    const eyeVisibilityConfRef = useRef<any>(null);

    const showVisibilityPassword = (e: any) => {
        e.preventDefault();
        const typeReturned = HidePassHandler(eyeVisibilityRef?.current?.type);
        eyeVisibilityRef.current.type = typeReturned;
    }

    const showVisibilityConfPassword = (e: any) => {
        e.preventDefault();
        const typeReturned = HidePassHandler(eyeVisibilityConfRef?.current?.type);
        eyeVisibilityConfRef.current.type = typeReturned;
    }

    const initialValues = {
        fullname: "",
        email: "",
        password: "",
        confPassword: ""
    }

    const registerFormik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit(values) {
            const formData = new FormData();
            formData.append("name", values?.fullname);
            formData.append("email", values?.email);
            formData.append("password", values?.password);

            addUserHandler(formData && formData)
        },
        validationSchema: SignupSchema
    })

    const addUserHandler = (formData: any) => {

        const onRegisterSuccess = (data: any) => {
            registerFormik.resetForm();
            toast.success(data?.message);
        }

        const onRegisterFail = (message: string) => {
            toast.error(message);
        }

        dispatch(onRegister({ formData, onRegisterSuccess, onRegisterFail }))
    }

    const handleRegister = (e: any) => {
        e.preventDefault();
        registerFormik.submitForm();
    }

    return (
        <div>
            <div className="flex flex-col pb-3 pl-[10px] pr-[10px] ">
                <div className=" flex justify-center items-center">
                    <h3 className="font-medium text-[#cad1df] text-md mt-1">Add User</h3>
                </div>
                <form className="mt-8 flex flex-col gap-5" onSubmit={handleRegister}>
                    <TextInputField
                        name="fullname"
                        types="text"
                        placeHolder="Enter full name"
                        formik={registerFormik}
                        maxLen={51}
                        styles={{ outline: "none", border: "2px solid #6464ff", color: "#aab5ca", fontWeight: "500", borderRadius: "5px", backgroundColor: "#383838" }}
                    />
                    <TextInputField
                        name="email"
                        types="email"
                        placeHolder="Enter Email"
                        formik={registerFormik}
                        styles={{ outline: "none", border: "2px solid #6464ff", color: "#aab5ca", fontWeight: "500", borderRadius: "5px", backgroundColor: "#383838" }}
                    />
                    <div className=" relative">
                        <TextInputField
                            name="password"
                            types="password"
                            placeHolder="Enter Password"
                            ref={eyeVisibilityRef}
                            formik={registerFormik}
                            styles={{ outline: "none", border: "2px solid #6464ff", color: "#aab5ca", fontWeight: "500", borderRadius: "5px", backgroundColor: "#383838" }}
                        />
                        <button type="button" className="absolute top-2 right-2 border-none outline-none bg-none text-[#979797] hover:text-[gray]" onClick={showVisibilityPassword}>
                            <RemoveRedEyeIcon />
                        </button>
                    </div>
                    <div className=" relative">
                        <TextInputField
                            name="confPassword"
                            types="password"
                            formik={registerFormik}
                            ref={eyeVisibilityConfRef}
                            placeHolder="Confirm Password"
                            styles={{ outline: "none", border: "2px solid #6464ff", color: "#aab5ca", fontWeight: "500", borderRadius: "5px", backgroundColor: "#383838" }}
                        />
                        <button type="button" className="absolute top-2 right-2 border-none outline-none bg-none text-[#979797] hover:text-[gray]" onClick={showVisibilityConfPassword}>
                            <RemoveRedEyeIcon />
                        </button>
                    </div>
                    <CustomButton
                        types={"submit"}
                        text={"Add User"}
                        loadings={isRegisterLoading}
                        customDisabledStyles={{ backgroundColor: "#424447" }}
                        onButtonClick={() => console.log("ds")}
                    />
                </form>
            </div>
        </div>
    )
}


export default Register