import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInventoryDataAPI } from '../../util/Api/inventory';

export const fetchInventoryData = createAsyncThunk(
  "fetchInventory",
  async ({ id }, { rejectWithValue }) => {
    try {
      const resp = await fetchInventoryDataAPI({id});
      return resp.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);