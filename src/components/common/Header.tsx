"use client";
import React from "react";
import Image from "next/image";
import LogoImg from "@/assets/logo.jpeg";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

import Link from "next/link";

const Header = () => {
  const route = usePathname();
  if (/^\/(registers|login)/.test(route)) return;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        {/* Logo Section */}
        <div className="flex items-center justify-between my-7 md:container">
          <Link href="/">
            <Image
              src={LogoImg.src}
              alt="Plumppr Logo"
              width={150}
              height={50}
              className="h-auto w-auto"
            />
          </Link>

          {/* Navigation Buttons */}
          <nav className="flex items-center justify-between gap-28 bg-[#483C19] rounded-2xl shadow-md py-4 px-6">
            <div className="flex items-center gap-8">
              <Link href="/notification">
                <button
                  // onClick={onShowNotification}
                  className="flex items-center px-4 py-2 text-white bg-transparent border border-white rounded-md hover:bg-white hover:text-black transition"
                >
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .415-.162.82-.405 1.136L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </span>
                  Notification
                </button>
              </Link>

              {/* Message Button */}
              <Link href="/message">
                <button className="flex items-center px-4 py-2 text-white bg-transparent border border-white rounded-md hover:bg-white hover:text-black transition">
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 12h9m-9 4h5m-5-8h9m2.25-2.25v12.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.75A2.25 2.25 0 016.75 4.5h10.5A2.25 2.25 0 0119.5 6.75z"
                      />
                    </svg>
                  </span>
                  Message
                </button>
              </Link>
            </div>

            {/* Right Section (Logout & Settings Buttons) */}
            <div className="flex items-center gap-8">
              <div className="flex items-center border-r border-gray-300 pr-4">
                <button className="flex items-center px-4 py-2 text-white bg-red-900 rounded-md transition">
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V15m-3-6l3 3m0 0l-3 3m3-3H9"
                      />
                    </svg>
                  </span>
                  Logout
                </button>
              </div>

              {/* Settings Button */}
              <button className="flex items-center px-4 py-2 text-white bg-transparent border border-white rounded-md hover:bg-white hover:text-black transition">
                <IoSettingsOutline className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* <div className="pt-48">
        {showNotification && (
          // Notification Component
          <section className="container bg-primary text-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-5">
                <h2 className="text-xl font-semibold text-[28px]">
                  Notification
                </h2>
                <span className="text-white w-[30px] h-[30px] rounded-full bg-yellow-500 flex items-center justify-center">
                  02
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-2 px-4 rounded-lg border border-[#EAECF04D] bg-transparent text-white"
                />
                <button className="py-2 px-3 bg-[#FEB80045] rounded-lg text-white">
                  Search
                </button>
                <button
                  onClick={() => setShowNotification(false)} // Close Notification
                  className="text-red-500 hover:text-red-700"
                >
                  <MdClose className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-primary-gray rounded-lg p-4"
                >
                  <div>
                    <p className="font-medium mb-1 flex items-center gap-2">
                      <RiMessage2Fill />
                      POST . NOW
                    </p>
                    <div className="ml-5">
                      <p className="text-[20px] font-medium my-1">
                        New notification
                      </p>
                      <p className="text-white">
                        Do ullamco ex velit anim do proident exercitation et
                        anim tempor. Lorem sunt deserunt labore non excepteur
                        veniam enim quis officia magna anim...
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-300 hover:text-red-500">
                    <MdClose />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div> */}
    </>
  );
};

export default Header;
