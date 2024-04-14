import React, { useEffect, useState } from "react";
import icons from "../../../utils/icons";
import { Link } from "react-router-dom";
import path from "../../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { apiGetProductAction } from "../../../stores/actions/prodAction";
import { apiGetProduct } from "../../../services/productService";
import { formatMoney } from "../../../utils/helper";
import instance from "../../../axios";

const { CiStar } = icons;
const Products = ({ product, category }) => {
  const data = [];
  const data1 = [];
  if (category) {
    category?.map((el) => {
      if (el.id === 3) {
        data.push(el);
      } else if (el.id === 2) {
        data1.push(el);
      }
    });
  }
  // const [product, setProduct] = useState("");
  // const [loading, setLoading] = useState(true);
  // const getApiProduct = () => {
  //   instance.get(`product/`).then((res) => {
  //     // console.log(res.data);
  //     if (res.data.status === "Success") {
  //       setProduct(res.data.data);
  //       setLoading(false);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   getApiProduct();
  // }, []);
  // const getApiProduct = async () => {
  //   const response = await apiGetProduct();
  //   if (response.status === "Success") setProduct(response.data);
  // };
  // console.log(product);
  // useEffect(() => {
  //   getApiProduct();
  // }, []);
  return (
    <>
      <div className="w-full flex-col flex bg-white rounded-xl p-4">
        <h3 className="py-4 font-medium  text-lg">Giá tốt hôm nay</h3>
        <div className="flex gap-2 ">
          {data[0]?.products?.map((el) => (
            <Link
              className="flex"
              key={el?.id}
              to={`/${data[0]?.slug}/${el?.id}/`}
            >
              <div className=" w-[150px] border rounded-lg h-[265px] bg-gray-100 flex flex-col gap-2 cursor-pointer  ">
                <img
                  className="rounded-t-lg w-full h-[148px]"
                  src={el?.thumbnail}
                  alt="home_product"
                />
                <div className="px-2 flex flex-col w-full h-[80px]">
                  <p className="text-xs font-light h-[36px] text-gray-800 overflow-hidden break-words whitespace-break-spaces ">
                    {el?.name}
                  </p>
                  <div className="flex">
                    <div className="font-medium">{formatMoney(el?.price)}</div>
                    <sup className="top-[0.5em]">đ</sup>
                  </div>
                </div>
                <div className="border-t-2 py-2 w-full h-[35px] px-2">
                  <p className="font-medium text-gray-400 text-xs">
                    Giao thứ 2, 15/01
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full mb-4 rounded-xl bg-white p-4">
        <h3 className="py-4 font-medium text-lg">Sản phẩm bán chạy</h3>
        <div className="flex gap-2 ">
          {data1[0]?.products?.map((el) => (
            <Link
              className="flex"
              key={el?.id}
              to={`/${data1[0]?.slug}/${el?.id}/`}
            >
              <div className=" w-[150px] border rounded-lg h-[265px] bg-gray-100 flex flex-col gap-2 cursor-pointer  ">
                <img
                  className="rounded-t-lg w-full h-[148px]"
                  src={el?.thumbnail}
                  alt="home_product"
                />
                <div className="px-2 flex flex-col w-full h-[80px]">
                  <p className="text-xs font-light h-[36px] text-gray-800 overflow-hidden break-words whitespace-break-spaces ">
                    {el?.name}
                  </p>
                  <div className="flex">
                    <div className="font-medium">{formatMoney(el?.price)}</div>
                    <sup className="top-[0.5em]">đ</sup>
                  </div>
                </div>
                <div className="border-t-2 py-2 w-full h-[35px] px-2">
                  <p className="font-medium text-gray-400 text-xs">
                    Giao thứ 2, 15/01
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
