"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import HeaderSkeleton from "@/components/skeleton/HeaderSkeleton";
import dynamic from "next/dynamic";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Header = dynamic(() => import("../../components/Header"), {
  ssr: false,
  loading: () => <HeaderSkeleton />,
});

let persistor = persistStore(store);

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ProgressBar
          height="3px"
          color="#0000FF"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Header />
        {children}
      </PersistGate>
    </Provider>
  );
};
