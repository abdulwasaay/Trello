import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const authState: any = {
    workSpaces: []
}

const workspaceSlice = createSlice({
    name: "workspaceData",
    initialState: authState,
    reducers: {
        setWorkSpaces: (state: any, action: PayloadAction) => {
            state.workSpaces = action.payload
        }
    }
})

export const { setWorkSpaces } = workspaceSlice.actions;
export default workspaceSlice.reducer