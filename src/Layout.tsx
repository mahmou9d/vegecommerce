import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { RootState } from "./store";
import { productUser } from "./store/productSlice";
import ScrollToTop from "./ScrollToTop";
import { Toaster } from "./components/ui/toaster";

// ✅ Lazy load components
const Header = lazy(() => import("./component/Header"));
const Footer = lazy(() => import("./component/Footer"));
const Home = lazy(() => import("./component/Home"));
const Login = lazy(() => import("./component/Login"));
const Signup = lazy(() => import("./component/Signup"));
const Wishlist = lazy(() => import("./component/Wishlist"));
const Shop = lazy(() => import("./component/Shop"));
const Cart = lazy(() => import("./component/Cart"));
const Product = lazy(() => import("./component/Product"));
const Categories = lazy(() => import("./component/Categories"));
const Checkoutcart = lazy(() => import("./component/Checkoutcart"));
const SingleProduct = lazy(() => import("./component/SingleProduct"));
const Ordercomplete = lazy(() => import("./component/Ordercomplete"));

// ✅ Loader component
const Loader = () => (
  <div className="w-full h-[60vh] flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#01e281] border-solid"></div>
  </div>
);

type TProduct = {
  id: number;
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

function Layout() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const hideLayout = ["/login", "/signup"].includes(location.pathname);
  const { products } = useAppSelector((state: RootState) => state.product);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(productUser());
    }
  }, [dispatch, products.length]);

  const categoryName = decodeURIComponent(
    location.pathname.split("/").pop() || ""
  ).toLowerCase();

  const mergedFiltered = products.filter(
    (item) =>
      item.categories.some((cat) => cat.toLowerCase() === categoryName) ||
      item.tags.some((tag) => tag.toLowerCase() === categoryName)
  );

  return (
    <Suspense fallback={<Loader />}>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ordercomplete" element={<Ordercomplete />} />
        <Route
          path="/category/:name"
          element={
            <Categories
              products={mergedFiltered as TProduct[]}
              title={categoryName}
            />
          }
        />
        <Route path="/checkout" element={<Checkoutcart />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
      </Routes>
      {!hideLayout && <Footer />}
      <ScrollToTop />
      <Toaster />
    </Suspense>
  );
}

export default Layout;
