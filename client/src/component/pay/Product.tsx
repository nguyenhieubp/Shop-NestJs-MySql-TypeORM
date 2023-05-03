import Image from "next/image";
import React from "react";

interface ProductProps {
  nameProduct: string;
  image: string;
  price: number;
  quantity: number;
  id: string;
}

const Product: React.FC<ProductProps> = ({
  nameProduct,
  image,
  price,
  quantity,
  id,
}) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="text-[1.8rem] font-medium text-gray-900">
            <div className="flex items-start">
              <Image
                alt="Mô tả hình ảnh"
                width={100}
                height={100}
                objectFit="contain"
                src={image}
                loading="lazy"
              ></Image>
              <h3 className="ml-[2rem]">{nameProduct} </h3>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-[1.8rem] text-gray-900">${quantity * price}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-[1.8rem] text-gray-900">{quantity}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-[1.8rem] text-gray-900">${quantity * price}</div>
      </td>
    </tr>
  );
};

export default Product;
