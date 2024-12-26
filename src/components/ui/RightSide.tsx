import Image from "next/image";
import React, { useState } from "react";
import { FaRegCommentDots, FaPaperPlane } from "react-icons/fa6";
import { MdFavoriteBorder, MdMessage } from "react-icons/md";
import News from "@/assets/news.jpeg";
import Globe from "@/assets/globe.png";
import ProfileImg from "@/assets/profile.png";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";

export default function RightSide() {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");

  const handleCommentClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setComment("");
  };

  const handleSendComment = () => {
    console.log("Comment Sent:", comment);
    handleCloseModal();
  };

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
                I&apos;m overloading on sweets today with the three Cs:
                Cupcakes, Cookies, and Candy. I&apos;m overloading on sweets
                today with the three Cs: Cupcakes, Cookies, and Candy.
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
                <button
                  onClick={handleCommentClick}
                  className="hover:text-yellow-500 flex items-center gap-2"
                >
                  <FaRegCommentDots /> Comment
                </button>
                <Link href="/message">
                  <button className="hover:text-yellow-500 flex items-center gap-2">
                    <MdMessage /> Message
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Comment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1F1F1F] rounded-lg shadow-md p-6 w-[90%] max-w-md text-white">
            <h2 className="text-lg font-semibold mb-4">Write a Comment</h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Write something about the post..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleSendComment}
                className="p-3 bg-yellow-500 rounded-lg text-white hover:bg-yellow-600"
              >
                <FaPaperPlane size={20} />
              </button>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 text-sm text-gray-400 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
