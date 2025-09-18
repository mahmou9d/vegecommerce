import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";
import { Button } from "../components/ui/button";

const links = [
  {
    Icon: <FaLink />,
    title: "Help Center",
  },
  {
    Icon: <FaLink />,
    title: "Terms & Conditions",
  },
  {
    Icon: <FaLink />,
    title: "Privacy Policy",
  },
  {
    Icon: <FaLink />,
    title: "Refund Policy",
  },
  {
    Icon: <IoCall />,
    title: "01009014597",
  },
  {
    Icon: <HiOutlineMailOpen />,
    title: "mohnud0987@gmail.com",
  },
];
// z-50
const Footer = () => {
  return (
    <div className="relative mt-40">
      <div className="absolute justify-between top-[-28%] : left-1/2 -translate-x-1/2 h-[200px] rounded-[50px] flex items-center px-12 mt-28 bg-[#1C3E56] container mx-auto bg-[url('https://xtratheme.com/elementor/supermarket/wp-content/uploads/sites/106/2023/04/bg-subscribe.jpg')] bg-center bg-no-repeat bg-cover">
        <h1 className="text-[36px] text-white font-extrabold">
          Subscribe to
          <span className="text-[#01e281]">Newsletter</span>
        </h1>
        <div className="bg-white w-1/2 h-[65px] text-[#ffffff26] rounded-[100px] relative  hidden lg:block">
          <input
            type="text"
            className="w-full h-full  bg-transparent px-[25px] outline-none"
            placeholder="What are you looking for?"
          />
          <div className="absolute cursor-pointer -top-1 right-0 h-[90%] flex items-center gap-2 px-4 font-bold text-[#122d40] bg-[#01e281] rounded-full w-44 justify-center m-2 hover:bg-[#122d40] hover:text-[#01e281] transition duration-200 delay-100">
            <HiOutlineMailOpen className="text-[20px]" /> Subscribe
          </div>
          {/* <HiOutlineMailOpen className="" /> */}
        </div>
      </div>
      <div className=" bg-[#122d40] rounded-t-[50px] pt-40">
        <div className="container mx-auto">
          <div className="flex justify-between rounded-[50px]">
            <div className="w-[430px] rounded-[50px] h-[450px] leading-[32px] flex flex-col justify-between text-white border border-[#9fb6cb33] px-12 py-12">
              <img className="w-[180px]" src="/images/logo-sm.png" alt="" />
              <h1 className="text-[19px]">
                “Be who you are and say what you feel, because those who mind
                don't matter, and those who matter don't mind.”
              </h1>
              <div className="flex gap-2">
                <FaFacebook className="w-[50px] cursor-pointer h-[50px] p-[14px] bg-[#204560] rounded-full hover:bg-[#3b5998] transition-all duration-200" />
                <FaTwitter className="w-[50px] cursor-pointer h-[50px] p-[14px] bg-[#204560] rounded-full hover:bg-[#1DA1F2] transition-all duration-200" />
                <FaInstagram className="w-[50px] cursor-pointer h-[50px] p-[14px] bg-[#204560] rounded-full hover:bg-insta-gradient transition-all duration-200" />
              </div>
            </div>
            <div className="w-[430px] rounded-[50px] h-[450px] border border-[#9fb6cb33] px-12 py-12 text-white">
              <h1 className="text-[20px] font-bold">Useful Links</h1>
              <div className="h-[1px] w-full bg-[#9fb6cb33] my-5" />
              <div>
                {links.map((item, i) => {
                  return (
                    <div className="flex cursor-pointer gap-3 pt-3 items-center group hover:ml-2 transition-all duration-200">
                      <h1 className="text-[#01e281] text-[18px] bg-[#01e28133] transition-all duration-200 group-hover:bg-[#01e281] group-hover:text-[#122d40] w-[30px] h-[30px] rounded-full flex justify-center items-center">
                        {item.Icon}
                      </h1>
                      <h1 className="text-[18px] group-hover:text-[#01e281] transition-all duration-200">
                        {item.title}
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-[430px] items-center text-center flex flex-col justify-center rounded-[50px] h-[450px] border border-[#9fb6cb33] px-12 py-12">
              <h1 className="text-[22px] text-white font-extrabold">
                Interested in a Great Way{" "}
                <span className="text-[#01e281]">Make Money?</span>
              </h1>
              <h1 className="py-7 text-[#acacac] leading-7">
                A supermarket is a self-service shop offering a wide variety of
                food, beverages and household products.
              </h1>
              <Button className="bg-[#01e281] my-8 text-[#122d40] font-extrabold rounded-full px-10 py-7 text-[16px] tracking-[0.5px] hover:bg-white hover:text-black">
                Become a Seller
              </Button>
            </div>
          </div>
          <div className="flex justify-between mt-10 py-7 px-10 rounded-t-[50px] border border-[#9fb6cb33]">
            <p className="text-lg font-bold text-[#dddddde6]">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent mr-1">
                Frontend: Mahmoud Mohamed
              </span>
              .
              <span className="bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent italic mx-1">
                Backend: Mohamed Fouad
              </span>
              . Copyright © 2025 Xtra Theme.
            </p>
            <img className="w-[260px]" src="/images/22.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
