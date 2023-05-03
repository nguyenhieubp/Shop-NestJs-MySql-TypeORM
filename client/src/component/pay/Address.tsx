import React, { useEffect } from "react";
import { RiH1, RiMapPinLine } from "react-icons/ri";
import OverLay from "../comon/OverLay";
import { useAppDispatch, useAppSelector } from "@/redux/config/hook";
import { getAllAddressUser } from "@/redux/slices/address/address";

const Address = () => {
  const dispatch = useAppDispatch();

  const [isChangeAddress, setIsChangeAddress] = React.useState(false);
  const [isAddAddress, setIsAddAddress] = React.useState(false);

  useEffect(() => {
    const myCookie = document.cookie;
    const token = myCookie.split("=")[1];
    dispatch(getAllAddressUser(token));
  }, []);

  const address = useAppSelector((state) => state.address.address);

  return (
    <>
      <div className="p-8  bg-[#f5f5f5]  shadow-inner">
        <div className="flex items-end">
          <RiMapPinLine size={25}></RiMapPinLine>
          <h2 className="font-bold text-[2rem] ml-[2rem]">Địa chỉ nhận hàng</h2>
        </div>

        <div className="flex items-start justify-between mt-[3rem]">
          <div className="text-[1.8rem] font-bold">
            <h3>
              {address[0]?.site_user.lastName} {address[0]?.site_user.firstName}
            </h3>
            <div>{address[0]?.site_user.phone}</div>
          </div>
          <h3 className="text-[1.8rem] ml-[4rem]">
            {address[0]?.address.address_line} ,{address[0]?.address.street} ,
            {address[0]?.address.district}, {address[0]?.address.city}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Address;
