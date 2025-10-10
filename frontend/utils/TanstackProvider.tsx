"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";

type TanstackProps = {
  children: React.ReactNode;
};

const TanstackProvider = ({ children }: TanstackProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  );
};

export default TanstackProvider;
