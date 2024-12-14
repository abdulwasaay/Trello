import { createSlice } from "@reduxjs/toolkit";
import addWorkSpace from "../../../Actions/Middlewares/WorkSpaces/AddWorkSpace";

const addState: any = {
    isLoading: false,
}

const addWorkSpaceSlice = createSlice({
    name: "addWorkSpace",
    initialState: addState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(addWorkSpace.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addWorkSpace.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(addWorkSpace.rejected, (state) => {
                state.isLoading = false
            })

    },
})

export default addWorkSpaceSlice.reducer