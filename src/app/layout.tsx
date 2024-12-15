import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Background from "@/assets/background/bg.png";
// import Background from "@/assets/background/bg.png"
// import Navbar from "@/components/common/Navbar";
// import Footer from "@/components/common/Footer";
// import TopBar from "@/components/common/TopBar";
import React from "react";
// import path from "path";
import Header from "@/components/common/Header";
// import NewsFeed from "@/components/ui/NewsFeed";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title:
    "Grommr - A site for guys into gaining and encouraging, bellies, chubby bears, gay chubs and admirers",
  description:
    "A site for guys into gaining and encouraging, bellies, chubby bears, gay chubs and admirers",
};

const pathName = typeof window !== "undefined" ? window.location.pathname : "";

const isLogin = pathName === "/login";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        style={{
          backgroundImage: `url(${Background.src})`,
          backgroundSize: "cover", 
          backgroundRepeat: "repeat",
          backgroundColor: "#594614", 
          backgroundBlendMode: "multiply",
          minHeight: "100vh",
          backgroundPosition:"center",
          backgroundAttachment: "fixed",
        }}
         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {/* <TopBar /> */}
        <div className="">
          {/* <Navbar /> */}
          <Header/>
          {/* <NewsFeed/> */}
        </div>
        <div className="md:px-5">
          {!isLogin ? (
            <div className="md:rounded-lg text-text">
              {children}
            </div>
          ) : (
            <>{children}</>
          )}
        </div>
        <div className="md:container">
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
