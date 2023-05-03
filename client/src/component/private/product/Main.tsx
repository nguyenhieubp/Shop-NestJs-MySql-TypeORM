import React from "react";
import Layout from "../Layout";
import AllProduct from "./AllProduct";
import CreateProduct from "./CreateProduct";

const Main = () => {
  const [optionProduct, setOptionProduct] = React.useState<string>("");
  return (
    <div className="p-[2rem]">
      <h2 className="text-[2.4rem]">Sản Phẩm</h2>
      <div className="flex items-center">
        <div className="mt-[4rem]">
          <button
            onClick={() => setOptionProduct("createProduct")}
            className="p-[3rem] shadow-lg border-l-[1rem] border-l-[#5175de] rounded-[0.5rem] text-[2rem]"
          >
            Tạo Sản Phẩm
          </button>
        </div>
        <div className="mt-[4rem] ml-[6rem]">
          <button
            onClick={() => setOptionProduct("allProduct")}
            className="p-[3rem] shadow-lg border-l-[1rem] border-l-[#42cea3] rounded-[0.5rem] text-[2rem]"
          >
            Tất cả sản phẩm
          </button>
        </div>
      </div>
      <div className="mt-[4rem]">
        {optionProduct === "createProduct" && <CreateProduct></CreateProduct>}
        {optionProduct === "allProduct" && <AllProduct></AllProduct>}
      </div>
    </div>
  );
};

export default Main;
