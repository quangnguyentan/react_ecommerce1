import React from "react";
import { Link, NavLink } from "react-router-dom";
import path from "../../../utils/path";
import { categories, navigation } from "../../../utils/constant";
import { createSlug } from "../../../utils/helper";

const Slidebar = ({ category }) => {
  return (
    <div>
      {category ? (
        <div className="overflow-y-auto max-h-[529px] scrollbar-hide ">
          <p className="font-semibold px-2 py-2 text-sm">Danh mục</p>

          {category?.map((el) => (
            <div className="py-2 px-4 mx-2 break-words whitespace-normal hover:rounded-lg hover:bg-gray-200 text-sm">
              <NavLink
                key={el?.id}
                to={el?.slug}
                className="flex gap-2 items-center "
              >
                <img
                  className="w-[32px] h-[32px]"
                  src={el?.icon_url}
                  alt="categoryImage"
                />
                <p>{el?.name}</p>
              </NavLink>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Slidebar;
