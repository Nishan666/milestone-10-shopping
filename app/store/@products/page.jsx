"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../GlobalRedux/feature/product/productSlice";
import { addItem } from "../../GlobalRedux/feature/cart/cartSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Product from "@/components/Product";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";

const OFFSET_SIZE = 9;

const Page = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);
  const filters = useSelector((state) => state.product.filters);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts({ offset, filters }));
    }
  }, [status, dispatch, offset, filters]);

  useEffect(() => {
    setOffset(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters]);

  const fetchMoreData = () => {
    const newOffset = offset + OFFSET_SIZE;
    setOffset(newOffset);
    dispatch(fetchProducts({ offset: newOffset, filters }));
  };

  const handleAddToCart = (product) => {
    dispatch(addItem({ id: product.id, quantity: 1 }));
  };

  return (
    <>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={
          status !== "loading" && status !== "idle"
            ? products.length % OFFSET_SIZE !== 0 || products.length === 0
              ? false
              : true
            : true
        }
        loader={
          <div className="grid grid-cols-3 gap-6 ms-6 my-4 me-28">
            {Array.from({ length: OFFSET_SIZE }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        }
        endMessage={<div></div>}
      >
        <div className="grid grid-cols-3 gap-6 ms-6 my-2 me-28">
          {products.map((product, index) => (
            <Product
              key={index}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </InfiniteScroll>

      {status === "succeeded" && products.length === 0 && (
        <div role="alert" className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>No Products Found.</span>
        </div>
      )}
    </>
  );
};

export default Page;
