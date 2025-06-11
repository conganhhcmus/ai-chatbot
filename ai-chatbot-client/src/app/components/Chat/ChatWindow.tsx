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
}
interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  isQueryInProgress: boolean;
  onCancel: () => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, onClose, isQueryInProgress, onCancel, language, onLanguageChange }) => {
  return (
    <div className="fixed bottom-24 right-4 w-96 h-1/2 bg-white rounded-lg shadow-lg flex flex-col">
      <div className="p-4 bg-gray-700 text-white rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg">Chat with us</h2>
        <div>
            <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-gray-600 text-white p-1 rounded"
            >
                <option value="en-US">English</option>
                <option value="es-ES">Español</option>
            </select>
            <button onClick={onClose} className="text-white ml-4">&times;</button>
        </div>
      </div>
      <MessageList messages={messages} onButtonClick={(payload) => onSendMessage(payload)} />
      <MessageInput onSendMessage={onSendMessage} isQueryInProgress={isQueryInProgress} onCancel={onCancel} />
    </div>
  );
};

export default ChatWindow; 