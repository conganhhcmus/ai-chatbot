import React, { useState, useRef } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isQueryInProgress: boolean;
  onCancel: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isQueryInProgress }) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  // Placeholder for file upload logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implement file upload logic here
    e.target.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-blue-100 flex items-center gap-2 rounded-b-2xl" aria-label="Send a message">
      <button type="button" onClick={handleFileClick} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Upload file" tabIndex={0}>
        <svg width="22" height="22" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19-9.19a2.5 2.5 0 0 0-3.54 0l-6.36 6.36a2.5 2.5 0 0 0 0 3.54l9.19 9.19a2.5 2.5 0 0 0 3.54 0l6.36-6.36a2.5 2.5 0 0 0 0-3.54z"/><path d="M7.5 7.5l9 9"/></svg>
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} aria-label="Choose file to upload" />
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-3 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base font-sans bg-white"
        placeholder="Type a message"
        disabled={isQueryInProgress}
        aria-label="Type your message"
        tabIndex={0}
      />
      <button type="submit" className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white flex items-center justify-center" aria-label="Send message" tabIndex={0}>
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
      </button>
    </form>
  );
};

export default MessageInput; 