import { configureStore } from "@reduxjs/toolkit";
import product from "../slices/home/product";
import productConfig from "../slices/home/productConfig";
import detail_product from "../slices/detail/detail_product";
import carts from "../slices/cart/carts";
import address from "../slices/address/address";
import pay from "../slices/pay/pay";
import option from "../slices/admin/option";

const store = configureStore({
  reducer: {
    product,
    detail_product,
    carts,
    productConfig,
    address,
    pay,
    option,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
