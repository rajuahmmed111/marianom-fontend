"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProfileImg from "@/assets/profile.png";
import PostImg from "@/assets/news.jpeg";
import { FaRegEdit } from "react-icons/fa";
import {
  MdPhoto,
  MdOutlineVideoLibrary,
  MdFavoriteBorder,
} from "react-icons/md";
import { LuMessageSquareMore } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import Modal from "@/components/ui/Modal";
import UpdateProfileForm from "@/components/ui/UpdateProfileForm";
import Photos from "@/components/ui/Photos";
import { BsFillSendFill } from "react-icons/bs";

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTab, setIsTab] = useState("all");
  // Explicitly define the types for images and videos
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  // const [postContent, setPostContent] = useState<string>("");

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages((prev) => [...prev, ...imageFiles]);
  };

  // Handle Video Upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const videoFiles = files.filter((file) => file.type.startsWith("video/"));
    setVideos((prev) => [...prev, ...videoFiles]);
  };

  return (
    <div className="bg-primary min-h-screen text-white p-4 md:p-8 container mx-auto mt-40 md:mt-48">
      {/* Profile Header */}
      <div className="bg-secondary rounded-lg p-4 md:p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            <Image
              src={ProfileImg}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-yellow-500"
            />
            <div>
              <div className="flex flex-wrap items-center gap-4 md:gap-7">
                <h1 className="text-2xl md:text-[32px] font-semibold">
                  Devid Saifur
                </h1>
                <button className="text-lg md:text-[18px] font-semibold flex items-center gap-1">
                  <GoPlus className="text-white" /> Follow
                </button>
              </div>
              <p className="text-[#98A2B3] text-sm md:text-[20px] font-medium mt-1 mb-4">
                16k Followers
              </p>
              <div className="flex -space-x-3 mt-2">
                {[...Array(4)].map((_, index) => (
                  <Image
                    key={index}
                    src={ProfileImg}
                    alt="Follower"
                    width={30}
                    height={30}
                    className="rounded-full border border-border-primary"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white border border-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-yellow-600 hover:border-none w-full md:w-auto"
            >
              <FaRegEdit /> Edit
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-4 pt-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 md:gap-8 text-gray-300 flex-wrap">
            <button
              onClick={() => setIsTab("all")}
              className={`font-semibold cursor-pointer text-base md:text-[20px] ${
                isTab === "all" ? "text-white" : "text-[#807E7E]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setIsTab("photos")}
              className={`cursor-pointer flex items-center gap-2 text-base md:text-[20px] ${
                isTab === "photos" ? "text-white" : "text-[#807E7E]"
              }`}
            >
              Photos
            </button>
            <button
              className={`cursor-pointer flex items-center gap-2 text-base md:text-[20px] ${
                isTab === "video" ? "text-white" : "text-[#807E7E]"
              }`}
            >
              Video
            </button>
          </div>
          <div>
            <button className="bg-transparent flex items-center gap-2 px-4 py-2">
              <LuMessageSquareMore />
              Message
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {isTab === "all" && (
        <div>
          {/* Post Input */}
          <div className="bg-secondary rounded-lg p-4 md:p-6 mt-4 md:mt-8 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
              <Image
                src={ProfileImg}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full"
              />
              <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full bg-transparent border-b border-border-primary p-2 pb-8 focus:outline-none placeholder-white"
              />
              <button
                className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition duration-300 shadow-lg"
                // onClick={() => console.log("Post content:", postContent)}
              >
                <BsFillSendFill size={20} />
              </button>
            </div>
            <div className="flex gap-6 mt-4 text-white">
              <label className="flex items-center gap-2 cursor-pointer text-base md:text-[14px] font-medium">
                <MdPhoto />
                Photo
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-base md:text-[14px] font-medium">
                <MdOutlineVideoLibrary />
                Video
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </label>
            </div>

            {/* Media Preview Section */}
            <div className="mt-4 md:mt-8">
              {images.length > 0 && (
                <div className="w-1/2">
                  <h3 className="font-semibold text-lg mb-2">Images:</h3>
                  <div className="flex md:flex-row flex-col flex-wrap">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt="Uploaded Preview"
                          className="mx-1 my-1 h-auto rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {videos.length > 0 && (
                <div className="mt-4 w-1/2">
                  <h3 className="font-semibold text-lg mb-2">Videos:</h3>
                  <div className="flex">
                    {videos.map((video, index) => (
                      <div key={index} className="relative">
                        <video
                          src={URL.createObjectURL(video)}
                          controls
                          className="w-[98%] h-auto rounded-md"
                        ></video>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6 mt-4 md:mt-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="text-white border-b border-[#796943] p-4 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={ProfileImg.src}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-base md:text-[20px]">
                      GainerSheWrote
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <FaRegEdit />
                      Just now
                    </p>
                  </div>
                </div>
                <p className="text-sm md:text-base leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                {index === 2 && (
                  <Image
                    src={PostImg.src}
                    alt="Post Image"
                    width={600}
                    height={300}
                    className="rounded-md w-full h-auto"
                  />
                )}
                <div className="flex gap-5 text-sm text-gray-300">
                  <button className="hover:text-yellow-500 flex items-center gap-2 text-base">
                    <MdFavoriteBorder />
                    Favorite
                  </button>
                  <button className="hover:text-yellow-500 flex items-center gap-2 text-base">
                    <FaRegCommentDots />
                    Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isTab === "photos" && <Photos />}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UpdateProfileForm />
      </Modal>
    </div>
  );
}
