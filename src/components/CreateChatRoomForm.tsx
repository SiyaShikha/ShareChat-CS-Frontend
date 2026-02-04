import { useState, useEffect } from "react";
import axios from "axios";

type Props = {
  onRoomCreated: () => void;
  onCancel: () => void;
};

export default function CreateChatRoomForm({ onRoomCreated, onCancel }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onCancel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        `${API_URL}/api/chatroom`,
        { name },
        { withCredentials: true },
      );

      setName("");
      onRoomCreated();
    } catch {
      setError("Failed to create chat room");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in border border-white/50">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create a Chat Room
          </h2>
          <p className="text-sm text-gray-500 mb-4">Start a new conversation</p>

          <input
            type="text"
            placeholder="Chat Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-indigo-300"
          />

          {error && <p className="text-red-600 mt-3 text-sm font-medium">{error}</p>}

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Create
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200 hover:border-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
