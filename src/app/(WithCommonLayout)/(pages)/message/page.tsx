"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdSend } from "react-icons/md";
import { ImNotification } from "react-icons/im";
import { io, Socket } from "socket.io-client"; // Import socket.io client
import userImage from "@/assets/profile.png";
import senderImage from "@/assets/profile.png";
import ActiveImg from "@/assets/messageimg.jpeg";

// Define types for conversation and messages
interface Message {
  name: string;
  time: string;
  text: string;
  sender: boolean; // True if the current user sent it
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  messages: Message[];
}

// WebSocket URL (update to your backend WebSocket server)
const SOCKET_URL = "http://192.168.11.172:3018";

const initialConversations: Conversation[] = [
  { id: 1, name: "Brooklyn Simmons", lastMessage: "Starting chat...", messages: [] },
  { id: 2, name: "Leslie Alexander", lastMessage: "Starting chat...", messages: [] },
  { id: 3, name: "Jenny Wilson", lastMessage: "Starting chat...", messages: [] },
];

export default function MessagePage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize WebSocket when the component is mounted
  useEffect(() => {
    const socketInstance: Socket = io(SOCKET_URL); // Connect to server
    setSocket(socketInstance);

    // Listen for new messages
    socketInstance.on("message", (data) => {
      console.log("New Message Received:", data);

      const { userId, newMessage } = data;

      // Update the appropriate conversation with the new message
      setConversations((prevConversations) =>
          prevConversations.map((conversation) =>
              conversation.id === userId
                  ? {
                    ...conversation,
                    messages: [...conversation.messages, newMessage],
                    lastMessage: newMessage.text, // Update the last message preview
                  }
                  : conversation
          )
      );

      // Auto-select the updated conversation if it's already selected
      if (selectedConversation?.id === userId) {
        setSelectedConversation((prev) => ({
          ...prev!,
          messages: [...prev!.messages, newMessage],
        }));
      }
    });

    // Cleanup WebSocket when the component is unmounted
    return () => {
      socketInstance.disconnect();
    };
  }, [selectedConversation]);

  // Handle message sending
  const handleSendMessage = () => {
    if (message.trim() && socket && selectedConversation) {
      const newMessage: Message = {
        name: "You", // Modify as needed (default sender name)
        time: new Date().toLocaleTimeString(), // Add timestamp
        text: message,
        sender: true,
      };

      // Emit message to the server
      socket.emit("sendMessage", {
        userId: selectedConversation.id,
        message: newMessage,
      });

      // Update UI immediately
      setSelectedConversation((prev) => ({
        ...prev!,
        messages: [...prev!.messages, newMessage],
      }));

      // Update conversations list
      setConversations((prevConversations) =>
          prevConversations.map((conversation) =>
              conversation.id === selectedConversation.id
                  ? {
                    ...conversation,
                    messages: [...conversation.messages, newMessage],
                    lastMessage: newMessage.text,
                  }
                  : conversation
          )
      );

      // Clear input field
      setMessage("");
    }
  };

  // Handle selecting a new conversation
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
if (socket) {
      socket.emit("fetchMessages", { userId: conversation.id });
    }
  };

  return (
      <div className='relative'>
        <div className="container h-[800px] bg-[#483C19] mt-40 md:mt-48 p-4 md:p-[50px] rounded-xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-[28px] text-white">Message</h2>
              <span
                  className="text-white w-[30px] h-[30px] rounded-full bg-yellow-500 flex items-center justify-center">
            {conversations.length}
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
              {conversations.map((conversation) => (
                  <div
                      key={conversation.id}
                      className={`flex items-center gap-3 cursor-pointer hover:bg-[#7A5E12] px-2 py-2 rounded-[8px] ${
                          selectedConversation?.id === conversation.id ? "bg-[#7A5E12]" : ""
                      }`}
                      onClick={() => handleSelectConversation(conversation)}
                  >
                    <Image
                        src={ActiveImg}
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-lg md:text-xl text-white">
                        {conversation.name}
                      </h3>
                      <p className="text-gray-300 text-sm md:text-base">
                        {conversation.lastMessage.slice(0, 30)}...
                      </p>
                    </div>
                  </div>
              ))}
            </div>

            {/* Chat Window */}
            <div className="flex flex-col h-[650px] flex-1 w-full bg-[#58481F] text-white mt-4 md:mt-0 rounded-xl">
              {/* Chat Header */}
              <header className="flex justify-between items-center p-4 bg-[#FFFFFF1F]">
                {selectedConversation && (
                    <>
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
                            {selectedConversation.name}
                          </h3>
                          <p className="text-sm text-gray-400">Active now</p>
                        </div>
                      </div>
                      <ImNotification className="text-[25px]"/>
                    </>
                )}
              </header>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation?.messages.map((msg, index) => (
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
                  <MdSend className="w-6 h-6"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}