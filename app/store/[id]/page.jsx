"use client";

import { fetchProductById } from "@/services/product";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SingleProductSkeleton from "@/components/skeleton/SingleProductSkeleton";
import TextTruncate from "react-text-truncate";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/GlobalRedux/feature/cart/cartSlice";


const Page = ({ params }) => {
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    dispatch(addItem({ id: product.id, quantity: 1 }));
  };


  if (loading) {
    return <SingleProductSkeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="card lg:card-side bg-base-100 m-12 shadow-2xl">
        <figure>
          <Image
            src={
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={product.title}
            width={100}
            height={200}
            layout="responsive"
            className="object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl font-extrabold">
            {product.title}
          </h2>
          <h3 className="text-xl font-extrabold text-gray-400">
            Category: <span>{product.category.name}</span>
          </h3>
          <p className="text-md font-medium text-gray-400 h-32 w-96">
            {product.description}
          </p>

          <div className="flex justify-between">
            <h3 className="text-2xl font-bold m-5">{product.price}$</h3>
            <div className="card-actions flex justify-start items-center">
              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className="btn btn-md btn-primary border-0 bg-[#228be6]"
              >
                <ShoppingCartIcon className="w-4 h-4 p-0 m-0" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
