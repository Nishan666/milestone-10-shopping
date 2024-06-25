import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import React from "react";

const ModalSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="card m-8 lg:card-side bg-base-100 shadow-xl">
        <figure>
          <Skeleton height={400} width={700} />
        </figure>
        <div className="card-body p-5 m-8 text-xl font-bold">
          <h2 className="card-title text-2xl font-extrabold">
            <Skeleton width={200} />
          </h2>
          <p className="text-xl font-extrabold text-gray-400">
            <Skeleton width={150} />
          </p>
          <p className="text-xl font-bold text-gray-400">
            <Skeleton count={3} />
          </p>
          <h3 className="text-2xl font-bold">
            <Skeleton width={50} />
          </h3>
          <div className="card-actions flex justify-start items-center">
            <Skeleton width={120} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSkeleton;
