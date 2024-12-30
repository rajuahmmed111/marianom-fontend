"use client";
import React, { useState } from "react";
import onlineImage from "@/assets/onlineImage.png";
import postImage from "@/assets/news.jpeg";
import Image from "next/image";
import { MdFavoriteBorder, MdMessage } from "react-icons/md";
import { FaPaperPlane, FaRegCommentDots } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import profileImage from "@/assets/profile.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useAddFollowMutation } from "@/redux/features/follow/followApi";
import { RootState } from "@/redux/rootReducer";

const NeearByOnline = () => {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [followingUsers, setFollowingUsers] = useState<string[]>([]);

  const [addFollow, { isLoading }] = useAddFollowMutation();

  // Get the current user ID from the auth slice
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  // console.log(currentUserId)

  const onlineUsers = Array(6).fill({
    image: onlineImage,
    name: "User",
  });

  const posts = [
    {
      id: "676e4bc88f1b6b3d1f6d1693",
      name: "Devid Saifur",
      appreciation: "16k appreciation",
      recent: true,
      message:
        "I'm overloading on sweets today with the three C’s: Cupcakes, Cookies, and Candy.",
      images: Array(4).fill(postImage),
    },
    {
      id: currentUserId, 
      name: "John Doe",
      appreciation: "12k appreciation",
      recent: true,
      message: "Enjoying a lovely day with friends and family!",
      images: [postImage],
    },
  ];

  const handleFollow = async (followingId: string) => {
    if (followingId === currentUserId) {
      alert("You cannot follow yourself!");
      return;
    }

    // Prevent duplicate follow requests
    if (followingUsers.includes(followingId)) {
      console.log("You are already following this user.");
      return;
    }

    try {
      const response = await addFollow(followingId)
      console.log("Followed successfully:", response);

      // Add the followed user ID to the local state
      setFollowingUsers((prev) => [...prev, followingId]);
    } catch (error: any) {
      if (error?.data?.errorMessages?.[0]?.message) {
        alert(error.data.errorMessages[0].message); // Show backend error message
      } else {
        console.error("Failed to follow user:", error);
      }
    }
  };

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
    <div className="flex-1 bg-primary p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 mb-6 border-b border-[#796943]">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Near by and online
          </h1>
          <p className="text-white text-sm">Updates from everyone</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="py-2 px-4 rounded-lg border border-[#EAECF04D] bg-transparent text-white w-full focus:outline-none"
          />
          <button className="py-2 px-3 bg-[#FEB80045] rounded-lg text-white w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>

      {/* Online Users */}
      <div>
        <h2 className="text-lg text-white mb-4 font-semibold">In online</h2>
        <div className="flex gap-7 md:flex-row flex-col flex-wrap">
          {onlineUsers.map((user, index) => (
            <div key={index} className="relative">
              <Image
                src={user.image}
                alt="Online User"
                width={56}
                height={56}
                className="rounded-full border-2 border-yellow-500"
              />
              <span className="absolute bottom-1 right-[70px] md:bottom-0 md:right-[5px] w-4 h-4 bg-green-500 border-2 border-primary rounded-full"></span>
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
          <div key={post.id} className="p-4 rounded-lg mb-6">
            {/* Profile Section */}
            <div className="flex flex-wrap items-center mb-4 gap-4">
              <Image
                src={profileImage}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="text-white font-medium text-[18px] sm:text-[20px]">
                  {post.name}
                  {post.id === currentUserId ? (
                    <span className="ml-2 text-sm text-gray-400 cursor-default">
                      You
                    </span>
                  ) : followingUsers.includes(post.id) ? (
                    <span className="ml-2 text-sm text-gray-400 cursor-default">
                      Following
                    </span>
                  ) : (
                    <span
                      className={`ml-2 text-sm cursor-pointer ${
                        isLoading ? "text-gray-400" : "text-yellow-500"
                      }`}
                      onClick={() => handleFollow(post.id)}
                    >
                      + Follow
                    </span>
                  )}
                </h3>
                <p className="text-gray-300 font-medium">{post.appreciation}</p>
                <p className="text-gray-400 flex items-center gap-2 text-sm">
                  <FaRegEdit /> Recent post
                </p>
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-300 text-sm md:text-[18px] mb-5 leading-relaxed">
              {post.message}
            </p>

            {/* Post Images */}
            <div
              className={`grid gap-4 ${
                post.images.length > 1
                  ? "grid-cols-2 sm:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {post.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt="Post"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-auto"
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-5 text-[#EAECF0] mt-4">
              <button className="hover:text-yellow-500 flex items-center gap-2">
                <MdFavoriteBorder />
                Favorite
              </button>
              <button
                onClick={handleCommentClick}
                className="hover:text-yellow-500 flex items-center gap-2"
              >
                <FaRegCommentDots />
                Comment
              </button>
              <Link href="/message">
                <button className="hover:text-yellow-500 flex items-center gap-2">
                  <MdMessage />
                  Message
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

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
};

export default NeearByOnline;
