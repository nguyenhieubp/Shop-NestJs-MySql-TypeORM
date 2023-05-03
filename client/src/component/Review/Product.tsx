import { useAppSelector } from "@/redux/config/hook";
import axios from "axios";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import React from "react";
import ReactStars from "react-rating-stars-component";

const Product = () => {
  const router = useRouter();
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState<string>();

  const product = useAppSelector((state) => state.pay.productReview);

  const handleReview = async () => {
    await axios.post(
      "http://localhost:3000/api/v1/user-review",
      {
        orderLineId: product?.id,
        ratting_value: rating,
        comment: comment,
      },
      {
        withCredentials: true,
      }
    );

    await axios.put(`http://localhost:3000/api/v1/order-line/${product?.id}`);
    router.push("/");
  };

  const handleBack = async () => {
    await axios.put(`http://localhost:3000/api/v1/order-line/${product?.id}`);
    router.push("/");
  };

  const ratingChanged = (newRating: any) => {
    setRating(newRating);
  };

  const handleCommentReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <>
      <div className="flex items-center">
        <div className="text-[1.8rem] font-medium text-gray-900">
          <div className="flex items-start">
            <Image
              alt="Mô tả hình ảnh"
              width={100}
              height={50}
              objectFit="contain"
              src={product?.productConfig.variation.product_image}
              loading="lazy"
            ></Image>
            <h3 className="ml-[2rem]">
              {product?.productConfig.variation.nameProduct}
            </h3>
            <h3 className="ml-[2rem]">
              Size: {product?.productConfig.variation.size}
            </h3>
            <h3 className="ml-[2rem]">Số Lượng: {product?.quantity}</h3>
          </div>
        </div>
      </div>
      <div className="mt-[2rem]">
        <h3 className="text-[2rem] font-bold ">Đánh giá sản phẩm</h3>

        <div className="flex">
          <textarea
            onChange={(e) => handleCommentReview(e)}
            className="w-[40rem] p-2 text-[2rem] border-2 border-black"
            name=""
            id=""
            cols={30}
            rows={10}
          ></textarea>
          <div className="ml-[2rem] ">
            <ReactStars
              count={5}
              size={30}
              onChange={ratingChanged}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          </div>
        </div>
        <button
          onClick={handleReview}
          className="px-[2rem] py-[1rem] text-[1.8rem] mt-[1rem] bg-blue-500 text-white"
        >
          Đánh Giá
        </button>
        <button
          onClick={handleBack}
          className="px-[2rem] py-[1rem] text-[1.8rem] mt-[1rem] bg-red-600 ml-[5rem] text-white"
        >
          Bỏ Qua
        </button>
      </div>
    </>
  );
};

export default Product;
