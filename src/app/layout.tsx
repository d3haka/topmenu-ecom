import { QueryProvider } from "./query-provider";
import { InitialDataProvider } from "./initial-data-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "خرید‌وفروش آنلاین",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <InitialDataProvider>{children}</InitialDataProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
