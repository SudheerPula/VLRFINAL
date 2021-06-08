import { createSlice } from "@reduxjs/toolkit";
import { doLogin, doRegister } from "../actions";

const initialState = {
  authenticated: localStorage.getItem("token") ? true : false,
  authorizing: false,
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {
        customers: [],
        admin: false,
        userId: null,
        email: "",
        userName: "",
      },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [doLogin.pending]: (state) => {
      state.authorizing = true;
    },
    [doLogin.fulfilled]: (state, action) => {
      state.authorizing = false;
      state.authenticated = true;
      state.userData = action.payload;
    },
    [doLogin.rejected]: (state, action) => {
      state.authorizing = false;
      state.error = action.payload.message;
    },
    [doRegister.pending]: (state) => {
      state.registering = true;
    },
    [doRegister.fulfilled]: (state, action) => {
      state.registering = false;
    },
    [doRegister.rejected]: (state, action) => {
      state.registering = false;
      state.error = action.payload.message;
    },
  },
});

export default loginSlice;
