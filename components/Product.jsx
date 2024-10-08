import React, { useState } from "react";
import TextTruncate from "react-text-truncate";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LaunchIcon from "@mui/icons-material/Launch";
import Link from "next/link";

const Product = ({ product, handleAddToCart }) => {
  const [loading, setLoading] = useState(false);

  const handleClickRedirect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="overflow-hidden rounded-t-lg">
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
          {loading ? (
            <span className="loading loading-ring loading-md"></span>
          ) : (
            <Link
              href={`/store/${product.id}`}
              onClick={handleClickRedirect}
              className="btn btn-xs btn-primary bg-[#15aabf] outline-0 border-0 p-0 m-0  rounded-md"
            >
              <LaunchIcon className="p-0 mx-1" sx={{ fontSize: 18 }} />
            </Link>
          )}
          <button
            type="button"
            onClick={() => handleAddToCart(product)}
            className="btn btn-sm btn-primary border-0 bg-[#228be6]"
          >
            <ShoppingCartIcon sx={{ fontSize: 18 }}  />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
