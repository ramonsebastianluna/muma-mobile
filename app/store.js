import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";
import petSlice from "../pages/Home/petSlice";

export const store = configureStore({
    reducer: {
        login: authSlice,
        pets: petSlice,
    },
});