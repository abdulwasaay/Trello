import { createSlice } from "@reduxjs/toolkit";
import addList from "../../../Actions/Middlewares/Lists/AddLists";

const addState: any = {
    isAddListsLoading: false,
}

const addListsSlice = createSlice({
    name: "addList",
    initialState: addState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(addList.pending, (state) => {
                state.isAddListsLoading = true
            })
            .addCase(addList.fulfilled, (state) => {
                state.isAddListsLoading = false
            })
            .addCase(addList.rejected, (state) => {
                state.isAddListsLoading = false
            })

    },
})

export default addListsSlice.reducer