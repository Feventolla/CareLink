import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    language: 'en'
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        }

    }
})

export const { setUser, clearUser, setLanguage } = authSlice.actions;
export default authSlice.reducer;