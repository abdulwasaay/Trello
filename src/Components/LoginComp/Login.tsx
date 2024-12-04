import { useRef } from "react";
import CustomButton from "../CustomButtonComp/CustomButton"
import TextInputField from "../InputFields/TextInputField"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import HidePassHandler from "../../Utils/hidePassHandler";
import { basename } from "../../config/env";

const LoginComp = () => {

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

    return (
        <div className="w-full h-full relative bg-[#fcfcfc]">
            <img src={`${basename}assets/images/loginscreen1.PNG`} alt="loginscreen1"  className="absolute bottom-0"/>
            <div className="w-full h-[100vh] overflow-x-hidden flex flex-col justify-center pl-4 pr-4 border">
                <div className="w-[400px] border bg-white p-7 text-[#42526E] box-border rounded-sm max-[435px]:pl-5 max-[435px]:pr-5" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px", margin: "0px auto" }}>
                    <div className="flex gap-1 justify-center items-center">
                        <img src={`${basename}assets/images/trello-icon.png`} alt="trello-icon" className="w-8" />
                        <h1 className="text-3xl font-bold">Trello</h1>
                    </div>
                    <p className=" text-md font-medium text-center mt-5 max-[435px]:mt-2">Log in to continue</p>
                    <form className="mt-4 flex flex-col gap-3">
                        <TextInputField
                            types="email"
                            name="email"
                            placeHolder="Enter your email"
                        />
                        <div className=" relative">
                            <TextInputField
                                types="password"
                                name="password"
                                placeHolder="Enter your Password"
                                styles={{ paddingRight: "37px" }}
                                ref={eyeVisibilityRef}
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
                        />
                    </form>

                    <p className="text-[rgb(94, 108, 132)] text-md font-medium mt-6 text-center">Or continue with:</p>

                    <div className="flex flex-col gap-4 mt-4 pb-7" style={{ borderBottom: "1px solid rgb(193, 199, 208)" }}>
                        {
                            providerArr?.map((prov: any, ind: number) => {
                                return (
                                    <CustomButton
                                        key={ind}
                                        text={<span className="flex items-center gap-3"><img src={prov?.url} alt={prov?.alt} className="w-6" />{prov?.name}</span>}
                                        onButtonClick={() => console.log("ds")}
                                        styles={customLoginStyles} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <img src={`${basename}assets/images/loginscreen2.PNG`} alt="loginscreen1"  className="absolute bottom-0 right-0"/>
        </div>

    )
}

export default LoginComp