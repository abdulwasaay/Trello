import { createSlice } from "@reduxjs/toolkit";
import getWorkSpace from "../../../Actions/Middlewares/WorkSpaces/GetWorkSpace";

const getWorksState: any = {
    isLoading: false,
}

const getWorkSpaceSlice = createSlice({
    name: "getWorkSpace",
    initialState: getWorksState,
    reducers: {
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

export default getWorkSpaceSlice.reducer;