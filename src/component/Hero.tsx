import { Button } from "../components/ui/button";
import { FaArrowRight } from "react-icons/fa";

// ✅ Top info boxes (links under hero banner)
const link = [
  {
    icon: "/images/icon-1.png",
    title: "Free shipping",
    desc: "On all orders over $50.00",
  },
  {
    icon: "/images/icon-2.png",
    title: "Return for free",
    desc: "Returns are free 3 days",
  },
  {
    icon: "/images/icon-3.png",
    title: "Secure Payment",
    desc: "Your payments 100% safe",
  },
  {
    icon: "/images/icon-2.png",
    title: "25/9 Support",
    desc: "Contact us anytime want",
  },
];

// ✅ Categories section at bottom of hero
export const category = [
  {
    Icon: "/images/s1.png",
    title: "Fishes & Raw",
    title2: "Meats",
  },
  {
    Icon: "/images/s2.png",
    title: "Fruits &",
    title2: "Vegetables",
  },
  {
    Icon: "/images/s3.png",
    title: "Breads &",
    title2: "Sweats",
  },
  {
    Icon: "/images/s4.png",
    title: "Milks &",
    title2: "Proteins",
  },
  {
    Icon: "/images/s5.png",
    title: "Cleaning",
    title2: "Materials",
  },
  {
    Icon: "/images/s6.png",
    title: "Ready touse",
    title2: "Foods",
  },
];

const Hero = () => {
  return (
    <div>
      {/* ✅ Hero Banner */}
      <div className=" xl:h-[80vh]  bg-[url('/images/bg-hero.jpg')] bg-cover pt-20 flex">
        <div className="container gap-14 xl:gap-0 flex-col xl:flex-row  mx-auto flex items-center justify-between xl:px-5">
          {/* Left content (title + description + buttons) */}
          <div className="w-[80%] mb-5 xl:w-[42%] flex flex-col justify-center h-full">
            {/* Highlighted Title with background effect */}
            <h1
              className="
                relative inline-block text-[35px] xl:text-[42px] text-[#01e281] font-light
                after:content-[''] after:absolute after:bottom-1 after:left-0
                after:w-80 after:h-[30%]
                after:bg-[#01e281] after:opacity-20 after:rounded-md after:z-[1]
              "
            >
              XtraSupermarket
            </h1>

            {/* Main Headline */}
            <h1 className="text-[60px] font-bold pb-10">Fresher than Ever</h1>

            {/* Description */}
            <p className="text-[20px] text-[#818c96]">
              A supermarket is a self-service shop offering a wide variety of
              food, beverages and household products, organized into sections.
            </p>

            {/* Buttons */}
            <div className="flex gap-9 pt-6">
              <Button className="w-36 xl:w-48 h-14 text-white bg-[#122d40] hover:bg-[#01e281] hover:text-[#122d40] rounded-full font-bold text-[13px] xl:text-[16px] px-7 py-6">
                25% Off Feastival
              </Button>
              <Button className="w-36 xl:w-48 h-14 text-[#122d40] bg-transparent border hover:bg-[#01e281] hover:border-0 border-[#122d40] rounded-full font-bold text-[13px] xl:text-[16px] px-7 py-6">
                Discover Shop
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <img
            src="/images/man-supermarket-as-shop-assistant-20446866.webp"
            alt="man-supermarket"
            className="hidden xl:block w-[80%] xl:w-[50%] mb-20  xl:mt-auto rounded-3xl xl:rounded-t-3xl"
          />
        </div>
      </div>

      {/* ✅ Info Links Section (under hero) */}
      <div className="z-50 relative container hidden lg:flex items-center justify-between pl-10 w-full h-[150px] bg-[#fff] shadow-[0_15px_60px_0_#122d4026] px-5 pt-3 rounded-full mx-auto -mt-[28px] -m-[50px]">
        {link.map((item, i) => {
          return (
            <div key={i} className="flex gap-3">
              {/* Icon */}
              <img
                src={item.icon}
                alt={item.title}
                className="w-20 h-20 p-2 rounded-full bg-[#01e28126]"
              />
              {/* Text */}
              <div className="flex justify-center flex-col">
                <h1 className="text-[23px] font-medium">{item.title}</h1>
                <p className="text-[14px] text-[#666666]">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Promotions Section (middle offers) */}
      <div className="flex container mx-auto flex-wrap xl:mt-32 p-[7px] xl:p-[30px] lg:p-0">
        <div className="flex justify-center flex-col xl:flex-row xl:w-full">
          {/* Left: 2 small offers + 1 big offer */}
          <div className="flex flex-col xl:w-[66.66%]">
            <div className="flex flex-row">
              {/* Offer 1 - Sauces */}
              <div
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right bottom",
                  backgroundSize: "contain",
                  backgroundImage:
                    "url(https://xtratheme.com/elementor/supermarket/wp-content/uploads/sites/106/2023/04/bg-2.png), linear-gradient(90deg, #ff3f55, #ff3f55)",
                  padding: "50px 50px 55px",
                  // marginRight: "15px",
                  // marginBottom: "30px",
                  borderRadius: "30px",
                  width: "50%",
                  height: "300px",
                }}
                className="mr-2 xl:mr-[15px] mb-[10px] xl:mb-[30px]"
              >
                <h1 className="text-[30px] font-extrabold xl:font-light text-white">
                  50% OFF
                </h1>
                <h1 className="text-[23px] xl:text-[42px] font-extrabold text-white mt-[10px]">
                  Sauces
                </h1>
              </div>

              {/* Offer 2 - Chips */}
              <div
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left bottom",
                  backgroundSize: "contain",
                  backgroundImage:
                    "url(https://xtratheme.com/elementor/supermarket/wp-content/uploads/sites/106/2023/04/bg-1.png), linear-gradient(90deg, #f4f9f5, #f4f9f5)",
                  padding: "50px 50px 55px",
                  marginBottom: "30px",
                  borderRadius: "30px",
                  // marginLeft: "15px",
                  width: "50%",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
                className="ml-2 xl:ml-[15px]  mb-[10px] xl:mb-[30px]"
              >
                <h1 className="text-[30px] font-extrabold xl:font-light text-[#01e281]">
                  50% OFF
                </h1>
                <h1 className="text-[22px] xl:text-[42px] font-extrabold text-[#122d40] mt-[10px]">
                  All Chips
                </h1>
              </div>
            </div>

            {/* Big Offer - Fruits */}
            <div
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
                backgroundSize: "contain",
                backgroundImage:
                  " url(https://xtratheme.com/elementor/supermarket/wp-content/uploads/sites/106/2023/04/bg-3.png), linear-gradient(90deg, #122d40, #122d40)",
                paddingTop: "50px",
                paddingRight: "50px",
                paddingLeft: "50px",
                borderRadius: "30px",
                width: "100%",
                height: "385px",
              }}
            >
              <h1 className="text-[30px] font-light text-white">50% OFF</h1>
              <h1 className="text-[30px]  xl:text-[42px] font-extrabold text-white mt-[10px]">
                Sale 58% Off
              </h1>
              <h1 className="text-[30px]  xl:text-[42px] font-extrabold text-white mt-[10px]">
                All Fruit Products
              </h1>
              <Button className="bg-[#ffffff26] my-8 text-white font-extrabold rounded-full px-10 py-7 text-[16px] tracking-[0.5px] hover:bg-[#01e281] hover:text-[#122d40]">
                SHOP NOW <FaArrowRight className="pl-1" />
              </Button>
            </div>
          </div>

          {/* Right: Vegetable Offer */}
          <div className="xl:w-[33.33%] xl:ml-10 mt-5 xl:mt-0 h-full">
            <div
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
                backgroundSize: "contain",
                backgroundImage:
                  " url(https://xtratheme.com/elementor/supermarket/wp-content/uploads/sites/106/2023/04/bg-4.png), linear-gradient(90deg, #01e281, #01e281)",
                padding: "50px 50px 315px",
                borderRadius: "30px",
                height: "100%",
              }}
            >
              <h1 className="text-[30px] font-light text-white">50% OFF</h1>
              <h1 className="text-[42px] font-extrabold text-white mt-[10px]">
                Full Fresh
              </h1>
              <h1 className="text-[42px] font-extrabold text-white mt-[10px]">
                Vegetable
              </h1>
              <Button className="bg-[#122d40] my-8 text-[#01e281] font-extrabold rounded-full px-10 py-7 text-[16px] tracking-[0.5px] hover:bg-white hover:text-black">
                SHOP NOW <FaArrowRight className="pl-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Categories Section */}
      <div className="container mx-auto mt-40 flex flex-col justify-center">
        {/* Title */}
        <h1 className="text-[28px] xl:text-[36px] font-bold flex justify-center">
          Discover our
          <span
            className="text-[#01e281] ml-3 relative inline-block  
              after:content-[''] after:absolute after:bottom-1 after:left-0
              after:w-[170px] after:h-[30%]
              after:bg-[#01e281] after:opacity-20 after:rounded-md after:z-[1]"
          >
            Categories
          </span>
        </h1>

        {/* Categories Grid */}
        <div className="flex container flex-wrap gap-5 xl:gap-0 justify-center xl:justify-between flex-row mt-10">
          {category.map((item, i) => {
            return (
              <div
                key={i}
                className="p-6 w-[95%] xl:w-[15%] cursor-pointer group flex hover:-mt-5 hover:text-[#01e281] transition-all duration-300 flex-col items-center border border-[#01e2812b] hover:border-[#01e281] hover:shadow-[0_10px_30px_0_#122d4024] rounded-[20px] group"
              >
                <img
                  className="w-40 p-8 flip-hover"
                  src={item.Icon}
                  alt={item.title}
                />
                <h1 className="text-black font-bold text-[22px] group-hover:text-[#01e281] transition-all duration-300">
                  {item.title}
                </h1>
                <h1 className="text-black font-bold text-[22px] group-hover:text-[#01e281] transition-all duration-300">
                  {item.title2}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
