import { createSlice } from "@reduxjs/toolkit";
import onLogin from "../../Actions/Middlewares/Login";

const loginState: any = {
    isLoading: false,
}

const loginSlice = createSlice({
    name: "login",
    initialState: loginState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(onLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(onLogin.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(onLogin.rejected, (state) => {
                state.isLoading = false
            })

    },
})

export default loginSlice.reducer