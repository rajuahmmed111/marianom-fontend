"use client";

import ActiveImg from "@/assets/messageimg.jpeg";
import { useGetChannelQuery } from "@/redux/features/message/messageApi";
import { RootState } from "@/redux/store";
import jwt, { JwtPayload } from "jsonwebtoken";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";



// Define types for conversation and messages
export interface Message {
  name: string;
  time: string;
  message: string;
  files: string;
  text: string;
  sender: boolean; // True if the current user sent it
}

export interface Conversation {
  id: number;
  channelName: string;
  lastMessage: string;
  data: Message[];
}


export interface DecodedToken extends JwtPayload {
  id: string;
  role?: string;
}
// WebSocket URL (update to your backend WebSocket server)
// const SOCKET_URL = "ws://192.168.11.172:3018";
// const ws = new WebSocket(SOCKET_URL)
// ws.onopen(JSON.stringify({
//   type:"subscribe",
//  channelId:
// }))

// const ws = new WebSocket(SOCKET_URL)

export default function MessagePage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null | any>(null);


  const { data } = useGetChannelQuery(undefined);

  const token = useSelector((state: RootState) => state.auth.token);
  const decodedToken = token ? (jwt.decode(token) as DecodedToken) : null;



  // Handle selecting a new conversation
  const handleSelectConversation = async (channel: Conversation) => {
    setSelectedConversation(channel);
  };
  console.log(`my select data is`, selectedConversation);


  return (
    <div className='relative'>
      <div className="container h-[800px] bg-[#483C19] mt-40 md:mt-48 p-4 md:p-[50px] rounded-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[28px] text-white">Message</h2>
            <span
              className="text-white w-[30px] h-[30px] rounded-full bg-yellow-500 flex items-center justify-center">
              {data?.data.length}
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

        {/* Conversation Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-7">
          {/* Active Users */}
          <div className="flex flex-col w-full md:w-[300px] space-y-3">
            {data?.data.map((channel: any, index: number) => (
              <div
                key={index}
                className={`flex items-center gap-3 cursor-pointer hover:bg-[#7A5E12] px-2 py-2 rounded-[8px] ${selectedConversation?.id === channel?.data?.id ? "bg-[#7A5E12]" : ""
                  }`}
                onClick={() => handleSelectConversation(channel)}
              >
                <Image
                  src={ActiveImg}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  {
                    decodedToken?.id === channel?.person1?.id ? (
                      <div>
                        <h3 className="font-semibold text-lg md:text-xl text-white">
                          {channel.person2.firstName}
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base">
                          {channel.person2.firstName}...
                        </p>
                      </div>

                    ) : (
                      <div>
                        <h3 className="font-semibold text-lg md:text-xl text-white">
                          {channel.person1.firstName}
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base">
                          {channel.person1.firstName}...
                        </p>
                      </div>
                    )
                  }

                </div>
              </div>
            ))}
          </div>

          {/* Chat Window */}
          <ChatWindow
            selectedConversation={selectedConversation}
            decodedToken={decodedToken}
            channelName={data?.data[0].channelName}
          />

        </div>
      </div>
    </div>

  );
}