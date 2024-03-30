import { getCookie, removeCookie, setCookie } from "../../utils/cookie";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: getCookie("token") || "",
  role: getCookie("role") || "",
  email: getCookie("email") || "",
  language: getCookie("language") || "en",
  isAuthenticated: Boolean(getCookie("token")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      setCookie("token", action.payload.token);
      setCookie("role", action.payload.role);
      setCookie("email", action.payload.email);
    },

    setLanguage(state, action) {
      state.language = action.payload.language;
      setCookie("language", action.payload.language);
    },

    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
      state.email = null;
      state.language = "en";
      removeCookie("token");
      removeCookie("role");
      removeCookie("email");
      removeCookie("language");
    },
  },
});

export const { setToken, clearToken, setLanguage } = authSlice.actions;
export default authSlice.reducer;
