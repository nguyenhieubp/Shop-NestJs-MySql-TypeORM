import Image from "next/image";
import React from "react";
import { GoClock } from "react-icons/go";
import { MdArrowDropDown } from "react-icons/md";
import { FcShipped } from "react-icons/fc";
import { BsCartPlus } from "react-icons/bs";
import { useRouter } from "next/router";
import { Variation } from "@/models/detail_product";
import { useAppDispatch, useAppSelector } from "@/redux/config/hook";
import { fetchDetailProduct } from "@/redux/slices/detail/detail_product";
import { fetchAllProductConfig } from "@/redux/slices/home/productConfig";
import { Purchase } from "@/models/product_config";
import { addProductInCartUser } from "@/redux/slices/cart/carts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [cartId, setCartId] = React.useState<string | null>("");

  //GET CartID
  React.useEffect(() => {
    const data = localStorage.getItem("cartId");
    setCartId(data);
  }, [cartId]);

  //FETCH API GET DETAIL PRODUCT USER SELECT
  React.useEffect(() => {
    dispatch(fetchDetailProduct(id));
    dispatch(fetchAllProductConfig());
  }, []);
  const product = useAppSelector((state) => state.detail_product.product);
  const productConfigs = useAppSelector(
    (state) => state.productConfig.productConfigs
  );

  //VALIDATION
  const [validation, setValidation] = React.useState<string>();

  //VALUE OPTION USER SELECT
  const [numberProductBuy, setNumberProductBuy] = React.useState<number>(0);
  const [size, setSize] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");
  const [valueVariation, setValueVariation] = React.useState<Variation>();
  let quantity: number;

  const handleAddProductInCart = () => {
    if (numberProductBuy <= 0 || !size || !color) {
      setValidation("Mời bạn chọn các thông số sản phẩm");
    } else {
      const idProductConfig: Purchase | undefined = productConfigs.find(
        (productConfig) =>
          productConfig.productId === product?.product.id &&
          productConfig.variationId === valueVariation?.id
      );
      try {
        dispatch(
          addProductInCartUser({
            productId: idProductConfig?.id,
            quantity: numberProductBuy,
            shoppingCartId: cartId,
          })
        );
        toast.success("Thêm vào giỏ hàng thành công", {
          className: "text-[1.4rem]",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-10 gap-12 ">
        <div className="col-span-4 ">
          <div className="flex justify-center">
            <Image
              alt="Mô tả hình ảnh"
              width={250}
              height={100}
              objectFit="contain"
              src={valueVariation?.product_image || product?.product?.image}
              loading="lazy"
            ></Image>
          </div>
        </div>
        <div className="col-span-6">
          <h2 className="text-[3rem] font-bold">{product?.product?.name}</h2>
          <div className="flex items-center my-[1rem]">
            <div className="text-[1.8rem] ">
              {product?.product?.purchase} Đã Bán
            </div>
          </div>
          <div className="text-white bg-blue-500 p-4 flex justify-between items-center">
            <h2 className="text-white text-[2rem]">Flash sale</h2>
            <div className="flex  items-center">
              <GoClock size={25} className="mr-[2rem]"></GoClock>
              <h5 className="text-[2rem]">Khuyến mại ngày 1</h5>
            </div>
          </div>
          <div className="p-[1rem]">
            <h3 className="text-[2rem] font-bold">💵 1000 | giảm 10%</h3>
            <div className="flex items-center mt-[2rem] text-[1.8rem]">
              <div className="text-[#868686]">Vận chuyển</div>
              <button className="ml-[2rem] flex items-center">
                <FcShipped size={25}></FcShipped>
                <h2 className="ml-[1rem]">Trần Duy Hưng, Cầu Giấy, Hà Nội</h2>
                <MdArrowDropDown size={25}></MdArrowDropDown>
              </button>
            </div>
            <div className="flex items-center mt-[3rem] text-[1.8rem]">
              <h2 className="text-[#868686]">Màu</h2>
              <div className="ml-[2rem] flex items-center ">
                {product?.variations.map((variation: Variation) => (
                  <button
                    style={
                      variation.nameVariation === color
                        ? { background: "#2563eb", color: "white" }
                        : {}
                    }
                    onClick={() => {
                      setValueVariation(variation);
                      setColor(variation.nameVariation);
                    }}
                    className="text-center px-8 border-2 border-black ml-[2rem]"
                  >
                    {variation.nameVariation}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center mt-[3rem] text-[1.8rem]">
              <h2 className="text-[#868686]">Size</h2>
              <div className="ml-[2rem] flex items-center ">
                {product?.variations.map((variation: Variation) => (
                  <button
                    style={
                      variation.size === size
                        ? { background: "#2563eb", color: "white" }
                        : {}
                    }
                    onClick={() => {
                      setSize(variation.size);
                    }}
                    className="text-center px-8 border-2 border-black ml-[2rem]"
                  >
                    {variation.size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center mt-[3rem] text-[1.8rem]">
              <h2 className="text-[#868686]">Số lượng</h2>
              <div className="ml-[2rem] flex items-center ">
                <button
                  onClick={() => {
                    if (numberProductBuy <= 0) {
                      return;
                    }
                    setNumberProductBuy(numberProductBuy - 1);
                  }}
                  className="text-center px-8 border-2 border-y-black border-l-black"
                >
                  -
                </button>
                <div className="text-center px-4 border-2 border-black ">
                  {numberProductBuy}
                </div>
                <button
                  onClick={() => {
                    if (numberProductBuy >= quantity) {
                      return;
                    }
                    setNumberProductBuy(numberProductBuy + 1);
                  }}
                  className="text-center px-8 border-2 border-y-black border-r-black"
                >
                  +
                </button>
              </div>
              <div className="ml-[1rem]">
                {product?.variations.map((variation) => {
                  if (
                    variation.size === size &&
                    variation.nameVariation === color
                  ) {
                    if (!variation.quantity) return 0;
                    quantity = variation.quantity;
                    return variation.quantity;
                  }
                })}{" "}
                sản phẩm
              </div>
            </div>
            <div className="mt-[1rem] text-red-500 text-[1.6rem]">
              {validation}
            </div>
            <div className="flex items-center mt-[3rem] text-[1.8rem]">
              <div className="flex items-center ">
                <button
                  onClick={handleAddProductInCart}
                  className="flex items-center text-center px-10 py-4 border-2 border-blue bg-[#2564eb58]"
                >
                  <BsCartPlus color="#2563eb" size={25}></BsCartPlus>
                  <h3 className="ml-[1rem] text-blue-500">Thêm vào giỏ hàng</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-[4rem] ">
        <h2 className="text-[2.4rem]">Chi tiết sản phẩm</h2>
        <p className="text-[1.8rem] mt-[4rem]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi fuga
          quos ad aut repudiandae rem tenetur eveniet molestias esse expedita
          placeat laboriosam veritatis ducimus quisquam amet dolores,
          reprehenderit laudantium. Qui. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Similique autem facilis soluta, consequatur deleniti
          veritatis iste? Omnis animi incidunt natus cupiditate non dicta nemo,
          molestiae assumenda deleniti illo perspiciatis dolore?
        </p>
      </div>
    </>
  );
};

export default Product;
