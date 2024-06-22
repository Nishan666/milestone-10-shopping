import React from "react";

const storeLayout = (props) => {
  return (
    <div className="grid grid-cols-9 mt-24">
      <div className="bg-blue-200 col-span-2 mx-2  sticky top-28">
        {props.filters}
      </div>
      <div className="col-span-5 mx-2">
        {props.products}
      </div>
      <div className="bg-purple-200 col-span-2 "></div>
    </div>
  );
};

export default storeLayout;
