import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { APiBaseUrl } from "../../../../config/env";
import ApiErrorHandler from "../../../../Utils/ApiErrorHandler";
import GetCookieValue from "../../../../Utils/getCookieHandler";
import authCookie from "../../../../Constants/cookieName";
const editList = createAsyncThunk(
    "EDITLIST_API",
    async ({ jsonData, onEditListsSuccess, onEditListsFail }: any, { rejectWithValue }) => {

        try {
            const token = GetCookieValue(authCookie);
            const response = await fetch(`${APiBaseUrl}/project2/api/lists/edit.php`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(jsonData),
            })
            const data = await response.json();
            if (!response.ok) {
                const errMessage = ApiErrorHandler(response, data)
                onEditListsFail(errMessage, response)
            } else {
                onEditListsSuccess(data)
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

export default editList