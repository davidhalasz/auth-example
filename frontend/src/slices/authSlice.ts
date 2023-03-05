import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import User from "../models/user";

export type initialStateType = {
  data: any | null;
  isLoading: boolean;
  message: string | null;
  isLoggedIn: boolean;
  isSuccess: boolean;
};

// ha siker, akkoe ay isSuccess true, ellenkezo esetben false, 
// es mindig azt csekkoljuk le, hogy van e uzenet.

const initialState: initialStateType = {
  data: null,
  isLoading: true,
  message: '',
  isLoggedIn: false,
  isSuccess: false,
};

export type loginType = {
  email: string;
  password: string;
}

// ACTION
export const loginUser = createAsyncThunk<User|any, string|Object>(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const response = await axios.post('http://localhost:9000/api/auth/login', data, {withCredentials: true});
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg as string);
    }
  }
);

export const registerUser = createAsyncThunk<User|any, string|Object>(
  "auth/register",
  async(data, thunkApi) => {
    try {
      const response = await axios.post('http://localhost:9000/api/auth/register', data, {withCredentials: true});
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg as string); 
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
      console.log(response.data.msg);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.msg as string);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
  console.log('called logout');
  try {
    axios.delete("http://localhost:9000/api/auth/logout", {withCredentials: true});
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.msg as string);
  }
})


// SLICE
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.data = action.payload.user;
      state.message = action.payload.msg;
      state.isSuccess = true;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.isSuccess = false;
      state.message = action.payload as unknown as string;
    });

    //register
    builder.addCase(registerUser.pending, (state) =>{
      state.isLoading = true;
    }).addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = 'User has been created. You can log in.';
      state.isSuccess = true;
      console.log(state.message);
    }).addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.message =  action.payload as unknown as string;
      state.isSuccess = false;
    })

    //check user
    builder.addCase(getCurrentUser.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getCurrentUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    })
    .addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    });

    //logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.data = null;
      window.location.reload();
    }).addCase(logout.rejected, (state, action) => {
      state.message =  action.payload as unknown as string;
    })
  }
});

export const {resetMessage} = authSlice.actions;
export default authSlice.reducer;
