import { useEffect, useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { RiShoppingCartLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { WishlistItems, WishlistRemove } from "../store/wishlistSlice";
import { GetWishlist } from "../store/GetwishlistSlice";
import { AddToCart, GetToCart } from "../store/cartSlice";
import { Rating, RatingButton } from "../components/ui/shadcn-io/rating";
import { useToast } from "../hooks/use-toast";
import React from "react";

interface IItem {
  id?: number;
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
}

const ProductComponent = ({ item }: { item: IItem }) => {
  const { toast } = useToast();
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const getwishlist = useAppSelector((state) => state.Getwishlists.items);
  const { access } = useAppSelector((state) => state?.auth);
const loadingcart = useAppSelector((state) => state.cart.loading);
const loadingwish = useAppSelector((state)=>state.wishlist.loading)
    const [wishlistBtnLoading, setWishlistBtnLoading] = useState(false);
    const [cartBtnLoading, setCartBtnLoading] = useState(false);
  const inWishlist = useMemo(
    () => (item.id ? getwishlist.some((w) => w.product_id === item.id) : false),
    [item.id, getwishlist]
  );

  useEffect(() => {
    dispatch(GetWishlist());
  }, [dispatch]);

  // ✅ useCallback
//   const toggleWishlist = useCallback(() => {
//     if (!item.id) return;
//  setWishlistBtnLoading(true);
//     if (inWishlist) {
//       dispatch(WishlistRemove(item.id));
//       toast({
//         title: "Removed ❤️",
//         description: `${item.name} has been removed from your wishlist.`,
//       });
//     } else {
//       dispatch(WishlistItems(item.id));
//       toast({
//         title: "Added ❤️",
//         description: `${item.name} has been added to your wishlist.`,
//       });
//     }
//     dispatch(GetWishlist());
//   }, [item.id, item.name, inWishlist, dispatch, toast]);

  const handleAddToCart = useCallback(async () => {
    if (!item.id) return;
      setCartBtnLoading(true);
    try {
      await dispatch(AddToCart({ product_id: item.id, quantity: 1 })).unwrap();
      dispatch(GetToCart());
      toast({
        title: "Added to cart 🛒",
        description: `${item.name} has been added to your cart.`,
      });
    } catch {
      if (access) {
        toast({
          title: "Error ❌",
          description: "Failed to add item to cart.",
        });
      } else {
        toast({
          title: "Error ❌",
          description: "Please login first",
        });
      }

    }   finally {
      setCartBtnLoading(false);
    }
  }, [item.id, item.name, dispatch, toast, access]);
  const toggleWishlist = async () => {

    if (!item.id) return;

    setWishlistBtnLoading(true);
    try {
      if (inWishlist) {
        await dispatch(WishlistRemove(item.id)).unwrap();
        toast({
          title: "Removed ❤️",
          description: `${item.name} removed from wishlist`,
        });
      } else {
        await dispatch(WishlistItems(item.id)).unwrap();
        toast({
          title: "Added ❤️",
          description: `${item.name} added to wishlist`,
        });
      }
    } catch {
      if (access) {
        toast({
          title: "Error ❌",
          description: "Failed to add item to wishlist.",
        });
      } else {
        toast({
          title: "Error ❌",
          description: "Please login first",
        });
      }
    } finally {
      dispatch(GetWishlist());
      setWishlistBtnLoading(false);
    }
  };

  // const handleAddToCart = async () => {
  //   if (!item.id) return;

  //   setCartBtnLoading(true);
  //   try {
  //     await dispatch(AddToCart({ product_id: item.id, quantity: 1 })).unwrap();
  //     toast({ title: "Added 🛒", description: `${item.name} added to cart` });
  //   } finally {
  //     setCartBtnLoading(false);
  //   }
  // };
  return (
    <div className="cursor-pointer relative overflow-visible group/item w-[440px] h-[500px] py-12 bg-white p-[30px] -mt-3 flex flex-col justify-between rounded-ee-[25px] rounded-ss-[25px] shadow-[0px_8px_64px_0px_#122d401a]">
      {/* Wishlist button */}
      <div className="relative group flex">
        {wishlistBtnLoading ? (
          <div className="absolute right-[-5%] top-[-20px] border border-[#01e281] text-[#01e281] w-10 h-10 p-[6px] rounded-full flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-[#01e281] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : inWishlist ? (
          <GoHeartFill
            onClick={toggleWishlist}
            className="absolute right-[-5%] top-[-20px] border border-[#01e281] text-[#01e281] w-10 h-10 p-[6px] rounded-full duration-300 cursor-pointer"
          />
        ) : (
          <GoHeart
            onClick={toggleWishlist}
            className="absolute right-[-5%] top-[-20px] border border-[#9fb6cb33] group-hover:border-[#01e281] group-hover:text-[#01e281] w-10 h-10 p-[6px] rounded-full duration-300 cursor-pointer"
          />
        )}
        <div
          className={`absolute ${
            inWishlist ? "ml-[9.5rem]" : "ml-[13rem]"
          } z-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        >
          <button
            onClick={toggleWishlist}
            className="bg-[#01e281] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
          >
            {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          </button>
        </div>
      </div>

      {/* Product details */}
      <div
        onClick={() => {
          nav(`/singleProduct/${item.id}`);
          window.scrollTo(0, 0);
        }}
        className="flex justify-between flex-col h-full"
      >
        <img
          className="w-[400px] h-[200px] object-contain"
          src={item.img_url}
          alt={item.name}
        />
        <div>
          <h1 className="text-[22px] font-extrabold group-hover/item:text-[#01e281] duration-200">
            {item.name}
          </h1>
          <p className="text-[14px] group-hover/item:text-[#01e281] duration-200">
            {item.categories[2] || item.categories[1] || item.categories[0]}
          </p>
        </div>
        <div className="flex justify-between">
          <Rating value={item.average_rating} readOnly>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton className="text-yellow-500" key={index} />
            ))}
          </Rating>
        </div>
        {item.original_price === item.final_price ? (
          <h1 className="text-[24px]">${item.final_price}</h1>
        ) : (
          <div className="flex justify-between items-center">
            <h1 className="text-[18px] line-through text-[#00000070]">
              ${item.original_price}
            </h1>
            <h1 className="text-[24px]">${item.final_price}</h1>
          </div>
        )}
      </div>

      {/* Add to cart button */}
      <div className="absolute -bottom-4 w-[180px] h-[50px] text-[#122d40] font-bold opacity-0 left-1/2 -translate-x-1/2 group-hover/item:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleAddToCart}
          className="bg-[#01e281] text-[#122d40] hover:bg-[#122d40] hover:text-[#01e281] text-[18px] flex items-center justify-center gap-3 font-bold px-4 py-2 w-full h-full rounded-full shadow-md"
        >
          {cartBtnLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <RiShoppingCartLine className="text-[18px]" /> Add to cart
            </>
          )}
        </button>
      </div>

      {item.discount && (
        <div className="absolute">
          <h1 className="h-[4.5rem] w-[4.5rem] font-extrabold bg-[#122d40] rounded-[50px] flex justify-center items-center text-white mb-2 border border-[#122d40]">
            Sale!
          </h1>
          <h1 className="h-[4.5rem] w-[4.5rem] font-extrabold bg-[#122d40e6] rounded-[50px] flex justify-center items-center text-white border border-[#122d40]">
            {item.discount}%
          </h1>
        </div>
      )}
    </div>
  );
};

// ✅ React.memo يمنع إعادة الرندر لو الـ props.item ماغيرش
export default React.memo(ProductComponent);
