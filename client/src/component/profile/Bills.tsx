import { useAppDispatch } from "@/redux/config/hook";
import { fetchProductItemPurchase } from "@/redux/slices/home/product";
import { productReview } from "@/redux/slices/pay/pay";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export interface RootObject {
  id: string;
  created_at: string;
  updated_at: string;
  shopOrderId: string;
  productConfigId: string;
  quantity: number;
  shop_order: Shoporder;
  productConfig: ProductConfig;
}

interface ProductConfig {
  id: string;
  created_at: string;
  updated_at: string;
  productId: string;
  variationId: string;
  variation: Variation;
}

interface Variation {
  id: string;
  created_at: string;
  updated_at: string;
  nameProduct: string;
  size: string;
  nameVariation: string;
  quantity: number;
  product_image: string;
  price: number;
}

interface Shoporder {
  id: string;
  created_at: string;
  updated_at: string;
  shippingAddressId: string;
  siteUserId: string;
}

const Bills = () => {
  const [products, setProducts] = React.useState<RootObject | undefined>();
  const fetchApi = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/order-line/user",
      {
        withCredentials: true,
      }
    );
    setProducts(response.data);
  };
  React.useEffect(() => {
    fetchApi();
  }, []);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const confirmProduct = (products: RootObject) => {
    dispatch(productReview(products));
    dispatch(
      fetchProductItemPurchase({
        id: products?.productConfig?.productId,
        purchase: products.quantity,
      })
    );
    router.push({ pathname: "/review" });
  };
  return (
    <div>
      <div className="w-[100rem] bg-[#f5f5f5] p-[3rem]">
        <button className="my-[2rem] flex items-end">
          <div className="flex items-end text-[1.6rem] mr-[3rem] cursor-pointer">
            <h1 className="text-[2.2rem]">Các Đơn Đặt</h1>
          </div>
        </button>
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
                        Tên
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
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-[1.8rem] font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Thao Tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 mt-[2rem]">
                    {Array.isArray(products) &&
                      products.map((product: RootObject) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-[1.8rem] font-medium text-gray-900">
                                <div className="flex items-start">
                                  <Image
                                    alt="Mô tả hình ảnh"
                                    width={100}
                                    height={100}
                                    objectFit="contain"
                                    src={
                                      product.productConfig.variation
                                        .product_image
                                    }
                                    loading="lazy"
                                  ></Image>
                                  <h3 className="ml-[2rem]">
                                    {
                                      product.productConfig.variation
                                        .nameProduct
                                    }
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-[1.8rem] text-gray-900">
                              $ {product.productConfig.variation.price}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-[1.8rem] text-gray-900">
                              {product.quantity}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-[1.8rem] text-gray-900">
                              ${" "}
                              {product.quantity *
                                product.productConfig.variation.price}
                            </div>
                          </td>
                          <td
                            onClick={() => confirmProduct(product)}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            <div className="text-[1.8rem]  underline text-blue-500 cursor-pointer">
                              Xác Nhận
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;
