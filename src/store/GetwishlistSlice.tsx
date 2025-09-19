import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from ".";
import { refreshAccessToken } from "./authSlice";

type TProduct = {
  product_id: number;
  name: string;
  description: string;
  original_price: string;
  final_price: string;
  discount: number;
  stock: number;
  categories: string[];
  tags: string[];
  img: string;
  average_rating: number;
  img_url: string;
};

interface WishlistState {
  items: TProduct[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: "idle",
  error: null,
};

export const GetWishlist = createAsyncThunk<
  TProduct[], // ✅ نوع الـ response (array of products)
  void, // ✅ مفيش payload
  { state: RootState; dispatch: AppDispatch }
>("wishlist/GetWishlist", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    let token = state.auth.access;

    let res = await fetch(
      "https://e-commerce-web-production-ead4.up.railway.app/api/wishlist/items/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (res.status === 401) {
      try {
        const refreshRes = await thunkAPI
          .dispatch(refreshAccessToken())
          .unwrap();
        token = refreshRes.access;

        res = await fetch(
          "https://e-commerce-web-production-ead4.up.railway.app/api/wishlist/items/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );
      } catch {
        return thunkAPI.rejectWithValue("Session expired, please login again.");
      }
    }

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.wishlist.products as TProduct[];
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(GetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.items = action.payload || [];
    });
    builder.addCase(GetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      state.error = (action.payload as string) || "Unexpected error";
    });
  },
});

export default wishlistSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { RootState } from ".";
// import { refreshAccessToken } from "./authSlice";

// type TProduct = {
//   product_id: number;
//   name: string;
//   description: string;
//   original_price: string;
//   final_price: string;
//   discount: number;
//   stock: number;
//   categories: string[];
//   tags: string[];
//   img: string;
//   average_rating: number;
//   img_url: string;
// };

// interface WishlistState {
//   items: TProduct[];
//   loading: "idle" | "pending" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: WishlistState = {
//   items: [],
//   loading: "idle",
//   error: null,
// };
// export const GetWishlist = createAsyncThunk(
//   "wishlist/GetWishlist",
//   async (_, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const state = getState() as RootState;
//       let token = state.auth.access;

//       let res = await fetch(
//         "https://e-commerce-web-production-ead4.up.railway.app/api/wishlist/items/",
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
//             "https://e-commerce-web-production-ead4.up.railway.app/api/wishlist/items/",
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
//       // console.log(data.wishlist.products, "datafckcllclllcclcllclccc");
//       return data.wishlist.products;
//     } catch (error: any) {
//       // console.log(error, "errorcart/add/");
//       return rejectWithValue(error.message);
//     }
//   }
// );
// // export const GetWishlist = createAsyncThunk(
// //   "wishlist/GetWishlist",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const res = await fetch(
// //         "https://e-commerce-web-production-ead4.up.railway.app/api/products/",
// //         {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (!res.ok) {
// //         throw new Error(`HTTP error! status: ${res.status}`);
// //       }

// //       const data = await res.json();
// //       console.log(data, "data");
// //       return data;
// //     } catch (error: any) {
// //       console.log(error, "errorcart/add/");
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // );
// const GetwishlistSlice = createSlice({
//   name: "getwishlist",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(GetWishlist.pending, (state) => {
//       state.loading = "pending";
//       state.error = null;
//     });
//     builder.addCase(GetWishlist.fulfilled, (state, action) => {
//       state.loading = "succeeded";
//       state.items = action.payload || []; // حسب الـ response
//     });
//     builder.addCase(GetWishlist.rejected, (state, action) => {
//       state.loading = "failed";
//       state.error = (action.payload as string) || "Unexpected error";
//     });
//   },
// });

// export default GetwishlistSlice.reducer;
