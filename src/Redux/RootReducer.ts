import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./Slices/ApiSlice/LoginSlice"
import authSlice from "./Slices/authSlice"

const rootReducer = combineReducers({
    loginSlice,
    authSlice
})

export default rootReducer    