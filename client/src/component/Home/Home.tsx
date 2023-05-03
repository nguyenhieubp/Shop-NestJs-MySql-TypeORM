import React from "react";
import Layout from "./Layout";
import ReactPaginate from "react-paginate";
import Products from "../products/Product";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useAppDispatch } from "@/redux/config/hook";
import { useAppSelector } from "@/redux/config/hook";
import {
  fetchAllProductItem,
  fetchProductItemSortByCategory,
  fetchProductItemSortByDate,
  fetchProductItemSortByPrice,
  fetchProductItemSortByPriceHigh,
  fetchProductItemSortByPurchase,
} from "@/redux/slices/home/product";
import { getCartUser } from "@/redux/slices/cart/carts";

export default function Home() {
  // Gọi hàm này khi người dùng click vào nút phân trang
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const handlePageClick = (data: any) => {
    setPageNumber(data.selected);
  };

  //DISPATCH
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchAllProductItem(pageNumber));
  }, []);

  React.useEffect(() => {
    const myCookie = document.cookie;
    const token = myCookie.split("=")[1];
    dispatch(getCartUser(token));
  }, []);
  const products = useAppSelector((state) => state.product.products);

  //OPTION FOR USER SELECT
  const [optionSort, setOptionSort] = React.useState<string | boolean>("");
  const [showSortPrice, setShowSortPrice] = React.useState(false);
  const handleSortByPriceLow = () => {
    dispatch(fetchProductItemSortByPrice());
    setOptionSort("Thấp Đến Cao");
  };
  const handleSortByPriceHigh = () => {
    dispatch(fetchProductItemSortByPriceHigh());
    setOptionSort("Cao Đến Thấp");
  };

  const handleSortByDate = () => {
    dispatch(fetchProductItemSortByDate());
  };

  const handleSortByPurchase = () => {
    dispatch(fetchProductItemSortByPurchase());
  };

  //HANDLE CHECKED
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fetchProductItemSortByCategory(e.target.value));
  };

  const pageCount = products.length / 10;

  return (
    <Layout>
      <div className="flex items-start gap-x-[2rem] ">
        <div className="px-[8rem]">
          <h2 className="text-[2rem] font-bold mb-[4rem]">Danh mục sản phẩm</h2>
          <div className="flex items-center mb-[2rem]">
            <input
              onChange={handleCheck}
              className="px-4 py-2 w-8 h-8 "
              id="quan"
              type="radio"
              name="category"
              value={"quan"}
            />
            <label
              className="text-[1.4rem] ml-[1rem] cursor-pointer"
              htmlFor="quan"
            >
              Quần
            </label>
          </div>
          <div className="flex items-center mb-[2rem]">
            <input
              onChange={handleCheck}
              className="px-4 py-2 w-8 h-8 "
              id="ao"
              type="radio"
              name="category"
              value={"ao"}
            />
            <label
              className="text-[1.4rem] ml-[1rem] cursor-pointer"
              htmlFor="ao"
            >
              Áo
            </label>
          </div>
        </div>
        <div className=" bg-[#eae8e9] w-full px-[3rem]  py-[2rem]">
          <div className="py-[1rem]">
            <div className="flex items-end">
              <h2 className=" text-[2.2rem]">Sắp xếp theo</h2>
              <div className="ml-[3rem]">
                <button
                  onClick={handleSortByDate}
                  className="text-[1.6rem] ml-[1.4rem] p-[1rem] bg-white"
                >
                  Mới nhất
                </button>
                <button
                  onMouseMove={() => setShowSortPrice(true)}
                  onMouseOut={() => setShowSortPrice(false)}
                  className="text-[1.6rem] ml-[1.4rem] p-[1rem] bg-white w-[20rem] relative "
                >
                  <div
                    className="flex items-center justify-between "
                    onMouseMove={() => setShowSortPrice(true)}
                    onMouseOut={() => setShowSortPrice(false)}
                  >
                    <h3>{optionSort ? optionSort : "Giá"}</h3>
                    <RiArrowDropDownLine
                      className="mr-[0.5rem]"
                      size={25}
                    ></RiArrowDropDownLine>
                  </div>
                  {showSortPrice && (
                    <div className="absolute left-0 bg-white w-[20rem] p-[1rem]  ">
                      <div
                        onClick={handleSortByPriceLow}
                        className="flex items-center justify-between mt-[1rem] hover:text-blue-500"
                      >
                        <h3>Giá: </h3>
                        <p>Thấp đến Cao</p>
                      </div>
                      <div
                        onClick={handleSortByPriceHigh}
                        className="flex items-center justify-between mt-[1rem]  hover:text-blue-500"
                      >
                        <h3>Giá: </h3>
                        <p>Cao đến Thấp</p>
                      </div>
                    </div>
                  )}
                </button>
                <button
                  onClick={handleSortByPurchase}
                  className="text-[1.6rem] ml-[1.4rem] p-[1rem] bg-white "
                >
                  Bán chạy
                </button>
              </div>
            </div>
          </div>
          <ul className="grid grid-cols-5 gap-4 h-[40rem] mt-[2rem]">
            {products.map((product) => (
              <Products
                key={product.id}
                id={product.id}
                purchase={product.purchase}
                image={product.image}
                name={product.name}
                price={product.price}
              ></Products>
            ))}
          </ul>

          <div className="flex flex-col items-center mt-[2rem] text-[2rem]">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="flex justify-center items-center space-x-4 mt-4"
              previousClassName="border border-gray-400 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
              nextClassName="border border-gray-400 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
              pageClassName="border border-gray-400 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
              activeClassName="bg-blue-500 text-white"
              disabledClassName="opacity-50 cursor-not-allowed"
              breakClassName="border border-gray-400 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
              breakLabel="..."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
