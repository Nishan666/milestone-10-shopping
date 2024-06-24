"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../../components/Header"), { ssr: false });

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <Header />
      {children}
    </Provider>
  );
};
