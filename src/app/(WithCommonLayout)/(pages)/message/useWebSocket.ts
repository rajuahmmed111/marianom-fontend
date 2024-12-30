import { useEffect, useRef, useState } from "react";

const useWebSocket = (url: string) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        // Initialize WebSocket connection
        const socket = new WebSocket(url);
        socketRef.current = socket;

        // Handle incoming messages
        socket.onmessage = (event) => {
            console.log(event);

            const data = JSON.parse(event.data);
            console.log("Received message:", data);
            setMessages((prev) => [...prev, data]);
        };

        socket.onopen = () => {
            console.log("WebSocket connection established.");
        }
        socket.onclose = () => console.log("WebSocket connection closed.");
        socket.onerror = (error) => console.error("WebSocket error:", error);

        // Cleanup on component unmount
        return () => {
            socket.close();
        };
    }, [url]);

    // Send message via WebSocket
    const sendMessage = (message: any) => {
        console.log(message);

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        } else {
            console.error("WebSocket is not open. Cannot send message.");
        }
    };

    return { messages, sendMessage };
};

export default useWebSocket;
