import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaCartArrowDown } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import { FiChevronUp, FiChevronDown, FiCheck } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { Checkout, GetToCart, RemoveCart } from "../store/cartSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router";
import { useToast } from "../hooks/use-toast";

const frameworks = [
  {
    value: "egypt",
    label: "Egypt",
  },
  {
    value: "saudi-arabia",
    label: "Saudi Arabia",
  },
  {
    value: "uae",
    label: "United Arab Emirates",
  },
  {
    value: "qatar",
    label: "Qatar",
  },
  {
    value: "morocco",
    label: "Morocco",
  },
];
const schema = yup.object().shape({
  full_name: yup.string().required("Full name is required"),
  full_address: yup.string().required("Address is required"),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/, "Phone must be numbers only")
    .min(10, "Phone must be at least 10 digits")
    .required("Phone is required"),
  country: yup.string().required("Country is required"),
  order_notes: yup.string().optional(), // 🟢 أضف ده
});

const Checkoutcart = () => {
  const { toast } = useToast();

  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("");
  const [placeholder, setPlaceholder] = useState(
    "Notes about your order, e.g. special notes for delivery"
  );
  const [countryValue, setCountryValue] = React.useState("");

  const { items } = useAppSelector((state) => state?.cart);
  useEffect(() => {
    dispatch(GetToCart());
  }, [dispatch]);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  console.log(total, "toooooooooooo");
  const limit = 1000;
  const progress = Math.min((total / limit) * 100, 100);
  const handleFocus = () => {
    setTimeout(() => {
      setPlaceholder("");
    }, 2000);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);

    // جهّز الـ payload اللي هيتم إرساله للـ backend
    const payload = {
      ...data,
      items: items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
    };

    // اعمل dispatch للـ Checkout
    dispatch(Checkout(payload))
      .unwrap()
      .then((res) => {
        console.log("Order placed ✅:", res);
              toast({
                title: "Order placed successfully 🎉",
                description: "Your order has been submitted, redirecting...",
              });

              Promise.all(
                items.map((item) =>
                  dispatch(RemoveCart({ product_id: item.product_id })).unwrap()
                )
              )
                .then(() => {
                  // رجّع الكارت فاضي من الـ API
                  dispatch(GetToCart());

                  // 🟢 Toast مسح الكارت
                  toast({
                    title: "Cart cleared 🛒",
                    description: "Your cart has been emptied successfully.",
                  });
                })
                .catch((err) => {
                  console.error("Failed to clear cart:", err);

                  // 🔴 Toast لو حصل خطأ
                  toast({
                    title: "Error ❌",
                    description: "Failed to clear your cart, please try again.",
                    // variant: "destructive",
                  });
                });

        nav("/ordercomplete", { replace: true });
      })
      .catch((err) => {
        console.error("Checkout error:", err);
        // alert("Failed to place order ❌");


      // 🔴 Toast Error
      toast({
        title: "Failed to place order ❌",
        description: "Please try again later.",
        // variant: "destructive",
      });
      });
  };
  return (
    <div>
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
      <div className="py-24 container mx-auto flex justify-center gap-x-16">
        <Link
          to={"/cart"}
          className="flex items-center justify-between opacity-50 cursor-pointer"
        >
          <h1 className="w-8 h-8 leading-2 p-[5px] text-center mr-4 text-[18px] rounded-full bg-[#01e281]">
            1
          </h1>
          <h1 className="text-[25px] font-medium">Shoping cart</h1>
        </Link>

        <h4 className=" flex items-center opacity-50">
          <FaArrowRight className="text-[24px]" />
        </h4>
        <div className="flex items-center justify-center  cursor-pointer">
          <h1 className="w-8 h-8 leading-2 p-[5px] text-center mr-4 text-[18px] rounded-full bg-[#01e281]">
            2
          </h1>
          <h1 className="text-[25px] font-medium">Checkout details</h1>
        </div>
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
      <div className="flex gap-5 container mx-auto">
        <div className="bg-[#f1f2f6] container mx-auto w-[60%] p-8 rounded-[50px] flex flex-col justify-center  gap-5 pb-14 ">
          <h2 className="bg-[#01e281] text-[18px] relative flex-col items-center justify-center flex text-[#122d40] h-14 font-bold rounded-full px-6  w-full">
            Billing details
            <span className="block h-[3px] absolute bottom-0 w-6 bg-black mt-1 rounded"></span>
          </h2>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="pt-10 flex flex-col w-full">
              <label className="flex items-center gap-1">
                Full Name <span className="text-red-700">*</span>
              </label>
              <input
                {...register("full_name")}
                className="mt-4 h-10 rounded-full shadow-[#01e281] shadow-sm outline-none py-2 px-6"
                type="text"
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.full_name.message as string}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="pt-10 flex flex-col w-full">
              <label className="flex items-center gap-1">
                Full Address <span className="text-red-700">*</span>
              </label>
              <input
                {...register("full_address")}
                className="mt-4 h-10 rounded-full shadow-[#01e281] shadow-sm outline-none py-2 px-6"
                type="text"
              />
              {errors.full_address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.full_address.message as string}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="pt-10 flex flex-col w-full">
              <label className="flex items-center gap-1">
                Phone <span className="text-red-700">*</span>
              </label>
              <input
                {...register("phone_number")}
                className="w-full mt-4 h-10 rounded-full shadow-[#01e281] shadow-sm outline-none py-2 px-6"
                type="text"
              />
              {errors.phone_number && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone_number.message as string}
                </p>
              )}
            </div>

            {/* Country with Popover */}
            <div className="pt-10 flex flex-col w-full">
              <label className="flex items-center gap-1">
                Country<span className="text-red-700"> *</span>
              </label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full h-10 px-4 rounded-[50px] shadow-[#01e281] shadow-sm mt-5 justify-between"
                  >
                    {countryValue
                      ? frameworks.find((f) => f.value === countryValue)?.label
                      : "Select country"}
                    <div className="ml-2 h-4 w-4 opacity-50 flex flex-col items-center justify-center">
                      <FiChevronUp className="h-2 w-2" />
                      <FiChevronDown className="h-2 w-2 -mt-[2px]" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setCountryValue(currentValue);
                              setValue("country", currentValue); // 🟢 نحط القيمة في الفورم
                              setOpen(false);
                            }}
                          >
                            <FiCheck
                              className={`mr-2 h-4 w-4 ${
                                countryValue === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.country.message as string}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="mt-10 ">
              <h1 className="pb-5 border-b border-[#a7a7a733] text-[22px] font-bold">
                Additional information
              </h1>
              <p className="pt-5 opacity-65 text-[14px] pb-3">
                Order notes (optional)
              </p>
              <Textarea
                {...register("order_notes")}
                placeholder="Notes about your order, e.g. special notes for delivery"
              />
            </div>

            <div className="flex w-full pt-5">
              <Button
                type="submit"
                className="flex w-full text-[18px] items-center gap-2 px-6 bg-[#01e281] text-[#122d40] font-bold rounded-full  h-12 justify-center m-2 hover:bg-[#122d40] hover:text-[#01e281] transition duration-200 delay-100"
              >
                Place order
              </Button>
            </div>
          </form>
        </div>
        <div className="bg-[#f1f2f6] container mx-auto h-fit w-[35%] p-8 rounded-[50px] flex flex-col justify-center  gap-5 pb-14 ">
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
                <h2 className="w-[28%] text-[16px] font-bold p-6">Subtotal</h2>
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

              <div className="flex  border-b border-[#a7a7a733] ">
                <h1 className="w-3/4 border-r border-[#a7a7a733]  h-full">
                  <h2 className="p-6 text-[16px] font-bold">Subtotal</h2>
                </h1>
                {/* <h1 className="w-3/4 p-5 text-[16px] font-bold">Subtotal</h1> */}
                <h2 className="w-[28%] text-[16px] font-bold p-6">
                  ${total.toFixed(2)}
                </h2>
              </div>
              <div className="flex text-[16px] font-bold">
                <h1 className="w-3/4 border-r border-[#a7a7a733]  h-full">
                  <h2 className="p-6 text-[16px] font-bold">Total</h2>
                </h1>
                {/* <h1 className="w-3/4 p-5">Total</h1> */}
                <h2 className="w-[28%] p-6">${total.toFixed(2)}</h2>
              </div>
            </div>
            <div className=" pb-5 border-b border-dashed border-[#cdc7c7]">
              <div className="flex items-center pb-3 px-1 text-[18px] mt-4">
                <FaCartArrowDown />
                <p className="flex items-center pl-2">
                  Add <p className="font-bold px-2">${total.toFixed(2)}</p> more
                  to get free shipping!
                </p>
              </div>
              <Progress value={progress} className="h-4 text-[#01e281]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkoutcart;
