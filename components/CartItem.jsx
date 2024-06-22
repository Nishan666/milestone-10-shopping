'use client'

import { fetchProductById } from "@/services/product";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CartItem = ({id , quantity}) => {

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between py-1">
        <div className="flex">
          <Image
            className="object-cover h-24 w-24 rounded-md"
            src={
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
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
        <div>
          <button className="btn btn-outline btn-info">Info</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
CartItem;
