import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeaderSkeleton = () => {
  return (
    <div className="navbar bg-base-100 border-b-2 shadow-md py-2 px-4 sticky top-0 z-10">
      <div className="navbar-start">
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3 flex items-center">
          <li>
            <Skeleton height={20} width={60} />
          </li>
          <li>
            <Skeleton height={20} width={60} />
          </li>
          <li>
            <Skeleton height={20} width={60} />
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-3">
        <Skeleton height={36} width={80} />
        <Skeleton circle={true} height={40} width={40} />
      </div>
    </div>
  );
};

export default HeaderSkeleton;
