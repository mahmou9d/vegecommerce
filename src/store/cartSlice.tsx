import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";
import { refreshAccessToken } from "./authSlice";

type CartItems = {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
  img_url: string;
};

interface CartState {
  items: CartItems[];
  total: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  loading: "idle",
  error: null,
};

export const AddToCart = createAsyncThunk(
  "cart/AddToCart",
  async (
    payload: { product_id: number; quantity: number },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState() as RootState;
      let token = state?.auth.access;
      // console.log(token,"tsthrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
if (!token) return rejectWithValue("User not logged in");
      let res = await fetch(
        "https://e-commerce-web-production-ead4.up.railway.app/api/cart/add/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      if (res.status === 401) {
        try {
          const refreshRes = await dispatch(refreshAccessToken()).unwrap();
          token = refreshRes.access;

          res = await fetch(
            "https://e-commerce-web-production-ead4.up.railway.app/api/cart/add/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
              },
              body: JSON.stringify(payload),
              credentials: "include",
            }
          );
        } catch (refreshErr) {
          return rejectWithValue("Session expired, please login again.");
        }
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      // console.log(data, "datrwtrqerhrehrtqta");
      return data;
    } catch (error: any) {
      // console.log(error, "errorcart/add/");
      return rejectWithValue(error.message);
    }
  }
);
export const RemoveCart = createAsyncThunk(
  "cart/RemoveCart",
  async (
    payload: { product_id: number },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState() as RootState;
      let token = state.auth.access;

      let res = await fetch(
        "https://e-commerce-web-production-ead4.up.railway.app/api/cart/remove/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      if (res.status === 401) {
        try {
          const refreshRes = await dispatch(refreshAccessToken()).unwrap();
          token = refreshRes.access;

          res = await fetch(
            "https://e-commerce-web-production-ead4.up.railway.app/api/cart/remove/",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
              },
              body: JSON.stringify(payload),
              credentials: "include",
            }
          );
        } catch (refreshErr) {
          return rejectWithValue("Session expired, please login again.");
        }
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      // console.log(data, "data");
      return data;
    } catch (error: any) {
      // console.log(error, "errorcart/add/");
      return rejectWithValue(error.message);
    }
  }
);
export const EditCart = createAsyncThunk(
  "cart/EditCart",
  async (
    payload: { product_id: number; quantity: number },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState() as RootState;
      let token = state.auth.access;

      let res = await fetch(
        "https://e-commerce-web-production-ead4.up.railway.app/api/cart/edit/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      if (res.status === 401) {
        try {
          const refreshRes = await dispatch(refreshAccessToken()).unwrap();
          token = refreshRes.access;

          res = await fetch(
            "https://e-commerce-web-production-ead4.up.railway.app/api/cart/edit/",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
              },
              body: JSON.stringify(payload),
              credentials: "include",
            }
          );
        } catch (refreshErr) {
          return rejectWithValue("Session expired, please login again.");
        }
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      // console.log(data, "data");
      return data;
    } catch (error: any) {
      // console.log(error, "errorcart/add/");
      return rejectWithValue(error.message);
    }
  }
);
export const GetToCart = createAsyncThunk(
  "cart/GetToCart",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      let token = state.auth.access;

      let res = await fetch(
        "https://e-commerce-web-production-ead4.up.railway.app/api/cart/items/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          // body: JSON.stringify(payload),
        }
      );

      if (res.status === 401) {
        try {
          const refreshRes = await dispatch(refreshAccessToken()).unwrap();
          token = refreshRes.access;

          res = await fetch(
            "https://e-commerce-web-production-ead4.up.railway.app/api/cart/items/",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
              },
              // body: JSON.stringify(payload),
            }
          );
        } catch (refreshErr) {
          return rejectWithValue("Session expired, please login again.");
        }
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      // console.log(data, "data");
      return data;
    } catch (error: any) {
      // console.log(error, "errorcart/add/");
      return rejectWithValue(error.message);
    }
  }
);
export const Checkout = createAsyncThunk(
  "cart/Checkout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      let token = state.auth.access;

      let res = await fetch(
        "https://e-commerce-web-production-ead4.up.railway.app/api/order/add/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      if (res.status === 401) {
        try {
          const refreshRes = await dispatch(refreshAccessToken()).unwrap().catch((error)=>{
            // console.log(error)
          });
          token = refreshRes.access;

          res = await fetch(
            "https://e-commerce-web-production-ead4.up.railway.app/api/order/add/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
              },
              body: JSON.stringify(payload),
              credentials: "include",
            }
          );
        } catch (refreshErr) {
          return rejectWithValue("Session expired, please login again.");
        }
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      // console.log(data, "datrwtrqerhrehrtqta");
      return data;
    } catch (error: any) {
      // console.log(error, "errorcart/add/");
      return rejectWithValue(error.message);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddToCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(AddToCart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.items = action.payload.message;
    });
    builder.addCase(AddToCart.rejected, (state, action) => {
      state.loading = "failed";
      state.error = (action.payload as string) || "Unexpected error";
    });

    //////////////
    builder.addCase(RemoveCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(RemoveCart.fulfilled, (state, action) => {
      state.loading = "succeeded";

      const removedProductId = action.payload.product_id; // لازم الباك يرجع { product_id }

      // إزالة المنتج من الكارت
      state.items = state.items.filter(
        (item) => item.product_id !== removedProductId
      );

      // تحديث التوتال
      state.total = state.items.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );
    });
    builder.addCase(RemoveCart.rejected, (state, action) => {
      state.loading = "failed";
      state.error = (action.payload as string) || "Unexpected error";
    });

    //////////////////////////////////////////
    builder.addCase(EditCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(EditCart.fulfilled, (state, action) => {
      state.loading = "succeeded";

      const updatedItem = action.payload as {
        product_id: number;
        quantity: number;
      };

      if (updatedItem.quantity === 0) {
        // 🗑️ امسح المنتج لو الكمية = 0
        state.items = state.items.filter(
          (item) => item.product_id !== updatedItem.product_id
        );
      } else {
        // ✏️ عدل الكمية لو > 0
        const existingItem = state.items.find(
          (item) => item.product_id === updatedItem.product_id
        );
        if (existingItem) {
          existingItem.quantity = updatedItem.quantity;
        }
      }

      // تحديث التوتال
      state.total = state.items.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );
    });

    builder.addCase(EditCart.rejected, (state, action) => {
      state.loading = "failed";
      state.error = (action.payload as string) || "Unexpected error";
    });
    builder.addCase(GetToCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(GetToCart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.items = action.payload.items;
    });
    builder.addCase(GetToCart.rejected, (state, action) => {
      state.loading = "failed";
      state.error = (action.payload as string) || "Unexpected error";
    });
  },
});

export default cartSlice.reducer;
