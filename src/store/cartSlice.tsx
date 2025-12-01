import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from ".";
import { refreshAccessToken } from "./authSlice";

/* ============================
   Types
============================ */
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
  order_id: number;
  total: number;
  loading: {
    add: boolean;
    remove: boolean;
    edit: boolean;
    get: boolean;
    checkout: boolean;
  };
  error: string | null;
  loaded: boolean;
}

const initialState: CartState = {
  items: [],
  order_id: 0,
  total: 0,
  loading: {
    add: false,
    remove: false,
    edit: false,
    get: false,
    checkout: false,
  },
  error: null,
  loaded: false,
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
    rejectWithValue: (value: any) => any;
  }
) => {
  let token = thunkAPI.getState().auth.access;

  if (!token) return thunkAPI.rejectWithValue("No token found");

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
  return res.json();
};

/* ============================
   Thunks
============================ */

export const AddToCart = createAsyncThunk<
  any,
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

export const RemoveCart = createAsyncThunk<
  any,
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

export const Checkout = createAsyncThunk<
  any,
  any,
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
    /* ------------------------
       Add to Cart
    ------------------------- */
    builder
      .addCase(AddToCart.pending, (state) => {
        state.loading.add = true;
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading.add = false;
        if (Array.isArray(action.payload?.items)) {
          state.items = action.payload.items;
          state.total = recalcTotal(state.items);
        }
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loading.add = false;
        state.error = action.payload as string;
      });

    /* ------------------------
       Remove from Cart
    ------------------------- */
    builder
      .addCase(RemoveCart.pending, (state) => {
        state.loading.remove = true;
      })
      .addCase(RemoveCart.fulfilled, (state, action) => {
        state.loading.remove = false;
        const removedId = action.payload.product_id;
        state.items = state.items.filter((i) => i.product_id !== removedId);
        state.total = recalcTotal(state.items);
      })
      .addCase(RemoveCart.rejected, (state, action) => {
        state.loading.remove = false;
        state.error = action.payload as string;
      });

    /* ------------------------
       Edit Cart
    ------------------------- */
    builder
      .addCase(EditCart.pending, (state) => {
        state.loading.edit = true;
      })
      .addCase(EditCart.fulfilled, (state, action) => {
        state.loading.edit = false;
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
        state.loading.edit = false;
        state.error = action.payload as string;
      });

    /* ------------------------
       Get Cart Items
    ------------------------- */
    builder
      .addCase(GetToCart.pending, (state) => {
        state.loading.get = true;
      })
      .addCase(GetToCart.fulfilled, (state, action) => {
        state.loading.get = false;
        state.items = action.payload.items;
        state.total = recalcTotal(state.items);
        state.loaded = true;
      })
      .addCase(GetToCart.rejected, (state, action) => {
        state.loading.get = false;
        state.error = action.payload as string;
      });

    /* ------------------------
       Checkout
    ------------------------- */
    builder
      .addCase(Checkout.pending, (state) => {
        state.loading.checkout = true;
      })
      .addCase(Checkout.fulfilled, (state, action) => {
        state.loading.checkout = false;
        state.items = [];
        state.total = 0;
        state.order_id = action.payload.order_id;
      })
      .addCase(Checkout.rejected, (state, action) => {
        state.loading.checkout = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { AppDispatch, RootState } from ".";
// import { refreshAccessToken } from "./authSlice";

// type CartItem = {
//   product_id: number;
//   product_name: string;
//   quantity: number;
//   price: number;
//   subtotal: number;
//   img_url: string;
// };

// interface CartState {
//   items: CartItem[];
//   order_id:number;
//   total: number;
//   loading: "idle" | "pending" | "succeeded" | "failed";
//   error: string | null;
//   loaded:boolean
// }

// const initialState: CartState = {
//   items: [],
//   order_id: 0,
//   total: 0,
//   loading: "idle",
//   error: null,
//   loaded: false,
// };

// /* ============================
//    Helpers
// ============================ */
// const recalcTotal = (items: CartItem[]) =>
//   items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

// export const fetchWithRefresh = async (
//   url: string,
//   options: RequestInit,
//   thunkAPI: {
//     dispatch: AppDispatch;
//     getState: () => RootState;
//     rejectWithValue: (value: any) => any;
//   }
// ) => {
//   let token = thunkAPI.getState().auth.access;
// if (!token) return thunkAPI.rejectWithValue("No token found");
//   let res = await fetch(url, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...(options.headers || {}),
//     },
//     credentials: "include",
//   });

//   if (res.status === 401) {
//     const refreshRes = await thunkAPI.dispatch(refreshAccessToken()).unwrap();
//     token = refreshRes.access;

//     res = await fetch(url, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//         ...(options.headers || {}),
//       },
//       credentials: "include",
//     });
//   }

//   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//   // console.log(res.json(),"cartrttttttttt");
//   return res.json();
// };

// /* ============================
//    Thunks
// ============================ */
// export const AddToCart = createAsyncThunk<
//   any, // نوع الريسبونس
//   { product_id: number; quantity: number },
//   { state: RootState; dispatch: AppDispatch }
// >("cart/AddToCart", async (payload, thunkAPI) => {
//   try {
//     return await fetchWithRefresh(
//       "https://e-commerce-web-production-ead4.up.railway.app/api/cart/add/",
//       { method: "POST", body: JSON.stringify(payload) },
//       thunkAPI
//     );
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.message);
//   }
// });

// // =============================
// // RemoveCart
// // =============================
// export const RemoveCart = createAsyncThunk<
//   any, // نوع الريسبونس (ممكن تعمله interface لو عارف شكله)
//   { product_id: number },
//   { state: RootState; dispatch: AppDispatch }
// >("cart/RemoveCart", async (payload, thunkAPI) => {
//   try {
//     return await fetchWithRefresh(
//       "https://e-commerce-web-production-ead4.up.railway.app/api/cart/remove/",
//       { method: "DELETE", body: JSON.stringify(payload) },
//       thunkAPI
//     );
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.message);
//   }
// });

// // =============================
// // EditCart
// // =============================
// export const EditCart = createAsyncThunk<
//   any,
//   { product_id: number; quantity: number },
//   { state: RootState; dispatch: AppDispatch }
// >("cart/EditCart", async (payload, thunkAPI) => {
//   try {
//     return await fetchWithRefresh(
//       "https://e-commerce-web-production-ead4.up.railway.app/api/cart/edit/",
//       { method: "PATCH", body: JSON.stringify(payload) },
//       thunkAPI
//     );
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.message);
//   }
// });

// // =============================
// // GetToCart
// // =============================
// export const GetToCart = createAsyncThunk<
//   any,
//   void,
//   { state: RootState; dispatch: AppDispatch }
// >("cart/GetToCart", async (_, thunkAPI) => {
//   try {
//     return await fetchWithRefresh(
//       "https://e-commerce-web-production-ead4.up.railway.app/api/cart/items/",
//       { method: "GET" },
//       thunkAPI
//     );
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.message);
//   }
// });

// // =============================
// // Checkout
// // =============================
// export const Checkout = createAsyncThunk<
//   any,
//   any,
//   { state: RootState; dispatch: AppDispatch }
// >("cart/Checkout", async (payload, thunkAPI) => {
//   try {
//     // هنا هترجع JSON مباشرة (object)
//     const data = await fetchWithRefresh(
//       "https://e-commerce-web-production-ead4.up.railway.app/api/order/add/",
//       { method: "POST", body: JSON.stringify(payload) },
//       thunkAPI
//     );

//     console.log("Checkout response:", data);

//     return data; // ← رجّع كله
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.message);
//   }
// });

// // export const Checkout = createAsyncThunk<
// //   any,
// //   any, // هنا payload شكله مش متحدد (لو عندك type معين حطه)
// //   { state: RootState; dispatch: AppDispatch }
// // >("cart/Checkout", async (payload, thunkAPI) => {
// //   try {
// //     const res = await fetchWithRefresh(
// //       "https://e-commerce-web-production-ead4.up.railway.app/api/order/add/",
// //       { method: "POST", body: JSON.stringify(payload) },
// //       thunkAPI
// //     );
// //           if (!res.ok) {
// //             throw new Error(`HTTP error! status: ${res.status}`);
// //           }

// //           const data = await res.json();
// //           console.log(data)
// //           return data.order_id;
// //   } catch (err: any) {
// //     return thunkAPI.rejectWithValue(err.message);
// //   }
// // });

// /* ============================
//    Slice
// ============================ */
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // Add
//     builder
//       .addCase(AddToCart.pending, (state) => {
//         state.loading = "pending";
//         state.error = null;
//       })
//       .addCase(AddToCart.fulfilled, (state, action) => {
//         state.loading = "succeeded";
//         if (Array.isArray(action.payload?.items)) {
//           state.items = action.payload.items;
//           state.total = recalcTotal(state.items);
//         }

//       })
//       .addCase(AddToCart.rejected, (state, action) => {
//         state.loading = "failed";
//         state.error = (action.payload as string) || "Unexpected error";
//       });

//     // Remove
//     builder
//       .addCase(RemoveCart.pending, (state) => {
//         state.loading = "pending";
//         state.error = null;
//       })

//       .addCase(RemoveCart.fulfilled, (state, action) => {
//         const removedId = action.payload.product_id;
//         state.items = state.items.filter((i) => i.product_id !== removedId);
//         state.total = recalcTotal(state.items);
//       })
//       .addCase(RemoveCart.rejected, (state, action) => {
//         state.error = (action.payload as string) || "Unexpected error";
//       });

//     // Edit
//     builder
//       .addCase(EditCart.pending, (state) => {
//         state.loading = "pending";
//         state.error = null;
//       })
//       .addCase(EditCart.fulfilled, (state, action) => {
//         const updated = action.payload;
//         const item = state.items.find(
//           (i) => i.product_id === updated.product_id
//         );

//         if (item) {
//           if (updated.quantity === 0) {
//             state.items = state.items.filter(
//               (i) => i.product_id !== updated.product_id
//             );
//           } else {
//             item.quantity = updated.quantity;
//           }
//         }
//         state.total = recalcTotal(state.items);
//       })
//       .addCase(EditCart.rejected, (state, action) => {
//         state.error = (action.payload as string) || "Unexpected error";
//       });

//     // Get cart
//     builder
//       .addCase(GetToCart.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//         state.total = recalcTotal(state.items);
//         state.loaded = true;
//       })
//       .addCase(GetToCart.rejected, (state, action) => {
//         state.error = (action.payload as string) || "Unexpected error";
//       });
//       builder
//         .addCase(Checkout.pending, (state) => {
//           state.loading = "pending";
//           state.error = null;
//         })
//         .addCase(Checkout.fulfilled, (state,action) => {
//           console.log("Checkout fulfilled payload:", action.payload);
//           state.loading = "succeeded";
//           state.items = [];
//           state.total = 0;
//           state.order_id = action.payload.order_id;
//         })
//         .addCase(Checkout.rejected, (state, action) => {
//           state.loading = "failed";
//           state.error = (action.payload as string) || "Unexpected error";
//         });

//   },
// });

// export default cartSlice.reducer;
