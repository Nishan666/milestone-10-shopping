"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export const Providers = ({ Children }) => {
  return <Provider store={store}>{Children}</Provider>;
};
