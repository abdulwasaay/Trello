import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginAPi } from "../../../../config/env";
import ApiErrorHandler from "../../../../Utils/ApiErrorHandler";
import GetCookieValue from "../../../../Utils/getCookieHandler";
import authCookie from "../../../../Constants/cookieName";

const getWorkSpace = createAsyncThunk(
    "GETWORKSPACE_API",
    async ({ onGetWorkspaceSuccess, onGetWorkspaceFail }: any, { rejectWithValue }) => {

        try {
            const token = GetCookieValue(authCookie);
            const response = await fetch(`${loginAPi}/project2/api/workspaces/list.php`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json();
            if (!response.ok) {
                const errMessage = ApiErrorHandler(response, data)
                onGetWorkspaceFail(errMessage, response)
            } else {
                onGetWorkspaceSuccess(data)
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

export default getWorkSpace