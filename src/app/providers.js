"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { ToastProvider } from "./components/Toast";
import store from "./store/store";
import { hydrateCart } from "./store/cartSlice";

function CartHydration({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Hydrate cart from localStorage on client side
    dispatch(hydrateCart());
  }, [dispatch]);

  return <>{children}</>;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ToastProvider>
        <CartHydration>
          {children}
        </CartHydration>
      </ToastProvider>
    </Provider>
  );
}