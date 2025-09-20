import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from ".";
import { refreshAccessToken } from "./authSlice";

type CartItem = {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
  img_url: string;
};

interface CartState {
  items: CartItem[];
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

/* ============================
   Helpers
============================ */
const recalcTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

export const fetchWithRefresh = async (
  url: string,
  options: RequestInit,
  thunkAPI: {
    dispatch: AppDispatch;
    getState: () => RootState;
  }
) => {
  let token = thunkAPI.getState().auth.access;

  let res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshRes = await thunkAPI.dispatch(refreshAccessToken()).unwrap();
    token = refreshRes.access;

    res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers || {}),
      },
      credentials: "include",
    });
  }

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  // console.log(res.json(),"cartrttttttttt");
  return res.json();
};

/* ============================
   Thunks
============================ */
export const AddToCart = createAsyncThunk<
  any, // نوع الريسبونس
  { product_id: number; quantity: number },
  { state: RootState; dispatch: AppDispatch }
>("cart/AddToCart", async (payload, thunkAPI) => {
  try {
    return await fetchWithRefresh(
      "https://e-commerce-web-production-ead4.up.railway.app/api/cart/add/",
      { method: "POST", body: JSON.stringify(payload) },
      thunkAPI
    );
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// =============================
// RemoveCart
// =============================
export const RemoveCart = createAsyncThunk<
  any, // نوع الريسبونس (ممكن تعمله interface لو عارف شكله)
  { product_id: number },
  { state: RootState; dispatch: AppDispatch }
>("cart/RemoveCart", async (payload, thunkAPI) => {
  try {
    return await fetchWithRefresh(
      "https://e-commerce-web-production-ead4.up.railway.app/api/cart/remove/",
      { method: "DELETE", body: JSON.stringify(payload) },
      thunkAPI
    );
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// =============================
// EditCart
// =============================
export const EditCart = createAsyncThunk<
  any,
  { product_id: number; quantity: number },
  { state: RootState; dispatch: AppDispatch }
>("cart/EditCart", async (payload, thunkAPI) => {
  try {
    return await fetchWithRefresh(
      "https://e-commerce-web-production-ead4.up.railway.app/api/cart/edit/",
      { method: "PATCH", body: JSON.stringify(payload) },
      thunkAPI
    );
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// =============================
// GetToCart
// =============================
export const GetToCart = createAsyncThunk<
  any,
  void,
  { state: RootState; dispatch: AppDispatch }
>("cart/GetToCart", async (_, thunkAPI) => {
  try {
    return await fetchWithRefresh(
      "https://e-commerce-web-production-ead4.up.railway.app/api/cart/items/",
      { method: "GET" },
      thunkAPI
    );
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// =============================
// Checkout
// =============================
export const Checkout = createAsyncThunk<
  any,
  any, // هنا payload شكله مش متحدد (لو عندك type معين حطه)
  { state: RootState; dispatch: AppDispatch }
>("cart/Checkout", async (payload, thunkAPI) => {
  try {
    return await fetchWithRefresh(
      "https://e-commerce-web-production-ead4.up.railway.app/api/order/add/",
      { method: "POST", body: JSON.stringify(payload) },
      thunkAPI
    );
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

/* ============================
   Slice
============================ */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add
    builder
      .addCase(AddToCart.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading = "succeeded";
        if (Array.isArray(action.payload?.items)) {
          state.items = action.payload.items;
          state.total = recalcTotal(state.items);
        }

      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loading = "failed";
        state.error = (action.payload as string) || "Unexpected error";
      });

    // Remove
    builder
      .addCase(RemoveCart.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })

      .addCase(RemoveCart.fulfilled, (state, action) => {
        const removedId = action.payload.product_id;
        state.items = state.items.filter((i) => i.product_id !== removedId);
        state.total = recalcTotal(state.items);
      })
      .addCase(RemoveCart.rejected, (state, action) => {
        state.error = (action.payload as string) || "Unexpected error";
      });

    // Edit
    builder
      .addCase(EditCart.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(EditCart.fulfilled, (state, action) => {
        const updated = action.payload;
        const item = state.items.find(
          (i) => i.product_id === updated.product_id
        );

        if (item) {
          if (updated.quantity === 0) {
            state.items = state.items.filter(
              (i) => i.product_id !== updated.product_id
            );
          } else {
            item.quantity = updated.quantity;
          }
        }
        state.total = recalcTotal(state.items);
      })
      .addCase(EditCart.rejected, (state, action) => {
        state.error = (action.payload as string) || "Unexpected error";
      });

    // Get cart
    builder
      .addCase(GetToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = recalcTotal(state.items);
      })
      .addCase(GetToCart.rejected, (state, action) => {
        state.error = (action.payload as string) || "Unexpected error";
      });
      builder
        .addCase(Checkout.pending, (state) => {
          state.loading = "pending";
          state.error = null;
        })
        .addCase(Checkout.fulfilled, (state,action) => {
          console.log("Checkout fulfilled payload:", action.payload);
          state.loading = "succeeded";
          state.items = [];
          state.total = 0;
        })
        .addCase(Checkout.rejected, (state, action) => {
          state.loading = "failed";
          state.error = (action.payload as string) || "Unexpected error";
        });

  },
});

export default cartSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { RootState } from ".";
// import { refreshAccessToken } from "./authSlice";

// type CartItems = {
//   product_id: number;
//   product_name: string;
//   quantity: number;
//   price: number;
//   subtotal: number;
//   img_url: string;
// };

// interface CartState {
//   items: CartItems[];
//   total: number;
//   loading: "idle" | "pending" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: CartState = {
//   items: [],
//   total: 0,
//   loading: "idle",
//   error: null,
// };

// export const AddToCart = createAsyncThunk(
//   "cart/AddToCart",
//   async (
//     payload: { product_id: number; quantity: number },
//     { rejectWithValue, getState, dispatch }
//   ) => {
//     try {
//       const state = getState() as RootState;
//       let token = state?.auth.access;
//       // console.log(token,"tsthrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
// if (!token) return rejectWithValue("User not logged in");
//       let res = await fetch(
//         "https://e-commerce-web-production-ead4.up.railway.app/api/cart/add/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           body: JSON.stringify(payload),
//           credentials: "include",
//         }
//       );

//       if (res.status === 401) {
//         try {
//           const refreshRes = await dispatch(refreshAccessToken()).unwrap();
//           token = refreshRes.access;

//           res = await fetch(
//             "https://e-commerce-web-production-ead4.up.railway.app/api/cart/add/",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 ...(token && { Authorization: `Bearer ${token}` }),
//               },
//               body: JSON.stringify(payload),
//               credentials: "include",
//             }
//           );
//         } catch (refreshErr) {
//           return rejectWithValue("Session expired, please login again.");
//         }
//       }

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       // console.log(data, "datrwtrqerhrehrtqta");
//       return data;
//     } catch (error: any) {
//       // console.log(error, "errorcart/add/");
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const RemoveCart = createAsyncThunk(
//   "cart/RemoveCart",
//   async (
//     payload: { product_id: number },
//     { rejectWithValue, getState, dispatch }
//   ) => {
//     try {
//       const state = getState() as RootState;
//       let token = state.auth.access;

//       let res = await fetch(
//         "https://e-commerce-web-production-ead4.up.railway.app/api/cart/remove/",
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           body: JSON.stringify(payload),
//           credentials: "include",
//         }
//       );

//       if (res.status === 401) {
//         try {
//           const refreshRes = await dispatch(refreshAccessToken()).unwrap();
//           token = refreshRes.access;

//           res = await fetch(
//             "https://e-commerce-web-production-ead4.up.railway.app/api/cart/remove/",
//             {
//               method: "DELETE",
//               headers: {
//                 "Content-Type": "application/json",
//                 ...(token && { Authorization: `Bearer ${token}` }),
//               },
//               body: JSON.stringify(payload),
//               credentials: "include",
//             }
//           );
//         } catch (refreshErr) {
//           return rejectWithValue("Session expired, please login again.");
//         }
//       }

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       // console.log(data, "data");
//       return data;
//     } catch (error: any) {
//       // console.log(error, "errorcart/add/");
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const EditCart = createAsyncThunk(
//   "cart/EditCart",
//   async (
//     payload: { product_id: number; quantity: number },
//     { rejectWithValue, getState, dispatch }
//   ) => {
//     try {
//       const state = getState() as RootState;
//       let token = state.auth.access;

//       let res = await fetch(
//         "https://e-commerce-web-production-ead4.up.railway.app/api/cart/edit/",
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           body: JSON.stringify(payload),
//           credentials: "include",
//         }
//       );

//       if (res.status === 401) {
//         try {
//           const refreshRes = await dispatch(refreshAccessToken()).unwrap();
//           token = refreshRes.access;

//           res = await fetch(
//             "https://e-commerce-web-production-ead4.up.railway.app/api/cart/edit/",
//             {
//               method: "PATCH",
//               headers: {
//                 "Content-Type": "application/json",
//                 ...(token && { Authorization: `Bearer ${token}` }),
//               },
//               body: JSON.stringify(payload),
//               credentials: "include",
//             }
//           );
//         } catch (refreshErr) {
//           return rejectWithValue("Session expired, please login again.");
//         }
//       }

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       // console.log(data, "data");
//       return data;
//     } catch (error: any) {
//       // console.log(error, "errorcart/add/");
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const GetToCart = createAsyncThunk(
//   "cart/GetToCart",
//   async (_, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const state = getState() as RootState;
//       let token = state.auth.access;

//       let res = await fetch(
//         "https://e-commerce-web-production-ead4.up.railway.app/api/cart/items/",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           // body: JSON.stringify(payload),
//         }
//       );

//       if (res.status === 401) {
//         try {
//           const refreshRes = await dispatch(refreshAccessToken()).unwrap();
//           token = refreshRes.access;

//           res = await fetch(
//             "https://e-commerce-web-production-ead4.up.railway.app/api/cart/items/",
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 ...(token && { Authorization: `Bearer ${token}` }),
//               },
//               // body: JSON.stringify(payload),
//             }
//           );
//         } catch (refreshErr) {
//           return rejectWithValue("Session expired, please login again.");
//         }
//       }

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       // console.log(data, "data");
//       return data;
//     } catch (error: any) {
//       // console.log(error, "errorcart/add/");
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const Checkout = createAsyncThunk(
//   "cart/Checkout",
//   async (payload, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const state = getState() as RootState;
//       let token = state.auth.access;

//       let res = await fetch(
//         "https://e-commerce-web-production-ead4.up.railway.app/api/order/add/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           body: JSON.stringify(payload),
//           credentials: "include",
//         }
//       );

//       if (res.status === 401) {
//         try {
//           const refreshRes = await dispatch(refreshAccessToken()).unwrap().catch((error)=>{
//             // console.log(error)
//           });
//           token = refreshRes.access;

//           res = await fetch(
//             "https://e-commerce-web-production-ead4.up.railway.app/api/order/add/",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 ...(token && { Authorization: `Bearer ${token}` }),
//               },
//               body: JSON.stringify(payload),
//               credentials: "include",
//             }
//           );
//         } catch (refreshErr) {
//           return rejectWithValue("Session expired, please login again.");
//         }
//       }

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       // console.log(data, "datrwtrqerhrehrtqta");
//       return data;
//     } catch (error: any) {
//       // console.log(error, "errorcart/add/");
//       return rejectWithValue(error.message);
//     }
//   }
// );
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(AddToCart.pending, (state) => {
//       state.loading = "pending";
//       state.error = null;
//     });
//     builder.addCase(AddToCart.fulfilled, (state, action) => {
//       state.loading = "succeeded";
//       state.items = action.payload.message;
//     });
//     builder.addCase(AddToCart.rejected, (state, action) => {
//       state.loading = "failed";
//       state.error = (action.payload as string) || "Unexpected error";
//     });

//     //////////////
//     builder.addCase(RemoveCart.pending, (state) => {
//       state.loading = "pending";
//       state.error = null;
//     });
//     builder.addCase(RemoveCart.fulfilled, (state, action) => {
//       state.loading = "succeeded";

//       const removedProductId = action.payload.product_id; // لازم الباك يرجع { product_id }

//       // إزالة المنتج من الكارت
//       state.items = state.items.filter(
//         (item) => item.product_id !== removedProductId
//       );
//     });
//     builder.addCase(RemoveCart.rejected, (state, action) => {
//       state.loading = "failed";
//       state.error = (action.payload as string) || "Unexpected error";
//     });

//     //////////////////////////////////////////
//     builder.addCase(EditCart.pending, (state) => {
//       state.loading = "pending";
//       state.error = null;
//     });
//     builder.addCase(EditCart.fulfilled, (state, action) => {
//       state.loading = "succeeded";

//       const updatedItem = action.payload as {
//         product_id: number;
//         quantity: number;
//       };

//       if (updatedItem.quantity === 0) {
//         // 🗑️ امسح المنتج لو الكمية = 0
//         state.items = state.items.filter(
//           (item) => item.product_id !== updatedItem.product_id
//         );
//       } else {
//         // ✏️ عدل الكمية لو > 0
//         const existingItem = state.items.find(
//           (item) => item.product_id === updatedItem.product_id
//         );
//         if (existingItem) {
//           existingItem.quantity = updatedItem.quantity;
//         }
//       }

//       // تحديث التوتال
//       state.total = state.items.reduce(
//         (sum, item) => sum + Number(item.price) * item.quantity,
//         0
//       );
//     });

//     builder.addCase(EditCart.rejected, (state, action) => {
//       state.loading = "failed";
//       state.error = (action.payload as string) || "Unexpected error";
//     });
//     builder.addCase(GetToCart.pending, (state) => {
//       state.loading = "pending";
//       state.error = null;
//     });
//     builder.addCase(GetToCart.fulfilled, (state, action) => {
//       state.loading = "succeeded";
//       state.items = action.payload.items;
//     });
//     builder.addCase(GetToCart.rejected, (state, action) => {
//       state.loading = "failed";
//       state.error = (action.payload as string) || "Unexpected error";
//     });
//   },
// });

// export default cartSlice.reducer;
