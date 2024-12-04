import { combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./Slices/themeSlices";

const rootReducer = combineReducers({
    themeSlice
})

export default rootReducer    