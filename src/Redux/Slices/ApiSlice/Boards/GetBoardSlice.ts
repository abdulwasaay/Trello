import { createSlice } from "@reduxjs/toolkit";
import getBoard from "../../../Actions/Middlewares/Boards/GetBoard";

const getBoardState: any = {
    isGetBoardLoading: false,
}

const getBoardSlice = createSlice({
    name: "getBoard",
    initialState: getBoardState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(getBoard.pending, (state) => {
                state.isGetBoardLoading = true
            })
            .addCase(getBoard.fulfilled, (state) => {
                state.isGetBoardLoading = false
            })
            .addCase(getBoard.rejected, (state) => {
                state.isGetBoardLoading = false
            })

    },
})

export default getBoardSlice.reducer;