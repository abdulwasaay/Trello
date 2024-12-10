import { useState } from "react"
import { basename } from "../../config/env"
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DoneIcon from '@mui/icons-material/Done';
import TextInputField from "../InputFields/TextInputField";
import CustomButton from "../CustomButtonComp/CustomButton";

const CreateBoardLatest = () => {
    const [boardImg, setBoardImg] = useState(`${basename}assets/images/backImg.jpg`);
    const [boardcolor, setBoardColor] = useState("#fc0019")
    const [isSelectedUrl, setIsSelectedUrl] = useState<boolean>(true);
    const [isSelectedColor, setIsSelectedColor] = useState<boolean>(false);


    const selectionHandlerURL = (event: any) => {
        event.preventDefault()
        setIsSelectedUrl(true);
        setIsSelectedColor(false)
    }

    const selectionHandlerColor = (event: any) => {
        event.preventDefault()
        setIsSelectedColor(true)
        setIsSelectedUrl(false);
    }

    const handleColorChange = (event: any) => {
        setBoardColor(event.target.value);
        setIsSelectedColor(true)
        setIsSelectedUrl(false);
    };

    const fileUpload = (files: any) => {
        const file = files[0];
        console.log(file, "file")
        if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
            // formik.setFieldValue("profileUrl", URL.createObjectURL(file));
            // formik.setFieldValue("profile", file);
            setBoardImg(URL.createObjectURL(file))
            setIsSelectedUrl(true);
            setIsSelectedColor(false)
        };
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <div>
            <div className="flex flex-col pb-3">
                <div className=" flex justify-center items-center">
                    <h3 className="font-medium text-[#cad1df] text-md mt-1">Create Board</h3>
                </div>
                <div className=" flex justify-center items-center">
                    {isSelectedColor && <div className=" w-[70%] h-[169px] mt-5 rounded-sm opacity-55" style={{ backgroundColor: boardcolor }}></div>}
                    {isSelectedUrl && <img src={boardImg} alt="boardImg" className="w-[70%] h-[169px] object-cover rounded-sm mt-5 opacity-75" />}
                </div>
                <form action="">
                    <div className="mt-5">
                        <p className="text-[#aab5ca] text-sm font-medium">Background</p>
                        <div className="flex gap-4 mt-1">
                            <div className="relative cursor-pointer" onClick={(e: any) => selectionHandlerURL(e,)} >
                                <img src={boardImg} alt="boardImg" className="w-[83px] h-[38px] object-cover rounded-md opacity-75" />
                                {isSelectedUrl && <div className=" absolute top-0 flex justify-center items-center w-full h-full rounded-md bg-black opacity-75"><DoneIcon className="opacity-75" style={{ background: "black", fontSize: "16px", fontWeight: "bold" }} /></div>}
                            </div>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                style={{ width: "100%", background: "#58595a" }}
                            >
                                Upload
                                <VisuallyHiddenInput
                                    type="file"
                                    name="background"
                                    onChange={(event: any) => fileUpload(event.target.files)}
                                    multiple={false}
                                    accept='image/png, image/jpeg, image/jpg'
                                />
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-1">
                        <div className="relative cursor-pointer" onClick={(e: any) => selectionHandlerColor(e)}>
                            <div className=" w-[60px] h-[38px] rounded-md opacity-75" style={{ backgroundColor: boardcolor }}></div>
                            {isSelectedColor && <div className=" absolute top-0 flex justify-center items-center w-full h-full rounded-md bg-black opacity-75"><DoneIcon className="opacity-75" style={{ background: "black", fontSize: "16px", fontWeight: "bold" }} /></div>}
                        </div>
                        <input type="color" id="favcolor" name="favcolor" value={boardcolor} onChange={handleColorChange} className=" bg-[#292b30] cursor-pointer w-full text-[#6464ff]  h-[4vh]"></input>
                    </div>

                    <div className="mt-3">
                        <label
                            htmlFor="boardTitle"
                            className="block text-sm font-medium text-[#aab5ca]"
                        >
                            Board title <span className=" text-red-600">*</span>
                        </label>
                        <TextInputField
                            name="boardTitle"
                            types="text"
                            classes="bg-[#27282b] hover:bg-[#292b30] mt-1"
                            styles={{ outline: "none", border: "2px solid #6464ff", color: "#aab5ca", fontWeight: "500", borderRadius: "5px" }}
                        />
                    </div>
                    <div className="mt-3">
                        <label
                            htmlFor="Visibility"
                            className="block text-sm font-medium text-[#aab5ca]"
                        >
                            Visibility
                        </label>
                        <select
                            id="Visibility"
                            className=" cursor-pointer hover:bg-[#35373b] mt-1 block w-full px-[7px]  py-[10px] bg-[#292b30] text-[#aab5ca] placeholder:text-[#aab5ca] font-medium outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ borderRadius: "5px", border: "2px solid #6464ff", }}
                        >
                            <option value="Private" selected className="">Private</option>
                            <option value="Public">Public</option>
                        </select>
                    </div>
                    <CustomButton text={"Create"} onButtonClick={() => console.log("ds")} styles={{ width: "100%", marginTop: "10px" }} />
                </form>
            </div>
        </div>
    )
}

export default CreateBoardLatest