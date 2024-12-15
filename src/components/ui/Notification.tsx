import React from "react";
import { MdClose } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";


export default function Notification() {
  return (
    <section className="container bg-primary text-white p-6 rounded-lg shadow-lg mt-48">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-semibold text-[28px]">Notification</h2>
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
                <p className="text-[20px] font-medium my-1">New notification</p>
                <p className="text-white">
                  Do ullamco ex velit anim do proident exercitation et anim
                  tempor. Lorem sunt deserunt labore non excepteur veniam enim
                  quis officia magna anim...
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
  );
}
