
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UFAA | Financial Reporting Intelligence",
  description:
    "UFAA Financial Reporting Programme — Project Delivery Report",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
