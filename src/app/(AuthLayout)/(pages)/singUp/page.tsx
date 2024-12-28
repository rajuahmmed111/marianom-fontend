"use client";
import React, { useState } from "react";
import Image from "next/image";
 import { useRouter } from "next/navigation";
import LogoImg from "@/assets/logo.jpeg";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import Background from "@/assets/background/authbg.jpeg";
import { useRegisterUserMutation } from "@/redux/auth/authApi";

export default function RegisterPage() {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
    dateOfBirth: "",
    location: "",
    identity: [] as string[],
    agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox" && name === "identity") {
      // Handle identity checkboxes
      setFormData((prev) => ({
        ...prev,
        identity: checked
          ? [...prev.identity, value]
          : prev.identity.filter((item) => item !== value),
      }));
    } else if (type === "checkbox" && name === "agree") {
      setFormData((prev) => ({ ...prev, agree: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await registerUser(formData).unwrap();
      console.log("User registered successfully:", response);

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">User name</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter your user name"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Date of birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div className="relative bg-[#483C19B5] py-5 px-3 rounded-2xl">
            <label className="block text-sm font-medium mb-1">
              Your current location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Street address, city, state"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-transparent border-gray-400 placeholder-gray-300 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
            <button
              type="button"
              className="flex items-center justify-center mt-4 w-full text-yellow-500"
            >
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
                  name="identity"
                  value="Gainer"
                  checked={formData.identity.includes("Gainer")}
                  onChange={handleChange}
                  className="form-checkbox rounded text-yellow-500 focus:ring-0"
                />
                <span>Gainer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="identity"
                  value="Feeder"
                  checked={formData.identity.includes("Feeder")}
                  onChange={handleChange}
                  className="form-checkbox rounded text-yellow-500 focus:ring-0"
                />
                <span>Feeder/Encourage</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="identity"
                  value="Muscle gainer"
                  checked={formData.identity.includes("Muscle gainer")}
                  onChange={handleChange}
                  className="form-checkbox rounded text-yellow-500 focus:ring-0"
                />
                <span>Muscle Gainer</span>
              </label>
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
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
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-yellow-500 text-white font-medium py-2 rounded-md transition duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            {isLoading ? "Creating..." : "Create"} <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
