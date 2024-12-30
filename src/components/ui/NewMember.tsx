"use client";
import React, { useState } from "react";
import { SlCalender } from "react-icons/sl";
import birthdayImage from "@/assets/birthday.jpeg";
import Image from "next/image";
import {
  useAddFollowMutation,
  useFetchFollowingQuery,
  useUnFollowMutation,
} from "@/redux/features/follow/followApi";

import { useGetNewMemberQuery } from "@/redux/features/newMember/newMemberApi";

import jwt, { JwtPayload } from "jsonwebtoken";
import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
import { RootState } from "@/redux/rootReducer";
import { toast } from "sonner";

// Define the Member interface
interface Member {
  id: string;
  userName: string;
  email: string;
  profileImage: {
    url: string;
    altText?: string;
  } | null;
  firstName: string;
  lastName: string;
  identifier: string;
  currentLocation: string;
}

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

const NewMember = () => {
  const { data: newMemberData, isLoading, error } = useGetNewMemberQuery({});
  const { data: followingData, isFetching: isFetchingFollowing } =
    useFetchFollowingQuery({});
  const [addFollow] = useAddFollowMutation();
  const [unFollow] = useUnFollowMutation();

  const token = useSelector((state: RootState) => state.auth.token);
  const decodedToken = token ? (jwt.decode(token) as DecodedToken) : null;

  const currentUserId = decodedToken ? decodedToken.id : null;

  // Keep track of the local follow state
  const [localFollowing, setLocalFollowing] = useState<string[]>(
    followingData?.data?.following.map((user: { id: string }) => user.id) || []
  );

  const newMembers: Member[] = newMemberData?.data || [];

  interface HandleFollowToggleEvent
    extends React.MouseEvent<HTMLButtonElement> {}

  const handleFollowToggle = async (
    userId: string,
    e: HandleFollowToggleEvent
  ) => {
    e.preventDefault();

    if (currentUserId === userId) {
      toast.error("You cannot follow yourself.");
      return;
    }

    if (localFollowing.includes(userId)) {
      try {
        await unFollow(userId).unwrap();
        setLocalFollowing((prev) => prev.filter((id) => id !== userId));
        toast.success("Unfollowed successfully!");
      } catch (error) {
        console.error("Failed to unfollow:", error);
        toast.error("Failed to unfollow. Please try again.");
      }
    } else {
      try {
        await addFollow(userId).unwrap();
        setLocalFollowing((prev) => [...prev, userId]);
        toast.success("Followed Successfully")
      } catch (error) {
        console.error("Failed to follow:", error);
        toast.error("Failed to follow. Please try again.");
      }
    }
  };

  if (isLoading || isFetchingFollowing) {
    return <p className="text-white text-center">Loading new members...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">Failed to load new members.</p>
    );
  }

  // get followers

  const getFollowersForUser = (userId: string) => {
    const user: { id: string; userName: string } | undefined =
      followingData?.data?.following.find(
        (follower: { id: string }) => follower.id === userId
      );
    return user ? [user.userName] : [];
  };

  return (
    <div className="bg-primary flex-1 min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-6 border-b-4 border-border-primary pb-6">
        <div>
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            New Members{" "}
            <span className="text-yellow-300">({newMembers.length})</span>
          </h1>
          <p className="text-gray-100 text-sm md:text-base">
            Updates from everyone
          </p>
        </div>
        <div className="border border-border-primary w-full sm:w-[180px] text-white p-2 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[14px]">Date</p>
            <p className="font-bold text-[14px]">
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <SlCalender className="text-[18px]" />
        </div>
      </div>

      {/* Member Cards */}
      <div className="space-y-4">
        {newMembers.slice(0, 20).map((member) => (
          <div
            key={member.id}
            className="bg-[#58481F91] p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
          >
            {/* Left Section */}
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 w-full">
              {/* Profile Image */}
              <Image
                src={member.profileImage?.url || birthdayImage}
                alt={
                  member.profileImage?.altText ||
                  member.userName ||
                  "New member"
                }
                className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full object-cover"
              />
              <div className="text-center md:text-left">
                <h2 className="text-white font-bold text-lg md:text-2xl">
                  {member.firstName} {member.lastName}
                  {currentUserId === member.id ? (
                    <span className="ml-4 font-medium text-gray-400">You</span>
                  ) : (
                    <button
                      type="button" // Prevent default form submission
                      className={`ml-4 font-medium text-sm md:text-base px-4 py-2 rounded-md ${
                        localFollowing.includes(member.id)
                          ? "text-gray-400 cursor-pointer"
                          : "text-[#FEB800]"
                      }`}
                      onClick={(e) => handleFollowToggle(member.id, e)}
                    >
                      {localFollowing.includes(member.id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  )}
                </h2>

                {(() => {
                  const followers = getFollowersForUser(member.id);
                  return (
                    <p className="text-gray-300 text-[20px] font-medium mt-2 mb-4">
                      {followers.length} Follower
                      {followers.length !== 1 ? "s" : ""}
                    </p>
                  );
                })()}
              </div>
            </div>

            {/* Right Tag */}
            <div>
              <span className="bg-[#58481F] text-white px-4 py-2 text-sm md:text-base rounded-md font-medium">
                {member.identifier}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewMember;
