"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("french");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createSession();
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createSession = async () => {
    try {
      const res = await fetch("/api/tutor/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      setMessages([]);
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || !sessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/tutor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: input,
          language,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, an error occurred. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">🤖 AI Tutor</h1>
            <p className="text-sm text-slate-600">Practice languages in real-time</p>
          </div>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back
          </Link>
        </div>
      </header>

      {/* Language Selector */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-slate-600 mb-3 font-semibold">Select Language:</p>
          <div className="flex gap-3 flex-wrap">
            {[
              { id: "french", label: "🇫🇷 Français", emoji: "🇫🇷" },
              { id: "english", label: "🇬🇧 English", emoji: "🇬🇧" },
              { id: "arabic", label: "🇸🇦 العربية", emoji: "🇸🇦" }
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  language === lang.id
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-6">🤖</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Start Learning
                </h2>
                <p className="text-lg text-slate-600 max-w-md">
                  Ask me anything about {language === "french" ? "French" : language === "english" ? "English" : "Arabic"}. I'll help you improve your skills!
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-6 flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              <div
                className={`max-w-xl rounded-2xl px-6 py-4 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-sm"
                }`}
              >
                <p className="whitespace-pre-wrap text-base leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mb-6 animate-fade-in">
              <div className="bg-white text-slate-900 rounded-2xl rounded-bl-none px-6 py-4 border border-slate-200 shadow-sm">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 sticky bottom-0">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <form onSubmit={sendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="input flex-1"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn btn-primary px-6"
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
          <p className="text-xs text-slate-500 mt-3 text-center">
            Powered by AI • Language learning at your pace
          </p>
        </div>
      </div>
    </div>
  );
}
