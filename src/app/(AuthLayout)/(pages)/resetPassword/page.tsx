"use client"
import React, { useState } from "react";
import Image from "next/image";
import LogoImg from "@/assets/logo.jpeg";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("New Password:", password);
    // Implement API call to reset the password
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
        <h2 className="text-white text-xl font-bold text-center pb-4">
          Change New Password!
        </h2>
        <p className="text-white text-center text-sm mb-6">
          Enter a different password from the previous one
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-transparent text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-transparent text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-medium py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
