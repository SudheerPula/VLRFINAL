import { createSlice } from "@reduxjs/toolkit";
import { fetchInventoryData } from "../actions";

const initialState = {
  gridData: [],
  loading: false,
  customerId: "",
  totalCustomerFabrics: {
    availableQty: '',
    committedQty: '',
    description: "Total",
    fabricId: '',
    id: '',
    inventoryStats: '',
    onHandQty: '',
    openPOQty: '',
    sku: '',
  }
        
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchInventoryData.pending]: (state) => {
      state.loading = true;
    },
    [fetchInventoryData.fulfilled]: (state, action) => {
      state.loading = false;
      state.gridData = action.payload.fabricInventory;
      state.customerId = action.payload.customerId;
      state.totalCustomerFabrics = action.payload.totalCustomerFabrics;
    },
    [fetchInventoryData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default inventorySlice;
