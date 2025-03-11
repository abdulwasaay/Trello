import { createSlice } from "@reduxjs/toolkit";
import addCard from "../../../Actions/Middlewares/Cards/AddCards";

const AddCardState: any = {
    isAddCardLoading: false,
}

const addCardSlice = createSlice({
    name: "addCard",
    initialState: AddCardState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addCard.pending, (state) => {
                state.isAddCardLoading = true
            })
            .addCase(addCard.fulfilled, (state) => {
                state.isAddCardLoading = false
            })
            .addCase(addCard.rejected, (state) => {
                state.isAddCardLoading = false
            })
    },
})

export default addCardSlice.reducer;