"use client";
import React, {  useState } from "react";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import birthday from "@/assets/birthdayIcon.png";
import birthdayRight from "@/assets/birthdayBallon.png";
import birthdayBottom from "@/assets/birthdayBallonBottom.png";
import avater from "@/assets/avater.png";
import {
  useGetTodaysBirthdaysQuery,
  usePostBirthdayWishMutation,
} from "@/redux/birthdayApi/birthdayApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

interface BirthdayPerson {
  id: string;
  userName: string;
  profileImage: {
    url: string;
    altText: string;
  } | null;
}

export default function Birthday() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<BirthdayPerson | null>(null);
  const [wishMessage, setWishMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { data, isLoading, error } = useGetTodaysBirthdaysQuery({});

  const todayDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const birthdayList: BirthdayPerson[] = data?.data || [];

  const openModal = (person: BirthdayPerson) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setWishMessage("");
    setImagePreview(null);
    setSelectedImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    handleSubmit,
    
  } = useForm();
  const [postBirthdayWish, { isLoading: isPosting }] = usePostBirthdayWishMutation();

  const handlePostWish = async (data: any) => {
    console.log(data);
    if (!wishMessage) {
      toast.error("Please enter a wish message.");
      return;
    }
    const formData = new FormData();
    formData.append("receiverId", selectedPerson?.id || "");
    formData.append("wishMessage", wishMessage);
    if (selectedImage) {
      formData.append("birthdayImage", selectedImage);
    }
    try {
      const res = await postBirthdayWish(formData);
      if (res) {
        console.log(res);
        toast.success("Birthday wish posted successfully!");
        closeModal();
      } else {
        console.log("error");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to post birthday wish.";
      toast.error(errorMessage);
      console.error("Error posting birthday wish:", error);
    }
  };

  if (isLoading) {
    return <p className="text-white text-center">Loading birthdays...</p>;
  }

  if (error) {
    return <p className="text-white text-center">Failed to load birthdays.</p>;
  }

  return (
    <div className="bg-primary min-h-screen p-4 md:p-6 flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b-4 border-border-primary pb-6 gap-4">
        <div>
          <h1 className="text-white text-2xl md:text-3xl font-bold">
            Today’s birthday{" "}
            <span className="text-yellow-300">({birthdayList.length || 0})</span>
          </h1>
          <p className="text-gray-100 text-sm md:text-base">Updates from everyone</p>
        </div>
        <div className="border border-border-primary w-full sm:w-[180px] text-white p-2 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[14px]">Date</p>
            <p className="font-bold text-[14px]">{todayDate}</p>
          </div>
          <div>
            <SlCalender className="text-[18px]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {birthdayList.map((person) => (
          <div key={person.id} className="bg-secondary p-4 rounded-lg shadow-lg">
            <Image
              src={person.profileImage?.url || avater.src}
              alt={person.profileImage?.altText || "Default avatar"}
              className="w-full h-40 object-cover rounded-lg mb-4"
              width={300}
              height={150}
            />
            <div>
              <h2 className="text-white text-xl font-bold">{person.userName}</h2>
              <div
                className="flex items-center justify-between py-3 px-4 mt-3 border border-white rounded-xl text-white cursor-pointer"
                onClick={() => openModal(person)}
              >
                <button className="bg-transparent text-white font-medium py-1 rounded transition duration-200 text-[14px] text-base">
                  Wish {person.userName} a Happy Birthday
                </button>
                <Image src={birthday} alt="Birthday Icon" className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedPerson && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data) => handlePostWish({ ...data, receiverId: selectedPerson.id }))}
          >
            <div
              className="bg-secondary rounded-lg relative w-full sm:w-[90%] md:w-[750px] shadow-xl pt-16 px-6 md:px-20 pb-12 md:pb-28"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={birthdayRight}
                alt="Balloon Right"
                className="absolute w-20 md:w-40 h-32 md:h-60 left-0 top-0"
              />
              <Image
                src={birthdayBottom}
                alt="Balloon Bottom"
                className="absolute right-0 bottom-0 w-20 md:w-[165px] h-32 md:h-[245px]"
              />
              <h2 className="text-yellow-300 text-2xl md:text-[28px] font-bold mb-4 text-center">
                Today’s birthday
              </h2>
              <p className="text-gray-100 text-center mb-6 text-sm md:text-base">
                Wish your friends a happy birthday!
              </p>
              <div className="relative mb-4">
                <input
                  type="file"
                  accept="image/*"
                  {...register("birthdayImage")}
                  className="hidden"
                  id="uploadImage"
                  onChange={handleImageChange}
                />
              </div>
              <div className="relative">
                <textarea
                  placeholder={`Write on ${selectedPerson.userName}'s timeline`}
                  value={wishMessage}
                  {...register("text")}
                  onChange={(e) => setWishMessage(e.target.value)}
                  className="w-full p-3 rounded-lg bg-transparent text-white border border-white placeholder:text-white pr-16 h-[150px] md:h-[200px]"
                ></textarea>
                {imagePreview && (
                  <div className="mb-6">
                    <Image
                      src={imagePreview}
                      alt="Uploaded Image"
                      className="w-[30%] mx-auto h-auto rounded-lg"
                      width={50}
                      height={50}
                    />
                  </div>
                )}
                <div className="mt-6 text-center">
                  <button
                    className={`bg-yellow-500 w-[60%] text-white py-2 px-6 rounded-lg font-bold text-sm md:text-base transition duration-300 hover:bg-yellow-600 shadow-lg ${
                      isPosting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    type="submit"
                    disabled={isPosting}
                  >
                    {isPosting ? "Posting..." : "Post"}
                  </button>
                </div>
                <div
                  className="absolute right-4 top-4 cursor-pointer"
                  onClick={() => document.getElementById("uploadImage")?.click()}
                >
                  <Image src={birthday} alt="Birthday Icon" className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
