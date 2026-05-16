import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiArrowLeft, FiSend, FiMessageSquare } from "react-icons/fi";

const sampleMessages = [
  { id: 1, sender: "Guanjoi Trading LLC", avatar: "G", time: "2h ago", preview: "Your order has been shipped!", unread: true },
  { id: 2, sender: "Support Team", avatar: "S", time: "1d ago", preview: "How can we help you today?", unread: false },
  { id: 3, sender: "Brand Store", avatar: "B", time: "3d ago", preview: "Your return request has been approved.", unread: false },
];

const Messages = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState(sampleMessages[0]);
  const [newMsg, setNewMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { from: "them", text: "Hello! How can I help you?", time: "10:00 AM" },
    { from: "them", text: "Your order has been shipped!", time: "10:01 AM" },
  ]);

  if (!user) return (
    <div className="text-center py-24">
      <p className="text-gray-400 mb-4">Please login to view your messages</p>
      <Link to="/auth" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Login</Link>
    </div>
  );

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatHistory(prev => [...prev, { from: "me", text: newMsg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setNewMsg("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/" className="flex items-center gap-2 text-sm text-blue-600 mb-6 hover:text-blue-800">
        <FiArrowLeft size={16} /> Back to home
      </Link>
      <h1 className="text-xl font-bold text-gray-800 mb-4">Messages</h1>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex h-[500px]">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-100 flex flex-col shrink-0">
          <div className="p-3 border-b border-gray-100">
            <input className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none" placeholder="Search messages..." />
          </div>
          <div className="flex-1 overflow-y-auto">
            {sampleMessages.map(msg => (
              <button
                key={msg.id}
                onClick={() => setSelected(msg)}
                className={`w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 transition-colors ${selected?.id === msg.id ? "bg-blue-50" : ""}`}
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {msg.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 truncate">{msg.sender}</p>
                    <span className="text-xs text-gray-400 shrink-0">{msg.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{msg.preview}</p>
                </div>
                {msg.unread && <div className="w-2 h-2 bg-blue-600 rounded-full shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              {selected?.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{selected?.sender}</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-2 rounded-xl text-sm ${msg.from === "me" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.from === "me" ? "text-blue-200" : "text-gray-400"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-3 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
              <FiSend size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;