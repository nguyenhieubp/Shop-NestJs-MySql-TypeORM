"use client";
import React, { useEffect } from "react";
import Layout from "./Layout";
import Link from "next/link";
import Image from "next/image";
import Product from "./Product";
import { useAppDispatch, useAppSelector } from "@/redux/config/hook";
import carts, {
  addCartUser,
  getCartUser,
  getProductInCartUser,
  lengthProduct,
  totalPrice,
} from "@/redux/slices/cart/carts";
import { ProductVariation, ShoppingCartItem } from "@/models/cartItem";

const Main = () => {
  const dispatch = useAppDispatch();

  const cart: ShoppingCartItem[] = useAppSelector((state) => state.carts.cart);
  const total = useAppSelector((state) => state.carts.totalPrice);

  React.useEffect(() => {
    const cartId: any = localStorage.getItem("cartId");
    dispatch(getProductInCartUser(cartId));
    dispatch(totalPrice());
  }, [cart]);

  if (typeof window !== "undefined") {
  } else {
    console.log("we are running on the server");
  }

  return (
    <Layout>
      <div className="w-full  h-[0.25rem] bg-blue-400"></div>
      <div className="px-[6rem] overflow-x-auto shadow-md sm:rounded-lg text-[1.8rem] py-[2rem]">
        {cart.length <= 0 ? (
          <>
            <div className="bg-[#dbdbdb] p-[1rem]">
              <p>Không có sản phẩm nào</p>
            </div>
            <div className="inline-block p-4 bg-[#dbdbdb] mt-[2rem]">
              <a href="/" className="text-bold">
                Quay lại cửa hàng
              </a>
            </div>
          </>
        ) : (
          <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-[1.8rem]">
                    Tên sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3 text-[1.8rem]">
                    Màu
                  </th>
                  <th scope="col" className="px-6 py-3 text-[1.8rem]">
                    Loại sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3 text-[1.8rem]">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3 text-[1.8rem]">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-[1.8rem]">
                    Giá
                  </th>
                  <th scope="col" className="px-6 py-3 text-[1.8rem]">
                    Tháo tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <Product
                    color={product?.product.variation.nameVariation}
                    quantity={product?.quantity}
                    size={product?.product.variation.size}
                    nameProduct={product?.product.variation.nameProduct}
                    product_image={product?.product.variation.product_image}
                    price={product?.product.variation.price}
                    id={product.id}
                    key={product?.id}
                  ></Product>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end ">
              <div className="w-[30rem] ">
                <h2 className="text-[2rem]">Cộng giỏ hàng</h2>
                <div className="flex items-center justify-between border-2 mb-2 p-2">
                  <div>Tạm tính</div>
                  <div>{total} $</div>
                </div>
                <div className="flex items-center justify-between border-2 mb-2 p-2">
                  <div>Tổng</div>
                  <div>{total} $</div>
                </div>
                <Link href={"/pay"}>
                  <button className="p-4 w-full bg-black text-white mt-[2rem]">
                    Tiến hành thanh toán
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Main;
