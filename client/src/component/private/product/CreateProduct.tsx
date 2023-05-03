import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Category {
  id: string;
  created_at: string;
  updated_at: string;
  category_name: string;
}

interface Variation {
  id: string;
  created_at: string;
  updated_at: string;
  nameProduct: string;
  size: string;
  nameVariation: string;
  quantity: number | string;
  product_image: string;
  price: number | string;
}

interface ValueProductProps {
  name: string;
  categoryId: string;
  description: string;
  price: number;
  image: string;
}

interface VariationProps {
  nameProduct: string;
  size: string;
  nameVariation: string;
  quantity: number;
  product_image: string;
  price: number;
}

interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  purchase: number;
  price: number;
  image: string;
  name: string;
  description: string;
  categoryId: string;
  category: Category;
}

const CreateProduct: React.FC = () => {
  const [category, setCategory] = React.useState<Category[]>([]);
  const [productItemId, setProductItemId] = React.useState<string>("");
  const [variations, setVariations] = React.useState<Variation[]>([]);
  const [product, setProduct] = React.useState<Product>();

  const [valueProduct, setValueProduct] = React.useState<ValueProductProps>({
    categoryId: "",
    description: "",
    image: "",
    name: "",
    price: NaN,
  });

  const [valueVariation, setVariation] = React.useState<VariationProps>({
    nameProduct: "",
    nameVariation: "",
    price: NaN,
    product_image: "",
    quantity: NaN,
    size: "",
  });

  const getAllCategory = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/product-category`
    );
    setCategory(response.data);
  };

  React.useEffect(() => {
    getAllCategory();
  }, [category]);

  const inputProduct = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValueProduct({ ...valueProduct, [e.target.name]: e.target.value });
    console.log(valueProduct);
  };

  const createProduct = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!valueProduct.categoryId) {
      const response = await axios.post(
        `http://localhost:3000/api/v1/product-item`,
        {
          categoryId: category[category.length - 1]?.id,
          description: valueProduct.description,
          image: valueProduct.image,
          name: valueProduct.name,
          price: valueProduct.price,
        }
      );
      setProductItemId(response.data.id);
      setProduct(response.data);
      setValueProduct({
        categoryId: "",
        description: "",
        image: "",
        name: "",
        price: NaN,
      });
      toast.success("Tạo Sản Phẩm Thành Công", {
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
    } else {
      const response = await axios.post(
        `http://localhost:3000/api/v1/product-item`,
        {
          categoryId: valueProduct.categoryId,
          description: valueProduct.description,
          image: valueProduct.image,
          name: valueProduct.name,
          price: valueProduct.price,
        }
      );
      setProductItemId(response.data.id);
      setProduct(response.data);
      setValueProduct({
        categoryId: "",
        description: "",
        image: "",
        name: "",
        price: NaN,
      });
      toast.success("Tạo Sản Phẩm Thành Công", {
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
    }
  };

  const inputVariation = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setVariation({ ...valueVariation, [e.target.name]: e.target.value });
  };

  const createVariation = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const newVariation = await axios.post(
      `http://localhost:3000/api/v1/variation`,
      {
        nameProduct: valueVariation.nameProduct,
        size: valueVariation.size,
        nameVariation: valueVariation.nameVariation,
        quantity: valueVariation.quantity,
        product_image: valueVariation.product_image,
        price: valueVariation.price,
      }
    );

    setVariations((pre) => {
      return [...pre, newVariation.data];
    });

    const response = await axios.post(
      `http://localhost:3000/api/v1/product-config`,
      {
        productId: productItemId,
        variationId: newVariation.data.id,
      }
    );

    toast.success("Tạo Sản Phẩm Con Thành Công", {
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
  };

  return (
    <div>
      <h2 className="text-[2rem]">Tạo Sản Phẩm</h2>
      <ToastContainer />
      <div className="mt-[2rem]">
        <form onSubmit={createProduct} className="w-[30rem]">
          <div className="mb-[1rem]">
            <h1 className="text-[2rem]">Tên Sản Phẩm</h1>
            <input
              onChange={inputProduct}
              name="name"
              className="border-2 border-black p-2 text-[2rem] w-full"
              type="text"
            />
          </div>
          <div className="mb-[1rem]">
            <h1 className="text-[2rem]">Giá</h1>
            <input
              onChange={inputProduct}
              name="price"
              className="border-2 border-black p-2 text-[2rem] w-full"
              type="text"
            />
          </div>
          <div className="mb-[1rem]">
            <h1 className="text-[2rem]">Mô Tả</h1>
            <input
              onChange={inputProduct}
              name="description"
              className="border-2 border-black p-2 text-[2rem] w-full"
              type="text"
            />
          </div>
          <div className="mb-[1rem]">
            <h1 className="text-[2rem]">Ảnh</h1>
            <input
              onChange={inputProduct}
              name="image"
              className="border-2 border-black p-2 text-[2rem] w-full"
              type="text"
            />
          </div>
          <div className="mb-[1rem] text-[2rem]">
            <label htmlFor="category">Loại Sản Phẩm</label>
            <select
              value={valueProduct.categoryId}
              onChange={(e) => inputProduct(e)}
              name="categoryId"
              className="ml-[2rem]"
              id="category"
            >
              {category.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="text-[2rem] px-8 py-4 bg-blue-500 text-white"
            onClick={(e) => createProduct(e)}
            type="submit"
          >
            Tạo
          </button>
        </form>
        <div className="mt-[2rem]">
          <h3 className="text-[2rem]">Tên Sản Phẩm: {product?.name}</h3>
          <h3 className="text-[2rem]">Giá Sản Phẩm: {product?.price}</h3>
        </div>
        <h3 className="text-[2.4rem] mt-[2rem]">Tạo Các Sản Phẩm Con</h3>
        <table className="mb-[2rem] table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-2">
            <tr>
              <th scope="col" className="py-3 px-6  text-[2rem]">
                #
              </th>
              <th scope="col" className="py-3 px-6 text-[1.5rem]">
                Tên Loại
              </th>
              <th scope="col" className="py-3 px-6 text-[1.5rem]">
                Số Lượng
              </th>
              <th scope="col" className="py-3 px-6 text-[1.5rem]">
                Ảnh
              </th>
              <th scope="col" className="py-3 px-6 text-[1.5rem]">
                Giá
              </th>
              <th scope="col" className="py-3 px-6 text-[1.5rem]">
                size
              </th>
              <th scope="col" className="py-3 px-6 text-[1.5rem]">
                Tên sản Phẩm
              </th>
            </tr>
          </thead>
          <tbody>
            {variations.map((item, index) => (
              <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 border-2">
                <td
                  scope="row"
                  className="py-4 px-6 font-medium  text-gray-900  dark:text-white overflow-hidden text-[1.2rem]"
                >
                  {index + 1}
                </td>
                <td className="py-4 px-6 text-[1.2rem]">
                  {item.nameVariation}
                </td>
                <td className="py-4 px-6 text-[1.2rem]">{item.quantity}</td>
                <td className="py-4 px-6 text-[1.2rem]">
                  {item.product_image}
                </td>
                <td className="py-4 px-6 text-[1.2rem]">{item.price}</td>
                <td className="py-4 px-6 text-[1.2rem]">{item.size}</td>
                <td className="py-4 px-6 text-[1.2rem] ">{item.nameProduct}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <form onSubmit={createVariation} className="w-[30rem]">
            <div className="mb-[1rem]">
              <h1 className="text-[2rem]">Tên Loại Sản Phẩm</h1>
              <input
                onChange={inputVariation}
                name="nameVariation"
                className="border-2 border-black p-2 text-[2rem] w-full"
                type="text"
              />
            </div>
            <div className="mb-[1rem]">
              <h1 className="text-[2rem]">Giá</h1>
              <input
                onChange={inputVariation}
                name="price"
                className="border-2 border-black p-2 text-[2rem] w-full"
                type="text"
              />
            </div>
            <div className="mb-[1rem]">
              <h1 className="text-[2rem]">Số Lượng</h1>
              <input
                onChange={inputVariation}
                name="quantity"
                className="border-2 border-black p-2 text-[2rem] w-full"
                type="text"
              />
            </div>
            <div className="mb-[1rem]">
              <h1 className="text-[2rem]">Ảnh</h1>
              <input
                onChange={inputVariation}
                name="product_image"
                className="border-2 border-black p-2 text-[2rem] w-full"
                type="text"
              />
            </div>
            <div className="mb-[1rem]">
              <h1 className="text-[2rem]">Tên Cụ Thể</h1>
              <input
                onChange={inputVariation}
                name="nameProduct"
                className="border-2 border-black p-2 text-[2rem] w-full"
                type="text"
              />
            </div>
            <div className="mb-[1rem]">
              <h1 className="text-[2rem]">Size</h1>
              <input
                onChange={inputVariation}
                name="size"
                className="border-2 border-black p-2 text-[2rem] w-full"
                type="text"
              />
            </div>
            <button
              className="text-[2rem] px-8 py-4 bg-blue-500 text-white"
              onClick={(e) => createVariation(e)}
              type="submit"
            >
              Tạo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
