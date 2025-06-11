'use client';

import React, { useState, useEffect } from 'react';
import { useUserId } from '../../../hooks/useUserId';
import { useChat } from '../../../hooks/useChat';
import FloatingBubble from './FloatingBubble';
import ChatWindow from './ChatWindow';

const Chat: React.FC = () => {
    const userId = useUserId();
    const { messages, sendMessage, isQueryInProgress, cancelRequest, language, setLanguage } = useChat(userId);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!isOpen && messages.length > 0 && messages[messages.length - 1].user === 'Bot') {
            setUnreadCount(prev => prev + 1);
        }
    }, [messages, isOpen]);

    const handleToggleChat = () => {
        if (!isOpen) {
            setUnreadCount(0);
        }
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {!isOpen && <FloatingBubble onClick={handleToggleChat} unreadCount={unreadCount} />}
            {isOpen && <ChatWindow
                messages={messages}
                onSendMessage={sendMessage}
                onClose={handleToggleChat}
                isQueryInProgress={isQueryInProgress}
                onCancel={cancelRequest}
                language={language}
                onLanguageChange={setLanguage}
            />}
        </div>
    );
};

export default Chat;