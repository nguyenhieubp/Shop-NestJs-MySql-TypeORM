import React from "react";

export default function SideBar() {
  return (
    <div className="px-[8rem]">
      <h2 className="text-[2rem] font-bold mb-[4rem]">Danh mục sản phẩm</h2>
      <div className="flex items-center mb-[2rem]">
        <input className="px-4 py-2 w-8 h-8 " id="quan" type="checkbox" />
        <label
          className="text-[1.4rem] ml-[1rem] cursor-pointer"
          htmlFor="quan"
        >
          Quần
        </label>
      </div>
      <div className="flex items-center mb-[2rem]">
        <input className="px-4 py-2 w-8 h-8 " id="ao" type="checkbox" />
        <label className="text-[1.4rem] ml-[1rem] cursor-pointer" htmlFor="ao">
          Áo
        </label>
      </div>
    </div>
  );
}
