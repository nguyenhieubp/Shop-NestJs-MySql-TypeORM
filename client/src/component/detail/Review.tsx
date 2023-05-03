import Image from "next/image";
import React from "react";
import Comment from "./Comment";
import ReactPaginate from "react-paginate";
import { CommentInTerface } from "@/models/comment";
import axios from "axios";
import { useRouter } from "next/router";

const Review = () => {
  const router = useRouter();

  const [pageNumber, setPageNumber] = React.useState(1);
  const [showSortPrice, setShowSortPrice] = React.useState(false);
  const [comment, setComment] = React.useState<Array<CommentInTerface>>();

  const fetchApi = async () => {
    console.log(pageNumber);
    const response = await axios.get(
      `http://localhost:3000/api/v1/user-review/product/${
        router.query?.id
      }?page=${pageNumber + 1}&limit=3`
    );
    setComment(response.data);
  };
  React.useEffect(() => {
    fetchApi();
  }, [pageNumber]);

  // Gọi hàm này khi người dùng click vào nút phân trang
  const handlePageClick = (data: any) => {
    setPageNumber(data.selected);
  };
  const pageCount = 3;
  return (
    <div className="h-[60rem]">
      <h2 className="text-[2.4rem]">Đánh giá sản phẩm</h2>
      <div className="mt-[3rem] h-[20rem]">
        {comment?.map((item) => (
          <Comment
            key={item.id}
            comment={item.comment}
            ratting={item.ratting_value}
            avatar={item.user.avatar}
            nameUser={item.user.lastName + item.user.firstName}
          ></Comment>
        ))}
        <div className="flex flex-col items-center mt-[2rem] text-[2rem]">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center space-x-4 mt-4"
            previousClassName="border border-gray-400 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
            nextClassName="border border-gray-400 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
            pageClassName="border border-gray-400 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
            activeClassName="bg-blue-500 text-white"
            disabledClassName="opacity-50 cursor-not-allowed"
            breakClassName="border border-gray-400 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
            breakLabel="..."
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
