import Image from "next/image";
import React from "react";
import { Product } from "@/models/product_item";
import { useRouter } from "next/router";

const Products: React.FC<Product> = ({ id, image, purchase, price, name }) => {
  const router = useRouter();

  const handleSelectProduct = () => {
    router.push({ pathname: `product/${name}`, query: { id: id } });
  };
  return (
    <li onClick={handleSelectProduct} key={id}>
      <div className="p-[1rem] border-[0.1rem] h-full border-black flex flex-col justify-between">
        <Image
          alt="Mô tả hình ảnh"
          width={200}
          height={30}
          objectFit="contain"
          src={image}
          loading="lazy"
        ></Image>
        <div className="mt-[1rem]">
          <h2 className="text-[1.8rem] font-bold">{name}</h2>
          <div className="flex justify-between items-end">
            <h4 className="text-[1.5rem]">${price}</h4>
            <h3>Đã Bán: {purchase}</h3>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Products;
