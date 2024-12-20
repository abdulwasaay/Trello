import { createSlice } from "@reduxjs/toolkit";
import onRegister from "../../Actions/Middlewares/Register";

const registerState: any = {
    isRegisterLoading: false,
}

const registerSlice = createSlice({
    name: "register",
    initialState: registerState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(onRegister.pending, (state) => {
                state.isRegisterLoading = true
            })
            .addCase(onRegister.fulfilled, (state) => {
                state.isRegisterLoading = false
            })
            .addCase(onRegister.rejected, (state) => {
                state.isRegisterLoading = false
            })

    },
})

export default registerSlice.reducer