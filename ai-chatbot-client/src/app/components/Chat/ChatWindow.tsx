import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

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
interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onMinimize: () => void;
  isQueryInProgress: boolean;
  onCancel: () => void;
  isBotTyping: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, onMinimize, isQueryInProgress, onCancel, isBotTyping }) => {
  return (
    <div className="fixed bottom-8 right-8 w-96 max-w-full h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-blue-100 z-50 animate-fade-in"
      role="dialog"
      aria-label="Chat with Virtual assistant"
      tabIndex={0}
    >
      <div className="p-4 bg-white border-b border-blue-100 rounded-t-2xl flex items-center justify-between">
        <span className="text-lg font-bold font-sans text-gray-900">Virtual assistant</span>
        <button onClick={onMinimize} className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors" aria-label="Minimize chat">
          <svg width="24" height="24" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </button>
      </div>
      <MessageList messages={messages} onButtonClick={(payload) => onSendMessage(payload)} />
      {isBotTyping && (
        <div className="px-6 pb-2 text-sm text-gray-500 animate-pulse" aria-live="polite">Bot is typing...</div>
      )}
      <div className="relative">
        <MessageInput onSendMessage={onSendMessage} isQueryInProgress={isQueryInProgress} onCancel={onCancel} />
      </div>
    </div>
  );
};

export default ChatWindow; 