import { getCookie, removeCookie, setCookie } from "../../utils/cookie";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: getCookie("token") || "",
  role: getCookie("role") || "",
  email: getCookie("email") || "",
  isAuthenticated: Boolean(getCookie("token")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      console.log("action.payload", action.payload);
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      setCookie("token", action.payload.token);
      setCookie("role", action.payload.role);
      setCookie("email", action.payload.email);
    },

    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
      state.email = null;
      removeCookie("token");
      removeCookie("role");
      removeCookie("email");
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
