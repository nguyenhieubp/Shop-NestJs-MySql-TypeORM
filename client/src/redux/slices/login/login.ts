import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  idUser: string | undefined;
}

const initialState: InitialState = {
  idUser: undefined,
};
