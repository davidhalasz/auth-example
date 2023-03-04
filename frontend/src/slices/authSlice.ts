import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import User from "../models/user";

export type initialStateType = {
  data: any | null;
  isLoading: boolean;
  message: string | unknown;
  isLoggedIn: boolean;
};

const initialState: initialStateType = {
  data: null,
  isLoading: true,
  message: '',
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
      const response = await axios.post('http://localhost:9000/api/auth/login', data, {withCredentials: true});
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue({erros: error.data.msg});
    }
  }
);

export const getCurrentUser = createAsyncThunk<User>(
  "auth/currentuser",
  async(_, thunkApi) => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/auth/currentuser", {withCredentials: true}
      );
      console.log("called currentuser");
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.msg);
      return thunkApi.rejectWithValue({erros: error.response.data.msg as string});
    }
  }
);


// SLICE
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
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
    });

    //check user
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.data = null;
      state.message = action.payload;
    });
  }
});

export default authSlice.reducer;
