import React from "react";

interface SelectInputProps {
    dataArr: any;
    ids?: string;
    notFoundTitle?: string;
    disabled?: boolean;
    classes?: string;
    styles?: any;
    optionStyles?: any;
    formik?: any;
    name: string;
}

const SelectInputField: React.FC<SelectInputProps> = ({ ids = "", dataArr, formik = {}, name, notFoundTitle = "Not Found", optionStyles = {}, disabled = false, classes = "", styles = {} }) => {
    const formikErrors: any = formik?.errors;
    const formikTouched: any = formik?.touched;
    const errors: any = formikErrors && formikErrors[name];
    const touched: any = formikTouched && formikTouched[name];
    const currentValue: any = formik?.values && formik?.values[name];

    return (
        <div className="w-full">
            <select
                id={ids}
                name={name}
                required
                disabled={disabled}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={formik.handleFocus}
                value={currentValue}
                className={`cursor-pointer hover:bg-[#35373b] mt-1 block w-full px-[7px]  py-[10px] bg-[#292b30] text-[#aab5ca] placeholder:text-[#aab5ca] font-medium outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${classes}`}
                style={{ borderRadius: "5px", border: "2px solid #6464ff", ...styles }}
            >
                {
                    dataArr && dataArr.length > 0 ? (
                        dataArr.map((work: any) => (
                            <option key={work?.workSpace_Id} value={work?.workSpace_Id} className=" h-16" style={{ ...optionStyles }}>{work?.name}</option>
                        ))
                    ) : (
                        <option value="" selected disabled className="">{notFoundTitle}</option>
                    )

                }
                {/* <option value="Priva" selected className="">Private</option>
                            <option value="Public">Public</option> */}
            </select>
            {touched && errors && <p className=" text-sm mt-1 text-red-300 font-semibold tracking-wider">{errors}</p>}
        </div>
    )
}
export default SelectInputField