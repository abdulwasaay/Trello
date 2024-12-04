import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./RootReducer";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { thunk } from "redux-thunk";


const persistConfig = {
    key: 'root',
    storage,
    blacklist : [
        "signupSlice",
        "loginSlice",
        "forgotSlice",
        "OTPSlice",
        "VerifyOTPSlice",
        "ResetSlice",
    ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk),
})

export const persistor = persistStore(store);
export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch