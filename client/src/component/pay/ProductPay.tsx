import React from "react";
import Product from "./Product";
import { ShoppingCartItem } from "@/models/cartItem";
import { useAppSelector } from "@/redux/config/hook";

const ProductPay = () => {
  const cart: ShoppingCartItem[] = useAppSelector((state) => state.carts.cart);

  return (
    <div className="bg-[#f5f5f5] mt-[2rem] p-[2rem]">
      <h2 className="text-[2rem]">Sản Phẩm</h2>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[1.8rem] font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[1.8rem] font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Đơn giá
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[1.8rem] font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Số lượng
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[1.8rem] font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Thành Tiền
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 mt-[2rem]">
                  {cart.map((product) => (
                    <Product
                      key={product.id}
                      id={product.product.id}
                      nameProduct={product.product.variation.nameVariation}
                      image={product.product.variation.product_image}
                      price={product.product.variation.price}
                      quantity={product.quantity}
                    ></Product>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPay;
