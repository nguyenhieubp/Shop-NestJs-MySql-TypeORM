import { useAppDispatch } from "@/redux/config/hook";
import {
  decrementProductInCartUser,
  deleteProductInCartUser,
  incrementProductInCartUser,
  numberQuantityBuy,
  totalPrice,
} from "@/redux/slices/cart/carts";
import Image from "next/image";
import React from "react";
interface ProductInterface {
  size: string;
  color: string;
  quantity: number;
  product_image: string;
  price: number;
  nameProduct: string;
  id: string;
}

const Product: React.FC<ProductInterface> = ({
  id,
  color,
  price,
  product_image,
  quantity,
  size,
  nameProduct,
}) => {
  const dispatch = useAppDispatch();

  const deleteProductInCart = (id: string) => {
    dispatch(deleteProductInCartUser(id));
  };

  const [quantityBuy, setQuantityBuy] = React.useState<number>(quantity);
  const handleDecrementProduct = (id: string) => {
    if (quantityBuy <= 1) {
      return;
    }
    try {
      setQuantityBuy(quantity - 1);
      dispatch(decrementProductInCartUser({ id: id, numberDownPurchase: 1 }));
      dispatch(numberQuantityBuy(quantity - 1));
    } catch (error) {}
  };

  const handleIncrementProduct = (id: string) => {
    try {
      setQuantityBuy(quantity + 1);
      dispatch(incrementProductInCartUser({ id: id, numberUpPurchase: 1 }));
      dispatch(numberQuantityBuy(quantity + 1));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr
      key={id}
      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
    >
      <th
        scope="row"
        className="text-[1.5rem] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-start w-[25rem]">
          <Image
            alt="Mô tả hình ảnh"
            width={100}
            height={50}
            loading="lazy"
            src={product_image}
          ></Image>
          <h2 className="ml-[1rem] break-words whitespace-normal text-[1.4rem]">
            {nameProduct}
          </h2>
        </div>
      </th>
      <td className="text-[1.5rem] px-6 py-4">{color}</td>
      <td className="text-[1.5rem] px-6 py-4">{nameProduct}</td>
      <td className="text-[1.5rem] px-6 py-4">
        <div className="flex items-center text-[1.8rem]">
          <div className=" flex items-center ">
            <button
              onClick={() => handleDecrementProduct(id)}
              className="text-center px-8 py-4  border-2 border-y-black border-l-black"
            >
              -
            </button>
            <div className="text-center px-4  py-4 border-2 border-black ">
              {quantityBuy}
            </div>

            <button
              onClick={() => handleIncrementProduct(id)}
              className="text-center px-8  py-4  border-2 border-y-black border-r-black"
            >
              +
            </button>
          </div>
        </div>
      </td>
      <td className="text-[1.5rem] px-6 py-4">{size}</td>
      <td className="text-[1.5rem] px-6 py-4">${price * quantity}</td>
      <td
        onClick={() => deleteProductInCart(id)}
        className="text-[1.5rem] px-6 py-4 text-red-600 cursor-pointer"
      >
        Xóa
      </td>
    </tr>
  );
};

export default Product;
