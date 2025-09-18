import { useAppDispatch, useAppSelector } from "../store/hook";
import { Rating, RatingButton } from "../components/ui/shadcn-io/rating";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { RiShoppingCartLine } from "react-icons/ri";
import { WishlistItems, WishlistRemove } from "../store/wishlistSlice";
import { AddToCart, GetToCart } from "../store/cartSlice";
import { useEffect, useState } from "react";
import { GetWishlist } from "../store/GetwishlistSlice";
import { useNavigate } from "react-router";
import { useToast } from "../hooks/use-toast";

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

const Product = ({ item }: { item: IItem }) => {
  const { toast } = useToast();
  const nav = useNavigate();
  console.log(item, "''''''''''''''''''''''''''''''''''''''''");
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const getwishlist = useAppSelector((state) => state.Getwishlists.items);
  console.log(wishlist, "khflhjdjfhs;kjjdhsfg;lkjhfdgdfogkjh");
  // 👇 تحقق إذا المنتج موجود
  const inWishlist = item.id
    ? getwishlist.some((w) => w.product_id === item.id)
    : false;
      useEffect(() => {
          dispatch(GetWishlist());
      }, [dispatch]);
// const toggleWishlist = async () => {
//   if (!item.id) return;

//   try {
//     if (inWishlist) {
//       await dispatch(WishlistRemove(item.id)).unwrap();
//       toast({
//         title: "Removed ❤️",
//         description: `${item.name} has been removed from your wishlist.`,
//       });
//     } else {
//       await dispatch(WishlistItems(item.id)).unwrap();
//       toast({
//         title: "Added ❤️",
//         description: `${item.name} has been added to your wishlist.`,
//       });
//     }
//     dispatch(GetWishlist());
//   } catch {
//     toast({
//       title: "Error ❌",
//       description: "Something went wrong with your wishlist.",
//       variant: "destructive",
//     });
//   }
// };

  const toggleWishlist = () => {
    if (!item.id) return;

    if (inWishlist) {
      dispatch(WishlistRemove(item.id));
        toast({
          title: "Removed ❤️",
          description: `${item.name} has been removed from your wishlist.`,
        });
    } else {
      dispatch(WishlistItems(item.id));
       toast({
         title: "Added ❤️",
         description: `${item.name} has been added to your wishlist.`,
       });
    }
    dispatch(GetWishlist());
  };

  // const handleAddToCart = async () => {
  //   if (!item.id) return;
  //   await dispatch(AddToCart({ product_id: item.id, quantity: 1 }));
    
  //   dispatch(GetToCart());
  //       toast({
  //         title: "Added to cart 🛒",
  //         description: `${item.name} has been added to your cart.`,
  //       });
  // };
const handleAddToCart = async () => {
  if (!item.id) return;
  try {
    await dispatch(AddToCart({ product_id: item.id, quantity: 1 })).unwrap();
    dispatch(GetToCart());

    toast({
      title: "Added to cart 🛒",
      description: `${item.name} has been added to your cart.`,
    });
  } catch {
    toast({
      title: "Error ❌",
      description: "Failed to add item to cart.",
      // variant: "destructive",
    });
  }
};
  return (
    <div className="cursor-pointer relative overflow-visible group/item w-[440px] h-[500px] py-12 bg-white p-[30px] -mt-3 flex flex-col justify-between rounded-ee-[25px] rounded-ss-[25px] shadow-[0px_8px_64px_0px_#122d401a]">
              <div className="relative group flex">
          {inWishlist ? (
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
            className={`absolute   ${
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
        <div
        onClick={() => {
          nav(`/singleProduct/${item.id}`);
          window.scrollTo(0,0)
        }}
        className="flex justify-between flex-col h-full"
      >

        <img
          className="w-[400px] h-[200px] object-contain"
          src={item.img_url}
          alt={item.name}
        />
        <div>
          <h1 className="text-[22px] font-extrabold  group-hover/item:text-[#01e281] duration-200">
            {item.name}{" "}
          </h1>
          <p className="text-[14px]  group-hover/item:text-[#01e281] duration-200">
            {item.description[0]}
          </p>
        </div>

        <div className="flex justify-between">
          <p>
            <Rating value={item.average_rating} readOnly>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton className="text-yellow-500" key={index} />
              ))}
            </Rating>
          </p>
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

      <div className="absolute -bottom-4 w-[180px] h-[50px] text-[#122d40] font-bold opacity-0 left-1/2 -translate-x-1/2 group-hover/item:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleAddToCart}
          className="bg-[#01e281] text-[#122d40] hover:bg-[#122d40] hover:text-[#01e281] text-[18px] flex items-center justify-center gap-3 font-bold px-4 py-2 w-full h-full  rounded-full  shadow-md"
        >
          <RiShoppingCartLine className="text-[18px]" /> Add to cart
        </button>
      </div>
      {item.discount && (
        <div className="absolute">
          <h1 className="h-[4.5rem] w-[4.5rem] font-extrabold bg-[#122d40] rounded-[50px] flex justify-center items-center text-white mb-2  border border-[#122d40]">
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

export default Product;
