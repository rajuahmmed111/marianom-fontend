import Image from "next/image";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import profileImage from "@/assets/profile.png";
import edit from "@/assets/edit.png";

export default function UpdateProfileForm() {
  // State to toggle visibility for each password field
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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
            className="rounded-full w-52  object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-yellow-500 text-black px-2 py-1 rounded-md text-xs md:text-sm hover:bg-yellow-600">
            Change
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form className="space-y-6">
        <h1 className="text-base md:text-lg font-medium mb-4 capitalize">
          Change owner name
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="relative">
            <label className="block mb-1 text-sm md:text-base">
              First Name
            </label>
            <input
              type="text"
              placeholder="Saifur"
              className="w-full  bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
            <Image src={edit} alt="edit image" className="absolute top-[60%] right-2"/>
          </div>

          {/* Last Name */}
          <div className="relative">
            <label className="block mb-1 text-sm md:text-base">Last Name</label>
            <input
              type="text"
              placeholder="Rahman"
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
            <Image src={edit} alt="edit image" className="absolute top-[60%] right-2"/>
          </div>

          {/* Email address */}
          <div className="col-span-2 relative">
            <label className="block mb-1 text-sm md:text-base">
              Email address
            </label>
            <input
              type="email"
              placeholder="test@gmail.com"
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
          <Image src={edit} alt="edit image" className="absolute top-[60%] right-2"/>
          </div>
        </div>

        {/* Change Password Section */}
        <div>
          <h1 className="text-base md:text-lg font-medium mb-4">
            Change Password
          </h1>
          {/* Current Password */}
          <div className="relative">
            <label className="block mb-1 text-sm md:text-base">
              Current Password
            </label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="••••••••••"
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
            <button
              type="button"
              className="absolute top-[70%] right-3 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
            >
              {showCurrentPassword ? (
                <FaEyeSlash size={22} />
              ) : (
                <FaEye size={22} />
              )}
            </button>
          </div>

          {/* New Password */}
          <div className="relative mt-4">
            <label className="block mb-1 text-sm md:text-base">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••••"
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
            <button
              type="button"
              className="absolute top-[70%] right-3 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </button>
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
