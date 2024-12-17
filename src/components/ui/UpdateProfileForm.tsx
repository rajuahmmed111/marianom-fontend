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
        {/* Owner Name */}
        <div>
          <h1 className="text-lg md:text-xl font-semibold mb-2">
            Change Owner Name
          </h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm md:text-base">First Name</label>
              <input
                type="text"
                placeholder="Saifur"
                className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm md:text-base">Last Name</label>
              <input
                type="text"
                placeholder="Rah***"
                className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block mb-1 text-sm md:text-base">Email Address</label>
          <input
            type="email"
            placeholder="abcdadf@gmail.com"
            className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
          />
        </div>

        {/* Change Password Section */}
        <div>
          <h1 className="text-lg md:text-xl font-semibold mb-2">
            Change Password
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm md:text-base">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm md:text-base">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
              />
            </div>
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
