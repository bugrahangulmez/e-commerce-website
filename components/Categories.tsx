"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  filterProducts,
  selectedCategories,
  setCategories,
} from "@/redux/shopSlice";
import { useEffect } from "react";

const Categories = ({ catgories }: { catgories: CategoryObj[] }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCategories(catgories));
  }, []);
  const { isCategoriesOpen, categories: categoryList } = useAppSelector(
    (store) => store.shop
  );

  const handleSelectCategory = (val: CategoryObj) => {
    const newList = categoryList.map((item) =>
      item.categoryName === val.categoryName
        ? { ...item, isSelected: !item.isSelected }
        : item
    );
    dispatch(setCategories(newList));
  };
  const handleFilterProducts = () => {
    dispatch(selectedCategories(categoryList));
    dispatch(filterProducts());
  };
  return (
    <div
      className={`fixed min-h-screen top-20 bg-red-500 ${
        isCategoriesOpen ? "w-2/12" : "hidden"
      }`}
    >
      {categoryList.map((item) => (
        <div key={item.categoryName} className="flex gap-2 p-[4px]">
          <input
            type="checkbox"
            checked={item.isSelected}
            onChange={() => {
              handleSelectCategory(item);
            }}
          />
          <button
            onClick={() => {
              handleSelectCategory(item);
            }}
          >
            <h2>
              {item.categoryName.charAt(0).toUpperCase() +
                item.categoryName.slice(1)}
            </h2>
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          handleFilterProducts();
        }}
      >
        Filter Products
      </button>
    </div>
  );
};
export default Categories;
