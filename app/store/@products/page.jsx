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

  const fetchMoreData = () => {
    const newOffset = offset + OFFSET_SIZE;
    setOffset(newOffset);
    dispatch(fetchProducts({ offset: newOffset, filters }));
  };

  const handleAddToCart = (product) => {
    dispatch(addItem({ id: product.id, quantity: 1 }));
  };

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchMoreData}
      hasMore={
        status !== "loading" && status !== "idle"
          ? products.length < OFFSET_SIZE
            ? false
            : true
          : true
      }
      loader={
        <div className="grid grid-cols-3 gap-6 ms-6 my-4 me-28">
          {Array.from({ length: OFFSET_SIZE }).map(
            (_, index) => (
              <ProductSkeleton key={index} />
            )
          )}
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
  );
};

export default Page;
