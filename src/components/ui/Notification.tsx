import React from "react";
import { MdClose } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";

export default function Notification() {
  return (
    <section className="md:container mx-auto w-full bg-primary text-white p-4 md:p-6 rounded-lg shadow-lg mt-40  md:mt-48">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl lg:text-[28px] font-semibold">
            Notification
          </h2>
          <span className="text-white w-[30px] h-[30px] rounded-full bg-yellow-500 flex items-center justify-center text-sm md:text-base">
            02
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="py-2 px-4 rounded-lg border border-[#EAECF04D] bg-transparent text-white w-full sm:w-auto focus:outline-none"
          />
          <button className="py-2 px-4 bg-[#FEB80045] rounded-lg text-white w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-secondary rounded-lg p-4 gap-4 sm:gap-0"
          >
            {/* Left Section */}
            <div className="w-full sm:w-auto">
              <p className="font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                <RiMessage2Fill />
                POST . NOW
              </p>
              <div className="ml-5">
                <p className="text-[18px] md:text-[20px] font-medium mb-1">
                  New notification
                </p>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Do ullamco ex velit anim do proident exercitation et anim
                  tempor. Lorem sunt deserunt labore non excepteur veniam enim
                  quis officia magna anim...
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button className="text-gray-300 hover:text-red-500 self-end sm:self-center">
              <MdClose className="text-2xl" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
