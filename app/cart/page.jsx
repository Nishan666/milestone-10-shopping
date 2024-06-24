"use client";

import CartItem from "@/components/CartItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  removeEntireItem,
} from "../GlobalRedux/feature/cart/cartSlice";
import { fetchProductById } from "@/services/product";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Page = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateTotalPrice = async () => {
      setLoading(true);
      let total = 0;
      for (const item of cartItems) {
        const product = await fetchProductById(item.id);
        total += product.price * item.quantity;
      }
      setTotalPrice(total);
      setLoading(false);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const handleAddOneQuantity = (product) => {
    dispatch(addItem({ id: product.id, quantity: 1 }));
  };

  const handleRemoveOneQuantity = (product) => {
    dispatch(removeItem({ id: product.id, quantity: 1 }));
  };

  const handleRemoveEntireProduct = (product) => {
    dispatch(removeEntireItem({ id: product.id }));
  };

  return (
    <div className="mx-40 my-10">
      <h1 className="font-extrabold text-3xl">Shopping Cart</h1>
      <div className="shadow-lg px-10 py-5">
        {cartItems &&
          cartItems.map((item, index) => (
            <CartItem
              key={index}
              id={item.id}
              quantity={item.quantity}
              handleRemoveEntireProduct={handleRemoveEntireProduct}
              handleRemoveOneQuantity={handleRemoveOneQuantity}
              handleAddOneQuantity={handleAddOneQuantity}
            />
          ))}
        {!loading && (
          <h2 className="my-6 font-medium text-xl">Total: ${totalPrice}</h2>
        )}

        {loading && <Skeleton width={75} height={32} />}

        <button className="btn btn-success">Checkout</button>
      </div>
    </div>
  );
};

export default Page;
