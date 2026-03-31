import type { Metadata } from "next";
import "./globals.css";
import {Outfit} from 'next/font/google'
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from '@clerk/nextjs'
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "AI Agent Builder Platform",
  description: "The app where you can build AI Agent by simply drag and drop",
};

const outfit = Outfit({subsets:['latin']});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className={outfit.className}
      >
        <ClerkProvider>
          <ConvexClientProvider>
            <Provider>
              {children}
              <Toaster/>
            </Provider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
