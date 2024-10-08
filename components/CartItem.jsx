"use client";

import { fetchProductById } from "@/services/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CartSkeleton from "./skeleton/CartSkeleton";

const CartItem = ({
  id,
  quantity,
  handleRemoveEntireProduct,
  handleRemoveOneQuantity,
  handleAddOneQuantity,
}) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        if (!data) {
          handleRemoveEntireProduct({ id: id });
        } else {
          setProduct(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [handleRemoveEntireProduct, id]);

  if (loading) {
    return <CartSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-between py-1">
      <div className="flex">
        <Image
          className="object-cover h-24 w-24 rounded-sm"
          src={
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          width={100}
          height={100}
          alt="NO Img"
        />
        <div className="px-5 py-1">
          <p className="font-medium text-xl">{product.title}</p>
          <p className="py-1 font-medium text-xl">${product.price}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          className="btn btn-primary btn-sm bg-info border-none rounded-md hover:btn-error"
          onClick={() => handleRemoveEntireProduct(product)}
        >
          Remove
        </button>
        <button
          className="btn btn-primary btn-sm bg-info border-none rounded-md"
          onClick={() => handleRemoveOneQuantity(product)}
          disabled={quantity < 2 ? true : false}
        >
          -
        </button>
        <span className="font-bold">{quantity}</span>
        <button
          className="btn btn-primary btn-sm bg-info rounded-md border-none"
          onClick={() => handleAddOneQuantity(product)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
CartItem;
