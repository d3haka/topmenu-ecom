import { QueryProvider } from "./query-provider";
import { InitialDataProvider } from "./initial-data-provider";
import type { Metadata } from "next";
import "./styles.scss";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const IYM = localFont({
//   src: [
//     {
//       path: "../assets/fonts/font-light.woff",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../assets/fonts/font-bold.woff",
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   variable: "--font-iym",
// });

export const metadata: Metadata = {
  title: "خرید‌وفروش آنلاین",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <InitialDataProvider>
            <header style={{ height: 50 }}></header>
            {children}
          </InitialDataProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
