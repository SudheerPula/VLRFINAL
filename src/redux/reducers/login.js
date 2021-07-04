import { createSlice } from "@reduxjs/toolkit";
import { doLogin, doRegister, doForgotPassword, doResetPassword} from "../actions";

const initialState = {
  authenticated: localStorage.getItem("token") ? true : false,
  resetPasswordSuccess: false,
  forgotPasswordSuccess: false,
  authorizing: false,
  loading: false,
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
    [doForgotPassword.pending]: (state) => {
      state.loading = true;
    },
    [doForgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.forgotPasswordSuccess = true;
    },
    [doForgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [doResetPassword.pending]: (state) => {
      state.loading = true;
    },
    [doResetPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.resetPasswordSuccess = true;
    },
    [doResetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default loginSlice;
