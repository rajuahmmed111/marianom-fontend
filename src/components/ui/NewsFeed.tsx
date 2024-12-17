"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProfileImg from "@/assets/profile.png";
import { CgProfile } from "react-icons/cg";
import { IoMdPhotos, IoMdClose } from "react-icons/io";
import { RiUserCommunityLine } from "react-icons/ri";
import RightSide from "./RightSide";
import Birthday from "./Birthday";
import NewMember from "./NewMember";
import LatestEveryone from "./LatestEveryone";
import NeearByOnline from "./NeearByOnline";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";

export default function NewsFeed() {
  const [activeTab, setActiveTab] = useState<string>("global");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <div className="pt-48">
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleDrawer}
        className="fixed top-[153px] left-0 z-50 md:hidden bg-secondary text-white p-2 rounded-md shadow-lg"
      >
        <IoSettingsOutline className="w-5 h-5 inline mr-2 animate-spin" />
      </button>

      {/* Container Layout */}
      <div className="container flex mx-auto px-4 relative">
        {/* Static Sidebar for Desktop */}
        <aside className="w-[321px] bg-secondary text-white p-5 space-y-6 hidden md:block">
          <ProfileSection />
          <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
          <VisitorsSection />
          <OnlineSection />
        </aside>

        {/* Drawer Sidebar for Mobile */}
        <aside
          className={`fixed top-48 left-0 h-full w-[100%]  bg-secondary text-white p-5 z-50 transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:hidden`}
        >
          {/* Close Button */}
          <button
            onClick={toggleDrawer}
            className="absolute top-4 right-4 text-white"
          >
            <IoMdClose size={24} />
          </button>
          <ProfileSection />
          <SidebarNav
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setIsDrawerOpen(false);
            }}
          />
          <VisitorsSection />
          <OnlineSection />
        </aside>

        {/* Right Content */}
        <div className="flex-1">
          {activeTab === "global" && <RightSide />}
          {activeTab === "birthday" && <Birthday />}
          {activeTab === "member" && <NewMember />}
          {activeTab === "latest" && <LatestEveryone />}
          {activeTab === "online" && <NeearByOnline />}
        </div>
      </div>
    </div>
  );
}

/** Profile Section Component */
const ProfileSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center border-b-2 border-[#796943] pb-4">
      <Image
        src={ProfileImg.src}
        alt="Profile"
        width={90}
        height={90}
        className="rounded-full mb-3"
      />
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-1">LeoPanxon</h2>
        <Link href="/profile">
          <p className="border-b border-[#796943] inline-block">My account</p>
        </Link>
      </div>
    </div>
  );
};

/** Sidebar Navigation Component */
interface SidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: "Global News feed", key: "global" },
    { name: "People", key: "people", icon: <CgProfile /> },
    { name: "Near By and Online", key: "online" },
    { name: "Today birthday", key: "birthday" },
    { name: "New member", key: "member" },
    { name: "Photos", key: "photos", icon: <IoMdPhotos /> },
    { name: "Latest everyone", key: "latest" },
  ];

  return (
    <ul className="space-y-4 text-sm">
      <button className="font-semibold text-[18px] flex items-center gap-1">
        <RiUserCommunityLine />
        Community
      </button>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`font-semibold text-[18px] px-5 py-2 rounded-md flex items-center gap-2 ${
            activeTab === tab.key
              ? "bg-gradient-to-r from-[#FEB800]/50 to-[#986E00]/0 text-white"
              : "bg-transparent"
          }`}
        >
          {tab.icon} {tab.name}
        </button>
      ))}
    </ul>
  );
};

/** Visitors Section Component */
const VisitorsSection: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Visited my profile (204)</h3>
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
  );
};

/** Online Section Component */
const OnlineSection: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mt-5 mb-3">Currently online (1204)</h3>
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
  );
};
