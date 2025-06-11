import { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

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

export const useChat = (userId: string | null) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [isQueryInProgress, setIsQueryInProgress] = useState(false);
    const [language, setLanguage] = useState('en-US');
    const connectionRef = useRef(connection);
    connectionRef.current = connection;

    useEffect(() => {
        const fetchInitialActions = async () => {
            try {
                const response = await fetch('http://localhost:7043/api/Chat/initial-actions');
                const initialActions = await response.json();
                if (initialActions && initialActions.length > 0) {
                    setMessages([{
                        type: 'buttons',
                        content: initialActions,
                        user: 'Bot'
                    }]);
                }
            } catch (error) {
                console.error('Failed to fetch initial actions:', error);
            }
        };

        if (userId) {
            fetchInitialActions();
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl("http://localhost:7043/chathub")
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);
        }
    }, [userId]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => console.log('SignalR Connected.'))
                .catch(e => console.error('SignalR Connection Error: ', e));

            connection.on("ReceiveBotMessage", (message: Message) => {
                setMessages(prevMessages => [...prevMessages, message]);
                setIsQueryInProgress(false);
            });

            return () => {
                connection.stop();
            };
        }
    }, [connection]);

    const sendMessage = async (message: string) => {
        if (connectionRef.current && userId) {
            try {
                setIsQueryInProgress(true);
                await connectionRef.current.invoke("UserSendMessage", userId, message, language);
                setMessages(prevMessages => [...prevMessages, { type: 'text', content: message, user: 'User' }]);
            } catch (e) {
                console.error("Failed to send message: ", e);
                setIsQueryInProgress(false);
            }
        }
    };

    const cancelRequest = () => {
        if (connectionRef.current && userId) {
            connectionRef.current.invoke("CancelRequest", userId);
        }
    };

    return { messages, sendMessage, isQueryInProgress, cancelRequest, language, setLanguage };
}; 