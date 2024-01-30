import React from "react";
import { BsFilterCircleFill } from "react-icons/bs";

const CategoryFilter = () => {
  return (
    <div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1 ">
          <BsFilterCircleFill size={24} />
        </div>
        <ul
          tabIndex={0}
          className=" dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
