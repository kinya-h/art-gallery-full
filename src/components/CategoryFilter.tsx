import { BsFilterCircleFill } from "react-icons/bs";
import { useState } from "react";

const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setTimeout(() => {
      setSelectedCategory("");
    }, 2000);
  };

  return (
    <div>
      {selectedCategory && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Selected:{selectedCategory}</span>
          </div>
        </div>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1 ">
          <BsFilterCircleFill size={24} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a onClick={() => handleCategoryClick("Painting")}>Painting</a>
          </li>
          <li>
            <a onClick={() => handleCategoryClick("Drawing")}>Drawing</a>
          </li>
          <li>
            <a onClick={() => handleCategoryClick("Photograph")}>Photograph</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
