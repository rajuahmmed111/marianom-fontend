import React from "react";

export default function UpdateProfileForm() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            className="rounded-full w-32 h-32"
          />
          <button className="absolute bottom-0 right-0 bg-yellow-500 text-black px-2 py-1 rounded-md text-sm">
            Change
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <form className="space-y-4">
        <h1 className="text-[18px]">Change Owner Name</h1>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              placeholder="Saifur"
              className="w-full bg-[#483C19] text-white p-2 rounded-md border border-gray-600"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Rah***"
              className="w-full bg-[#483C19] text-white p-2 rounded-md border border-gray-600"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Email Address</label>
          <input
            type="email"
            placeholder="abcdadf@gmail.com"
            className="w-full bg-[#483C19] text-white p-2 rounded-md border border-gray-600"
          />
        </div>
        <div>
            <h1 className="mb-6 text-[18px]">Change Password</h1>
          <label className="block mb-1">Current Password</label>
          <input
            type="password"
            placeholder="••••••••••"
            className="w-full bg-[#483C19] text-white p-2 rounded-md border border-gray-600"
          />
        </div>
        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            placeholder="••••••••••"
            className="w-full bg-[#483C19] text-white p-2 rounded-md border border-gray-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-600"
        >
          Save Update
        </button>
      </form>
    </div>
  );
}
