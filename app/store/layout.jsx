import React from "react";

const storeLayout = (props) => {
  return (
    <>
      {props.children}
      {props.modal}
      <div className="grid grid-cols-9 mt-20">
        <div className="col-span-2 mx-2 h-0 my-0 sticky top-20">
          {props.filters}
        </div>
        <div className="col-span-6 ">{props.products}</div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default storeLayout;
