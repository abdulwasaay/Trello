import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./Slices/ApiSlice/LoginSlice"
import authSlice from "./Slices/authSlice"
import addWorkSpaceSlice from "./Slices/ApiSlice/WorkSpaces/AddWorkSpaceSlice"
import getWorkSpaceSlice from "./Slices/ApiSlice/WorkSpaces/GetWorkSpaceSlice"

const rootReducer = combineReducers({
    loginSlice,
    authSlice,
    addWorkSpaceSlice,
    getWorkSpaceSlice
})

export default rootReducer    