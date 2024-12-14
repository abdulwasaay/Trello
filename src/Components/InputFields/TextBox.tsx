const TextBox = ({ ids, rows = 3, classes = "", name, maxLen = "" , styles = {}, placeHolder = "", formik = {} }: any) => {
    const formikErrors: any = formik?.errors;
    const formikTouched: any = formik?.touched;
    const errors: any = formikErrors && formikErrors[name];
    const touched: any = formikTouched && formikTouched[name];
    const currentValue: any = formik?.values && formik?.values[name];
    return (
        <div className="w-full">
            <textarea
                maxLength={maxLen}
                name={name}
                id={ids}
                rows={rows}
                className={` resize-none outline-none w-full h-[17vh] px-[10px]  py-[7px] font-medium text-[#aab5ca] placeholder:text-[#aab5ca] placeholder:opacity-60 placeholder:font-normal focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${classes}`}
                placeholder={placeHolder}
                style={{ ...styles, border: touched && errors ? "1px solid #fca5a5" : styles.border }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={currentValue}
            ></textarea>
            {touched && errors && <p className=" text-sm mt-1 text-red-300 font-semibold tracking-wider">{errors}</p>}
        </div>
    )
}

export default TextBox

// "Our team organizes everything here."

// "workspaceDescription"