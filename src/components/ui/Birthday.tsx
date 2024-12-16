import React from "react";
import birthdayImage from "@/assets/birthday.jpeg";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";

export default function Birthday() {
  const birthdayList = Array(12).fill({
    name: "David Saifur",
    age: "25 years old",
    image: birthdayImage,
  });

  return (
    <div className="bg-primary min-h-screen p-6 flex-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b-4 border-border-primary pb-7">
        <div>
          <h1 className="text-white text-3xl font-bold">
            Today’s birthday <span className="text-yellow-300">(12)</span>
          </h1>
          <p className="text-gray-100">Updates from everyone</p>
        </div>
        <div className="border border-border-primary w-[180px] text-white p-2 rounded-lg flex items-center justify-between">
          <div>
          <p className="text-[14px]">Date</p>
          <p className="font-bold text-[14px]">12 August 2024</p>
          </div>
          <div>
          <SlCalender className="text-[18px]" />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {birthdayList.map((person, index) => (
          <div key={index} className="bg-secondary p-4 rounded-lg shadow-lg">
            {/* Image */}
            <Image
              src={person.image}
              alt={person.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            {/* Content */}
            <div>
              <h2 className="text-white text-lg font-bold">{person.name}</h2>
              <p className="text-gray-300 mb-3">{person.age}</p>

              {/* Input Field */}
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Write your birthday wish"
                  className="w-full p-2 rounded bg-transparent border border-white text-white focus:outline-none placeholder:text-white"
                />
                <button className="bg-primary text-white font-semibold shadow-md px-4 py-2 rounded hover:bg-yellow-400">
                  Send
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
