import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInventoryDataAPI } from '../../util/Api/inventory';

/*
*window.location need to changed to Redirect in React
*/
export const fetchInventoryData = createAsyncThunk(
  "fetchInventory",
  async ({ id }, { rejectWithValue }) => {
    try {
      let resp = await fetchInventoryDataAPI({id});
      return resp.data; 
    } catch (err) {
      localStorage.clear();      
      window.location.href="/login";
      window.location.reload();
      
    }
  }
);