'use client'

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter, setTitleFilter, setPriceRangeFilter, resetProducts, fetchProducts, fetchCategories } from '../../GlobalRedux/feature/product/productSlice';

const Page = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.product.categories);
  const [title, setTitle] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const applyFilters = () => {
    dispatch(setTitleFilter(title));
    dispatch(setCategoryFilter(selectedCategory));
    dispatch(setPriceRangeFilter({ min: minPrice, max: maxPrice }));
    dispatch(resetProducts());
    dispatch(fetchProducts({ offset: 0, filters: { title, category: selectedCategory, priceRange: { min: minPrice, max: maxPrice } } }));
  };

  const clearFilter = () => {
    setTitle('');
    setMinPrice(0);
    setMaxPrice(3000);
    setSelectedCategory('');
    dispatch(setTitleFilter(''));
    dispatch(setCategoryFilter(''));
    dispatch(setPriceRangeFilter({ min: 0, max: 3000 }));
    dispatch(resetProducts());
    dispatch(fetchProducts({ offset: 0, filters: { title: '', category: '', priceRange: { min: 0, max: 3000 } } }));
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
    <div className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="filter-menu">
      <div className="py-1" role="none">
        <div className="px-4 py-2" role="menuitem">
          <label className="block text-sm font-medium text-gray-700">
            Category
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
              aria-label="Category"
              className="block w-full mt-1 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            >
              <option value="" className="text-blue-700 hover:bg-red-100">
                All
              </option>
              {categories && categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="text-gray-700 hover:bg-blue-100"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="px-4 py-2" role="menuitem">
          <label className="block text-sm font-medium text-gray-700">
            Search Product With Name
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full p-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              placeholder="Type a product..."
            />
          </label>
        </div>
        <div className="px-4 py-2" role="menuitem">
          <label className="block text-sm font-medium text-gray-700">
            Price Range:
            <div className="flex flex-col space-y-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(parseFloat(e.target.value))}
                onBlur={handleMinPriceBlur}
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 appearance-none"
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                onBlur={handleMaxPriceBlur}
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 appearance-none"
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </label>
        </div>
        <div className="px-4 py-2 flex justify-between gap-2" role="menuitem">
          <button
            type="button"
            onClick={applyFilters}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={clearFilter}
            className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
