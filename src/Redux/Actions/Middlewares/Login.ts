import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginAPi } from "../../../config/env";
import ApiErrorHandler from "../../../Utils/ApiErrorHandler";

const onLogin = createAsyncThunk(
    "LOGIN_API",
    async ({ formData, onLoginSuccess, onFail }: any, { rejectWithValue }) => {

        try {
            const response = await fetch(`${loginAPi}/project2/api/users/login.php`, {
                method: "POST",
                body: formData,
            })
            const data = await response.json();
            if (!response.ok) {
                const errMessage = ApiErrorHandler(response, data)
                onFail(errMessage)
            } else {
                onLoginSuccess(data)
            }
        } catch (err: any) {
            if (err.message === 'Failed to fetch') {
                toast.error("Network Error")
            }
            else {
                toast.error("Something went wrong")
            }
            return rejectWithValue(err)
        }


    }
)

export default onLogin