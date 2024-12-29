"use client";
import React, { useEffect, useState } from "react";
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
import { useGetProfileQuery } from "@/redux/features/authSlice/authApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  useCreateProfileVisitorMutation,
  useFetchFollowingQuery,
  useGetProfileVisitorQuery,
} from "@/redux/birthdayApi/birthdayApi";

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

export default function NewsFeed() {
  const [activeTab, setActiveTab] = useState<string>("global");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const token = useSelector((state: RootState) => state.auth.token);
  const decodedToken = token ? (jwt.decode(token) as DecodedToken) : null;
  const id = decodedToken ? decodedToken.id : null;

  // Fetch Profile Data
  const { data: MyProfile } = useGetProfileQuery(id);

  // Fetch Following Data
  const { data: followingData } = useFetchFollowingQuery({});
  const followingIds: string[] =
    followingData?.data?.following.map((user: { id: string }) => user.id) || [];

  // Create Profile Visitor Mutation
  const [createProfileVisitor] = useCreateProfileVisitorMutation();

  // Log Profile Visits
  useEffect(() => {
    if (id && followingData?.data?.following?.length > 0) {
      const idsToProcess: string[] = followingData.data.following.map((user: { id: string }) => user.id);
  
      idsToProcess.forEach((followingId: any) => {
        createProfileVisitor({ userId: id, followingId });
      });
    }
  }, [id, followingData, createProfileVisitor]);

  // Fetch Profile Visitor Data
  const { data: visitorData, isLoading, error } = useGetProfileVisitorQuery(id, {
    skip: !id, // Skip query if no userId
  });

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
          <ProfileSection MyProfile={MyProfile} />
          <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
          <VisitorsSection
            visitorData={visitorData}
            isLoading={isLoading}
            error={error}
          />
          <OnlineSection />
        </aside>

        {/* Drawer Sidebar for Mobile */}
        <aside
          className={`fixed top-48 left-0 h-full w-[100%] bg-secondary text-white p-5 z-50 transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:hidden`}
        >
          <button
            onClick={toggleDrawer}
            className="absolute top-4 right-4 text-white"
          >
            <IoMdClose size={24} />
          </button>
          <ProfileSection MyProfile={MyProfile} />
          <SidebarNav
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setIsDrawerOpen(false);
            }}
          />
          <VisitorsSection
            visitorData={visitorData}
            isLoading={isLoading}
            error={error}
          />
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
interface ProfileSectionProps {
  MyProfile: any;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ MyProfile }) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-8 items-center border-b-2 border-[#796943] pb-4">
      <Image
        src={ProfileImg.src}
        alt="Profile"
        width={90}
        height={90}
        className="rounded-full mb-3"
      />
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-1">
          {MyProfile?.data?.firstName}
        </h2>
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
    { name: "Global News feed", key: "global", button: true },
    { name: "People", key: "people", button: false, icon: <CgProfile /> },
    { name: "Near By and Online", key: "online", button: true },
    { name: "Today birthday", key: "birthday", button: true },
    { name: "New member", key: "member", button: true },
    { name: "Photos", key: "photos", button: false, icon: <IoMdPhotos /> },
    { name: "Latest everyone", key: "latest", button: true },
  ];

  return (
    <ul className="space-y-4 text-sm">
      {/* Static Community Section */}
      <button className="font-semibold text-[18px] flex items-center gap-1 cursor-not-allowed">
        <RiUserCommunityLine />
        Community
      </button>

      {tabs.map((tab) =>
        tab.button ? (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`font-normal text-base px-5 py-2 rounded-md flex items-center gap-2 ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-[#FEB800]/50 to-[#986E00]/0 text-white"
                : "bg-transparent"
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ) : (
          <div
            key={tab.key}
            className="font-semibold text-[18px]  py-2  flex items-center gap-2 text-white cursor-not-allowed"
          >
            {tab.icon} {tab.name}
          </div>
        )
      )}
    </ul>
  );
};

/** Visitors Section Component */
interface VisitorsSectionProps {
  visitorData: any;
  isLoading: boolean;
  error: any;
}

const VisitorsSection: React.FC<VisitorsSectionProps> = ({
  visitorData,
  isLoading,
  error,
}) => {
  if (isLoading) return <p>Loading visitors...</p>;
  if (error) return <p>Error loading visitors.</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">
        Visited my profile ({visitorData?.data?.length || 0})
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {visitorData?.data?.map((visitor: any, index: number) => (
          <Image
            key={index}
            src={visitor.profilePicture || ProfileImg.src}
            alt={`Visitor ${visitor.name || "Anonymous"}`}
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
  );
};
