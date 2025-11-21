import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationLoading } from "@/components/NavigationLoading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oseberg Exim",
  description:
    "Oseberg Exim exports premium Indian agricultural products, makhana, coffee, tea, and spices worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationLoading />
        {children}
      </body>
    </html>
  );
}


