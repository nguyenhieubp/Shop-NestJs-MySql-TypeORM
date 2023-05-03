import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "@/models/product_item";

interface InitialState {
  products: Array<Product>;
}

const initialState: InitialState = {
  products: [],
};

export const fetchAllProductItem = createAsyncThunk(
  "products/fetchAllProductItem",
  async (pageNumber: number) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/product-item?page=${Number(
        pageNumber
      )}&limit=10`
    );

    return response.data;
  }
);

export const fetchProductItemSortByPrice = createAsyncThunk(
  "products/fetchProductItemSortByPrice",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/product-item/sortByPriceIncrement"
    );
    return response.data;
  }
);

export const fetchProductItemSortByPriceHigh = createAsyncThunk(
  "products/fetchProductItemSortByPriceHigh",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/product-item/sortByPriceDecrement"
    );
    return response.data;
  }
);

export const fetchProductItemSortByDate = createAsyncThunk(
  "products/fetchProductItemSortByDate",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/product-item/sortByDate"
    );
    return response.data;
  }
);

export const fetchProductItemSortByPurchase = createAsyncThunk(
  "products/fetchProductItemSortByPurchase",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/product-item/sortPurchase"
    );
    return response.data;
  }
);

export const fetchProductItemSortByCategory = createAsyncThunk(
  "products/fetchProductItemSortByCategory",
  async (category: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/product-item/getByCategory?category=${category}`
    );
    return response.data;
  }
);

export const fetchProductItemPurchase = createAsyncThunk(
  "products/fetchProductItemPurchase",
  async ({ id, purchase }: { id: string | undefined; purchase: number }) => {
    console.log(purchase);
    const response = await axios.put(
      `http://localhost:3000/api/v1/product-item/purchase/${id}`,
      {
        purchase: purchase,
      }
    );
    console.log(response.data);
    return response.data;
  }
);

const sliceFetchProduct = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(
      fetchAllProductItem.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      }
    );
    build.addCase(
      fetchProductItemSortByPrice.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      }
    );
    build.addCase(
      fetchProductItemSortByPriceHigh.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      }
    );
    build.addCase(
      fetchProductItemSortByDate.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      }
    );
    build.addCase(
      fetchProductItemSortByPurchase.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      }
    );
    build.addCase(
      fetchProductItemSortByCategory.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      }
    );
    build.addCase(fetchProductItemPurchase.fulfilled, () => {});
  },
});

export default sliceFetchProduct.reducer;
