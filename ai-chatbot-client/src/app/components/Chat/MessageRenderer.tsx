import React from 'react';
import ReactMarkdown from 'react-markdown';
import ActionButtons from './ActionButtons';
import TableRenderer from './TableRenderer';

interface ActionButton {
  label: string;
  payload: string;
}

type MessageContent = string | ActionButton[] | string[][];

interface Message {
    type: 'text' | 'buttons' | 'table';
    content: MessageContent;
}

interface MessageRendererProps {
    message: Message;
    onButtonClick: (payload: string) => void;
}

const handleExport = (data: string[][]) => {
    const reportName = "ChatReport"; 
    const parametersJson = JSON.stringify({ data }); // Example parameters
    const url = `/api/export/excel?reportName=${encodeURIComponent(reportName)}&parametersJson=${encodeURIComponent(parametersJson)}`;
    window.location.href = url;
};

const MessageRenderer: React.FC<MessageRendererProps> = ({ message, onButtonClick }) => {
    switch (message.type) {
        case 'text':
            return <ReactMarkdown>{message.content as string}</ReactMarkdown>;
        case 'buttons':
            return <ActionButtons buttons={message.content as ActionButton[]} onButtonClick={onButtonClick} />;
        case 'table':
            const tableData = message.content as string[][];
            return (
                <div>
                    <TableRenderer data={tableData} />
                    <button 
                        onClick={() => handleExport(tableData)}
                        className="mt-2 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        Export to Excel
                    </button>
                </div>
            );
        default:
            return null;
    }
};

export default MessageRenderer; 