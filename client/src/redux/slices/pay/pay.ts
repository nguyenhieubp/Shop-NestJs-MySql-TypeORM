import { ProductOrderLine } from "@/models/pay";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootObject } from "@/component/profile/Bills";
import axios from "axios";

interface InitialState {
  products: Array<ProductOrderLine>;
  productReview: RootObject | null;
}

const initialState: InitialState = {
  products: [],
  productReview: null,
};

export const createOrderLine = createAsyncThunk(
  "orderLine/createOrderLine",
  async ({
    shopOrderId,
    shoppingCartId,
  }: {
    shoppingCartId: string | null;
    shopOrderId: string | null;
  }) => {
    const response = await axios.post(
      `http://localhost:3000/api/v1/order-line`,
      {
        shopOrderId,
        shoppingCartId,
      }
    );
    return response.data;
  }
);

export const emptyOrderLine = createAsyncThunk(
  "orderLine/emptyOrderLine",
  async ({ shoppingCartId }: { shoppingCartId: string | null }) => {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/shopping-cart-item/emptyCart/${shoppingCartId}`
    );
    return response.data;
  }
);

const sliceOrderLine = createSlice({
  name: "orderLine",
  initialState,
  reducers: {
    productReview: (state, action: PayloadAction<RootObject>) => {
      state.productReview = action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(
      createOrderLine.fulfilled,
      (state, action: PayloadAction<ProductOrderLine[]>) => {
        state.products = action.payload;
      }
    );
    build.addCase(
      emptyOrderLine.fulfilled,
      (state, action: PayloadAction<string>) => {}
    );
  },
});

export const { productReview } = sliceOrderLine.actions;

export default sliceOrderLine.reducer;
