import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getWorkSpace from "../../../Actions/Middlewares/WorkSpaces/GetWorkSpace";

const getWorksState: any = {
    isLoading: false,
    workSpaces: []
}

const getWorkSpaceSlice = createSlice({
    name: "getWorkSpace",
    initialState: getWorksState,
    reducers: {
        setWorkSpaces: (state: any, action: PayloadAction) => {
            state.workSpaces = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getWorkSpace.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWorkSpace.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(getWorkSpace.rejected, (state) => {
                state.isLoading = false
            })

    },
})

export default getWorkSpaceSlice.reducer