import React from 'react';

interface FloatingBubbleProps {
  onClick: () => void;
  unreadCount: number;
}

const FloatingBubble: React.FC<FloatingBubbleProps> = ({ onClick, unreadCount }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center"
    >
      Chat
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export default FloatingBubble;