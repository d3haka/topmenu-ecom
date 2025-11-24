import { QueryProvider } from "./query-provider";
import type { Metadata } from "next";
import "./styles.scss";
import { Geist, Geist_Mono } from "next/font/google";
import { AnimatePresence } from "motion/react";

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
  icons: {
    icon: "/favicon.png",
  },
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
          <header style={{ height: 50 }}></header>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </QueryProvider>
      </body>
    </html>
  );
}
