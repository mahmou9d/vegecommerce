import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { FaArrowRight, FaCartArrowDown } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { IoClose } from "react-icons/io5";
import "./Header.css";
import { Progress } from "../components/ui/progress";
import { EditCart, GetToCart, RemoveCart } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { LiaCartPlusSolid } from "react-icons/lia";
import { RootState } from "../store";
import { productUser } from "../store/productSlice";
import Product from "./Product";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const nav =useNavigate()
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.product
  );
  console.log(products, "ppppppppppppppppppppppp");
  useEffect(() => {
    if (products.length === 0) {
      dispatch(productUser());
    }
  }, [dispatch, products.length]);
  const { items, total } = useAppSelector((state) => state.cart);
  useEffect(() => {
    dispatch(GetToCart());
  }, [dispatch]);
  console.log(items);
  const updateQuantity = (
    product_id: number,
    type: "inc" | "dec",
    currentQty: number
  ) => {
    const newQty =
      type === "inc" ? currentQty + 1 : Math.max(0, currentQty - 1);
    dispatch(EditCart({ product_id, quantity: newQty }))
      .unwrap()
      .then(() => dispatch(GetToCart()));
  };
  const removeItem = (product_id: number) => {
    dispatch(RemoveCart({ product_id }))
      .unwrap()
      .then(() => dispatch(GetToCart()));
  };

  const limit = 1000;
  const subtotal = Array.isArray(items)
    ? items.reduce((sum, item) => sum + Number(item.subtotal), 0)
    : 0;
  const progress = Math.min((subtotal / limit) * 100, 100);
  return (
    <div>
      {/* Header */}
      <div className="bg-[#f9f9f9] pt-20 pb-10">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-[24px] text-[#122d40] font-bold">Cart</h1>
          <div className="text-[18px] flex items-center gap-3 font-medium">
            <TiHome />
            <IoIosArrowForward />
            Cart
          </div>
        </div>
      </div>

      {Array.isArray(items) && items?.length !== 0 ? (
        <div>
          {/* Steps */}
          <div className="py-24 container mx-auto flex justify-center gap-x-16">
            <Link
              to={"/cart"}
              className="flex items-center justify-between cursor-pointer"
            >
              <h1 className="w-8 h-8 leading-2 p-[5px] text-center mr-4 text-[18px] rounded-full bg-[#01e281]">
                1
              </h1>
              <h1 className="text-[25px] font-medium">Shoping cart</h1>
            </Link>

            <h4 className=" flex items-center opacity-50">
              <FaArrowRight className="text-[24px]" />
            </h4>
            <Link
              to={"/checkout"}
              className="flex items-center justify-center opacity-50 cursor-pointer"
            >
              <h1 className="w-8 h-8 leading-2 p-[5px] text-center mr-4 text-[18px] rounded-full bg-[#01e281]">
                2
              </h1>
              <h1 className="text-[25px] font-medium">Checkout details</h1>
            </Link>
            <h4 className=" flex items-center opacity-50">
              <FaArrowRight className="text-[24px]" />
            </h4>
            <div className="flex items-center justify-center opacity-50">
              <h1 className="w-8 h-8 leading-2 p-[5px] text-center mr-4 text-[18px] rounded-full bg-[#01e281]">
                3
              </h1>
              <h1 className="text-[25px] font-medium">Order complete</h1>
            </div>
          </div>

          {/* Table */}
          <div className="p-6 container mx-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#a7a7a71a] text-black h-20 text-[18px] font-extrabold">
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Subtotal</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.product_id}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => removeItem(item.product_id)}
                        className="hover-effect text-red-500"
                      >
                        <IoClose
                          style={{
                            width: "2rem",
                            height: "2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "0.5rem",
                            cursor: "pointer",
                          }}
                        />
                      </Button>
                    </TableCell>
                    <TableCell className=" gap-3">
                      <img
                        src={item.img_url}
                        alt={item.product_name}
                        className="rounded-md w-24 h-16"
                      />
                    </TableCell>
                    <TableCell className="flex flex-col p-7 gap-3">
                      <p className="font-bold text-[18px]">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-500">SKU: SKU_1192</p>
                    </TableCell>
                    <TableCell className="text-[16px]">${item.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(
                              item.product_id,
                              "dec",
                              item.quantity
                            )
                          }
                          className="bg-[#f9f9f9] text-[#01e281] transition duration-200 delay-100 hover:text-[#122d40] hover:bg-[#01e281]  rounded-full text-[18px] w-12 h-12"
                        >
                          −
                        </Button>
                        <span className="px-3 w-20 border border-[#a7a7a74d] h-10 rounded-full flex items-center justify-center text-[16px]">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(
                              item.product_id,
                              "inc",
                              item.quantity
                            )
                          }
                          className="bg-[#f9f9f9] text-[#01e281] transition duration-200 delay-100 hover:text-[#122d40] hover:bg-[#01e281] rounded-full text-[18px] w-12 h-12"
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-[16px]">
                      ${Number(item.price) * item.quantity}
                    </TableCell>
                  </TableRow>
                ))}

                {/* صف مستقل للزر */}
                <TableRow>
                  <TableCell colSpan={6} className="text-left">
                    <div className="flex justify-end">
                      <Button onClick={()=>{
                        nav("/shop")
                         window.scrollTo(0, 0);}} className="flex text-[18px] items-center gap-2 px-6 bg-[#01e281] text-[#122d40] font-bold rounded-full  h-12 justify-center m-2 hover:bg-[#122d40] hover:text-[#01e281] transition duration-200 delay-100">
                        Continue shopping
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Footer Buttons */}
          </div>
          <div className="bg-[#f1f2f6] container mx-auto w-[40%] p-8 rounded-[50px] flex flex-col justify-center  gap-5 pb-14 ">
            <h2 className="bg-[#01e281] text-[18px] relative flex-col items-center justify-center flex text-[#122d40] h-14 font-bold rounded-full px-6  w-full">
              Cart totals
              <span className="block h-[3px] absolute bottom-0 w-6 bg-black mt-1 rounded"></span>
            </h2>
            <div>
              <div className="border border-[#a7a7a733] ">
                <div className="flex   border-b border-[#a7a7a733]  bg-[#a7a7a71a]">
                  <h1 className="w-3/4 border-r border-[#a7a7a733]  h-full">
                    <h2 className="p-6 text-[16px] font-bold">Product</h2>
                  </h1>
                  <h2 className="w-[28%] text-[16px] font-bold p-6">
                    Subtotal
                  </h2>
                </div>
                {items.map((item, i) => {
                  return (
                    <div className="flex   border-b border-[#a7a7a733]  bg-[#a7a7a71a]">
                      <h1 className="w-3/4 border-r border-[#a7a7a733]  h-full">
                        <h2 className="p-6 text-[16px] font-normal">
                          {item.product_name}
                          <span className=" text-[16px] font-bold">
                            × {item.quantity}
                          </span>
                        </h2>
                      </h1>
                      <h2 className="w-[28%] text-[16px] font-normal p-6">
                        ${item.price}
                      </h2>
                    </div>
                  );
                })}
                <div className="flex  border-b border-[#a7a7a733] p-5">
                  <h1 className="w-1/4 p-5 text-[16px] font-bold">Subtotal</h1>
                  <h2 className="w-3/4 p-5">${subtotal.toFixed(2)}</h2>
                </div>
                <div className="flex p-5 text-[16px] font-bold">
                  <h1 className="w-1/4 p-5">Total</h1>
                  <h2 className="w-3/4 p-5">${subtotal.toFixed(2)}</h2>
                </div>
              </div>
              <div className=" pb-5 border-b border-dashed border-[#cdc7c7]">
                <div className="flex items-center pb-3 px-1 text-[18px] mt-4">
                  <FaCartArrowDown />
                  <p className="flex items-center pl-2">
                    Add <p className="font-bold px-2">${subtotal.toFixed(2)}</p>{" "}
                    more to get free shipping!
                  </p>
                </div>
                <Progress value={progress} className="h-4 text-[#01e281]" />
              </div>
              <div className="flex justify-end pt-5">
                <Button onClick={()=>{
                  nav("/checkout")
                  window.scrollTo(0,0)
                }} className="flex text-[18px] items-center gap-2 px-6 bg-[#01e281] text-[#122d40] font-bold rounded-full  h-12 justify-center m-2 hover:bg-[#122d40] hover:text-[#01e281] transition duration-200 delay-100">
                  Process to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" h-48 p-5 container mx-auto mb-[70rem]">
          <div className=" flex flex-col items-center justify-center rounded-2xl">
            <LiaCartPlusSolid className="text-[240px] opacity-30" />
            <h1 className="text-[36px] font-bold">
              Looks like your cart is empty!
            </h1>
            <h1 className="text-[20px] opacity-50">
              Time to start your shopping
            </h1>
            <div className="bg-[#f1f2f6] container mx-auto mt-10  p-8 rounded-[50px] flex flex-col justify-center  gap-5  ">
              <h2 className="bg-[#01e281] text-[18px] relative flex-col items-center justify-center flex text-[#122d40] h-14 font-bold rounded-full px-6  w-full">
                You may be interested in ...
                <span className="block h-[3px] absolute bottom-0 w-6 bg-black mt-1 rounded"></span>
              </h2>
              <div className="flex justify-between my-10">
                {products.slice(0, 4).map((product, i) => {
                  return <Product key={i} item={product} />;
                })}
              </div>
            </div>
            <Button className="flex text-[18px] items-center gap-2 px-8 py-8 mt-8 bg-[#01e281] text-[#122d40] font-bold rounded-full  h-12 justify-center  hover:bg-[#122d40] hover:text-[#01e281] transition duration-200 delay-100">
              <Link to={"/shop"}>Return to shop</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
