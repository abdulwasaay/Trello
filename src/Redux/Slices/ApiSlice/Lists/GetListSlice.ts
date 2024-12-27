import { createSlice } from "@reduxjs/toolkit";
import getLists from "../../../Actions/Middlewares/Lists/GetLists";

const getListsState: any = {
    isGetListsLoading: false,
}

const getListsSlice = createSlice({
    name: "getLists",
    initialState: getListsState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(getLists.pending, (state) => {
                state.isGetListsLoading = true
            })
            .addCase(getLists.fulfilled, (state) => {
                state.isGetListsLoading = false
            })
            .addCase(getLists.rejected, (state) => {
                state.isGetListsLoading = false
            })

    },
})

export default getListsSlice.reducer;