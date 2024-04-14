import React, { useEffect, useState } from "react";
import { Footer, Slidebar } from "../../organisms";
import Banner from "../../organisms/Banner";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import path from "../../../utils/path";
import Product from "../../organisms/Products";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetBanner,
  apiGetCategory,
  apiGetProduct,
  apiGetProductById,
} from "../../../services/productService";
import { getCurrent } from "../../../stores/actions/userAction";

const Home = () => {
  const [banner, setBanner] = useState("");
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const getApiBanner = async () => {
    const response = await apiGetBanner();
    if (response.status === "Success") {
      setBanner(response.data);
      setLoading(false);
    }
  };

  const getApiProduct = async () => {
    const response = await apiGetProduct();
    if (response.status === "Success") {
      setProduct(response.data);
      setLoading(false);
    }
  };
  const getApiCategory = async () => {
    const response = await apiGetCategory();
    if (response.status === "Success") {
      setCategory(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getApiProduct() && getApiCategory() && getApiBanner();
    } else {
      navigate({ pathname: `/${path.LOGIN}` });
    }
  }, []);
  return (
    <div>
      {loading ? (
        ""
      ) : (
        <div className="w-main flex mt-3 ">
          <div className="flex-2 flex rounded-md bg-opacity-90 bg-white mx-6  ">
            <Slidebar category={category} />
          </div>
          <div className="flex flex-col justify-start  flex-8 rounded-lg bg-opacity-90 mr-4 h-[541px] overflow-y-auto scrollbar-hide">
            <div className="flex flex-col gap-2 ">
              <Banner banner={banner} />
              <Product product={product} category={category} />
            </div>
            {location.pathname.slice(1) === path.HOME ? <Footer /> : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
