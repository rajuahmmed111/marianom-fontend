import React from "react";
import { SlCalender } from "react-icons/sl";
import birthdayImage from "@/assets/birthday.jpeg";
import Image from "next/image";

const NewMember = () => {
  const newMembers = Array(6).fill({
    name: "Devid Saifur",
    followers: "02 Followers",
    tag: "Gainer",
    image: birthdayImage, // Replace with dynamic images
  });

  return (
    <div className="bg-primary flex-1 min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-6 border-b-4 border-border-primary pb-6">
        <div>
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            New Members <span className="text-yellow-300">(12)</span>
          </h1>
          <p className="text-gray-100 text-sm md:text-base">
            Updates from everyone
          </p>
        </div>
        <div className="border border-border-primary w-full sm:w-[180px] text-white p-2 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[14px]">Date</p>
            <p className="font-bold text-[14px]">12 August 2024</p>
          </div>
          <SlCalender className="text-[18px]" />
        </div>
      </div>

      {/* Member Cards */}
      <div className="space-y-4">
        {newMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#58481F91] p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
          >
            {/* Left Section */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full">
              {/* Profile Image */}
              <Image
                src={member.image}
                alt={member.name}
                className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full object-cover"
              />
              <div className="text-center md:text-left">
                <h2 className="text-white font-bold text-lg md:text-2xl">
                  {member.name}
                  <span className="text-[#FEB800] font-medium ml-4 cursor-pointer text-sm md:text-base">
                    + Follow
                  </span>
                </h2>
                <p className="text-[#98A2B3] text-base md:text-lg font-medium mt-1">
                  {member.followers}
                </p>

                {/* Follower Images */}
                <div className="flex justify-center md:justify-start mt-2">
                  {[...Array(3)].map((_, idx) => (
                    <Image
                      key={idx}
                      src={member.image}
                      alt="follower"
                      className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[#4E3916] -ml-2"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Tag */}
            <div>
              <span className="bg-[#58481F] text-white px-4 py-2 text-sm md:text-base rounded-md font-medium">
                {member.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewMember;
