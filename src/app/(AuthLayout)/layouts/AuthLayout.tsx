// import ReduxProvider from "@/redux/api/provider/ReduxProvider";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-500 to-orange-500">
      <div className="bg-[#0000003D] shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* <ReduxProvider > */}
          {children}
        {/* </ReduxProvider> */}
      </div>
    </div>
  );
}
