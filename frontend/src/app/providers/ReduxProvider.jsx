"use client";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

import { store } from "~/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { injectStore } from "~/lib/authorizedAxios";

injectStore(store);
const persistor = persistStore(store);

function ReduxProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}

export default ReduxProviders;
