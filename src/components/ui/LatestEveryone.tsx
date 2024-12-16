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
    <div className="bg-primary flex-1 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b-4 border-border-primary pb-7">
        <div>
          <h1 className="text-white text-3xl font-bold">Latest Photo</h1>
          <p className="text-gray-100">Updates from everyone</p>
        </div>
      </div>

      {/* Member Section */}
      <div className="space-y-8">
        {[...Array(2)].map((_, memberIndex) => (
          <div
            key={memberIndex}
            className="p-4 rounded-lg"
          >
            {/* Profile Section */}
            <div className="flex items-center mb-4">
              <Image
                src={latestImage}
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-white text-xl font-bold mb-3">
                  Devid Saifur
                  <span className="text-gray-100 cursor-pointer">
                    + Follow
                  </span>
                </h2>
                <p className="text-gray-300  flex items-center gap-2"> <FaRegEdit /> Recent 8 post</p>
              </div>
            </div>

            {/* Grid for Recent Posts */}
            <div className="grid grid-cols-4 gap-4 mt-5 border-b border-border-primary pb-16">
              {recentPosts.map((post, index) => (
                <div key={index} className="rounded-lg overflow-hidden bg-secondary">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="w-full object-cover"
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
