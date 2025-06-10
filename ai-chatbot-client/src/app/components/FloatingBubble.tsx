"use client";

import Draggable from "react-draggable";
import { useState } from "react";
import ChatWindow from "@/app/components/ChatWindow";

const FloatingBubble = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleBubbleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Draggable>
                <div
                    className="fixed bottom-10 right-10 z-50 cursor-pointer"
                    onClick={handleBubbleClick}
                >
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                        <span>AI</span>
                    </div>
                </div>
            </Draggable>
            {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
        </>
    );
};

export default FloatingBubble; 