import Image from "next/image";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import profileImage from "@/assets/profile.png";
import edit from "@/assets/edit.png";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation, useUpdateProfileImageMutation, useUpdateUserMutation } from "@/redux/features/authSlice/authApi";
import { toast } from "sonner";
import avatar from "@/assets/avatar.jpg"


interface UpdateProfileFormProps {
  getProfile: any;
  id: string
}

export default function UpdateProfileForm({ getProfile, id }: UpdateProfileFormProps) {
  // State to toggle visibility for each password field
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  console.log(getProfile);


  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      firstName: getProfile?.data?.firstName || "",
      lastName: getProfile?.data?.lastName || "",
      oldPassword: "",
      newPassword: "",
      profileImage: ""
    },
  });


  const [updateUser] = useUpdateUserMutation()
  const [changePassword] = useChangePasswordMutation()

  const handleChangepassword = async (data: any) => {
    try {
      if (data.oldPassword && data.newPassword) {
        const res = await changePassword(data);
        if (res) {
          toast.success("Password changed successfully");
          reset()
        } else {
          toast.error("Cannot change password");
        }
      }
    } catch {
      toast.error("An error occurred");
    }
  }
  const handlechangeInfo = async (data: any) => {
    try {

      const res = await updateUser(data);
      if (res) {
        toast.success("Password changed successfully");
      } else {
        toast.error("Cannot change password");
      }

    } catch {
      toast.error("An error occurred");
    }
  }
  const [images, setImages] = useState<File[]>([]);
  console.log(images);

  const [updateProfile] = useUpdateProfileImageMutation()


  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setImages(imageFiles);

    if (imageFiles.length === 0) {
      toast.error("Please select a valid image file.");
      return;
    }

    // Upload the image to the server
    try {
      const formData = new FormData();
      formData.append("profileImage", imageFiles[0]);
      const res = await updateProfile({ id, data: formData });

      if (res?.data) {
        toast.success("Profile image updated successfully!");
        reset({ ...getProfile?.data, profileImage: res.data.profileImage });
      } else {
        toast.error("Failed to update profile image.");
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("An error occurred while updating the profile image.");
    }
  };


  // const profileurls = getProfile?.data?.profileImage?.url !== null ? getProfile?.data?.profileImage?.url : avatar



  return (
    <div className="text-white p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
        Update Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <form encType="multipart/form-data" >
        <div className="relative w-32 h-32">
          <Image
            src={avatar}
            alt="Profile"
            className="rounded-full  object-cover"
            width={150}
            height={150}
          />
          <label
            // type="button"
            className="absolute bottom-0 right-0 bg-yellow-500 text-black px-2 py-1 rounded-md text-xs md:text-sm hover:bg-yellow-600 cursor-pointer"
          >
            Change
            <input
              type="file"
              accept="image/*"
              multiple={false}
              className="hidden"
              {...register("profileImage")}
              onChange={handlePhotoUpload}
            />
          </label>
        </div>

        </form>
      </div>

      {/* Form Fields */}
      <form className="space-y-6" onSubmit={handleSubmit(handlechangeInfo)}>
        <h1 className="text-base md:text-lg font-medium mb-4 capitalize">
          Change owner name
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="relative">
            <label className="block mb-1 text-sm md:text-base">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName")}
              required
              onChange={(e) => setValue("firstName", e.target.value)} // Update the form value dynamically
              defaultValue={getProfile?.data?.firstName || ""} // Set default value for initial rendering
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
            <Image src={edit} alt="edit image" className="absolute top-[60%] right-2" />
          </div>

          {/* Last Name */}
          <div className="relative">
            <label className="block mb-1 text-sm md:text-base">Last Name</label>
            <input
              type="text"
              {...register("lastName")}
              required
              onChange={(e) => setValue("lastName", e.target.value)} // Update the form value dynamically
              defaultValue={getProfile?.data?.lastName || ""} // Set default value for initial rendering
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
            <Image src={edit} alt="edit image" className="absolute top-[60%] right-2" />
          </div>

          {/* Email address */}
          <div className="col-span-2 relative">
            <label className="block mb-1 text-sm md:text-base">
              Email address
            </label>
            <input
              type="email"
              value={getProfile?.data?.email || ''}
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
              disabled
            />
            <Image src={edit} alt="edit image" className="absolute top-[60%] right-2" />
          </div>

        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black py-2 md:py-3 rounded-md font-semibold hover:bg-yellow-600 transition"
        >
          Save Update
        </button>
      </form>

      {/* Change Password Section */}
      <form onSubmit={handleSubmit(handleChangepassword)}>
        <div>
          <h1 className="text-base md:text-lg font-medium mb-4 mt-2">
            Change Password
          </h1>
          {/* Current Password */}
          <div className="relative">
            <label className="block mb-1 text-sm md:text-base">
              Current Password
            </label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="••••••••••"
              {...register("oldPassword")}
              onChange={(e) => setValue("oldPassword", e.target.value)}
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
            <button
              type="button"
              className="absolute top-[70%] right-3 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
            >
              {showCurrentPassword ? (
                <FaEyeSlash size={22} />
              ) : (
                <FaEye size={22} />
              )}
            </button>
          </div>

          {/* New Password */}
          <div className="relative mt-4">
            <label className="block mb-1 text-sm md:text-base">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••••"
              {...register("newPassword")}
              onChange={(e) => setValue("newPassword", e.target.value)}
              className="w-full bg-[#483C19] text-white p-2 md:p-3 rounded-md border border-gray-600 focus:outline-none"
            />
            <button
              type="button"
              className="absolute top-[70%] right-3 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-3 bg-yellow-500 text-black py-2 md:py-3 rounded-md font-semibold hover:bg-yellow-600 transition"
        >
          Save Update
        </button>
      </form>
    </div>
  );
}
