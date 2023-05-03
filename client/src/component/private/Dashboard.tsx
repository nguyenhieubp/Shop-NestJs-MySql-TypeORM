import { useAppDispatch, useAppSelector } from "@/redux/config/hook";
import { selectOption } from "@/redux/slices/admin/option";
import Link from "next/link";
import React from "react";
import { CiFaceSmile } from "react-icons/ci";
import { FaProductHunt } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const select = useAppSelector((state) => state.option.select);

  return (
    <div>
      <div className="text-white text-center text-[2.2rem] my-[2rem] px-[2rem]">
        <Link
          onClick={() => dispatch(selectOption("product"))}
          href={"/private/admin"}
        >
          <div className="flex justify-center items-center p-[2rem]">
            <CiFaceSmile size={28}></CiFaceSmile>
            <h2 className="ml-[1rem]">Admin</h2>
          </div>
        </Link>
        <hr />
        <Link
          onClick={() => dispatch(selectOption("product"))}
          href={"/private/admin/product"}
        >
          <div
            style={
              select === "product"
                ? { color: "white" }
                : { color: "text-[#91a8ea]" }
            }
            className="flex justify-center items-center p-[2rem] cursor-pointer text-[#91a8ea]"
          >
            <FaProductHunt size={28}></FaProductHunt>
            <h2 className="ml-[1rem]">Sản phẩm</h2>
          </div>
        </Link>
        <hr />
        <Link
          onClick={() => dispatch(selectOption("bill"))}
          href={"/private/admin/bill"}
        >
          <div
            style={
              select === "bill"
                ? { color: "white" }
                : { color: "text-[#91a8ea]" }
            }
            className="flex justify-center items-center p-[2rem]  cursor-pointer  text-[#91a8ea] "
          >
            <RiBillLine size={28}></RiBillLine>
            <h2 className="ml-[1rem]">Đơn</h2>
          </div>
        </Link>
        <hr />
      </div>
    </div>
  );
};

export default Dashboard;
