import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const listState: any = {
    lists: []
}

const listsSlice = createSlice({
    name: "listsData",
    initialState: listState,
    reducers: {
        setListsData: (state: any, action: PayloadAction) => {
            state.lists = action.payload
        }
    }
})

export const { setListsData } = listsSlice.actions;
export default listsSlice.reducer