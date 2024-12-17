import React from "react";
import latestImage from "@/assets/news.jpeg";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";

const LatestEveryone: React.FC = () => {
  // Mock data for recent posts (8 images)
  const recentPosts = Array(8).fill({
    image: latestImage,
    title: "Recent Post",
  });

  return (
    <div className="bg-primary flex-1 p-4 md:p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b-4 border-border-primary pb-6 gap-4">
        <div>
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            Latest Photo
          </h1>
          <p className="text-gray-100 text-sm md:text-base">
            Updates from everyone
          </p>
        </div>
      </div>

      {/* Member Section */}
      <div className="space-y-8">
        {[...Array(2)].map((_, memberIndex) => (
          <div key={memberIndex} className="p-4 rounded-lg">
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-4">
              <Image
                src={latestImage}
                alt="Profile"
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="text-white text-lg md:text-xl font-bold mb-1">
                  Devid Saifur
                  <span className="text-gray-100 ml-2 cursor-pointer text-sm">
                    + Follow
                  </span>
                </h2>
                <p className="text-gray-300 text-sm md:text-base flex items-center gap-2">
                  <FaRegEdit /> Recent 8 post
                </p>
              </div>
            </div>

            {/* Grid for Recent Posts */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5 border-b border-border-primary pb-8"
            >
              {recentPosts.map((post, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden bg-secondary"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={200}
                    height={200}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestEveryone;
