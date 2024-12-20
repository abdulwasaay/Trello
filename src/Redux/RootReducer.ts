import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./Slices/ApiSlice/LoginSlice"
import registerSlice from "./Slices/ApiSlice/RegisterSlice"
import authSlice from "./Slices/authSlice"
import workspaceSlice from "./Slices/workSpaces"
import addWorkSpaceSlice from "./Slices/ApiSlice/WorkSpaces/AddWorkSpaceSlice"
import getWorkSpaceSlice from "./Slices/ApiSlice/WorkSpaces/GetWorkSpaceSlice"
import addBoardSlice from "./Slices/ApiSlice/Boards/AddBoardSlice"
import getBoardSlice from "./Slices/ApiSlice/Boards/GetBoardSlice"

const rootReducer = combineReducers({
    loginSlice,
    authSlice,
    addWorkSpaceSlice,
    getWorkSpaceSlice,
    workspaceSlice,
    registerSlice,
    addBoardSlice,
    getBoardSlice
})

export default rootReducer    