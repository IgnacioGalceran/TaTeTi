import type { Metadata } from "next";
import { Bitter } from "next/font/google";
import "./globals.css";

const bitter = Bitter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaTeTi",
  description: "Juego del TaTeTi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bitter.className}>{children}</body>
    </html>
  );
}
