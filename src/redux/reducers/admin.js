import { createSlice } from "@reduxjs/toolkit";
import {doGetAllUsers, doAddRole, doGetRoles, doGetApplications, doGetCustomers, doAddApplication, doAddCustomer } from "../actions";


const initialState = {
  authenticated: localStorage.getItem("token") ? true : false,
  loading: false,
  userData: {
    users: [],
    roles: [],
    customers: []
  },
  rolesData: [],
  applicationsData: [],
  customersData: []

};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: {
    [doGetAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [doGetAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    [doGetAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //addRole
    [doAddRole.pending]: (state) => {
      state.loading = true;
    },
    [doAddRole.fulfilled]: (state, action) => {
      state.loading = false;
      state.rolesData = [];
    },
    [doAddRole.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Get Roles
    [doGetRoles.pending]: (state) => {
      state.loading = true;
    },
    [doGetRoles.fulfilled]: (state, action) => {
      state.loading = false;
      state.rolesData = action.payload;
    },
    [doGetRoles.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Get Applications
    [doGetApplications.pending]: (state) => {
      state.loading = true;
    },
    [doGetApplications.fulfilled]: (state, action) => {
      state.loading = false;
      state.applicationsData = action.payload;
    },
    [doGetApplications.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Get Applications
    [doGetCustomers.pending]: (state) => {
      state.loading = true;
    },
    [doGetCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.customersData = action.payload;
    },
    [doGetCustomers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //add Application
    [doAddApplication.pending]: (state) => {
      state.loading = true;
    },
    [doAddApplication.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [doAddApplication.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //add Customer
    [doAddCustomer.pending]: (state) => {
      state.loading = true;
    },
    [doAddCustomer.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [doAddCustomer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    },
});

export default adminSlice;
