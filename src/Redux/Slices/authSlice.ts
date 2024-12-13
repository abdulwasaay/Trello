import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const authState: any = {
    isAuth: false,
    user: {}
}

const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        onLoginReducer: (state, action: PayloadAction<any>) => {
            state.user = action.payload
            state.isAuth = true
        },
        setAuth: (state, action: PayloadAction<any>) => {
            state.isAuth = action.payload
        }
    }
})

export const { onLoginReducer, setAuth } = authSlice.actions;
export default authSlice.reducer