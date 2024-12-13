import React, { useRef } from "react";
import CustomButton from "../CustomButtonComp/CustomButton"
import TextInputField from "../InputFields/TextInputField"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import HidePassHandler from "../../Utils/hidePassHandler";
import { basename } from "../../config/env";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useSelector } from "react-redux";

interface loginComponentProps {
    submitHandler: (formData: any) => void
}

const LoginComp: React.FC<loginComponentProps> = ({ submitHandler }) => {
    const { isLoading } = useSelector((state: any) => state.loginSlice);
    console.log(isLoading)

    const eyeVisibilityRef = useRef<any>(null);

    const showVisibility = (e: any) => {
        e.preventDefault();
        const typeReturned = HidePassHandler(eyeVisibilityRef?.current?.type);
        eyeVisibilityRef.current.type = typeReturned;
    }

    const providerArr = [
        { url: `${basename}assets/images/googleIco.png`, alt: "googleIco", name: "Google" },
        { url: `${basename}assets/images/microsoftico.png`, alt: "microsoft", name: "Microsoft" },
        { url: `${basename}assets/images/appleIco.png`, alt: "appleIco", name: "Apple" },
        { url: `${basename}assets/images/slack.png`, alt: "slack", name: "Slack" },
    ]

    const customLoginStyles = {
        background: "none",
        boxShadow: "none",
        border: "1px solid rgb(193, 199, 208)",
        borderRadius: "3px",
        color: "black",
        width: "100%",
        fontSize: "15px",
        fontWeight: "600",
        paddingTop: "10px",
        paddingBottom: "10px",
    }

    const loginSchema: any = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required("Password is required")
    });

    const loginFormik: any = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('email', values?.email);
            formData.append('password', values?.password);
            submitHandler(formData)
        }
        ,
        validationSchema: loginSchema
    })

    const handleSubmit = (e: any) => {
        e.preventDefault();
        loginFormik.submitForm();
    }

    return (
        <div className="w-full h-full relative bg-[#fcfcfc]">
            <img src={`${basename}assets/images/loginscreen1.PNG`} alt="loginscreen1" className="absolute bottom-0" />
            <div className="w-full h-[100vh] overflow-x-hidden flex flex-col justify-center pl-4 pr-4 border">
                <div className="w-[400px] border bg-white p-7 text-[#42526E] box-border rounded-sm max-[435px]:pl-5 max-[435px]:pr-5" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px", margin: "0px auto" }}>
                    <div className="flex gap-1 justify-center items-center">
                        <img src={`${basename}assets/images/trello-icon.png`} alt="trello-icon" className="w-8" />
                        <h1 className="text-3xl font-bold">Trello</h1>
                    </div>
                    <p className=" text-md font-medium text-center mt-5 max-[435px]:mt-2">Log in to continue</p>
                    <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
                        <TextInputField
                            types="email"
                            name="email"
                            placeHolder="Enter your email"
                            formik={loginFormik}
                        />
                        <div className=" relative">
                            <TextInputField
                                types="password"
                                name="password"
                                placeHolder="Enter your Password"
                                styles={{ paddingRight: "37px" }}
                                ref={eyeVisibilityRef}
                                formik={loginFormik}
                            />
                            <button type="button" className="absolute top-2 right-2" onClick={showVisibility}>
                                <RemoveRedEyeIcon />
                            </button>
                        </div>
                        <CustomButton
                            text="Continue"
                            onButtonClick={() => console.log("submitted")}
                            styles={{ width: "100%" }}
                            types={"submit"}
                            loadings={isLoading}
                        />
                    </form>


                </div>
            </div>
            <img src={`${basename}assets/images/loginscreen2.PNG`} alt="loginscreen1" className="absolute bottom-0 right-0" />
        </div>

    )
}

export default LoginComp