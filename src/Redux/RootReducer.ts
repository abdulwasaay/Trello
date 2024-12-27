import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./Slices/ApiSlice/LoginSlice"
import registerSlice from "./Slices/ApiSlice/RegisterSlice"
import authSlice from "./Slices/authSlice"
import workspaceSlice from "./Slices/workSpaces"
import addWorkSpaceSlice from "./Slices/ApiSlice/WorkSpaces/AddWorkSpaceSlice"
import getWorkSpaceSlice from "./Slices/ApiSlice/WorkSpaces/GetWorkSpaceSlice"
import addBoardSlice from "./Slices/ApiSlice/Boards/AddBoardSlice"
import getBoardSlice from "./Slices/ApiSlice/Boards/GetBoardSlice"
import addListsSlice from "./Slices/ApiSlice/Lists/AddListSlice"
import getListsSlice from "./Slices/ApiSlice/Lists/GetListSlice"
import listsSlice from "./Slices/Lists"

const rootReducer = combineReducers({
    loginSlice,
    authSlice,
    addWorkSpaceSlice,
    getWorkSpaceSlice,
    workspaceSlice,
    registerSlice,
    addBoardSlice,
    getBoardSlice,
    addListsSlice,
    getListsSlice,
    listsSlice
})

export default rootReducer    