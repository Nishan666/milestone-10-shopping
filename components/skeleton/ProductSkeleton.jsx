import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="overflow-hidden rounded-t-lg">
        <Skeleton width={100} height={100} className="w-full h-full" />
      </figure>
      <div className="card-body p-5 text-xl font-bold">
        <h2 className="card-title text-base font-semibold">
          <Skeleton width={150} />
        </h2>
        <p className="text-sm font-medium text-gray-400">
          <Skeleton width={100} />
        </p>
        <p className="text-sm font-medium text-gray-400">
          <Skeleton count={3} />
        </p>
        <h3 className="font-semibold">
          <Skeleton width={50} />
        </h3>
        <div className="card-actions flex justify-start items-center">
          <Skeleton width={32} height={32} className="mr-2" />
          <Skeleton width={100} height={32} />
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
