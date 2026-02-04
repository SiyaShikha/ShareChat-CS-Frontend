import { useState } from "react";
import { Link } from "react-router-dom";
import CreateChatRoomForm from "../components/CreateChatRoomForm";
import ChatRoomList from "../components/ChatRoomList";

export default function ChatRoomsPage() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRoomCreated = () => {
    setShowForm(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="h-full px-6 flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              💬
            </div>
            <span className="font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ShareChat
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Chat Rooms
          </h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-300 shadow-lg"
          >
            + Create Room
          </button>
        </div>

        {showForm && (
          <CreateChatRoomForm
            onRoomCreated={handleRoomCreated}
            onCancel={() => setShowForm(false)}
          />
        )}

        <ChatRoomList key={refreshKey} />
      </main>
    </div>
  );
}
