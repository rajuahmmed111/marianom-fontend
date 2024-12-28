"use client";
import React, { useState } from "react";
import Image from "next/image";
import LogoImg from "@/assets/logo.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useResetPasswordMutation } from "@/redux/features/authSlice/authApi";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();

  // Extract query parameters from the URL
  const id = searchParams.get("userId");
  const token = searchParams.get("token");
  console.log('my token is', token);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const authToken = useSelector((state: RootState) => state.auth.token); // Get the auth token from Redux store

  // Use the resetPassword mutation hook correctly
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!authToken) {
      toast.error("You must be logged in to reset your password.");
      return;
    }

    try {
      // Call the resetPassword mutation and pass the auth token in the request headers
      const res = await resetPassword({ id, password, token: token });
      if (res) {
        toast.success("Password changed successfully.");
      } else {
        toast.error("Password cannot changed. pls try again")
      }

      toast.success("Password changed successfully.");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Unable to reset password. Please try again.");
    }

    console.log("New Password:", password);
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
            disabled={isLoading}
            className={`w-full bg-yellow-500 text-white font-medium py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isLoading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
