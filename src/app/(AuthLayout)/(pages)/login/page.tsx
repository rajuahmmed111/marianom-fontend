import React from "react";
import Image from "next/image";
import LogoImg from "@/assets/logo.jpeg";
import { FaArrowRightLong } from "react-icons/fa6";
import AuthLayout from "@/app/(AuthLayout)/layouts/AuthLayout";
import Background from "@/assets/background/authbg.jpeg";


export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen" 
    style={{
      backgroundImage: `url(${Background.src})`,
      backgroundSize: "cover",
      backgroundPosition: "",
      backgroundRepeat: "no-repeat",
      // minHeight: "100vh",
    }}
    >
      <div className=" bg-[#0000003D] backdrop:blur-[24px] shadow-md rounded-lg p-8 max-w-xl w-full">
        <div className="flex items-center justify-center pb-8">
          <Image
            src={LogoImg.src}
            alt="Grommr"
            width={LogoImg.width}
            height={LogoImg.height}
            className="h-auto w-44"
          />
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox rounded text-yellow-500 focus:ring-0"
              />
              <span className="text-white">Remember Me</span>
            </label>
            <a href="#" className="text-red-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-5 bg-yellow-500 text-white font-medium py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Log in <FaArrowRightLong />
          </button>
        </form>

        <p className="text-sm text-center text-white mt-6">
          If you are new here then{" "}
          <a href="#" className="text-yellow-500 font-medium hover:underline">
            register
          </a>
        </p>
      </div>
    </div>
  );
}
// Attach AuthLayout to this page
LoginPage.getLayout = function getLayout(page: React.ReactNode) {
    return <AuthLayout>{page}</AuthLayout>;
  };
