"use client";

import { useSignalR } from "@/hooks/useSignalR";

interface ChatWindowProps {
    onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
    const hubUrl = process.env.NEXT_PUBLIC_CHAT_HUB_URL || "http://localhost:5000/chatHub"; // Default for local dev
    const { connectionState } = useSignalR(hubUrl);

    return (
        <div className="fixed bottom-28 right-10 z-50 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col">
            <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                <div className="flex items-center">
                    <h2 className="text-lg font-semibold mr-2">AI Chatbot</h2>
                    <span className={`text-xs px-2 py-1 rounded-full ${connectionState === 'Connected' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                        {connectionState}
                    </span>
                </div>
                <button onClick={onClose} className="text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {/* Chat messages will go here */}
                <p>Welcome! How can I help you today?</p>
            </div>
            <div className="p-4 border-t border-gray-200">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>
        </div>
    );
};

export default ChatWindow; 