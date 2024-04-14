import React, { useEffect, useState } from "react";
import { Button } from "../../atoms";
import { Link, Navigate, useNavigate } from "react-router-dom";
import path from "../../../utils/path";
import icons from "../../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../../../stores/actions/userAction";
import ClipLoader from "react-spinners/ClipLoader";

import {
  apiGetOrderDetailByOidDetal,
  apiGetOrderProduct,
  apiGetProduct,
  apiGetProductById,
  apiOrdersProduct,
  apiUpdateOrderDetailByPidAndOid,
} from "../../../services/productService";
import { emtyCart } from "../../atoms/images";
import { formatMoney, renderStartFromNumber } from "../../../utils/helper";
import { apiRemoveCart, apiUpdateCart } from "../../../services/userService";
import { useForm } from "react-hook-form";
import { encrypt, decrypt, compare } from "n-krypta";
import { Base64 } from "js-base64";
import {
  apiGetProductAction,
  getProductByOidDetail,
} from "../../../stores/actions/prodAction";
const { CiStar, RiDeleteBin6Line, CiDeliveryTruck, GoPlus, FiMinus } = icons;
const Cart = () => {
  const dispatch = useDispatch();
  const day = new Date();
  const secret = "my-secret";

  const { currentData } = useSelector((state) => state.user);
  const [products, setProducts] = useState(null);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [saveProd, setSaveProd] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [account, setAccount] = useState(null);
  const getApiProduct = async () => {
    const response = await apiGetProduct({
      limit: 5,
      page: 3,
    });
    if (response?.success) setProducts(response?.products);
  };
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const handleRemoveProduct = async (id) => {
    const response = await apiRemoveCart(id);
    if (response?.success) {
      dispatch(getCurrent());

      const value = JSON.parse(localStorage.getItem("selectedId"));

      if (value) {
        for (let i = 0; i < localStorage.length; i++) {
          const getIds = value?.filter((item) => id !== item);
          localStorage.setItem("selectedId", JSON.stringify(getIds));
          console.log(getIds.length === 0);
          if (getIds.length === 0) {
            localStorage.removeItem("selectedId");
            localStorage.removeItem("allCheckbox");
          }
        }
      }

      localStorage.removeItem(id.slice(-4));
      localStorage.removeItem(id);
    }
  };
  // useEffect(() => {
  //   getApiProduct();
  // }, []);
  const getLocal = (id) => localStorage.getItem(id);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItem([...selectedItem, value]);
      filterProd()?.map((el) => {
        if (el?.id !== value) {
          el.isChecked = true;
          localStorage.setItem("checked" + value, JSON.stringify(isChecked));
        }
      });
    } else {
      filterProd()?.map((el) => {
        if (el?.id === value) {
          el.isChecked = false;
        }
      });
      setSelectedItem((prev) => {
        return prev.filter((id) => {
          return id !== value;
        });
      });
      localStorage.removeItem("checked" + value);
      localStorage.removeItem("selectedId");
    }
  };
  const checkAllHanler = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const postIds = filterProd()?.map((item) => {
        item.isChecked = true;
        localStorage.setItem("checked" + item?.id, JSON.stringify(isChecked));
        // item.isChecked = isChecked;
        // for (let i = 0; i < localStorage.length; i++) {
        //   const key = localStorage.key(i);
        //   const value = JSON.parse(localStorage.getItem(key));
        //   currentData?.cart?.map((el) => {
        //     if (el?.product?._id.slice(-4) === key.slice(-4))
        //       el.isChecked = value;
        //   });
        // }

        return item?.id;
      });
      setSelectedItem(postIds);
      localStorage.setItem("selectedId", JSON.stringify(postIds));
    } else {
      // currentData?.cart?.map((item) => {
      //   item.isChecked = false;
      // });
      // console.log(currentData?.cart);
      filterProd()?.map((item) => {
        localStorage.removeItem("checked" + item?.id);
      });
      localStorage.removeItem("selectedId");
      setSelectedItem([]);
    }
  };

  // const isValue = currentData?.cart?.map((item) => {
  //   return item;
  // });
  const filterProd = () => {
    const data = [];

    if (saveProd) {
      saveProd?.map((el) => {
        if (order) {
          order?.map((or) => {
            if (or?.product_id === el?.id) {
              data.push(el);
            }
          });
        }
      });
    }

    return data;
  };
  function getKeysFromLocalStorage() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        filterProd()?.map((item) => {
          if ("checked" + item?.id === key) {
            keys.push(key);
          }
        });
      }
    }

    return keys;
  }
  const getKeys = getKeysFromLocalStorage();
  getKeys.map((el) => {
    filterProd().filter((item) => {
      if (el === "checked" + item?.id) {
        item.isChecked = true;
      }
    });
  });
  // const findIsCheckedFromCurrent = filterProd()?.filter((item) => {
  //   return item.isChecked;
  // });

  // useEffect(() => {

  // }, [findIsCheckedFromCurrent]);

  if (getKeys.length === filterProd()?.length) {
    filterProd()?.map((item) => {
      item.isChecked = true;
    });
  } else {
    filterProd()?.map((item) => {
      if (getKeysFromLocalStorage().includes("checked" + item?.id)) {
        item.isChecked = true;
      } else {
        item.isChecked = false;
      }
    });
  }
  const findIsChecked = filterProd()?.filter((item) => item.isChecked === true);
  const postIds = findIsChecked?.map((item) => {
    return item?.id;
  });
  if (
    filterProd()?.length > 0 &&
    findIsChecked?.length === filterProd()?.length
  ) {
    localStorage.setItem("allCheckbox", JSON.stringify(true));
    localStorage.setItem("selectedId", JSON.stringify(postIds));
  } else {
    localStorage.removeItem("allCheckbox");
    localStorage.removeItem("selectedId");
  }

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("selectedId"))?.length ===
      filterProd()?.length
    ) {
      setIsAllChecked(true);
      localStorage.setItem("allCheckbox", JSON.stringify(true));
    } else if (
      JSON.parse(localStorage.getItem("selectedId"))?.length !==
      filterProd()?.length
    ) {
      setIsAllChecked(false);
      localStorage.removeItem("allCheckbox");
      localStorage.removeItem("selectedId");
    }
  }, [JSON.parse(localStorage.getItem("selectedId"))]);
  const handleQuantity = async (id, type) => {
    let local = getLocal(id);
    const findProduct = filterProd()?.filter((el) => el.id === id);
    const findElOrderDetail = order?.filter(
      (el) => findProduct[0]?.id === el?.product_id
    );
    if (type === "increase" && findProduct) {
      const updatedQuantity = Number(local) + 1;
      localStorage.setItem(id, JSON.stringify(updatedQuantity));
      // findProduct[0].quantity = updatedQuantity;

      const response = await apiUpdateOrderDetailByPidAndOid(
        order[0]?.order_id,
        findElOrderDetail[0]?.id,
        {
          amount: updatedQuantity,
          price: findProduct[0]?.price,
          discount: "10",
          order_id: order[0]?.order_id,
          product_id: findProduct[0]?.id,
        }
      );
      if (response?.status === "Success") {
        setTimeout(() => {
          dispatch(getCurrent());
        }, 100);
      }
    } else {
      if (type === "reduce" && findProduct) {
        if (Number(local) <= 1) {
          const response = await apiRemoveCart(id);
          if (response?.success) {
            dispatch(getCurrent());
            localStorage.removeItem("checked" + id);
            localStorage.removeItem(id);

            const value = JSON.parse(localStorage.getItem("selectedId"));
            if (value) {
              for (let i = 0; i < localStorage.length; i++) {
                const getIds = value?.filter((item) => id !== item);
                localStorage.setItem("selectedId", JSON.stringify(getIds));
                if (getIds.length === 0) {
                  localStorage.removeItem("selectedId");
                  localStorage.removeItem("allCheckbox");
                }
              }
            }
          }
        } else {
          const updatedQuantity = Number(local) - 1;
          localStorage.setItem(id, JSON.stringify(updatedQuantity));
          const response = await apiUpdateOrderDetailByPidAndOid(
            order[0]?.order_id,
            findElOrderDetail[0]?.id,
            {
              amount: updatedQuantity,
              price: findProduct[0]?.price,
              discount: "10",
              order_id: order[0]?.order_id,
              product_id: findProduct[0]?.id,
            }
          );
          if (response?.status === " Success") {
            setTimeout(() => {
              dispatch(getCurrent());
            }, 100);
          }
        }
      }
    }
  };

  const getOrder = async () => {
    const response = await apiGetOrderProduct();
    if (response.status === "Success") {
      const findCurrentUser = response?.data?.filter(
        (el) => el.user_id === currentData?.id
      );
      // console.log(findAllOrders);
      if (findCurrentUser) {
        const getAllOrders = await apiGetOrderDetailByOidDetal(
          findCurrentUser[0]?.id
        );
        if (getAllOrders?.status === "Success") setOrder(getAllOrders.data);
      }
    }
  };

  const getAllProducts = async () => {
    const response = await apiGetProduct();
    if (response.status === "Success") {
      setSaveProd(response.data);
      // response?.data?.map((el) => {
      //   if (order) {
      //     order?.map((or) => {
      //       if (or?.product_id === el?.id) {
      //         setSaveProd(el);
      //       }
      //     });
      //   }
      // });
    }
  };
  const handleSetLocal = () => {
    const selected = [];
    order?.map((el) => {
      filterProd().map((or) => {
        if (el?.product_id === or?.id) {
          el.name = or.name;
          el.thumbnail = or.thumbnail;
          el.isChecked = or.isChecked;
          selected.push(el);
        }
      });
      localStorage.setItem("cart", JSON.stringify(selected));

      // const encodedData = Base64.encode(
      //   localStorage.setItem("cart", JSON.stringify(selected))
      // );

      // console.log(encodedData);
    });
  };
  useEffect(() => {
    setLoading(true);
    getOrder() && getAllProducts();
    setTimeout(() => {
      filterProd();
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
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
          <div className="w-full flex">
            {filterProd()?.length > 0 ? (
              <div className="ml-4 w-[70%] flex flex-col">
                <div className="flex flex-col w-full">
                  <h3 className="text-xl font-medium p-4 pb-0 ">GIỎ HÀNG</h3>
                  {filterProd()?.length === 0 ? (
                    <div className="w-full flex-col">
                      <div className="flex items-center justify-center">
                        <img
                          src={emtyCart}
                          alt=""
                          className="flex w-[160px] h-[160px] items-center justify-center"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="font-semibold text-lg">
                          Giỏ hàng trống
                        </h1>
                        <p>
                          Bạn tham khảo thêm các sản phẩm được Tiki gợi ý bên
                          dưới nhé!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="m-4 flex ">
                        <div className="bg-white w-full p-4 rounded-xl">
                          <div className="flex justify-between items-center ">
                            <div className="flex gap-2 w-[324px] ">
                              <input
                                type="checkbox"
                                name="all-checkbox"
                                onChange={checkAllHanler}
                                checked={Boolean(
                                  JSON.parse(
                                    localStorage.getItem("allCheckbox")
                                  )
                                )}
                              />
                              <span>Tất cả </span>
                              <span>({filterProd()?.length} sản phẩm)</span>
                            </div>
                            <span>Đơn giá</span>
                            <span>Số lượng</span>
                            <span>Thành tiền</span>
                            <span>
                              <RiDeleteBin6Line />
                            </span>
                          </div>
                        </div>
                      </div>
                      {filterProd() &&
                        filterProd()?.map((el) => (
                          <div className="mx-4   flex " key={el.id}>
                            <div className="bg-white w-full p-4 rounded-xl">
                              <div className="flex justify-between items-center ">
                                <div className=" w-[324px] gap-2 flex ">
                                  <input
                                    type="checkbox"
                                    value={el?.id}
                                    checked={Boolean(
                                      localStorage.getItem("checked" + el?.id)
                                    )}
                                    onChange={handleChange}
                                  />

                                  <div className="w-[80px] h-[80px]">
                                    <Link>
                                      <img src={el?.thumbnail} alt="" />
                                    </Link>
                                  </div>
                                  <div className="flex flex-col gap-1 w-[202px]">
                                    <span className="overflow-ellipsis overflow-hidden text-sm font-normal">
                                      {el?.name}
                                    </span>
                                    {/* <span className="text-xs text-gray-400">
                                  {el?.color === "Không có" ? "" : el?.color}
                                </span> */}
                                    <div className="flex gap-2 text-xs  font-normal">
                                      <span className="w-[32px] h-[16px]">
                                        {/* <CiDeliveryTruck className="w-full" /> */}
                                        <img
                                          src="https://salt.tikicdn.com/cache/w96/ts/tka/65/be/89/d0c3208134f19e4bab8b50d81b41933a.png"
                                          alt=""
                                        />
                                      </span>

                                      <span>
                                        Giao thứ {day.getDay() + 3},{" "}
                                        {day.getDate() + 2}/{" "}
                                        {day.getMonth() + 1}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex">
                                  {formatMoney(el?.price)}
                                  <sub>₫</sub>
                                </div>
                                <div>
                                  <div className="flex">
                                    <div className="w-[23px] h-[24px] rounded-l-sm border pl-[2px] ">
                                      <button
                                        className=""
                                        onClick={() =>
                                          handleQuantity(el?.id, "reduce")
                                        }
                                      >
                                        <FiMinus />
                                      </button>
                                    </div>
                                    <div className="w-[32px] h-[24px]  border">
                                      <span id="product" className=" p-3">
                                        {getLocal(el?.id)}
                                      </span>
                                    </div>
                                    <div className="w-[23px] h-[24px] rounded-r-sm border pl-[2px] ">
                                      <button
                                        className=""
                                        onClick={() =>
                                          handleQuantity(el?.id, "increase")
                                        }
                                      >
                                        <GoPlus />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex">
                                  {formatMoney(el?.price * getLocal(el?.id))}
                                  <sub>₫</sub>
                                </div>
                                <span
                                  onClick={() =>
                                    handleRemoveProduct(el?.product?._id)
                                  }
                                >
                                  <RiDeleteBin6Line />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
                <div className="w-[96%] m-4 bg-white rounded-lg">
                  <div className="m-4 flex ">
                    <div className="bg-white w-full p-4 rounded-xl flex flex-col gap-4 ">
                      <h3 className="font-medium">Sản phẩm mua kèm</h3>
                      <div className="flex gap-2">
                        {filterProd()?.map((el) => (
                          <div key={el?.id} className="flex gap-2">
                            <Link to={`/${el?.type}/${el?.id}/`}>
                              <div className="w-[142px]  hover:rounded-lg h-[240px] hover:bg-gray-100 cursor-pointer flex flex-col gap-2">
                                <img
                                  className="rounded-t-lg w-full h-[148px]"
                                  src={el?.thumbnail}
                                  alt=""
                                />
                                <div className="px-2 flex flex-col w-full h-[80px]">
                                  <p className="text-xs font-light h-[36px] text-gray-800 overflow-hidden break-words whitespace-break-spaces ">
                                    {el?.name}
                                  </p>
                                  {/* <span className="flex gap-1">
                                {renderStartFromNumber(Number(5))}
                              </span> */}
                                  <div className="flex">
                                    <div className="font-medium">
                                      {formatMoney(el?.price)}
                                    </div>
                                    <sup className="top-[0.5em]">đ</sup>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="ml-4 w-full flex flex-col">
                <div className="flex flex-col w-full">
                  <h3 className="text-xl font-medium p-4 pb-0 ">GIỎ HÀNG</h3>
                  {filterProd()?.length === 0 ? (
                    <div className="w-[96%] mx-4 bg-white flex-col">
                      <div className="p-4">
                        <div className="flex  items-center justify-center">
                          <img
                            src={emtyCart}
                            alt=""
                            className="flex w-[160px] h-[160px] items-center justify-center"
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <h1 className="font-semibold text-lg">
                            Giỏ hàng trống
                          </h1>
                          <p>
                            Bạn tham khảo thêm các sản phẩm được Tiki gợi ý bên
                            dưới nhé!
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="m-4 flex ">
                        <div className="bg-white w-full p-4 rounded-xl">
                          <div className="flex justify-between items-center ">
                            <div className="flex gap-2 w-[324px] ">
                              <input
                                type="checkbox"
                                name="all-checkbox"
                                onChange={checkAllHanler}
                                checked={Boolean(
                                  JSON.parse(
                                    localStorage.getItem("allCheckbox")
                                  )
                                )}
                              />
                              <span>Tất cả </span>
                              <span>({filterProd()?.length} sản phẩm)</span>
                            </div>
                            <span>Đơn giá</span>
                            <span>Số lượng</span>
                            <span>Thành tiền</span>
                            <span>
                              <RiDeleteBin6Line />
                            </span>
                          </div>
                        </div>
                      </div>
                      {filterProd() &&
                        filterProd?.map((el) => (
                          <div className="mx-4   flex " key={el.id}>
                            <div className="bg-white w-full p-4 rounded-xl">
                              <div className="flex justify-between items-center ">
                                <div className=" w-[324px] gap-2 flex ">
                                  <input
                                    type="checkbox"
                                    value={el?.id}
                                    checked={Boolean(
                                      localStorage.getItem("checked" + el?.id)
                                    )}
                                    onChange={handleChange}
                                  />

                                  <div className="w-[80px] h-[80px]">
                                    <Link>
                                      <img src={el?.thumbnail} alt="" />
                                    </Link>
                                  </div>
                                  <div className="flex flex-col gap-1 w-[202px]">
                                    <span className="overflow-ellipsis overflow-hidden text-sm font-normal">
                                      {el?.name}
                                    </span>
                                    {/* <span className="text-xs text-gray-400">
                                  {el?.color === "Không có" ? "" : el?.color}
                                </span> */}
                                    <div className="flex gap-2 text-xs  font-normal">
                                      <span className="w-[32px] h-[16px]">
                                        {/* <CiDeliveryTruck className="w-full" /> */}
                                        <img
                                          src="https://salt.tikicdn.com/cache/w96/ts/tka/65/be/89/d0c3208134f19e4bab8b50d81b41933a.png"
                                          alt=""
                                        />
                                      </span>

                                      <span>
                                        Giao thứ {day.getDay() + 3},{" "}
                                        {day.getDate() + 2}/{" "}
                                        {day.getMonth() + 1}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex">
                                  {formatMoney(el?.price)}
                                  <sub>₫</sub>
                                </div>
                                <div>
                                  <div className="flex">
                                    <div className="w-[23px] h-[24px] rounded-l-sm border pl-[2px] ">
                                      <button
                                        className=""
                                        onClick={() =>
                                          handleQuantity(el?.id, "reduce")
                                        }
                                      >
                                        <FiMinus />
                                      </button>
                                    </div>
                                    <div className="w-[32px] h-[24px]  border">
                                      <span id="product" className=" p-3">
                                        {getLocal(el?.id)}
                                      </span>
                                    </div>
                                    <div className="w-[23px] h-[24px] rounded-r-sm border pl-[2px] ">
                                      <button
                                        className=""
                                        onClick={() =>
                                          handleQuantity(el?.id, "increase")
                                        }
                                      >
                                        <GoPlus />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex">
                                  {formatMoney(el?.price * getLocal(el?.id))}
                                  <sub>₫</sub>
                                </div>
                                <span
                                  onClick={() => handleRemoveProduct(el?.id)}
                                >
                                  <RiDeleteBin6Line />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
                <div className="w-[96%] m-4 bg-white rounded-lg">
                  <div className="m-4 flex ">
                    <div className="bg-white w-full p-4 rounded-xl flex flex-col gap-4 ">
                      <h3 className="font-medium">Sản phẩm mua kèm</h3>
                      <div className="flex gap-2">
                        {products?.map((el) => (
                          <div key={el?._id} className="flex gap-2">
                            <Link to={`/${el?.type}/${el?._id}/${el?.slug}`}>
                              <div className="w-[142px]  hover:rounded-lg h-[240px] hover:bg-gray-100 cursor-pointer flex flex-col gap-2">
                                <img
                                  className="rounded-t-lg w-full h-[148px]"
                                  src={
                                    el?.thumb?.[0]?.split(",")[0].split(" ")[0]
                                  }
                                  alt=""
                                />
                                <div className="px-2 flex flex-col w-full h-[80px]">
                                  <p className="text-xs font-light h-[36px] text-gray-800 overflow-hidden break-words whitespace-break-spaces ">
                                    {el?.title}
                                  </p>
                                  <span className="flex gap-1">
                                    {renderStartFromNumber(Number(5))}
                                  </span>
                                  <div className="flex">
                                    <div className="font-medium">
                                      {formatMoney(el?.prices)}
                                    </div>
                                    <sup className="top-[0.5em]">đ</sup>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {filterProd()?.length > 0 ? (
              <div className="w-[28%] flex pt-12 flex-col m-4 ml-0 gap-2">
                <div className=" bg-white  rounded-xl p-4 flex-col flex gap-4">
                  <span className="font-normal text-gray-400 text-lg overflow-ellipsis overflow-hidden  ">
                    <span>Giao tới</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-normal overflow-ellipsis overflow-hidden text-sm ">
                      <span>{currentData?.first_name}</span>
                    </span>
                    <span className="font-normal overflow-ellipsis overflow-hidden text-sm ">
                      <span>{currentData?.email}</span>
                    </span>
                  </div>
                  <span className="font-normal overflow-ellipsis overflow-hidden text-sm ">
                    <span>{currentData?.address}</span>
                  </span>
                </div>
                {/* <div className=" bg-white  rounded-xl p-4 flex-col flex gap-4">
              {currentData?.cart?.map((els) => (
                <div key={els?._id} className="flex items-center gap-2">
                  <img
                    className="w-[40px] h-[40px]"
                    src={els?.product?.thumb?.[0]?.split(",")[0].split(" ")[0]}
                    alt=""
                  />
                  <span className="font-normal text-base overflow-ellipsis overflow-hidden text-sm ">
                    <span>{els?.product?.title}</span>
                  </span>
                </div>
              ))}
            </div> */}
                <div className="bg-white  rounded-xl p-4 flex-col flex gap-4">
                  <div className="flex justify-between text-gray-400">
                    <span className="">Tạm tính</span>
                    <div className="flex  text-black">
                      224.100 <sub>₫</sub>
                    </div>
                  </div>

                  <div className="flex justify-between text-gray-400">
                    <span>Tổng tiền</span>
                    <div className="flex flex-col ">
                      <div className="flex justify-end text-red-500  text-2xl">
                        {order?.length > 0
                          ? formatMoney(
                              order?.reduce(
                                (sum, el) =>
                                  sum + el?.amount * Number(el?.price),
                                0
                              )
                            )
                          : 0}
                        <sub className="">đ</sub>
                      </div>
                      <span className="font-light text-xs">
                        (Đã bao gồm VAT nếu có)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    handleOnclick={() => {
                      navigate("/checkout/payment");
                      handleSetLocal();
                    }}
                    name={`Mua ngay (${getKeysFromLocalStorage().length}) `}
                    fw
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
