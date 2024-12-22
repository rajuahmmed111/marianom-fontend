import Image from "next/image";
import React from "react";
import profileImage from "@/assets/profile.png";

export default function UpdateProfileForm() {
  return (
    <div className="text-white p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
        Update Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <Image
            src={profileImage}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-yellow-500 text-black px-2 py-1 rounded-md text-xs md:text-sm hover:bg-yellow-600">
            Change
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form className="space-y-6">
        {/* First Four Fields in Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User Name */}
          <div>
            <label className="block mb-1 text-sm md:text-base">User Name</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-1 text-sm md:text-base">Date of Birth</label>
            <input
              type="date"
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
          </div>

          {/* Current Location */}
          <div>
            <label className="block mb-1 text-sm md:text-base">Current Location</label>
            <input
              type="text"
              placeholder="Enter your location"
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
          </div>

          {/* Identifier Dropdown */}
          <div>
            <label className="block mb-1 text-sm md:text-base">Identifier</label>
            <select
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            >
              <option value="gainer">Gainer</option>
              <option value="feeder">Feeder/ encourage</option>
              <option value="muscle_gainer">Muscle gainer</option>
            </select>
          </div>
        </div>

        {/* Change Password Section */}
        <div>
          <h1 className="text-lg md:text-xl font-semibold mb-2">
            Change Password
          </h1>
          <div>
            <label className="block mb-1 text-sm md:text-base">New Password</label>
            <input
              type="password"
              placeholder="••••••••••"
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black py-2 md:py-3 rounded-md font-semibold hover:bg-yellow-600 transition"
        >
          Save Update
        </button>
      </form>
    </div>
  );
}
