import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Button } from "../components/ui/button";

// Footer links
const links = [
  { Icon: <FaLink />, title: "Help Center" },
  { Icon: <FaLink />, title: "Terms & Conditions" },
  { Icon: <FaLink />, title: "Privacy Policy" },
  { Icon: <FaLink />, title: "Refund Policy" },
];

const Footer = () => {
  return (
    <div className="relative mt-40">
      {/* Newsletter subscription section */}
      <div className="absolute top-[-28%] left-1/2 -translate-x-1/2 h-[200px] rounded-[50px] flex items-center px-12 mt-28 bg-[#1C3E56] container mx-auto bg-[url('https://xtratheme.com/elementor/supermarket/wp-content/uploads/sites/106/2023/04/bg-subscribe.jpg')] bg-center bg-no-repeat bg-cover">
        <h1 className="text-[36px] text-white font-extrabold">
          Subscribe to <span className="text-[#01e281]">Newsletter</span>
        </h1>
        <div className="bg-white w-1/2 h-[65px] text-[#ffffff26] rounded-[100px] relative hidden lg:block">
          <input
            type="text"
            className="w-full h-full bg-transparent px-[25px] outline-none"
            placeholder="What are you looking for?"
          />
          <div className="absolute cursor-pointer -top-1 right-0 h-[90%] flex items-center gap-2 px-4 font-bold text-[#122d40] bg-[#01e281] rounded-full w-44 justify-center m-2 hover:bg-[#122d40] hover:text-[#01e281] transition duration-200 delay-100">
            <HiOutlineMailOpen className="text-[20px]" /> Subscribe
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#122d40] rounded-t-[50px] pt-40">
        <div className="container mx-auto">
          <div className="flex justify-between rounded-[50px] gap-5">
            {/* Left section: Logo & social */}
            <div className="w-[430px] rounded-[50px] h-[450px] flex flex-col justify-between text-white border border-[#9fb6cb33] px-12 py-12">
              <img className="w-[180px]" src="/images/logo-sm.png" alt="Logo" />
              <h1 className="text-[19px]">
                “Be who you are and say what you feel, because those who mind
                don't matter, and those who matter don't mind.”
              </h1>
              <div className="flex gap-2">
                <FaFacebook className="w-[50px] h-[50px] p-[14px] bg-[#204560] rounded-full cursor-pointer hover:bg-[#3b5998] transition-all duration-200" />
                <FaTwitter className="w-[50px] h-[50px] p-[14px] bg-[#204560] rounded-full cursor-pointer hover:bg-[#1DA1F2] transition-all duration-200" />
                <FaInstagram className="w-[50px] h-[50px] p-[14px] bg-[#204560] rounded-full cursor-pointer hover:bg-insta-gradient transition-all duration-200" />
              </div>
            </div>

            {/* Middle section: Useful links & contacts */}
            <div className="w-[430px] rounded-[50px] h-[450px] border border-[#9fb6cb33] text-white">
              <div className="px-12 pt-8">
                <h1 className="text-[20px] font-bold">Useful Links</h1>
                <div className="h-[1px] w-full bg-[#9fb6cb33] my-2" />
                <div>
                  {links.map((item, i) => (
                    <div
                      key={i}
                      className="flex cursor-pointer gap-3 pt-3 items-center group hover:ml-2 transition-all duration-200"
                    >
                      <h1 className="text-[#01e281] text-[18px] bg-[#01e28133] group-hover:bg-[#01e281] group-hover:text-[#122d40] w-[30px] h-[30px] rounded-full flex justify-center items-center transition-all duration-200">
                        {item.Icon}
                      </h1>
                      <h1 className="text-[18px] group-hover:text-[#01e281] transition-all duration-200">
                        {item.title}
                      </h1>
                    </div>
                  ))}
                </div>

                {/* Back-End Contact */}
                <div className="h-[1px] w-full bg-[#9fb6cb33] my-3" />
                <div className="mt-2 px-5">
                  <h1 className="text-[20px] font-bold mb-3 bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent italic">
                    Back-End
                  </h1>
                  <div className="flex justify-between text-[16px] items-center">
                    <div className="flex items-center gap-2">
                      <FaPhone />
                      <p>01153032052</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdEmail />
                      <p>mfb4010@gmail.com</p>
                    </div>
                  </div>

                  {/* Front-End Contact */}
                  <div className="h-[1px] w-full bg-[#9fb6cb33] my-3" />
                  <h1 className="text-[20px] font-bold mb-3 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent italic">
                    Front-End
                  </h1>
                  <div className="flex justify-between text-[16px] items-center">
                    <div className="flex items-center gap-2">
                      <FaPhone />
                      <p>01009014597</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdEmail />
                      <p>mahnud0987@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section: CTA */}
            <div className="w-[430px] flex flex-col justify-center items-center text-center rounded-[50px] h-[450px] border border-[#9fb6cb33] px-12 py-12">
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

          {/* Footer bottom */}
          <div className="flex justify-between mt-10 py-7 px-10 rounded-t-[50px] border border-[#9fb6cb33]">
            <p className="text-lg font-bold text-[#dddddde6]">
              Created by
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent mx-1">
                Frontend: Mahmoud Mohamed
              </span>
              .
              <span className="bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent italic mx-1">
                Backend: Mohamed Fouad
              </span>
            </p>
            <img className="w-[260px]" src="/images/22.png" alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
