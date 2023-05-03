import { Order } from "@/models/order";
import axios from "axios";
import React from "react";

const Main = () => {
  const [order, setOrder] = React.useState<Array<Order>>([]);
  const getAllOrder = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/order-line/user`
    );
    setOrder(response.data);
  };

  React.useEffect(() => {
    getAllOrder();
  }, []);

  console.log(order);
  return (
    <div className="text-[1.6rem] relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="text-[1.6rem] w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-[1.6rem] text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="text-[1.6rem] px-6 py-3">
              Tên Sản Phẩm
            </th>
            <th scope="col" className="text-[1.6rem] px-6 py-3">
              Địa Chỉ
            </th>
            <th scope="col" className="text-[1.6rem] px-6 py-3">
              STD
            </th>
            <th scope="col" className="text-[1.6rem] px-6 py-3">
              Giá
            </th>
            <th scope="col" className="text-[1.6rem] px-6 py-3">
              Xác Nhận
            </th>
          </tr>
        </thead>
        <tbody>
          {order.map((item) => (
            <tr className="text-[1.6rem] bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="text-[1.6rem] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.productConfig.variation.nameProduct} -{" "}
                {item.productConfig.variation.size} -{" "}
                {item.productConfig.variation.quantity}{" "}
              </th>
              <td className="text-[1.6rem] px-6 py-4 ">
                {item.shop_order.site_user.firstName +
                  item.shop_order.site_user.lastName}{" "}
                -{" "}
                {item.shop_order.shipping_address?.city +
                  " " +
                  item.shop_order.shipping_address.district +
                  " " +
                  item.shop_order.shipping_address.street +
                  " " +
                  item.shop_order.shipping_address.address_line}
              </td>
              <td className="text-[1.6rem] px-6 py-4">
                {item.shop_order.site_user.phone}
              </td>
              <td className="text-[1.6rem] px-6 py-4">
                {item.quantity * item.productConfig.variation.price}
              </td>
              <td className="text-[1.6rem] px-6 py-4">
                {item.isConfirm ? "Đã Thành Công" : "Đang Vận Chuyển"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
