import { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Wishlist from "./component/Wishlist";
// import Shop from "./component/Shop";
import Cart from "./component/Cart";
// import Product from "./component/Product";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { RootState } from "./store";
import { productUser } from "./store/productSlice";
import Categories from "./component/Categories";
// import Checkoutcart from "./component/Checkoutcart";
import Shop from "./component/Shop";
import SingleProduct from "./component/SingleProduct";
import Checkoutcart from "./component/Checkoutcart";
import ScrollToTop from "./ScrollToTop";
import Ordercomplete from "./component/Ordercomplete";

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
  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (products.length === 0) {
      dispatch(productUser());
    }
  }, [dispatch, products.length]);

  console.log(products, "lay");
  const categoryName = decodeURIComponent(
    location.pathname.split("/").pop() || ""
  ).toLowerCase();

  const mergedFiltered = products.filter(
    (item) =>
      item.categories.some((cat) => cat.toLowerCase() === categoryName) ||
      item.tags.some((tag) => tag.toLowerCase() === categoryName)
  );

  console.log(categoryName, "categoryName");
  console.log(mergedFiltered, "mergedFiltered");

  return (
    <>
      {/* <Suspense fallback={<Loader />}> */}
      {!hideLayout && <Header />}
      {/* </Suspense> */}
      {/* <Suspense fallback={<Loader />}> */}
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
      {/* </Suspense> */}
      {/* <Suspense fallback={<Loader />}> */}
      {/* <Newsletter /> */}
      {!hideLayout && <Footer />}
      <ScrollToTop />
      {/* </Suspense> */}
    </>
  );
}

export default Layout;
