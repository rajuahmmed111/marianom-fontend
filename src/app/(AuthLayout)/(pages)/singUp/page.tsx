import React from "react";
import Image from "next/image";
import LogoImg from "@/assets/logo.jpeg";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import Background from "@/assets/background/authbg.jpeg";

export default function RegisterPage() {
  return (
    <div
      className="relative flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Registration Card */}
      <div className="relative z-10 bg-[#00000099] backdrop-blur-[12px] shadow-lg rounded-lg p-8 max-w-lg w-full text-white">
        {/* Logo */}
        <div className="flex justify-center pb-6">
          <Image
            src={LogoImg}
            alt="Plumppr Logo"
            width={150}
            height={50}
            priority
            className="h-auto w-auto"
          />
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-semibold mb-6">
          Create new account
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">User name</label>
            <input
              type="text"
              placeholder="Enter your user name"
              className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Date of birth
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div className="relative bg-[#483C19B5] py-5 px-3 rounded-2xl">
            <label className="block text-sm font-medium mb-1">
              Your current location
            </label>
            <input
              type="text"
              placeholder="Street address, city, state"
              className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
            <button className="flex items-center justify-center mt-4 w-full text-yellow-500">
              <FaMapMarkerAlt /> Use my current location
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              I identify as:
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-yellow-500 focus:ring-0"
                />
                <span>Gainer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-yellow-500 focus:ring-0"
                />
                <span>Feeder/encourage</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-yellow-500 focus:ring-0"
                />
                <span>Muscle gainer</span>
              </label>
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="form-checkbox rounded text-yellow-500 focus:ring-0"
                required
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-yellow-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-yellow-500 hover:underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-yellow-500 text-white font-medium py-2 rounded-md transition duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Create <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
