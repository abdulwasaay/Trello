import { createSlice } from "@reduxjs/toolkit";
import addBoard from "../../../Actions/Middlewares/Boards/AddBoard";

const addState: any = {
    isLoading: false,
}

const addBoardSlice = createSlice({
    name: "addBoard",
    initialState: addState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(addBoard.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addBoard.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(addBoard.rejected, (state) => {
                state.isLoading = false
            })

    },
})

export default addBoardSlice.reducer