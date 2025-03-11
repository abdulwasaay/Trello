import { createSlice } from "@reduxjs/toolkit";
import moveLists from "../../../Actions/Middlewares/Lists/move";

const moveListsState: any = {
    isMoveListsLoading: false,
}

const moveListsSlice = createSlice({
    name: "moveLists",
    initialState: moveListsState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(moveLists.pending, (state) => {
                state.isMoveListsLoading = true
            })
            .addCase(moveLists.fulfilled, (state) => {
                state.isMoveListsLoading = false
            })
            .addCase(moveLists.rejected, (state) => {
                state.isMoveListsLoading = false
            })

    },
})

export default moveListsSlice.reducer;