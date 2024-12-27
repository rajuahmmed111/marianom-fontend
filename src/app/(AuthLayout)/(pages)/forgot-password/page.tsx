// import React, { useState } from "react";
import Image from "next/image";
import LogoImg from "@/assets/logo.jpeg";

export default function ForgetPasswordPage() {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Forget Password Email:", email);
//     // Implement API call for sending the reset code
//   };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundColor: "#4C3F14",
      }}
    >
      <div className="bg-[#0000003D] backdrop:blur-[24px] shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center pb-8">
          <Image
            src={LogoImg.src}
            alt="Plumppr"
            width={LogoImg.width}
            height={LogoImg.height}
            className="h-auto w-44"
          />
        </div>
        <h2 className="text-white text-xl font-bold text-center pb-4">
          Forget Password!
        </h2>
        <p className="text-white text-center text-sm mb-6">
          Enter your registered email below
        </p>
        <form className="space-y-6" >
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
            //   value={email}
            //   onChange={(e) => setEmail(e.target.value)}
              placeholder="georgia.young@example.com"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-transparent text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-medium py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Send Code
          </button>
        </form>
        <p className="text-sm text-center text-white mt-6">
          Remember the password?{" "}
          <a href="/login" className="text-yellow-500 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
