import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isQueryInProgress: boolean;
  onCancel: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isQueryInProgress, onCancel }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Type a message..."
          disabled={isQueryInProgress}
        />
        {isQueryInProgress ? (
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-red-500 text-white rounded">
                Cancel
            </button>
        ) : (
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Send
            </button>
        )}
      </div>
    </form>
  );
};

export default MessageInput; 