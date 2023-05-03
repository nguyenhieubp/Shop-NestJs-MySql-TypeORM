import { ShoppingCartItem, UserRecord } from "@/models/cartItem";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  cartId: string | undefined;
  cart: ShoppingCartItem[];
  totalPrice: number;
  quantityBuy: number;
  length: number;
}

const initialState: InitialState = {
  cartId: undefined,
  cart: [],
  totalPrice: 0,
  quantityBuy: 0,
  length: 0,
};

export const addCartUser = createAsyncThunk(
  "cart/addCartUser",
  async (id: string | undefined) => {
    const response = await axios.post(
      `http://localhost:3000/api/v1/shopping-cart`,
      {},
      {
        withCredentials: true,
      }
    );
    try {
      console.log(response.data);
      localStorage.setItem("cartId", response.data.id);
    } catch (error) {}
    return response.data;
  }
);

export const getCartUser = createAsyncThunk(
  "cart/getCartUser",
  async (id: string | undefined) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/shopping-cart/user`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const getProductInCartUser = createAsyncThunk(
  "cart/getProductInCartUser",
  async (id: string | undefined) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/shopping-cart-item/shoppingCart/${id}`
    );
    return response.data;
  }
);

export const addProductInCartUser = createAsyncThunk(
  "cart/addProductInCartUser",
  async ({
    shoppingCartId,
    productId,
    quantity,
  }: {
    shoppingCartId: string | null;
    productId: string | undefined;
    quantity: number;
  }): Promise<any> => {
    const response = await axios.post(
      `http://localhost:3000/api/v1/shopping-cart-item`,
      {
        shoppingCartId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);

export const deleteProductInCartUser = createAsyncThunk(
  "cart/deleteProductInCartUser",
  async (id: string) => {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/shopping-cart-item/productItem/${id}`
    );
    return id;
  }
);

export const incrementProductInCartUser = createAsyncThunk(
  "cart/incrementProductInCartUser",
  async ({
    id,
    numberUpPurchase,
  }: {
    id: string | null;
    numberUpPurchase: number;
  }) => {
    await axios.put(
      `http://localhost:3000/api/v1/shopping-cart-item/increment/changeQuantity/${id}`,
      {
        numberUpPurchase,
      }
    );
    return { id: id, quantity: numberUpPurchase };
  }
);

export const decrementProductInCartUser = createAsyncThunk(
  "cart/decrementProductInCartUser",
  async ({
    id,
    numberDownPurchase,
  }: {
    id: string | null;
    numberDownPurchase: number;
  }) => {
    const response = await axios.put(
      `http://localhost:3000/api/v1/shopping-cart-item/decrement/changeQuantity/${id}`,
      {
        numberDownPurchase,
      }
    );
    return { id: id, quantity: numberDownPurchase };
  }
);

const sliceCartUser = createSlice({
  name: "product",
  initialState,
  reducers: {
    totalPrice: (state) => {
      state.totalPrice = state.cart.reduce(
        (total, pro) => (total += pro.quantity * pro.product.variation.price),
        0
      );
    },
    numberQuantityBuy: (state, action) => {
      state.quantityBuy = action.payload;
    },
    lengthProduct: (state, action) => {
      state.length = action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(
      getCartUser.fulfilled,
      (state, action: PayloadAction<UserRecord>) => {
        state.cartId = action.payload.id;
      }
    );
    build.addCase(
      getProductInCartUser.fulfilled,
      (state, action: PayloadAction<ShoppingCartItem[]>) => {
        state.cart = action.payload;
      }
    );
    build.addCase(
      addProductInCartUser.fulfilled,
      (state, action: PayloadAction<ShoppingCartItem>) => {
        state.cart.push(action.payload);
      }
    );
    build.addCase(
      deleteProductInCartUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        const index = state.cart.findIndex(
          (product) => product.id === action.payload
        );
        state.cart.splice(index, 1);
      }
    );
    build.addCase(
      incrementProductInCartUser.fulfilled,
      (
        state,
        action: PayloadAction<{ quantity: number; id: string | null }>
      ) => {
        const index = state.cart.findIndex(
          (product) => product.id === action.payload.id
        );
        state.cart[index].quantity =
          state.cart[index].quantity + action.payload.quantity;
      }
    );
    build.addCase(
      decrementProductInCartUser.fulfilled,
      (
        state,
        action: PayloadAction<{ quantity: number; id: string | null }>
      ) => {
        const index = state.cart.findIndex(
          (product) => product.id === action.payload.id
        );
        state.cart[index].quantity =
          state.cart[index].quantity - action.payload.quantity;
      }
    );
    build.addCase(addCartUser.fulfilled, () => {});
  },
});

export const { totalPrice, numberQuantityBuy, lengthProduct } =
  sliceCartUser.actions;

export default sliceCartUser.reducer;
