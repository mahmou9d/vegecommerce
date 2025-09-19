import { useAppDispatch, useAppSelector } from "../store/hook";
import { Button } from "../components/ui/button";
import Product from "./Product";
import { useEffect } from "react";
import { productUser } from "../store/productSlice";
import { RootState } from "../store";
import { useNavigate } from "react-router";
const HomeProduct = () => {

  const dispatch = useAppDispatch();
  const nav =useNavigate()
  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(productUser());
  }, [dispatch]);
// console.log(products,"product")

  return (
    <div className="container mx-auto mt-40">
      <div className="flex items-center justify-between">
        <h1 className="text-[36px] font-bold flex justify-center">
          Best Seller{" "}
          <span
            className="text-[#01e281] pl-2     relative inline-block  
    after:content-[''] after:absolute after:bottom-1 after:left-0
    after:w-[25vh] after:h-[30%]
    after:bg-[#01e281] after:opacity-20 after:rounded-md after:z-[1]"
          >
            {" "}
            Products
          </span>
        </h1>
        <Button onClick={()=>{
          nav("/shop");
          window.scrollTo(0,0)
        }} className="bg-[#01e281] my-8 text-[#122d40] font-extrabold rounded-full px-10 py-7 text-[16px] tracking-[0.5px] hover:bg-[#122d40] hover:text-[#01e281]">
          View all Products
        </Button>
      </div>
      <div className="flex flex-wrap p-[10px] justify-between gap-y-12">
        {products.map((product, i) => {
          return <Product key={i} item={product} />;
        })}
      </div>
    </div>
  );
};

export default HomeProduct;
