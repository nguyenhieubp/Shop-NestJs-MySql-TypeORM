import { useAppDispatch } from "@/redux/config/hook";
import { addCartUser } from "@/redux/slices/cart/carts";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

interface Address {
  city: string;
  district: string;
  street: string;
  address_line: string;
}

const index = () => {
  const [valueAddress, setValueAddress] = React.useState<Address>({
    address_line: "",
    city: "",
    district: "",
    street: "",
  });

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueAddress({ ...valueAddress, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  React.useEffect(() => {
    const myCookie = document.cookie;
    const token = myCookie.split("=")[1];
    if (token) {
      router.push("/");
    }
  }, []);

  const dispatch = useAppDispatch();
  const createAddress = async () => {
    try {
      const addressNew = await axios.post(
        "http://localhost:3000/api/v1/address",
        {
          address_line: valueAddress.address_line,
          city: valueAddress.city,
          district: valueAddress.district,
          street: valueAddress.street,
        }
      );

      const response = await axios.post(
        "http://localhost:3000/api/v1/shop-order",
        {
          shippingAddressId: addressNew.data.id,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("shopOrderId", response.data.id);

      const myCookie = document.cookie;
      const token = myCookie.split("=")[1];
      dispatch(addCartUser(token));

      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full  bg-gradient-to-br from-sky-50 to-gray-200 ">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40 mt-[10rem]">
        <div className=" m-auto md:w-8/12 lg:w-6/12 xl:w-6/12 ">
          <div className="h-[60rem] rounded-xl bg-white shadow-xl">
            <div className="p-[3rem]">
              <h1 className="mt-[2rem] text-[2.4rem] font-bold">
                Nhập địa chỉ nhận hàng
              </h1>
              <div className="mt-[2rem]">
                <div>
                  <div className="text-[2rem]">
                    <h3>Tỉnh/Thành Phố</h3>
                    <input
                      name="city"
                      onChange={(e) => handleInputValue(e)}
                      className="border-2 border-black p-2 mt-[1rem] w-full"
                      type="text"
                    />
                  </div>
                  <div className="text-[2rem]">
                    <h3>Huyện/Quận</h3>
                    <input
                      name="district"
                      onChange={(e) => handleInputValue(e)}
                      className="border-2 border-black p-2 mt-[1rem] w-full"
                      type="text"
                    />
                  </div>
                  <div className="text-[2rem]">
                    <h3>Xã/Phường</h3>
                    <input
                      name="street"
                      onChange={(e) => handleInputValue(e)}
                      className="border-2 border-black p-2 mt-[1rem] w-full"
                      type="text"
                    />
                  </div>
                  <div className="text-[2rem]">
                    <h3>Địa chỉ cụ thể</h3>
                    <input
                      name="address_line"
                      onChange={(e) => handleInputValue(e)}
                      className="border-2 border-black p-2 mt-[1rem] w-full"
                      type="text"
                    />
                  </div>
                  <div className="text-[2rem] mt-[3rem]">
                    <button
                      onClick={createAddress}
                      className="bg-blue-600 text-white text-[2rem] w-full py-[1rem]"
                    >
                      Tạo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
