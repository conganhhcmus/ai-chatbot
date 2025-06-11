import React from 'react';

interface FloatingBubbleProps {
  onClick: () => void;
  unreadCount: number;
}

const FloatingBubble: React.FC<FloatingBubbleProps> = ({ onClick, unreadCount }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
      style={{ zIndex: 9999 }}
      aria-label="Open chat"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle">
        <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4 8.5 8.5 0 1 1-2.6-13.2" />
        <polyline points="22 2 22 6 18 6" />
      </svg>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export default FloatingBubble;