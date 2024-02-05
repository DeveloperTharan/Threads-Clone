import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/provider/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "Threads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
