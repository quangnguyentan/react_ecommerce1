import React, { useEffect, useState } from "react";
import icons from "../../../utils/icons";
import { Button } from "../../atoms";
import { Link, NavLink, useParams } from "react-router-dom";
import path from "../../../utils/path";
import {
  apiCreateOrderDetailByPidAndOid,
  apiGetCategory,
  apiGetCategoryById,
  apiGetOrder,
  apiGetOrderById,
  apiGetOrderDetailByOidDetal,
  apiGetOrderProduct,
  apiGetOrders,
  apiGetProduct,
  apiGetProductById,
  apiOrdersProduct,
  apiUpdateOrderDetailByPidAndOid,
} from "../../../services/productService";
import {
  createSlug,
  formatMoney,
  renderStartFromNumber,
} from "../../../utils/helper";
import { BreadCrumbs } from "../../organisms/index";
import ClipLoader from "react-spinners/ClipLoader";
import { apiUpdateCart } from "../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../../../stores/actions/userAction";
import { categories, price } from "../../../utils/constant";
import {
  apiGetProductAction,
  getProductByPidAndOid,
} from "../../../stores/actions/prodAction";
const { CiStar, GoPlus, FiMinus } = icons;
const ProductCard = () => {
  const [product, setProduct] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const [productCate, setProductCate] = useState(null);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const { category, id, name } = useParams();
  const { currentData } = useSelector((state) => state.user);
  const getProductById = async (id) => {
    const response = await apiGetProductById(id);
    if (response.status === "Success") setProduct(response.data);
  };

  const getCategoryById = async (id) => {
    const response = await apiGetCategory();
    if (response.status === "Success") {
      response?.data?.map((el) => {
        if (el?.slug === category) {
          setCategory_id(el);
        }
      });
    }
  };

  // const fetchApiProduct = async () => {
  //   const response = await apiGetProduct({
  //     // page: Math.floor(Math.random(10) * 10) + 1,
  //     // page: Math.floor(Math.random(10) * 10) + 1,
  //     limit: 8,
  //     sort: "-prices",
  //     type: category,
  //   });
  //   if (response?.success) {
  //     setProductCate(response?.products);
  //   }
  // };

  // const convertCategory = () => {
  //   let categoryConvert;
  //   categories.map((el) => {
  //     if (createSlug(el.categoryName) === category) {
  //       categoryConvert = el.categoryName;
  //     }
  //   });

  //   return categoryConvert;
  // };
  // const categoryName = convertCategory();
  // const { currentData } = useSelector((state) => state.user);
  const apiGetOrder = async () => {
    const response = await apiGetOrderProduct();
    if (response?.status === "Success") {
      const findEl = response.data.filter(
        (el) => el.user_id === currentData?.id
      );
      setAccount(findEl[0]);
      if (findEl.length === 0) {
        await apiOrdersProduct({
          receiver_name: "",
          receiver_phone: "",
          receiver_address: "",
          description: "",
          is_ordered: true,
          is_paid: false,
          user_id: currentData?.id,
        });
      }

      // response.data?.map((el) => {
      //   console.log(el.includes(currentData?.  id));
      // });

      // const response = apiOrdersProduct({
      //   receiver_name: "",
      //   receiver_phone: "",
      //   receiver_address: "",
      //   description: "",
      //   is_ordered: true,
      //   is_paid: false,
      //   user_id: currentData?.id,
      // });
      // console.log(response);
    }
  };

  useEffect(() => {
    setLoading(true);
    apiGetOrder() && dispatch(getCurrent());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const handleClickOptions = async (flag) => {
    if (flag === "CART") {
      if (currentData) {
        const getIdByOrder = await apiGetOrderDetailByOidDetal(account?.id);
        const selectEl = getIdByOrder?.data?.filter(
          (el) => el.product_id === product?.id
        );

        if (selectEl.length > 0) {
          selectEl?.map(async (el) => {
            const currentQuantity = JSON.parse(
              localStorage.getItem(el?.product_id)
            );
            if (el?.product_id === product?.id) {
              if (currentQuantity) {
                const updatedQuantity = Number(currentQuantity) + quantity;
                const response = await apiUpdateOrderDetailByPidAndOid(
                  account?.id,
                  el?.id,
                  {
                    amount: updatedQuantity,
                    price: product?.price,
                    discount: "10",
                    order_id: account?.id,
                    product_id: product?.id,
                  }
                );
                console.log(response);

                localStorage.setItem(
                  el?.product_id,
                  JSON.stringify(updatedQuantity)
                );
              }
              // const response = await apiUpdateOrderDetailByPidAndOid(account?.id, product?.id, {
              //   amount : quantity
              // })
            }
          });
        } else {
          const updatedQuantity = quantity;
          const response = await apiCreateOrderDetailByPidAndOid(account?.id, {
            amount: updatedQuantity,
            price: product?.price,
            discount: "10",
            order_id: account?.id,
            product_id: product?.id,
          });
          console.log(response);
          if (response?.status === "Success") {
            localStorage.setItem(
              response?.data?.product_id,
              JSON.stringify(updatedQuantity)
            );
          }
        }

        // const response = await apiGetOrderProduct();
        // if (response) {
        //   response?.data?.map(async (el) => {
        //     if (el?.user_id === currentData?.id) {
        //       console.log(el);
        //     } else {
        //       await apiOrdersProduct({
        //         receiver_name: currentData?.first_name + currentData?.last_name,
        //         receiver_phone: currentData?.phone,
        //         receiver_address: currentData?.address,
        //         description: "",
        //         user_id: currentData?.id,
        //       });
        //     }
        //   });
        // }
        // console.log(response);
      }
      // const response = await apiOrdersProduct({
      //   receiver_name: currentData?.first_name,
      //   receiver_phone: currentData?.phone,
      //   receiver_address: currentData?.address,
      //   description: "",
      //   user_id: currentData?.id,
      // });

      // if (response.status === "Success") {
      //   dispatch(getProductByPidAndOid(response?.data?.id, product?.id));
      // }
      // dispatch(getProductByPidAndOid())
      //   // if (!currentData) throw new Error("Please login first");
      //   const response = await apiUpdateCart({
      //     pid: product?._id,
      //     quantity,
      //     color: product?.color[0] ? product?.color[0] : "Không có",
      //     type: "increase",
      //   });
      //   if (response?.success) {
      //     dispatch(getCurrent());
      //     const currentQuantity = JSON.parse(localStorage.getItem(product?._id));
      //     if (currentQuantity) {
      //       const updatedQuantity = Number(currentQuantity) + quantity;
      //       localStorage.setItem(product?._id, JSON.stringify(updatedQuantity));
      //     } else {
      //       const updatedQuantity = quantity;
      //       localStorage.setItem(product?._id, JSON.stringify(updatedQuantity));
      //     }
      //   }
    }
  };
  // useEffect(() => {
  //   apiGetOrder();
  // }, []);
  useEffect(() => {
    setLoading(true);
    getProductById(id) && getCategoryById();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    window.scrollTo(0, 0);
  }, [category, id]);
  // const handleQuantity = (type) => {
  //   if (type === "increase") {
  //     setQuantity(quantity + 1);
  //   } else {
  //     if (quantity === 1) {
  //       return;
  //     } else {
  //       setQuantity(quantity - 1);
  //     }
  //   }
  // };
  const handleQuantity = (type) => {
    if (type === "increase") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-[200px] flex items-center justify-center">
          <ClipLoader
            loading={loading}
            size={60}
            color={"#3644d6"}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="w-main flex flex-col  ">
          <BreadCrumbs title={product?.name} category={category_id?.name} />

          <div className="w-full flex">
            <div className="ml-4 w-[70%] flex flex-col gap-4 ">
              <div className="flex gap-2 w-full">
                <div className="w-[50%] m-4 bg-white rounded-xl ">
                  <div className="w-[368px] border m-6 rounded-xl h-[360px]">
                    <img src={product?.thumbnail} alt="thumb" />
                  </div>
                  {/* <div className="m-6 w-full flex gap-2">
                    {product?.images?.map((el, index) => (
                      <div
                        key={index}
                        className="w-[53px] h-[53px] border rounded-lg"
                      >
                        <img
                          className="w-[38px] h-[38px] text-center mx-2 my-2 "
                          src={el?.split(",")[0].split(" ")[0]}
                          alt=""
                        />
                      </div>
                    ))}
                  </div> */}
                </div>
                <div className="w-[43%] rounded-xl flex-col my-4  bg-white">
                  <div className="flex p-4 pb-1 items-center gap-2">
                    <img
                      className="w-[89px] h-[20px]"
                      src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                      alt=""
                    />

                    <p className="font-normal flex gap-1  text-sm">
                      <span>Thương hiệu:</span>
                      {/* <Link to={product?.brandLink} className="">
                        <span className="text-blue-700 cursor-pointer">
                          {product?.brand}
                        </span>
                      </Link> */}
                    </p>
                  </div>
                  <div className="px-4 flex flex-col gap-2">
                    <h3 className="font-medium text-xl">{product?.name}</h3>
                    <div className="flex items-center gap-2 text-sm ">
                      <span className="text-gray-400 flex gap-1">
                        {renderStartFromNumber(Number(5))}
                      </span>
                      <div className="w-[1px] h-[12px] bg-gray-300 mx-[-1px] mt-[2px]"></div>
                      <span className="text-gray-400">
                        Đã bán {product?.sold}
                      </span>
                    </div>
                    <div className="font-semibold text-2xl">
                      {formatMoney(product?.price)}
                      <sup>đ</sup>
                    </div>
                  </div>
                  <div className="w-[330px] p-4 gap-4  flex flex-col h-[141px]">
                    {product?.color?.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-sm">Màu sắc</h3>
                        <span className="flex  gap-2  flex-wrap  ">
                          {product?.color?.map((el, index) => (
                            <span
                              key={index}
                              className="w-[143px] rounded-md flex h-[52px] items-center justify-center bg-gray-200 border active:border-blue-500"
                            >
                              {el}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[96%] m-4 bg-white rounded-lg">
                <div className="p-4">
                  <h3>Khách hàng đánh giá</h3>
                  <div className="my-2">
                    <span className="">Tổng quan</span>
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <div className="flex items-center gap-4">
                      <span>4.8</span>
                      <CiStar />
                    </div>
                    <span>(9) đánh giá</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex">
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                    </div>
                    <div className="flex">
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[28%] flex flex-col m-4 ml-0  gap-2">
              <div className=" bg-white  rounded-xl p-4 flex-col flex gap-4">
                <div className="flex items-start">
                  <div className="flex gap-2">
                    <span>Thương hiệu:</span>
                    <a href={product?.brandLink}>
                      <span className="font-medium text-base">
                        {product?.brand}
                      </span>
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="w-[40px] h-[40px]"
                    src={product?.thumb?.[0]?.split(",")[0].split(" ")[0]}
                    alt=""
                  />
                  <span className="font-normal text-base">
                    {product?.color ? product?.color[0] : ""}
                  </span>
                </div>
                <div className="flex flex-col  gap-2">
                  <span className="font-medium">Số lượng</span>
                  <div className="flex items-center gap-2">
                    <div className="w-[33px] h-[33px] rounded-lg border ">
                      <button
                        onClick={() => handleQuantity("reduce")}
                        className="p-2"
                      >
                        <FiMinus
                          className={
                            quantity === 1 ? "text-gray-200" : "text-gray-500"
                          }
                        />
                      </button>
                    </div>
                    <div className="w-38px] h-[32px] rounded-lg border ">
                      <span className="p-4">{quantity}</span>
                    </div>
                    <div className="w-[34px] h-[34px] rounded-lg border ">
                      <button
                        className="p-2"
                        onClick={() => handleQuantity("increase")}
                      >
                        <GoPlus className="text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Tạm tính</span>
                  <div className="flex font-semibold text-2xl">
                    {formatMoney(product?.price * quantity)}
                    <sub className="">đ</sub>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    name="Mua ngay"
                    fw
                    handleOnclick={() => handleClickOptions("BUY")}
                  />
                  <Button
                    style={`w-full px-4 py-2 rounded-md border  border-blue-500 text-blue-500 bg-white`}
                    name="Thêm vào giỏ"
                    handleOnclick={() => handleClickOptions("CART")}
                  />
                </div>
              </div>
              <div className="w-[360px] h-[120px]">
                <img
                  className="rounded-xl"
                  src="https://salt.tikicdn.com/ts/tka/1f/10/e6/5f2bc6b51044a22e322810a07cdf7b28.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* <div className="m-4 flex ">
            <div className="bg-white w-full p-4 rounded-xl flex flex-col gap-4 ">
              <h3 className="font-medium">Sản phẩm tương tự</h3>
              <div className="flex gap-2">
                {productCate?.map((el) => (
                  <div className="flex gap-2">
                    <NavLink
                      to={`/${el?.type}/${el?._id}/${el?.slug}`}
                      key={el?._id}
                    >
                      <div className="w-[142px]  hover:rounded-lg h-[240px] hover:bg-gray-100 cursor-pointer flex flex-col gap-2">
                        <img
                          className="rounded-t-lg w-full h-[148px]"
                          src={el.thumb?.[0]?.split(",")[0].split(" ")[0]}
                          alt="home_product"
                        />
                        <div className="px-2 flex flex-col w-full h-[80px]">
                          <p className="text-xs  font-light h-[36px] text-gray-800 overflow-hidden justify-center flex pl-2 ">
                            {el?.title}
                          </p>
                          <span className="flex gap-1 items-center justify-center">
                            {renderStartFromNumber(Number(5), 12)}
                          </span>
                          <div className="flex  justify-center">
                            <div className="font-medium">
                              {formatMoney(product?.prices)}
                            </div>
                            <sup className="top-[0.5em]">đ</sup>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default ProductCard;
