import { forwardRef, memo } from "react"

const TextInputField = forwardRef(({ classes = "", formik = {}, handleFocus=null , name, placeHolder = "", required = true, styles = {}, types, disabled = false, }: any, ref: any) => {
    const formikErrors: any = formik?.errors;
    const formikTouched: any = formik?.touched;
    const errors: any = formikErrors && formikErrors[name];
    const touched: any = formikTouched && formikTouched[name];
    const currentValue: any = formik?.values && formik?.values[name];

    return (
        <div className="w-full">
            <input
                name={name}
                ref={ref}
                type={types}
                style={{ ...styles }}
                placeholder={placeHolder}
                className={`w-[100%] h-[40px] pl-2 pt-3 pb-4 text-[14px] border rounded-sm outline-1 outline-blue-500  ${classes}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={handleFocus}
                value={currentValue}
                required={required}
                disabled={disabled}
            />
            {touched && errors && <p className=" text-md mt-1 text-red-300 font-semibold tracking-wider">{errors}</p>}
        </div>
    )

})

export default memo(TextInputField)