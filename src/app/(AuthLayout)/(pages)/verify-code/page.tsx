"use client"
import React, { useState } from "react";
import Image from "next/image";
import LogoImg from "@/assets/logo.jpeg";
import check from "@/assets/check.png"

export default function VerifyCodePage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verification Code:", code.join(""));
    // Implement API call for verifying the code
  };

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
        <Image src={check} width={80} className="mx-auto" alt="check success image"/>
        <h2 className="text-white text-[40px] font-bold text-center pb-4">Success</h2>
        <p className="text-white text-center text-sm mb-6">
          Please check your email to create a new password
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2">
            {code.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-transparent text-white text-xl"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-medium py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
