import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { APiBaseUrl } from "../../../../config/env";
import ApiErrorHandler from "../../../../Utils/ApiErrorHandler";
import GetCookieValue from "../../../../Utils/getCookieHandler";
import authCookie from "../../../../Constants/cookieName";

const getBoard = createAsyncThunk(
    "GETBOARD_API",
    async ({ workSpaceId, onGetBoardSuccess, onGetBoardFail }: any, { rejectWithValue }) => {

        try {
            const token = GetCookieValue(authCookie);
            const response = await fetch(`${APiBaseUrl}/project2/api/boards/list.php?workspace_id=${workSpaceId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json();
            if (!response.ok) {
                const errMessage = ApiErrorHandler(response, data)
                onGetBoardFail(errMessage, response)
            } else {
                onGetBoardSuccess(data)
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

export default getBoard