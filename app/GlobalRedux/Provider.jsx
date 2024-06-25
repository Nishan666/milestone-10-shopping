"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import HeaderSkeleton from "@/components/skeleton/HeaderSkeleton";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../components/Header"), {
  ssr: false,
  loading: () => <HeaderSkeleton />,
});

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <Header />
      {children}
    </Provider>
  );
};
