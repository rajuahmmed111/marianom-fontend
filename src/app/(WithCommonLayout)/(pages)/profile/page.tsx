"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProfileImg from "@/assets/profile.png";
// import PostImg from "@/assets/news.jpeg";
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
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { useGetProfileQuery } from "@/redux/features/authSlice/authApi";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetPostQuery, usePostApiMutation } from "@/redux/features/post/postApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import avatar from "@/assets/avatar.jpg"


interface DecodedToken extends JwtPayload {
  id: string;
  email: string
}

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTab, setIsTab] = useState("all");
  // Explicitly define the types for images and videos
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const token = useSelector((state: RootState) => state.auth.token)


  const decodedToken = token ? (jwt.decode(token) as DecodedToken) : null;


  const id = decodedToken ? decodedToken.id : null;

  // console.log('My profile id is', id);
  const { data: getProfile } = useGetProfileQuery(id)
  console.log(getProfile);






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

  // Handle Remove Image
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Remove Video
  const handleRemoveVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const { register, handleSubmit, reset } = useForm()

  const [postApi] = usePostApiMutation()

  const handlePost = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("description", data.description);

      images.forEach((image) => {
        formData.append("images", image);
      });

      videos.forEach((video) => {
        formData.append("videos", video);
      });

      const res = await postApi(formData).unwrap();

      if (res) {
        toast.success("Post submitted successfully!");
        reset();
        setImages([]);
        setVideos([]);
      }
    } catch (error) {
      console.error("Post submission failed:", error);
      toast.error("Cannot post, please try again.");
    }
  };


  const { data: getPost } = useGetPostQuery({})
  console.log('My all post is', getPost?.data?.meta?.data[0].user);


  const profileurls = getProfile?.data?.profileImage?.url !== null ? getProfile?.data?.profileImage?.url: avatar


  return (
    <div className="bg-primary min-h-screen text-white p-4 md:p-8 container mx-auto mt-40 md:mt-48">
      {/* Profile Header */}
      <div className="bg-secondary rounded-lg p-4 md:p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            <Image
              src={profileurls}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-yellow-500"
            />
            <div>
              <div className="flex flex-wrap items-center gap-4 md:gap-7">
                <h1 className="text-2xl md:text-[32px] font-semibold">
                  {getProfile?.data?.firstName + ' ' + getProfile?.data?.lastName}
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
              className={`font-semibold cursor-pointer text-base md:text-[20px] ${isTab === "all" ? "text-white" : "text-[#807E7E]"
                }`}
            >
              All
            </button>
            <button
              onClick={() => setIsTab("photos")}
              className={`cursor-pointer flex items-center gap-2 text-base md:text-[20px] ${isTab === "photos" ? "text-white" : "text-[#807E7E]"
                }`}
            >
              Photos
            </button>
            <button
              className={`cursor-pointer flex items-center gap-2 text-base md:text-[20px] ${isTab === "video" ? "text-white" : "text-[#807E7E]"
                }`}
            >
              Video
            </button>
          </div>
          <div>
            <Link href="/message">
              <button className="bg-transparent flex items-center gap-2 px-4 py-2">
                <LuMessageSquareMore />
                Message
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {isTab === "all" && (
        <div>
          {/* Post Input */}
          <div className="bg-secondary rounded-lg p-4 md:p-6 mt-4 md:mt-8 shadow-lg">
            <form onSubmit={handleSubmit(handlePost)}>
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
                  {...register("description", { required: true })}
                />
                <button
                  className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition duration-300 shadow-lg"
                  type="submit"
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
                    {...register("images")}
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
                    {...register("videos")}
                    onChange={handleVideoUpload}
                  />
                </label>
              </div>
            </form>


            {/* Media Preview Section */}
            <div className="mt-4 md:mt-8">
              {images.length > 0 && (
                <div className="w-1/2">
                  <h3 className="font-semibold text-lg mb-2">Images:</h3>
                  <div className="flex md:flex-row flex-col flex-wrap gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt="Uploaded Preview"
                          className="mx-1 my-1 h-auto rounded-md"
                          width={100}
                          height={100}
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-1 -right-1 bg-white rounded-full p-1 z-30"
                        >
                          <RxCross2 className="text-black" size={16} />

                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {videos.length > 0 && (
                <div className="mt-4 w-1/2">
                  <h3 className="font-semibold text-lg mb-2">Videos:</h3>
                  <div className="flex gap-2">
                    {videos.map((video, index) => (
                      <div key={index} className="relative">
                        <video
                          src={URL.createObjectURL(video)}
                          controls
                          className="w-auto h-[200px] rounded-md"
                        ></video>
                        <button
                          onClick={() => handleRemoveVideo(index)}
                          className="absolute -top-1 -right-1 bg-white rounded-full p-1 z-30"
                        >
                          <RxCross2 className="text-black" size={16} />

                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6 mt-4 md:mt-8">

            {getPost?.data?.meta?.data && getPost.data.meta.data.length > 0 ? (
              getPost.data.meta.data.map((post: any, index: number) => (
                <div
                  key={index}
                  className="text-white border-b border-[#796943] p-4 space-y-4"
                >
                  <div className="flex items-center gap-4">
                  
                    < Image
                      key={index}
                      src={post?.user?.profileImage?.url || avatar }
                      alt={`Post Image ${index + 1}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />

                    <div>
                      <p className="font-semibold text-base md:text-[20px]">
                        {post.user.firstName}
                      </p>
                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        <FaRegEdit />
                        Just now
                      </p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed">
                    {post.description}
                  </p>
                  {post.images && post.images.length > 0 && (
                    <div className="image-gallery flex flex-wrap gap-4">
                      {post.images.map((imageUrl: string, imgIndex: number) => (
                        <Image
                          key={imgIndex}
                          src={imageUrl}
                          alt={`Post Image ${imgIndex + 1}`}
                          width={200}
                          height={200}
                          className="rounded-md w-[200px] h-auto"
                        />
                      ))}
                    </div>
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
              ))
            ) : (
              <p>No post available</p>
            )}


            {/* {[...Array(3)].map((_, index) => (
           
            ))} */}
          </div>
        </div>
      )}

      {isTab === "photos" && <Photos />}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {id && <UpdateProfileForm getProfile={getProfile} id={id} />}
      </Modal>
    </div>
  );
}
