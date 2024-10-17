"use client";
import { updateUser } from "@/lib/features/auth/authSlice";
import { fetchData } from "@/lib/features/data/dataSlice";
import { makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export const StoreProvider = ({ children }) => {
  const storeRef = useRef(null);
  const router = useRouter();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const handleStorageChange = () => {
      router.refresh();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (storeRef.current != null) {
      // Fetch data when the store is initialized
      storeRef.current.dispatch(fetchData());
      storeRef.current.dispatch(updateUser());

      // Optionally, set up listeners for refetchOnFocus/refetchOnReconnect
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};