"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getDate = async () => {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/products?offset=0&limit=100"
      );
      const data = await response.json();
      console.log(data);
      setProducts(data);
    };
    getDate();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 ">
      {products &&
        products.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-xl">
            <figure className="overflow-hidden rounded-t-lg">
              <Image
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
                width={100}
                height={200}
                layout="responsive"
                className="object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-base font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-700">
                {product.description}
              </p>
              <div className="card-actions flex justify-end">
                <button className="btn btn-sm btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Page;
