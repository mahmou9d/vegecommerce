import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type TProduct = {
  id?:number
  product_id?: number;
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
interface productSlice {
  products: TProduct[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: productSlice = {
  products: [],
  loading: "idle",
  error: null,
};

export const productUser = createAsyncThunk(
  "product/productUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "/api/products/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data, "data");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(productUser.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(productUser.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.products = action.payload.products;
    });
    builder.addCase(productUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = (action.payload as string) || "Unexpected error";
    });
  },
});


export default productSlice.reducer;
