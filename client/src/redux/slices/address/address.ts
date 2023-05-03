import { Address } from "@/models/address";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface InitialState {
  address: Address[];
  addressMain: Address | undefined;
}

const initialState: InitialState = {
  address: [],
  addressMain: undefined,
};

export const getAllAddressUser = createAsyncThunk(
  "address/getAllAddressUser",
  async (id: string | undefined) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/address-user/user/${id}`
    );
    return response.data;
  }
);

export const addressAddressUser = createAsyncThunk(
  "address/addAddressUser",
  async (id: string | undefined) => {
    const response = await axios.post(
      `http://localhost:3000/api/v1/shop-order`,
      {
        // shippingAddressId
      }
    );
    console.log(response.data);
    return response.data;
  }
);

const sliceAddressUser = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      getAllAddressUser.fulfilled,
      (state, action: PayloadAction<Address[]>) => {
        state.address = action.payload;
      }
    );
    build.addCase(addressAddressUser.fulfilled, () => {});
  },
});

export default sliceAddressUser.reducer;
