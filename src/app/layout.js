"use client";

import localFont from "next/font/local";
import "./globals.css";
import GlobalLayout from "@/components/GlobalLayout/global-layout";
import { UserProvider } from "@/context/userContext";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const metadata = {
  title: "TodayEat",
  description: "음식메뉴를 선택할 수 있는 웹서비스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          <UserProvider>
            <GlobalLayout>{children}</GlobalLayout>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
