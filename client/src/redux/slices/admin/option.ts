import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  select: string;
}

const initialState: InitialState = {
  select: "product",
};

const sliceOption = createSlice({
  name: "admin/option",
  initialState,
  reducers: {
    selectOption: (state, action: PayloadAction<string>) => {
      state.select = action.payload;
    },
  },
});

export const { selectOption } = sliceOption.actions;

export default sliceOption.reducer;
