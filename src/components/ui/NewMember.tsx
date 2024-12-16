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
    <div className="bg-primary flex-1 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b-4 border-border-primary pb-7">
      <div>
        <h1 className="text-white text-3xl font-bold">
          New Members <span className="text-yellow-300">(12)</span>
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

      {/* Member Cards */}
      <div className="space-y-4">
        {newMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#58481F91] p-4 rounded-lg flex justify-between items-center shadow-md"
          >
            {/* Left Section */}
            <div className="flex items-center gap-6">
              {/* Profile Image */}
              <Image
                src={member.image}
                alt={member.name}
                className="w-[120px] h-[120px] rounded-full object-cover"
              />
              <div>
                <h2 className="text-white font-bold text-[24px]">
                  {member.name}
                  <span className="text-[#FEB800] font-medium ml-6 cursor-pointer">
                    + Follow
                  </span>
                </h2>
                <p className="text-[#98A2B3] text-[20px] font-medium">{member.followers}</p>
                <div className="flex mt-2">
                  <Image
                    src={member.image}
                    alt="follower"
                    className="w-9 h-9 rounded-full border border-[#4E3916] -ml-2"
                  />
                  <Image
                    src={member.image}
                    alt="follower"
                    className="w-9 h-9 rounded-full border border-[#4E3916] -ml-2"
                  />
                  <Image
                    src={member.image}
                    alt="follower"
                    className="w-9 h-9 rounded-full border border-[#4E3916] -ml-2"
                  />
                </div>
              </div>
            </div>

            {/* Right Tag */}
            <div>
              <span className="bg-[#58481F] text-white p-3 rounded-md font-medium">
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
