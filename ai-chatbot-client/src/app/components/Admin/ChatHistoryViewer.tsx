"use client";

import { useState, useEffect } from 'react';

interface Message {
    id: number;
    content: string;
    sender: string;
    timestamp: string;
}

interface ChatGroup {
    userId: string;
    messages: Message[];
}

const ChatHistoryViewer = () => {
    const [history, setHistory] = useState<ChatGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('admin-token');
                const response = await fetch('/api/admin/chathistory', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch chat history.');
                }

                const data = await response.json();
                setHistory(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return <p>Loading chat history...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const handleExport = async () => {
        const token = localStorage.getItem('admin-token');
        const response = await fetch('/api/export/excel', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reportName: 'ChatHistory' })
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const contentDisposition = response.headers.get('content-disposition');
            let fileName = 'chat-history.xlsx';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch && fileNameMatch.length > 1) {
                    fileName = fileNameMatch[1];
                }
            }
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            alert('Failed to export chat history.');
        }
    };

    return (
        <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Chat History</h3>
                <button onClick={handleExport} className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Export to Excel
                </button>
            </div>
            <div className="space-y-6">
                {history.map((group) => (
                    <div key={group.userId} className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-bold text-lg mb-2">User: <span className="font-mono text-gray-600">{group.userId}</span></h4>
                        <div className="space-y-2">
                            {group.messages.map((message) => (
                                <div key={message.id} className={`p-2 rounded-md ${message.sender === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'}`}>
                                    <p className="text-sm">{message.content}</p>
                                    <p className="text-xs text-gray-500 text-right">{new Date(message.timestamp).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatHistoryViewer; 