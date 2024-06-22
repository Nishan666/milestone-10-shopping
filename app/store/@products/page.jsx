'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import TextTruncate from "react-text-truncate";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../GlobalRedux/feature/product/productSlice';
import { addItem } from '../../GlobalRedux/feature/cart/cartSlice';
import InfiniteScroll from 'react-infinite-scroll-component';

const Page = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);
  const status = useSelector(state => state.product.status);
  const filters = useSelector(state => state.product.filters);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts({ offset, filters }));
    }
  }, [status, dispatch, offset, filters]);

  const fetchMoreData = () => {
    const newOffset = offset + 10;
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
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="grid grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure className="overflow-hidden rounded-t-lg">
              <Image
                src={"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"}
                alt={product.title}
                width={100}
                height={200}
                layout="responsive"
                className="object-cover"
              />
            </figure>
            <div className="card-body p-5 text-xl font-bold">
              <h2 className="card-title text-base font-semibold">
                {product.title.length > 20 ? `${product.title.substring(0, 20)}...` : product.title}
              </h2>
              <p className="text-sm text-gray-400">
                Category: <span>{product.category.name}</span>
              </p>
              <p className="text-sm text-gray-400">
                <TextTruncate
                  line={3}
                  element="span"
                  truncateText="…"
                  text={product.description}
                />
              </p>
              <div className="card-actions flex justify-end">
                <button type="button" onClick={() => handleAddToCart(product)} className="btn btn-sm btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Page;
