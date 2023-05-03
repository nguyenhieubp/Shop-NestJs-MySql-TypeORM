import React from "react";
import Layout from "./Layout";
import Address from "./Address";
import MethodPay from "./MethodPay";
import ProductPay from "./ProductPay";

const Main = () => {
  return (
    <Layout>
      <div className="w-full h-2  bg-blue-600 mt-[3rem]"></div>
      <Address></Address>
      <ProductPay></ProductPay>
      <MethodPay></MethodPay>
    </Layout>
  );
};

export default Main;
