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

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTab, setIsTab] = useState("all");
  return (
    <div className="bg-primary min-h-screen text-white p-8 container mt-48">
      {/* Profile Header */}
      <div className="bg-secondary rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between">
          {/* Profile Info */}
          <div className="flex items-center gap-6">
            <Image
              src={ProfileImg}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-yellow-500"
            />
            <div>
              <div className="flex items-center gap-7">
                <h1 className="text-[32px] font-semibold">Devid Saifur</h1>
                <button className="text-[18px] font-semibold flex items-center gap-1">
                  <GoPlus className="text-white text-[18px]" /> Follow
                </button>
              </div>
              <p className="text-gray-400 text-[18px] font-semibold">
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
          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className=" text-white border border-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-yellow-600 hover:border-none"
            >
              <FaRegEdit /> Edit
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6  pt-4 flex items-center justify-between">
          <div className="flex gap-8 text-gray-300">
            <button
              onClick={() => setIsTab("all")}
              className={` font-semibold cursor-pointer text-[20px] ${isTab === "all" ? "text-white" : "text-[#807E7E]"}`}
            >
              All
            </button>
            <button
              onClick={() => setIsTab("photos")}
              className={`cursor-pointer flex items-center gap-2 text-[20px]  ${isTab === "photos" ? "text-white" : "text-[#807E7E]"}`}
            >
              Photos
            </button>
            <button className={`cursor-pointer flex items-center gap-2 text-[20px] ${isTab === "video" ? "text-white" : "text-[#807E7E]"}`}>
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

      {isTab === "all" && (
        <div>
          <div className="bg-secondary rounded-lg p-6 mt-8 shadow-lg">
            <div className="flex gap-4 items-center">
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
                className="w-full bg-transparent border-b border-border-primary p-2 focus:outline-none placeholder-white"
              />
            </div>
            <div className="flex gap-6 mt-4 text-white">
              <button className="flex items-center gap-2 text-[20px]">
                <MdPhoto /> Photo
              </button>
              <button className="flex items-center gap-2 text-[20px]">
                <MdOutlineVideoLibrary /> Video
              </button>
            </div>
          </div>

          <div className="space-y-6 mt-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="text-white border-b border-[#796943] p-4 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={ProfileImg.src}
                    alt="User"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold mb-1 text-[20px]">
                      GainerSheWrote
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <FaRegEdit />
                      Just now
                    </p>
                  </div>
                </div>
                <p>
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam voluptatum labore dolorum illum natus accusamus in ullam officiis praesentium ea. Eius blanditiis magnam at quasi, cumque dicta! Fuga quia quos delectus accusamus est laborum consequuntur quas? Eius repellendus numquam libero assumenda adipisci fugiat est deserunt voluptatum vero eum, iste reprehenderit.
                </p>
                {index === 2 && (
                  <Image
                    src={PostImg.src}
                    alt="Post Image"
                    width={600}
                    height={300}
                    className="rounded-md"
                  />
                )}
                <div className="flex gap-5 text-sm text-gray-300">
                  <button className="hover:text-yellow-500 flex items-center gap-2 text-[18px]">
                    <MdFavoriteBorder />
                    Favorite
                  </button>
                  <button className="hover:text-yellow-500 flex items-center gap-2 text-[18px]">
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
