import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../util/Api/login";

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
      return resp;
    } catch (err) {
      
      return rejectWithValue(err);
    }
  }
);