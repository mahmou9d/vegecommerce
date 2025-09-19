import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface AuthState {
  refresh: string;
  access: string;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  refresh: "",
  access: "",
  loading: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://e-commerce-web-production-ead4.up.railway.app/api/auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      alert(data);
      return data;
    } catch (error: any) {
      console.log(error, "errorlogin");
      return rejectWithValue(error.message);
    }
  }
);
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken", // ✅ خليها اسم Action عادي مش URL
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const refreshToken = state.auth.refresh; // ✅ استخدم refresh
      const accessToken = state.auth.access; // ✅ معاك access

      if (!refreshToken || !accessToken) {
        throw new Error("No tokens available");
      }

      const res = await fetch(
        "https://e-commerce-web-production-ead4.up.railway.app/api/auth/token/refresh/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refresh: refreshToken,
            // access: accessToken, // ✅ لو الباك إند بيحتاج الاتنين
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json(); // { access: "newAccessToken", refresh?: "newRefresh" }
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const Logout = createAsyncThunk(
  "auth/Logout", // ✅ خليها اسم Action عادي مش URL
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const refreshToken = state.auth.refresh; // ✅ استخدم refresh
      const accessToken = state.auth.access; // ✅ معاك access

      if (!refreshToken) {
        throw new Error("No tokens available");
      }

      const res = await fetch(
        "https://e-commerce-web-production-ead4.up.railway.app/api/auth/logout/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // ⬅️ مهم
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.refresh = "";
      state.access = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = (action.payload as string) || "Unexpected error";
    });
    builder
      .addCase(
        refreshAccessToken.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.access = action.payload.access;
        }
      )
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    builder
      .addCase(Logout.fulfilled, (state) => {
        state.access = "";
        state.refresh = "";
        state.error = null;
        state.loading = "idle";
      })

      .addCase(Logout.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

//  type TProduct = {
//    name: string;
//    description: string;
//    original_price: number;
//    discount: number;
//    stock: number;
//    categories: string;
//    tags: string;
//    img: string;
//  };
