"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProfileImg from "@/assets/profile.png";
import { CgProfile } from "react-icons/cg";
import { IoMdPhotos } from "react-icons/io";
import { RiUserCommunityLine } from "react-icons/ri";
import RightSide from "./RightSide";
import Birthday from "./Birthday";
import NewMember from "./NewMember";
import LatestEveryone from "./LatestEveryone";
import NeearByOnline from "./NeearByOnline";
import Link from "next/link";

export default function NewsFeed() {
  const [activeTab, setActiveTab] = useState("global");
  return (
    <div className="pt-48">
      {/* Container Layout */}
      <div className="container flex">
        <aside className="w-[321px] bg-secondary text-white p-5 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center border-b-2 border-[#796943]">
            <Image
              src={ProfileImg.src}
              alt="Profile"
              width={110}
              height={110}
              className="rounded-full mx-auto mb-3"
            />
            <div className="mr-5">
              <h2 className="text-lg font-semibold mb-2">LeoPanxon</h2>
              <Link href='/profile'><p className="border-b border-[#796943]">My account</p></Link>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4 text-sm">
            <button className="font-semibold text-[18px] flex items-center gap-1">
              <RiUserCommunityLine />
              Community
            </button>
            <button
              onClick={() => setActiveTab("global")}
              className={`font-semibold text-[18px] px-5 py-2 rounded-md ${
                activeTab === "global"
                  ? "bg-gradient-to-r from-[#FEB800]/50 to-[#986E00]/0 text-white"
                  : "bg-transparent"
              }`}
            >
              Global News feed
            </button>
            <button
              onClick={() => setActiveTab("people")}
              className={`font-semibold text-[18px] px-5 py-2 rounded-md flex items-center gap-1 ${
                activeTab === "people"
                  ? "bg-gradient-to-r from-[#FEB800]/50 to-[#986E00]/0 text-white"
                  : "bg-transparent"
              }`}
            >
              <CgProfile /> People
            </button>
            <button
              onClick={() => setActiveTab("online")}
              className={`font-semibold text-[18px] px-5 py-2 rounded-md flex items-center gap-1 ${
                activeTab === "online"
                  ? "bg-gradient-to-r from-[#FEB800]/50 to-[#986E00]/0 text-white"
                  : "bg-transparent"
              }`}
            >
              Near By and Online
            </button>
            <button
              onClick={() => setActiveTab("birthday")}
              className={`font-semibold text-[18px] px-5 py-2 rounded-md ${
                activeTab === "birthday"
                  ? "bg-gradient-to-r from-[#FEB800]/50 to-[#986E00]/0 text-white"
                  : "bg-transparent"
              }`}
            >
              Today birthday
            </button>
            <br />
            <button
              onClick={() => setActiveTab("member")}
              className={`font-semibold text-[18px] px-5 py-2 rounded-md ${
                activeTab === "member"
                  ? "bg-gradient-to-r from-[#FEB800]/50 to-[#986E00]/0 text-white"
                  : "bg-transparent"
              }`}
            >
              New member
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`font-semibold text-[18px] px-5 py-2 rounded-md flex items-center gap-1 ${
                activeTab === "photos"
                  ? "bg-gradient-to-r from-[#FEB800]/50 to-[#986E00]/0 text-white"
                  : "bg-transparent"
              }`}
            >
              <IoMdPhotos />
              Photos
            </button>
            <button
              onClick={() => setActiveTab("latest")}
              className={`font-semibold text-[18px] px-5 py-2 rounded-md ${
                activeTab === "latest"
                  ? "bg-gradient-to-r from-[#FEB800]/50 to-[#986E00]/0 text-white"
                  : "bg-transparent"
              }`}
            >
              Latest everyone
            </button>
          </ul>

          {/* Visitors Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Visited my profile (204)
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(10)].map((_, index) => (
                <Image
                  key={index}
                  src={ProfileImg.src}
                  alt={`Visitor ${index + 1}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Currently Online Section */}
          <div>
            <h3 className="text-lg font-semibold mt-5 mb-3">
              Currently online (1204)
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(10)].map((_, index) => (
                <Image
                  key={index}
                  src={ProfileImg.src}
                  alt={`Online ${index + 1}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Right Content */}
        {activeTab === "global" && <RightSide />}
        {activeTab === "birthday" && <Birthday />}
        {activeTab === "member" && <NewMember />}
        {activeTab === "latest" && <LatestEveryone />}
        {activeTab === "online" && <NeearByOnline />}
      </div>
    </div>
  );
}
