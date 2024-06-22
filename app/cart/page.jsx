'use client'

import CartItem from "@/components/CartItem";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const cartItems = useSelector(state => state.cart.products)
  return (
    <div className="mx-40">
      <h1 className="font-extrabold text-3xl">Shopping Cart</h1>
      <div className="shadow-lg px-10 py-5">
        {cartItems && cartItems.map((item,index)=>(
          <CartItem key={index} id={item.id} quantity={item.quantity}/>
        ))}
      </div>
    </div>
  );
};

export default Page;
