import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { UiProviders } from "@/provider/ui-provider";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={roboto.className}>
        <UiProviders>{children}</UiProviders>
      </body>
    </html>
  );
}
