import Image from "next/image";
import React from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import { MdFavoriteBorder, MdMessage } from "react-icons/md";
import News from "@/assets/news.jpeg";
import Globe from "@/assets/globe.png";
import ProfileImg from "@/assets/profile.png";
import { FaRegEdit } from "react-icons/fa";

export default function RightSide() {
  return (
    <div>
      <main className="flex-1 bg-primary p-5">
        {/* Header Section */}
        <div className="flex justify-between flex-col md:flex-row md:items-center pb-6 mb-6 border-b border-[#796943] gap-5 md:gap-0">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src={Globe.src}
                alt="globe image"
                width={25}
                height={25}
                className="rounded-full"
              />
              <h1 className="text-2xl font-semibold text-white">
                Global News Feed
              </h1>
            </div>
            <p className="text-white text-sm">Updates from everyone</p>
          </div>

          {/* Search Section */}
          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="py-2 px-4 rounded-lg border border-[#EAECF04D] bg-transparent text-white w-full md:w-auto focus:outline-none"
            />
            <button className="py-2 px-3 bg-[#FEB80045] rounded-lg text-white">
              Search
            </button>
          </div>
        </div>

        {/* Feed Content */}
        <div className="space-y-6">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="text-white border-b border-[#796943] p-4 space-y-4"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 flex-wrap">
                <Image
                  src={ProfileImg.src}
                  alt="User"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold mb-1 text-[18px] sm:text-[20px]">
                    GainerSheWrote
                  </p>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <FaRegEdit /> Just now
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-sm md:text-base leading-relaxed">
                I&apos;m overloading on sweets today with the three Cs: Cupcakes,
                Cookies, and Candy. I&apos;m overloading on sweets today with the
                three Cs: Cupcakes, Cookies, and Candy.
              </p>

              {/* Conditional Post Image */}
              {index === 2 && (
                <Image
                  src={News.src}
                  alt="Post Image"
                  width={600}
                  height={300}
                  className="rounded-md w-full h-auto"
                />
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 text-gray-300">
                <button className="hover:text-yellow-500 flex items-center gap-2">
                  <MdFavoriteBorder /> Favorite
                </button>
                <button className="hover:text-yellow-500 flex items-center gap-2">
                  <FaRegCommentDots /> Comment
                </button>
                <button className="hover:text-yellow-500 flex items-center gap-2">
                  <MdMessage /> Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
