import React from "react";
import { RiMapPinLine } from "react-icons/ri";
import OverLay from "../comon/OverLay";
import { useAppDispatch, useAppSelector } from "@/redux/config/hook";
import { createOrderLine, emptyOrderLine } from "@/redux/slices/pay/pay";
import { Router, useRouter } from "next/router";
import { lengthProduct, numberQuantityBuy } from "@/redux/slices/cart/carts";

const MethodPay = () => {
  const dispatch = useAppDispatch();
  const [isChangePaymentMethod, setIsChangePaymentMethod] =
    React.useState(false);
  const [isShowBank, setIsShowBank] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState(
    "Thanh Toán Khi Nhận Hàng"
  );

  const selectMethodPay = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target);
    if (e.target.value === "Ngân hàng") {
      setPaymentMethod(e.target.value);
      setIsShowBank(true);
    } else {
      setPaymentMethod(e.target.value);
      setIsShowBank(false);
    }
  };
  const total = useAppSelector((state) => state.carts.totalPrice);

  const shoppingCartId: string | null = localStorage.getItem("cartId");
  const shopOrderId: string | null = localStorage.getItem("shopOrderId");

  const router = useRouter();
  const buyProducts = () => {
    try {
      dispatch(createOrderLine({ shopOrderId, shoppingCartId }));
      dispatch(emptyOrderLine({ shoppingCartId }));
      dispatch(numberQuantityBuy(0));
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isChangePaymentMethod && (
        <OverLay>
          <div className=" bg-slate-50 w-[40rem]">
            <h3 className="p-8 text-[2rem]">Phương Thức Thanh Toán</h3>
            <hr />
            <div className="p-8 text-[2rem]">
              <div className="flex items-center">
                <input
                  id="Receive"
                  name="MethodPay"
                  className="w-[2rem] h-[2rem]"
                  type="radio"
                  value={"Thanh Toán Khi Nhận Hàng"}
                  onChange={selectMethodPay}
                />
                <label htmlFor="Receive" className="ml-[3rem]  cursor-pointer">
                  Thanh Toán Khi Nhận Hàng
                </label>
              </div>
            </div>
            <hr />
            <div className="p-8 text-[2rem]">
              <div className="flex items-center">
                <input
                  id="Banking"
                  name="MethodPay"
                  className="w-[2rem] h-[2rem]"
                  type="radio"
                  onChange={selectMethodPay}
                  value={"Ngân hàng"}
                />
                <label htmlFor="Banking" className="ml-[3rem]  cursor-pointer">
                  Ngân hàng
                </label>
              </div>
              {isShowBank && (
                <div className="mt-[2rem]">
                  <h4>Gửi đến STK: 99999999 PayPal</h4>
                  <input
                    className="border-2 border-black w-full p-2 my-[2rem]"
                    type="text"
                  />
                  <h3>Chúng Tôi sẽ gửi xác nhận về cho bạn qua gmail</h3>
                  <button className="mt-[1rem] w-[8rem] p-2 bg-blue-600 text-white">
                    Ok
                  </button>
                </div>
              )}
            </div>
            <hr />
            <div className="flex  justify-end text-[1.8rem] p-8">
              <div>
                <button
                  onClick={() => setIsChangePaymentMethod(false)}
                  className="line  border-2 border-black  px-8 py-4 mr-[4rem]"
                >
                  Hủy
                </button>
                <button
                  onClick={() => setIsChangePaymentMethod(false)}
                  className="text-white border-2 border-blue-500 bg-blue-500 px-8 py-4 "
                >
                  Xác Nhận
                </button>
              </div>
            </div>
          </div>
        </OverLay>
      )}
      <div className="p-8 mt-[4rem]  bg-[#f5f5f5]  shadow-inner">
        <div className="flex items-end justify-between">
          <h2 className="text-[2rem]">Phương thức thanh toán</h2>
          <div className="flex items-start">
            <h2 className=" text-[1.8rem] mr-[4rem]">{paymentMethod}</h2>
            <button
              onClick={() => setIsChangePaymentMethod(true)}
              className="text-blue-500 cursor-pointer text-[1.6rem]"
            >
              Thanh Đổi
            </button>
          </div>
        </div>
        <hr className="my-[2rem]" />
        <div>
          <div className="flex  justify-end text-[1.4rem]  mt-[2rem]">
            <div className="flex w-[20rem] justify-between">
              <h4>Tổng Tiền Hàng</h4>
              <h4>{total}</h4>
            </div>
          </div>
          <div className="flex  justify-end text-[1.4rem]  mt-[2rem]">
            <div className="flex w-[20rem] justify-between">
              <h4>Tiền Vận chuyển</h4>
              <h4>10</h4>
            </div>
          </div>
          <div className="flex  justify-end text-[1.4rem] mt-[2rem]">
            <div className="flex w-[20rem] justify-between items-end">
              <h4>Tổng Thanh Toán</h4>
              <h4 className="text-blue-500 text-[2.4rem]">{total + 10} $</h4>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between mt-[2rem]">
          <h2 className="text-[1.8rem]">
            Nhấn "Mua" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Chúng
            Tôi
          </h2>
          <button
            onClick={buyProducts}
            className="w-[20rem] bg-blue-500 p-4 text-white text-[2rem]"
          >
            Mua
          </button>
        </div>
      </div>
    </>
  );
};

export default MethodPay;
