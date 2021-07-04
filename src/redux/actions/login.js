import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPassword, login, register, resetPassword } from "../../util/Api/login";

export const doLogin = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const resp = await login({ email, password });
      return resp;
    } catch (err) {
      alert("Please enter valid email and password");
      return rejectWithValue(err);
    }
  }
);

export const doRegister = createAsyncThunk(
  "register",
  async ({ email, password, userName }, { rejectWithValue }) => {
    try {
      const resp = await register({ email, password, userName });
      alert("Registration Successful")
      return resp;
    } catch (err) {
      alert(err.response.data.message)
      return rejectWithValue(err);
    }
  }
);

export const doForgotPassword = createAsyncThunk(
  "forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const resp = await forgotPassword({ email });
      return resp;
    } catch (err) {
      
      return rejectWithValue(err);
    }
  }
);

export const doResetPassword = createAsyncThunk(
  "resetPassword",
  async ({ password, authToken }, { rejectWithValue }) => {
    try {
      const resp = await resetPassword({ password, authToken });
      return resp;
    } catch (err) {
      alert(err);
      return rejectWithValue(err);
    }
  }
);