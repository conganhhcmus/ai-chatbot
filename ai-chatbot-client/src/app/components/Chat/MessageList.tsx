import React, { useEffect, useRef } from 'react';
import MessageRenderer from './MessageRenderer';

const BOT_AVATAR = (
  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><rect x="9" y="9" width="6" height="6" rx="3"/><line x1="12" y1="15" x2="12" y2="18"/><line x1="9" y1="21" x2="15" y2="21"/></svg>
  </div>
);
const USER_AVATAR = (
  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ml-2">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-2.2 3.6-4 8-4s8 1.8 8 4"/></svg>
  </div>
);

interface ActionButton {
  label: string;
  payload: string;
}

type MessageContent = string | ActionButton[] | string[][];

interface Message {
  type: 'text' | 'buttons' | 'table';
  content: MessageContent;
  user: string;
  timestamp?: string;
}

interface MessageListProps {
  messages: Message[];
  onButtonClick: (payload: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onButtonClick }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-grow p-4 overflow-y-auto bg-white" role="log" aria-live="polite" aria-label="Chat messages">
      {messages.map((msg, index) => {
        const isUser = msg.user === 'User';
        return (
          <div key={index} className={`flex flex-col mb-4 ${isUser ? 'items-end' : 'items-start'}`}
            aria-label={`${isUser ? 'You' : 'Virtual assistant'} message at ${msg.timestamp || ''}`}
          >
            <div className={`flex items-end ${isUser ? 'flex-row-reverse' : ''}`}>
              {isUser ? USER_AVATAR : BOT_AVATAR}
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl font-sans text-base whitespace-pre-line shadow
                  ${isUser
                    ? 'bg-blue-500 text-white rounded-br-md ml-2'
                    : 'bg-gray-100 text-gray-900 rounded-bl-md mr-2 border border-blue-100'}
                `}
              >
                <MessageRenderer message={{ type: msg.type, content: msg.content }} onButtonClick={onButtonClick} />
              </div>
            </div>
            {msg.timestamp && (
              <span className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right pr-12' : 'text-left pl-12'}`}>{msg.timestamp}</span>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 