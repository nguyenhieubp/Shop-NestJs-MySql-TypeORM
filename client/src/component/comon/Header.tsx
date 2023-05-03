import React from "react";
import Link from "next/link";
import { BiMessageAltDetail, BiSearchAlt2 } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/config/hook";
import {
  getCartUser,
  getProductInCartUser,
  totalPrice,
} from "@/redux/slices/cart/carts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingCartItem } from "@/models/cartItem";

const Header = () => {
  const dispatch = useAppDispatch();
  const notify = () =>
    toast.success("Thêm vào giỏ hàng thành công", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const cart: ShoppingCartItem[] = useAppSelector((state) => state.carts.cart);
  React.useEffect(() => {
    const cartId: any = localStorage.getItem("cartId");
    dispatch(getProductInCartUser(cartId));
    dispatch(totalPrice());
  }, [cart.length]);

  const numberProductBuy = useAppSelector((state) => state.carts.quantityBuy);
  React.useEffect(() => {
    const myCookie = document.cookie;
    const token = myCookie.split("=")[1];
    dispatch(getCartUser(token));
  }, [numberProductBuy]);

  return (
    <header className="bg-blue-600 text-white h-[10rem] px-[8rem] py-[2rem] ">
      <div className="flex items-center justify-between ">
        <Link href={"/"} className="text-[3rem]">
          Shop
        </Link>
        <div className="w-[60rem] flex items-center">
          <input
            className="p-[0.5rem] text-black w-full border-0 outline-0 text-[1.6rem]"
            type="text"
          />
          <div className="p-[0.25rem] border-2 border-white">
            <BiSearchAlt2
              className="ml-[1rem] cursor-pointer"
              size={25}
            ></BiSearchAlt2>
          </div>
          <Link href={"/cart"}>
            <div className="relative">
              <AiOutlineShoppingCart
                className="ml-[2rem] cursor-pointer"
                size={30}
              ></AiOutlineShoppingCart>
              {cart?.length <= 0 ? (
                <div></div>
              ) : (
                <div className="absolute flex justify-center items-center bg-red-500 rounded-full w-[2rem] h-[2rem] right-[-1rem] top-[-0.5rem]">
                  <div>{cart?.length}</div>
                </div>
              )}
            </div>
          </Link>
        </div>
        <div className="flex items-end ">
          <div className="flex items-end text-[1.6rem] mr-[3rem] cursor-pointer">
            <BiMessageAltDetail size={25}></BiMessageAltDetail>
            <h3 className="ml-[1rem]">Chat</h3>
          </div>

          <ToastContainer />

          <Link href={"/profile"}>
            <div className="flex items-end text-[1.6rem]  cursor-pointer">
              <CgProfile size={25}></CgProfile>
              <h3 className="ml-[0.5rem]">Tài khoản</h3>
              <MdArrowDropDown size={25}></MdArrowDropDown>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
