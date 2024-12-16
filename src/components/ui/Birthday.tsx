"use client";
import React, { useState } from "react";
import birthdayImage from "@/assets/birthday.jpeg";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import birthday from "@/assets/birthdayIcon.png"; // Birthday Icon Image
import birthdayRight from "@/assets/birthdayBallon.png";
import birthdayBottom from "@/assets/birthdayBallonBottom.png";

export default function Birthday() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const birthdayList = Array(12).fill({
    name: "David Saifur",
    age: "25 years old",
    image: birthdayImage,
  });

  const openModal = (name: React.SetStateAction<string>) => {
    setSelectedName(name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setImagePreview("");
  };

  // Handle image selection and set the preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-primary min-h-screen p-6 flex-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b-4 border-border-primary pb-7">
        <div>
          <h1 className="text-white text-3xl font-bold">
            Today’s birthday <span className="text-yellow-300">(12)</span>
          </h1>
          <p className="text-gray-100">Updates from everyone</p>
        </div>
        <div className="border border-border-primary w-[180px] text-white p-2 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-[14px]">Date</p>
            <p className="font-bold text-[14px]">12 August 2024</p>
          </div>
          <div>
            <SlCalender className="text-[18px]" />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {birthdayList.map((person, index) => (
          <div key={index} className="bg-secondary p-4 rounded-lg shadow-lg">
            {/* Image */}
            <Image
              src={person.image}
              alt={person.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            {/* Content */}
            <div>
              <h2 className="text-white text-xl font-bold">{person.name}</h2>
              <p className="text-gray-300 mb-5 mt-3">{person.age}</p>

              {/* Input Field */}
              <div
                className="flex items-center justify-between py-3 px-4 gap-4 mb-3 border border-white rounded-xl text-white cursor-pointer"
                onClick={() => openModal(person.name)}
              >
                <button
                  className="bg-transparent text-white font-medium py-1 px-3 rounded transition duration-200"
                  aria-label={`Wish ${person.name} a Happy Birthday`}
                >
                  Wish {person.name} a Happy Birthday
                </button>
                <Image
                  src={birthday}
                  alt="Birthday Icon"
                  className="w-6 h-6 text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-secondary rounded-lg relative w-full md:w-[750px] shadow-xl pt-16 px-20 pb-28"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Balloon images */}
            <Image
              src={birthdayRight}
              alt="Balloon Right"
              className="absolute w-40 h-60 left-0 top-0"
            />
            <Image
              src={birthdayBottom}
              alt="Balloon Bottom"
              className="absolute right-0 bottom-0 w-[165px] h-[245px]"
            />

            {/* Modal Content */}
            <h2 className="text-yellow-300 text-[28px] font-bold mb-4 text-center">
              Today’s birthday
            </h2>
            <p className="text-gray-100 text-center mb-6">
              Wish your friends a happy birthday!
            </p>

            {/* Display the selected image or uploaded image */}
            {imagePreview && (
              <div className="mb-6">
                <img
                  src={imagePreview}
                  alt="Uploaded Image"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}

            {/* Image Upload Section */}
            <div className="relative mb-4">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="uploadImage"
                onChange={handleImageChange}
              />
            </div>

            {/* Text Input */}
            <div className="relative">
              <textarea
                placeholder={`Write on ${selectedName}'s timeline`}
                className="w-full p-3 rounded-lg bg-transparent text-white border border-white placeholder:text-white pr-16 h-[200px]"
              ></textarea>

              <div
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => document.getElementById("uploadImage")?.click()}
              >
                <Image
                  src={birthday}
                  alt="Birthday Icon"
                  className="w-12 h-12"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
