import React from "react";
import onlineImage from "@/assets/onlineImage.png";
import postImage from "@/assets/news.jpeg";
import Image from "next/image";
import { MdFavoriteBorder, MdMessage } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import profileImage from "@/assets/profile.png"

const NeearByOnline = () => {
  // Mock data for online users and people near me
  const onlineUsers = Array(6).fill({
    image: onlineImage,
    name: "User",
  });

  const posts = [
    {
      id: 1,
      name: "Devid Saifur",
      appreciation: "16k appreciation",
      recent: true,
      message:
        "I'm overloading on sweets today with the three C’s: Cupcakes, Cookies, and Candy",
      images: Array(4).fill(postImage), // Use postImage here
    },
    {
      id: 2,
      name: "Devid Saifur",
      appreciation: "16k appreciation",
      recent: true,
      message:
        "I'm overloading on sweets today with the three C’s: Cupcakes, Cookies, and Candy",
      images: [postImage], // Use postImage for single image
    },
  ];

  return (
    <div className="flex-1 bg-primary p-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 mb-6 border-b border-[#796943]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-white mb-3">
              Near by and online
            </h1>
          </div>
          <p className="text-white">Updates from everyone</p>
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

      {/* Online Users */}
      <div>
        <h2 className="text-lg text-white mb-4 font-semibold">In online</h2>
        <div className="flex gap-4">
          {onlineUsers.map((user, index) => (
            <div key={index} className="relative">
              <Image
                src={user.image}
                alt="Online User"
                className="w-14 h-14 rounded-full border-2 border-yellow-500"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-primary rounded-full"></span>
            </div>
          ))}
        </div>
      </div>

      {/* People Near Me */}
      <div className="mt-8">
        <h2 className="text-lg text-white mb-4 font-semibold">
          People near me
        </h2>
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-lg mb-6"
          >
            {/* Profile Section */}
            <div className="flex items-center mb-4">
              <Image
                src={profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full mr-4"
              />
              <div>
                <h3 className="text-white font-medium text-[20px]">
                  {post.name}
                  <span className="ml-2 text-sm cursor-pointer">
                    + Follow
                  </span>
                </h3>
                <p className="text-gray-300 font-medium">{post.appreciation}</p>
                <p className="text-gray-300 flex items-center gap-2">
                <FaRegEdit /> Recent post
                </p>
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-200  text-[20px] mb-5">{post.message}</p>

            {/* Post Images */}
            <div
              className={`grid gap-4 ${
                post.images.length > 1 ? "grid-cols-4" : "grid-cols-1"
              }`}
            >
              {post.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt="Post"
                  className="rounded-lg object-cover h-[260px]"
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-5  text-[#EAECF0] mt-4">
              <button className="hover:text-yellow-500 flex items-center gap-2">
                <MdFavoriteBorder />
                Favorite
              </button>
              <button className="hover:text-yellow-500 flex items-center gap-2">
                <FaRegCommentDots />
                Comment
              </button>
              <button className="hover:text-yellow-500 flex items-center gap-2">
                <MdMessage />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeearByOnline;
