"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MdSend } from "react-icons/md";
import { ImNotification } from "react-icons/im";

// Sample images and data
import userImage from "@/assets/profile.png";
import senderImage from "@/assets/profile.png";
import ActiveImg from "@/assets/messageimg.jpeg";

const messages = [
  {
    name: "Brooklyn Simmons",
    time: "12:00 AM",
    text: "It is a long established fact that a reader will",
    sender: false,
  },
  {
    name: "Leslie Alexander",
    time: "12:01 AM",
    text: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    sender: true,
  },
  {
    name: "Brooklyn Simmons",
    time: "12:05 AM",
    text: "It is a long established fact that a reader will",
    sender: false,
  },
  {
    name: "Leslie Alexander",
    time: "12:06 AM",
    text: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    sender: true,
  },
  {
    name: "Brooklyn Simmons",
    time: "12:10 AM",
    text: "It is a long established fact that a reader will",
    sender: false,
  },
];

export default function MessagePage() {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message Sent: ", message);
      setMessage("");
    }
  };

  return (
    <div className="container bg-[#483C19] mt-40 md:mt-48 p-4 md:p-[50px] rounded-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-[28px] text-white">Message</h2>
          <span className="text-white w-[30px] h-[30px] rounded-full bg-yellow-500 flex items-center justify-center">
            02
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="py-2 px-4 rounded-lg bg-transparent text-white border border-[#EAECF04D] w-full sm:w-auto focus:outline-none"
          />
          <button className="py-2 px-3 bg-[#FEB80045] rounded-lg text-white w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>

      {/* Message Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-7">
        {/* Active User */}
        <div className="flex items-center gap-3">
          <Image
            src={ActiveImg}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg md:text-xl text-white">
              Brooklyn Simmons
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              It is a long established fact that a reader will
            </p>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex flex-col flex-1 w-full bg-[#58481F] text-white mt-4 md:mt-0 rounded-xl">
          {/* Chat Header */}
          <header className="flex justify-between items-center p-4 bg-[#FFFFFF1F]">
            <div className="flex items-center gap-3">
              <Image
                src={senderImage}
                alt="User"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg md:text-xl">
                  Leslie Alexander
                </h3>
                <p className="text-sm text-gray-400">Active now</p>
              </div>
            </div>
            <ImNotification className="text-[25px]" />
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender ? "justify-end" : "justify-start"
                } items-start space-x-3`}
              >
                {!msg.sender && (
                  <Image
                    src={userImage}
                    alt="Sender"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
                <div
                  className={`max-w-full md:max-w-[70%] p-3 rounded-lg ${
                    msg.sender ? "bg-[#7A5E12]" : "bg-[#FFFFFF1F]"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">{msg.name}</span>
                    <span className="text-sm text-gray-400">{msg.time}</span>
                  </div>
                  <p className="mt-1 text-sm md:text-base">{msg.text}</p>
                </div>
                {msg.sender && (
                  <Image
                    src={userImage}
                    alt="Sender"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              className="flex-1 p-3 rounded-lg bg-[#FFFFFF1F] text-white border border-[#EAECF04D] focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="p-3 bg-[#FEB800] rounded-full text-white hover:bg-[#FEB80045]"
            >
              <MdSend className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
