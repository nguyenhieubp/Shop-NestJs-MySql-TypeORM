import React from "react";
import Product from "./Product";
import Review from "./Review";

const Main = () => {
  return (
    <div className="w-full  bg-white p-4">
      <Product></Product>
      <Review></Review>
    </div>
  );
};

export default Main;
