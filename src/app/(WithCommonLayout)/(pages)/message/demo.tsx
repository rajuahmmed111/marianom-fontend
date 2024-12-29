"use client";

import { useGetChatListQuery } from "@/redux/api/chat/ChatApi";
import { useGetAdminQuery } from "@/redux/api/user/user.api";
import { RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatInterface from "./ChatInterfaces";
import { Sidebar } from "./Sidebar";
import { jwtDecode } from "jwt-decode";

const Chat = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [roomId, setRoomId] = useState("");
    const [recipient, setRecipient] = useState<any>(null);
    const [userTwo, setUserTwo] = useState<string | null>(null);
    const ws = useRef<WebSocket | null>(null);

    const { token } = useSelector((state: RootState) => state.auth);
    const decodeUser = token
        ? jwtDecode<{ id: string; role: string }>(token)
        : null;

    const { data: adminData } = useGetAdminQuery(undefined);
    const admin = adminData?.data?.data?.[0];

    const { data: chatListData, isLoading: isChatListLoading } =
        useGetChatListQuery(decodeUser?.id);

    useEffect(() => {
        if (!isChatListLoading && decodeUser?.role === "SUPERADMIN") {
            const recipientData = chatListData?.data?.find(
                (chat: any) => chat.chatUser.id === userTwo
            );
            setRecipient(recipientData?.chatUser || null);
        } else if (admin) {
            setRecipient(admin);
            setUserTwo(admin.id);
        }
    }, [admin, chatListData, decodeUser?.role, isChatListLoading, userTwo]);

    useEffect(() => {
        if (token && decodeUser && userTwo) {
            ws.current = new WebSocket("ws://192.168.11.168:5005");

            ws.current.onopen = () => {
                console.log("WebSocket Client Connected");
                ws.current?.send(
                    JSON.stringify({
                        type: "joinRoom",
                        user1Id: decodeUser?.id,
                        user2Id: userTwo,
                    })
                );
            };

            ws.current.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                switch (parsedData.type) {
                    case "loadMessages":
                        setMessages(parsedData.conversation.messages || []);
                        setRoomId(parsedData.conversation.id);
                        break;
                    case "receiveMessage":
                        setMessages((prev) => [...prev, parsedData.message]);
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
    }, [token, userTwo]);

    const handleSendMessage = () => {
        if (
            input.trim() &&
            ws.current &&
            ws.current.readyState === WebSocket.OPEN
        ) {
            ws.current.send(
                JSON.stringify({
                    type: "sendMessage",
                    chatroomId: roomId,
                    senderId: decodeUser?.id,
                    senderName: decodeUser?.id, // Replace with the correct sender name
                    content: input,
                })
            );
            setInput("");
        }
    };

    return (
        <div className="flex h-[75vh] md:h-[calc(100vh-100px)] overflow-hidden">
            <div className="h-full overflow-y-auto overflow-x-hidden">
                {chatListData?.data?.map((item: any, idx: number) => (
                    <Sidebar
                        key={idx}
                        id={item.chatUser.id}
                        setUseID={setUserTwo}
                        firstName={item.chatUser.firstName}
                        lastName={item.chatUser.lastName}
                        message={item.lastMessage?.content}
                    />
                ))}
            </div>
            <div className="flex-1">
                {recipient ? (
                    <ChatInterface
                        id={decodeUser?.id || null}
                        recipient={recipient}
                        messages={messages}
                        newMessage={input}
                        setNewMessage={setInput}
                        sendMessage={handleSendMessage}
                    />
                ) : (
                    <div className="text-lg flex items-center justify-center h-full">
                        <p>Please select a chat</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
