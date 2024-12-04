import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const themeState:any = {
    isDarkMode : "off",
}

const themeSlice = createSlice({
    name: "theme",
    initialState: themeState,
    reducers: {
        setTheme : (state , action:PayloadAction<any>) => {
            state.isDarkMode = action.payload
        }
    }
})

export const {setTheme} = themeSlice.actions

export default themeSlice.reducer