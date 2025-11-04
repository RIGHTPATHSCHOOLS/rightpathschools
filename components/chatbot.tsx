"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubblesOutline, IoSend, IoClose } from "react-icons/io5";
import THEME from "@/utils/theme";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "👋 Hello! I'm the Right Path Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // get the API base from .env
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://rightpathschoolsbackend.vercel.app";

  // unique user ID for sessions
  const userId =
    "web-user-" +
    (typeof window !== "undefined"
      ? localStorage.getItem("rps_uid") ||
        (() => {
          const id = Math.random().toString(36).substring(7);
          localStorage.setItem("rps_uid", id);
          return id;
        })()
      : "");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();

    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chatbot/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message: userMsg, channel: "web" }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply || "🤖 I didn’t quite get that. Please try again." },
      ]);
    } catch (err) {
      console.error("Chat send error:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Connection error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg text-white z-50 ${
          open ? "hidden" : "block"
        }`}
        style={{ background: THEME.COLORS.primary }}
      >
        <IoChatbubblesOutline size={26} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div
              className="flex justify-between items-center p-4 text-white"
              style={{
                background: `linear-gradient(135deg, ${THEME.COLORS.primary}, ${THEME.COLORS.secondary})`,
              }}
            >
              <h3 className="font-semibold text-lg">Right Path Assistant</h3>
              <button onClick={() => setOpen(false)} className="hover:opacity-80 transition">
                <IoClose size={22} />
              </button>
            </div>

            {/* Chat Area */}
            {/* Chat Area */}
<div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-300">
  {messages.map((m, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`rounded-2xl px-4 py-2 text-sm shadow whitespace-pre-line ${
          m.from === "user"
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        {m.text}
      </div>
    </motion.div>
  ))}
  {loading && (
    <div className="flex justify-start">
      <motion.div
        className="bg-gray-100 text-gray-600 text-sm rounded-2xl px-4 py-2"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        Typing...
      </motion.div>
    </div>
  )}
  <div ref={chatEndRef} />
</div>


            {/* Input Area */}
            <div className="border-t p-3 flex items-center gap-2 bg-gray-50">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                disabled={loading}
              >
                <IoSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
