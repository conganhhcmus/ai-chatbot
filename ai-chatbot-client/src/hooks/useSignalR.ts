"use client";

import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export const useSignalR = (hubUrl: string) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [connectionState, setConnectionState] = useState<string>("Disconnected");

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, [hubUrl]);

    useEffect(() => {
        if (connection) {
            const startConnection = async () => {
                try {
                    setConnectionState("Connecting...");
                    await connection.start();
                    setConnectionState("Connected");
                } catch (err) {
                    console.error("SignalR Connection Error: ", err);
                    setConnectionState("Disconnected");
                    setTimeout(startConnection, 5000);
                }
            };

            startConnection();

            connection.onreconnecting(() => {
                setConnectionState("Connecting...");
            });

            connection.onreconnected(() => {
                setConnectionState("Connected");
            });

            connection.onclose(() => {
                setConnectionState("Disconnected");
            });

            return () => {
                connection.stop();
            };
        }
    }, [connection]);

    return { connection, connectionState };
}; 