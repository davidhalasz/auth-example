import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: true,
    message: ''
}

export const register = createAsyncThunk('register', async(user, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:9000/api/auth/register', 
        {
            username: user.username,
            email: user.email,
            password: user.password
        });
        return response.data;
    } catch (err) {
        const message = error.response.data.msg;
        if (err.response) return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.msg;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          console.log(action.payload);
          state.message = action.payload.msg;
        });
    },
});

export default authSlice.reducer;