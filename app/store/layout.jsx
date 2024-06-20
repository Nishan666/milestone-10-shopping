import React from "react";

const storeLayout = (props) => {
  return (
    <div className="grid grid-cols-12 mt-24">
      <div className="bg-blue-200 col-span-3 m-4 sticky top-0">
        {props.category}
      </div>
      <div className="bg-purple-200 col-span-6 m-4 h-[70vh] overflow-y-auto">
        {props.products}
      </div>
      <div className="bg-purple-200 col-span-3 m-4"></div>
    </div>
  );
};

export default storeLayout;
