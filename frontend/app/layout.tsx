import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/utils/Tanstack/TanstackProvider";

export const metadata: Metadata = {
  title: "Thriving Talent",
  description: "Thriving Talent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanstackProvider>{children}</TanstackProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#2020d0", color: "white" },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
