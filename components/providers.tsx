"use client";

import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
};
