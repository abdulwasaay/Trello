import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { APiBaseUrl } from "../../../config/env";
import ApiErrorHandler from "../../../Utils/ApiErrorHandler";
import GetCookieValue from "../../../Utils/getCookieHandler";
import authCookie from "../../../Constants/cookieName";

const onRegister = createAsyncThunk(
    "REGISTER_API",
    async ({ formData, onRegisterSuccess, onRegisterFail }: any, { rejectWithValue }) => {

        try {
            const token = GetCookieValue(authCookie);
            const response = await fetch(`${APiBaseUrl}/project2/api/users/register.php`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            })
            const data = await response.json();
            if (!response.ok) {
                const errMessage = ApiErrorHandler(response, data)
                onRegisterFail(errMessage)
            } else {
                onRegisterSuccess(data)
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

export default onRegister