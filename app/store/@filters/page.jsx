"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryFilter,
  setTitleFilter,
  setPriceRangeFilter,
  resetProducts,
  fetchProducts,
  fetchCategories,
} from "../../GlobalRedux/feature/product/productSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CategoryIcon from "@mui/icons-material/Category";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "@/hooks/useDebounce";

const Page = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.product.categories);
  const [title, setTitle] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [selectedCategory, setSelectedCategory] = useState("");

  const debouncedTitle = useDebounce(title, 1000);
  const debouncedMinPrice = useDebounce(minPrice, 1000);
  const debouncedMaxPrice = useDebounce(maxPrice, 1000);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTitleFilter(debouncedTitle));
    dispatch(setCategoryFilter(selectedCategory));
    dispatch(
      setPriceRangeFilter({ min: debouncedMinPrice, max: debouncedMaxPrice })
    );
    dispatch(resetProducts());
    dispatch(
      fetchProducts({
        offset: 0,
        filters: {
          title: debouncedTitle,
          category: selectedCategory,
          priceRange: { min: debouncedMinPrice, max: debouncedMaxPrice },
        },
      })
    );
  }, [
    debouncedTitle,
    selectedCategory,
    debouncedMinPrice,
    debouncedMaxPrice,
    dispatch,
  ]);

  const clearFilter = () => {
    setTitle("");
    setMinPrice(0);
    setMaxPrice(3000);
    setSelectedCategory("");
    dispatch(setTitleFilter(""));
    dispatch(setCategoryFilter(""));
    dispatch(setPriceRangeFilter({ min: 0, max: 3000 }));
    dispatch(resetProducts());
    dispatch(
      fetchProducts({
        offset: 0,
        filters: { title: "", category: "", priceRange: { min: 0, max: 3000 } },
      })
    );
  };

  const handleMinSliderChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxSliderChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  const handleMinPriceBlur = () => {
    if (minPrice >= maxPrice) {
      setMinPrice(maxPrice - 1);
    }
  };

  const handleMaxPriceBlur = () => {
    if (maxPrice <= minPrice) {
      setMaxPrice(minPrice + 1);
    }
  };

  return (
    <div className="py-0">
      <div className="px-4 pb-2 pt-0">
        <label className="label-text block text-sm font-medium">
          <CategoryIcon
            className=" text-stone-600 me-1"
            sx={{ fontSize: 20 }}
          />
          Category
          <ul className="menu block w-full mt-1 p-0 m-0 text-sm font-medium shadow-sm border-0">
            <li
              onClick={() => setSelectedCategory("")}
              className={`font-medium px-3 py-2 btn text-start block rounded-none btn-sm hover:border-l-4 hover:border-blue-800 border-r-0 border-t-0 border-b-0 ${
                selectedCategory === ""
                  ? "border-r-0 border-t-0 border-b-0 border-l-4 border-blue-800"
                  : "btn-ghost"
              } `}
            >
              All
            </li>
            {categories &&
              categories.slice(0, 4).map((category) => (
                <li
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`font-medium px-3 py-2 btn text-start block rounded-none btn-sm hover:border-l-4 hover:border-blue-800 border-r-0 border-t-0 border-b-0 ${
                    selectedCategory === category.id
                      ? "border-r-0 border-t-0 border-b-0 border-l-4 border-blue-800"
                      : "btn-ghost"
                  }`}
                >
                  {category.name}
                </li>
              ))}
            {categories.length === 0 &&
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="px-3 py-1">
                  <Skeleton width="100%" height="10px" />
                </div>
              ))}
          </ul>
        </label>
      </div>
      <div className="form-control px-4 pb-2 pt-2">
        <label className="label-text block text-sm mb-1 font-medium ">
          <SearchIcon className=" text-stone-600 me-1" sx={{ fontSize: 20 }} />
          Search Product With Name
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered input-sm block w-full p-2 mt-2 text-sm appearance-none"
            placeholder="Type a product..."
          />
        </label>
      </div>
      <div className=" form-control px-4 py-2">
        <label className="label-text block text-sm font-medium ">
          <LocalAtmIcon
            className=" text-stone-600 me-1"
            sx={{ fontSize: 20 }}
          />{" "}
          Price Range:
          <div className="flex flex-col space-y-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => {
                let value = parseFloat(e.target.value) || 0;
                if (value > 1) {
                  value = value.toString().replace(/^0+/, "");
                }
                setMinPrice(value);
              }}
              onBlur={handleMinPriceBlur}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full p-2 text-sm input input-bordered input-sm mt-2"
              placeholder="Min Price"
              min="0"
              max="3000"
              step="100"
            />
            <input
              type="range"
              min="0"
              max="3000"
              value={minPrice}
              onChange={handleMinSliderChange}
              step="100"
              className="w-full range range-xs range-info"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => {
                let value = parseFloat(e.target.value) || 0;
                if (value > 1) {
                  value = value.toString().replace(/^0+/, "");
                }
                setMaxPrice(value);
              }}
              onBlur={handleMaxPriceBlur}
              className="my-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full p-2 text-sm input input-bordered input-sm"
              placeholder="Max Price"
              min="0"
              max="3000"
              step="100"
            />
            <input
              type="range"
              min="0"
              max="3000"
              value={maxPrice}
              onChange={handleMaxSliderChange}
              step="100"
              className="w-full range range-xs range-info"
            />
          </div>
        </label>
      </div>
      <div className="px-4 py-4 flex justify-start gap-2">
        <button
          type="button"
          onClick={clearFilter}
          className="w-1/2 btn btn-outline btn-error font-bold rounded-lg text-sm px-4 btn-sm"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Page;
