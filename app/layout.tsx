import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { Toaster } from "react-hot-toast";
import { Providers } from "@/provider/provider";
import { EdgeStoreProvider } from "@/provider/edgestore";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "greek", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Threads",
  description: "Threads",
  icons: {
    icon: [
      {
        url: "/meta-logo.webp",
        href: "/meta-logo.webp",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" className="dark">
        <body className={roboto.className}>
          <Providers>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </Providers>
          <Toaster
            position="top-right"
            gutter={24}
            toastOptions={{
              style: {
                color: "#ffffff",
                background: "#000000",
                borderRadius: "20px",
              },
            }}
          />
        </body>
      </html>
    </SessionProvider>
  );
}
