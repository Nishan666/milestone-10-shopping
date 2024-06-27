import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="flex h-[80vh] w-full justify-center items-center">
        <Image
          src={"/images/checkout.png"}
          width={1000}
          height={1000}
          alt="Checkout"
        />
        <Link href={"/store"} className="absolute bottom-36 left-60">
        <button className="btn btn-primary btn-sm">Go To Store</button>
      </Link>
      </div>
      
    </>
  );
};

export default Page;
