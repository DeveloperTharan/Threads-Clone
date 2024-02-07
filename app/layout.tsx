import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer, Zoom } from "react-toastify";
import { ThemeProvider } from "@/provider/theme-provider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <ThemeProvider>
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Zoom}
            />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
