import React, { memo, useEffect, useState } from "react";
// import banner from "../../../assets/images/banner.webp";
import { Link } from "react-router-dom";
import path from "../../../utils/path";
import { apiGetBanner } from "../../../services/productService";
const Banner = ({ banner }) => {
  // const [banner, setBanner] = useState("");
  // const [loading, setLoading] = useState(true);
  // const getApiBanner = async () => {
  //   const response = await apiGetBanner();
  //   if (response.status === "Success") {
  //     setBanner(response.data);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   getApiBanner();
  // }, []);
  let fourBanners;
  let fourBannersEnd;
  if (banner) {
    fourBanners = banner.slice(0, 4);
    fourBannersEnd = banner.slice(4, 8);
  }
  return (
    <div className="bg-white rounded-md w-full flex items-center justify-center ">
      <div className="pl-4">
        <img
          src={banner[8]?.url}
          alt=""
          className="w-[406px] h-[306px] rounded-xl object-cover "
        />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-3">
          {fourBanners?.map((el) => (
            <Link to={path.LOGIN} key={el?.id}>
              <img
                src={el?.url}
                alt=""
                className="w-[146px] h-[146px] rounded-xl"
              />
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          {fourBannersEnd?.map((el) => (
            <Link to={path.LOGIN} key={el?.id}>
              <img
                src={el?.url}
                alt=""
                className="w-[146px] h-[146px] rounded-xl"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Banner);
