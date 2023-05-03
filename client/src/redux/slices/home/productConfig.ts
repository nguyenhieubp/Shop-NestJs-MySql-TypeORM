import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "@/models/product_item";
import { Purchase } from "@/models/product_config";

interface InitialState {
  productConfigs: Array<Purchase>;
}

const initialState: InitialState = {
  productConfigs: [],
};

export const fetchAllProductConfig = createAsyncThunk(
  "productConfig/fetchAllProductConfig",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/product-config"
    );

    return response.data;
  }
);

const sliceFetchProduct = createSlice({
  name: "productConfig",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      fetchAllProductConfig.fulfilled,
      (state, action: PayloadAction<Purchase[]>) => {
        state.productConfigs = action.payload;
      }
    );
  },
});

export default sliceFetchProduct.reducer;
