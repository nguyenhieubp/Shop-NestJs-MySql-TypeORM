import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductWithVariations } from "@/models/detail_product";

interface InitialState {
  product: ProductWithVariations | undefined;
}

const initialState: InitialState = {
  product: undefined,
};

export const fetchDetailProduct = createAsyncThunk(
  "products/fetchDetailProduct",
  async (id: string | string[] | undefined) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/product-config/product?id=${id}`
    );

    return response.data;
  }
);

const sliceFetchDetailProduct = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      fetchDetailProduct.fulfilled,
      (state, action: PayloadAction<ProductWithVariations>) => {
        state.product = action.payload;
      }
    );
  },
});

export default sliceFetchDetailProduct.reducer;
