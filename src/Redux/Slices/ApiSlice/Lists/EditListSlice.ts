import { createSlice } from "@reduxjs/toolkit";
import editList from "../../../Actions/Middlewares/Lists/EditLists";

const editListsState: any = {
    isEditListsLoading: false,
}

const editListsSlice = createSlice({
    name: "editLists",
    initialState: editListsState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(editList.pending, (state) => {
                state.isEditListsLoading = true
            })
            .addCase(editList.fulfilled, (state) => {
                state.isEditListsLoading = false
            })
            .addCase(editList.rejected, (state) => {
                state.isEditListsLoading = false
            })

    },
})

export default editListsSlice.reducer;