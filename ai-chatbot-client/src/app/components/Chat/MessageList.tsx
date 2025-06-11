import React, { useEffect, useRef } from 'react';
import MessageRenderer from './MessageRenderer';

interface ActionButton {
  label: string;
  payload: string;
}

type MessageContent = string | ActionButton[] | string[][];

interface Message {
  type: 'text' | 'buttons' | 'table';
  content: MessageContent;
  user: string;
}

interface MessageListProps {
  messages: Message[];
  onButtonClick: (payload: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onButtonClick }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-grow p-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className={`mb-4 ${msg.user === 'User' ? 'text-right' : 'text-left'}`}>
            <div className={`p-2 rounded-lg inline-block ${msg.user === 'User' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                <MessageRenderer message={{type: msg.type, content: msg.content}} onButtonClick={onButtonClick} />
            </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 