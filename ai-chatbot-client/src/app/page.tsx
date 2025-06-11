import Chat from "./components/Chat/Chat";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "AI Chatbot",
  description: "AI Chatbot"
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Chat />
    </main>
  );
} 