import { TiHome } from "react-icons/ti";
import Product from "./Product"
import { IoIosArrowForward } from "react-icons/io";
import { Rating, RatingButton } from "../components/ui/shadcn-io/rating";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination";

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
const list = [
  "Bestsellers",
  "Breads & Sweats",
  "Cleaning Materials",
  "Fishes & Raw Meats",
  "Fruits & Vegetables",
  "Milks & Proteins",
  "Others",
  "Supermarket",
  "Uncategorized",
];
const Categories = ({ products, title }: { products:TProduct[], title:string}) => {
    // const [selectedValue, setSelectedValue] = useState("8 Products");
    console.log(products,"uihlbbbbbbbbbbbbbbbbbbbbbbbbbb")
      const [range, setRange] = useState([0, 100]);
const [filteredProducts, setFilteredProducts] = useState<TProduct[]>(products);
useEffect(() => {
  setFilteredProducts(products);
}, [products]);


        const [perPage, setPerPage] = useState(8);

        const [page, setPage] = useState(1);

         const totalPages = Math.ceil(products.length / perPage);
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        const visibleProducts = filteredProducts.slice(startIndex, endIndex);
       let showingText = "";
       if (visibleProducts.length === 0) {
         showingText = "No results";
       } else if (products.length <= perPage) {
         showingText = `Showing all ${products.length} results`;
       } else {
         showingText = `Showing ${startIndex + 1}–${
           startIndex + visibleProducts.length
         } of ${products.length} results`;
       }
const [sortBy, setSortBy] = useState("Default");

const sortedProducts = [...products].sort((a, b) => {
  if (sortBy === "Top Rated") return b.average_rating - a.average_rating;
  if (sortBy === "Popular") return b.stock - a.stock; // مثال
  if (sortBy === "Featured") return a.discount - b.discount; // مثال
  return 0; // Default
});

  return (
    <div>
      <div className="bg-[#f9f9f9] pt-20 pb-10">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-[24px] text-[#122d40] font-bold">{title}</h1>
          <div className="text-[18px] flex items-center gap-3 font-medium">
            <TiHome />
            <IoIosArrowForward />
            Products
            <IoIosArrowForward />
            {title}
          </div>
        </div>
      </div>
      <div>
        <div className="flex container mx-auto pt-10">
          <div className=" container mx-auto">
            <div className="px-5">
              <h1 className="text-[36px] font-bold mb-5">{title}</h1>
              <div className="flex justify-between pb-5">
                {showingText}
                <div className="flex gap-3">
                  <Select
                    defaultValue="8"
                    onValueChange={(value) => {
                      setPerPage(Number(value));
                      setPage(1); // نرجع لأول صفحة
                    }}
                  >
                    <SelectTrigger className="w-[195px] h-[50px] rounded-3xl px-4 py-2 border-0">
                      <SelectValue placeholder="8 Products" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">8 Products</SelectItem>
                      <SelectItem value="16">16 Products</SelectItem>
                      <SelectItem value="32">32 Products</SelectItem>
                      <SelectItem value="48">48 Products</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) => setSortBy(value)}
                    defaultValue="Default"
                  >
                    <SelectTrigger className="w-[195px] h-[50px] rounded-3xl px-4 py-2 ">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Default">Default</SelectItem>
                      <SelectItem value="Top Rated">Top Rated</SelectItem>
                      <SelectItem value="Popular">Popular</SelectItem>
                      <SelectItem value="Featured">Featured</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-[10px] ">
              <div className="flex flex-wrap p-[10px] justify-between gap-y-12">
                {visibleProducts.map((product, i) => {
                  return <Product key={i} item={product} />;
                })}
              </div>
              {products.length > perPage && (
                <Pagination>
                  <PaginationContent>
                    {page > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() => setPage(page - 1)}
                          className="rounded-full flex items-center text-[20px] w-12 h-12 border text-black hover:bg-[#122d40] hover:text-[#01e281]"
                        />
                      </PaginationItem>
                    )}

                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={page === i + 1}
                          onClick={() => setPage(i + 1)}
                          className={`rounded-full border text-black text-[20px] w-12 h-12 hover:bg-[#122d40] hover:text-[#01e281] ${
                            page === i + 1 ? "bg-[#122d40] text-[#01e281]" : ""
                          }`}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {page < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() => setPage(page + 1)}
                          className="rounded-full w-12 h-12 border text-[20px] text-black hover:bg-[#122d40] hover:text-[#01e281]"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="bg-[#f1f2f6] container mx-auto w-[450px] p-8 rounded-[50px] flex flex-col justify-center items-center gap-5 pb-14 ">
              <h2 className="bg-[#01e281] text-[18px] relative flex-col items-center justify-center flex text-[#122d40] h-14 font-bold rounded-full px-6  w-full">
                Filter by price
                <span className="block h-[3px] absolute bottom-0 w-6 bg-black mt-1 rounded"></span>
              </h2>
              <Slider
                defaultValue={[20, 80]}
                value={range}
                onValueChange={setRange}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-gray-700 font-medium">
                Price: ${range[0]} — ${range[1]}
              </p>
              <Button
                onClick={() => {
                  const newFiltered = products.filter(
                    (item) =>
                      Number(item.final_price) >= range[0] &&
                      Number(item.final_price) <= range[1]
                  );
                  setFilteredProducts(newFiltered);
                  setPage(1); // نرجع لأول صفحة بعد الفلترة
                }}
                className="w-3/4 text-[16px] rounded-full bg-[#01e281] hover:bg-[#122d40] text-[#122d40] hover:text-[#01e281] font-bold"
              >
                Filter
              </Button>
            </div>
            <div className="bg-[#f1f2f6] container mx-auto w-[450px] p-8 rounded-[50px] flex flex-col justify-center  gap-5 pb-14 ">
              <h2 className="bg-[#01e281] text-[18px] relative flex-col items-center justify-center flex text-[#122d40] h-14 font-bold rounded-full px-6  w-full">
                Product categories
                <span className="block h-[3px] absolute bottom-0 w-6 bg-black mt-1 rounded"></span>
              </h2>
              <div>
                {list.map((item, i) => {
                  return (
                    <li className="pt-4" key={i}>
                      {item}
                    </li>
                  );
                })}
              </div>
            </div>
            <div className="bg-[#f1f2f6] container mx-auto w-[450px] p-8 rounded-[50px] flex flex-col justify-center  gap-5 pb-14 ">
              <h2 className="bg-[#01e281] text-[18px] relative flex-col items-center justify-center flex text-[#122d40] h-14 font-bold rounded-full px-6  w-full">
                Product categories
                <span className="block h-[3px] absolute bottom-0 w-6 bg-black mt-1 rounded"></span>
              </h2>
              <div>
                {products.map((item, i) => {
                  return (
                    <div className="">
                      <div
                        key={i}
                        className="p-2  flex items-center mt-3 border-b-slate-200"
                      >
                        <img
                          className="w-28 pr-2 rounded-3xl"
                          src={item.img_url}
                          alt={item.name}
                        />
                        <div className="">
                          <p className="font-extrabold ">{item.name}</p>
                          <p className="font-extrabold py-2">
                            <Rating value={item.average_rating} readOnly>
                              {Array.from({ length: 5 }).map((_, index) => (
                                <RatingButton
                                  className="text-yellow-500 text-[14px]"
                                  key={index}
                                />
                              ))}
                            </Rating>
                          </p>
                          <p className="text-[14px]">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories
