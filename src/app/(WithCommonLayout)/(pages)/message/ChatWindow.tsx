"use client"

import userImage from "@/assets/profile.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { Conversation, DecodedToken } from "./page";

interface ChatWindowProps {
    selectedConversation: Conversation | null | any;
    decodedToken: DecodedToken | null | any;
    channelName: string
}

export default function ChatWindow({
    decodedToken,
    selectedConversation,
    channelName
}: ChatWindowProps) {

    const [message, setMessage] = useState<any[]>([]);
    const [input, setInput] = useState("");
    console.log(selectedConversation);
    console.log(channelName);
    const ws = useRef<WebSocket | null>(null);


    useEffect(() => {
        if (decodedToken) {
            ws.current = new WebSocket("ws://192.168.11.172:3018");
            ws.current.onopen = () => {
                console.log("WebSocket Client Connected");
                ws.current?.send(
                    JSON.stringify({
                        type: "message",
                        channelId: channelName,
                    })
                );
            };

            ws.current.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                switch (parsedData.type) {
                    case "subscribed":
                        // ekhane change ashbe res wise 
                        setMessage(parsedData.conversation.messages || []);
                        break;
                    case "message":
                        setMessage((prev) => [...prev, parsedData.message]);
                        break;
                    default:
                        console.log("Unknown message type:", parsedData.type);
                }
            };

            ws.current.onclose = () => {
                console.log("WebSocket Client Disconnected");
            };

            ws.current.onerror = (error) => {
                console.error("WebSocket Error:", error);
            };

            return () => {
                ws.current?.close();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channelName]);


    const handleSendMessage = () => {
        if (
            input.trim() &&
            ws.current &&
            ws.current.readyState === WebSocket.OPEN
        ) {
            ws.current.send(
                JSON.stringify({
                    type: "message",
                    channelId: channelName,
                    message: input,
                })
            );
            setInput("");
        }
    };

    console.log(message);


    return (
        <div className="flex flex-col h-[650px] flex-1 w-full bg-[#58481F] text-white mt-4 md:mt-0 rounded-xl">
            {/* Chat Header */}
            {/* <header className="flex justify-between items-center p-4 bg-[#FFFFFF1F]">
                {selectedConversation && (
                    <div className="flex items-center gap-3">
                        <Image
                            src={userImage}
                            alt="User"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div>
                            <h3 className="font-semibold text-lg md:text-xl">
                                {decodedToken?.id === selectedConversation?.data[0]?.sender
                                    ? selectedConversation?.data[0]?.receiverName
                                    : selectedConversation?.data[0]?.senderName}
                            </h3>
                            <p className="text-sm text-gray-400">Active now</p>
                        </div>
                        <IoMdNotifications className="text-[25px]" />
                    </div>
                )}
            </header> */}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {message && message.length > 0 ? (
                    message?.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender ? "justify-end" : "justify-start"} items-start space-x-3`}>
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
                                className={`max-w-full md:max-w-[70%] p-3 rounded-lg ${msg.sender ? "bg-[#7A5E12]" : "bg-[#FFFFFF1F]"
                                    }`}
                            >
                                <p className="mt-1 text-sm md:text-base">{msg.message}</p>
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
                    ))
                ) : (
                    <p className="text-gray-400">No messages yet.</p>
                )}
            </div>

            {/* Message Input */}
            <div className="p-4 flex items-center gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message"
                    className="flex-1 p-3 rounded-lg bg-[#FFFFFF1F] text-white border border-[#EAECF04D] focus:outline-none"
                />
                <button
                    onClick={() => {
                        handleSendMessage();
                    }}
                    className="p-3 bg-[#FEB800] rounded-full text-white hover:bg-[#FEB80045]"
                >
                    <MdSend className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
