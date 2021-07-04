import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminUserData, addRole, addApplication, addCustomer, getCustomers, getApplications, getRoles, updateUser } from "../../util/Api/admin";

export const doGetAllUsers = createAsyncThunk(
    "getAllUsers",
    async ( {reloadUserData}, { rejectWithValue }) => {
      try {
        const resp = await getAdminUserData(reloadUserData);
        return resp;
      } catch (err) {
        //alert("No Users listed");
      localStorage.clear();      
      window.location.href="/login";
      window.location.reload();
      return rejectWithValue(err);
      }
    }
  );

  export const doAddRole = createAsyncThunk(
    "addRole",
    async ( {role}, { rejectWithValue }) => {
      try {
        const resp = await addRole(role);
        return resp;
      } catch (err) {
        
        return rejectWithValue(err);
      }
    }
  );

  export const doAddApplication = createAsyncThunk(
    "addApplication",
    async ( {applicationName, roles}, { rejectWithValue }) => {
      try {
        const resp = await addApplication(applicationName, roles);
        return resp;
      } catch (err) {
        
        return rejectWithValue(err);
      }
    }
  );

  export const doGetRoles = createAsyncThunk(
    "getRoles",
    async ( _, { rejectWithValue }) => {
      try {
        const resp = await getRoles();
        return resp;
      } catch (err) {
        //alert("No Users listed");
      
      return rejectWithValue(err);
      }
    }
  );

  export const doGetApplications = createAsyncThunk(
    "getApplications",
    async ( _, { rejectWithValue }) => {
      try {
        const resp = await getApplications();
        return resp;
      } catch (err) {
        //alert("No Users listed");
      
      return rejectWithValue(err);
      }
    }
  );

  export const doGetCustomers = createAsyncThunk(
    "getCustomers",
    async ( _, { rejectWithValue }) => {
      try {
        const resp = await getCustomers();
        return resp;
      } catch (err) {
        //alert("No Users listed");
      
      return rejectWithValue(err);
      }
    }
  );

  export const doAddCustomer = createAsyncThunk(
    "addCustomer",
    async ( {customerId, customerName, description}, { rejectWithValue }) => {
      try {
        const resp = await addCustomer(customerId, customerName, description);
        return resp;
      } catch (err) {
        //alert("No Users listed");
      
      return rejectWithValue(err);
      }
    }
  );

  export const doUpdateUser = createAsyncThunk(
    "updateUser",
    async ( {user}, { rejectWithValue }) => {
      try {
        const resp = await updateUser(user);
        return resp;
      } catch (err) {
        
        return rejectWithValue(err);
      }
    }
  );