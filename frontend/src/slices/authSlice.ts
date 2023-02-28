import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import User from "../models/user";

export type initialStateType = {
  data: any | null;
  isLoading: boolean;
  message: string | null;
  isLoggedIn: boolean;
};

const initialState: initialStateType = {
  data: null,
  isLoading: true,
  message: "",
  isLoggedIn: false,
};

export type loginType = {
  email: string;
  password: string;
}

// ACTION
export const loginUser = createAsyncThunk<User, string|Object>(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const response = await axios.post('http://localhost:9000/api/auth/login', data);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue({erros: error.data});
    }
  }
);

// SLICE
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.data = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.data = action.payload;
    })
  }
});

export default authSlice.reducer;
