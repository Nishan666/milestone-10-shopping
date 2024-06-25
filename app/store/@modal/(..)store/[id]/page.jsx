"use client";

import ProductModal from "@/components/ProductModal";
import { fetchProductById } from "@/services/product";
import React, { useEffect, useState } from "react";

import TextTruncate from "react-text-truncate";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Page = ({ params }) => {
  const id = params.id;
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

  return (
    <ProductModal>
      <div className="card bg-base-100 shadow-xl">
        <figure className="overflow-hidden rounded-t-lg">
          <Image
            src={
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            }
            alt={product.title}
            width={100}
            height={200}
            layout="responsive"
            className="object-cover"
          />
        </figure>
        <div className="card-body p-5 text-xl font-bold">
          <h2 className="card-title text-base font-semibold">
            {product.title.length > 20
              ? `${product.title.substring(0, 20)}...`
              : product.title}
          </h2>
          <p className="text-sm font-medium text-gray-400">
            Category: <span>{product.category.name}</span>
          </p>
          <p className="text-sm font-medium text-gray-400">
            <TextTruncate
              line={3}
              element="span"
              truncateText="…"
              text={product.description}
            />
          </p>
          <h3 className="font-semibold">{product.price}$</h3>
          <div className="card-actions flex justify-start items-center">
            <button
              type="button"
              onClick={() => handleAddToCart(product)}
              className="btn btn-sm btn-primary border-0 bg-[#228be6]"
            >
              <ShoppingCartIcon className="w-4 h-4 p-0 m-0" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </ProductModal>
  );
};

export default Page;
