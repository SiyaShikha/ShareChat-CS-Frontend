import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type ChatRoom = {
  id: number;
  name: string;
};

type ChatRoomListProps = {
  onRoomJoined?: (roomId: number) => void;
};

export default function ChatRoomList({ onRoomJoined }: ChatRoomListProps) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joiningRoomId, setJoiningRoomId] = useState<number | null>(null);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchChatRooms = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/chatroom`, {
        withCredentials: true,
      });
      setChatRooms(res.data);
    } catch (err) {
      setError("Failed to fetch chat rooms");
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = async (roomId: number) => {
    setJoiningRoomId(roomId);
    setError("");

    try {
      await axios.post(
        `${API_URL}/api/chatroom/${roomId}/join`,
        {},
        {
          withCredentials: true,
        },
      );

      onRoomJoined?.(roomId);
      navigate(`/chatroom/${roomId}`);
    } catch (err) {
      setError("Failed to join room");
    } finally {
      setJoiningRoomId(null);
    }
  };

  useEffect(() => {
    fetchChatRooms();

    const interval = setInterval(fetchChatRooms, 2000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-gray-500 py-8 text-center">Loading...</p>;
  if (error) return <p className="text-red-600 py-8 text-center">{error}</p>;

  return (
    <ul className="space-y-3">
      {chatRooms.length === 0 ? (
        <li className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-8 text-center text-gray-500 shadow-lg">
          No chat rooms available. Create one to get started!
        </li>
      ) : (
        chatRooms.map((room) => (
          <li
            key={room.id}
            className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-5 flex justify-between items-center hover:border-indigo-300 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
          >
            <Link
              to={`/chatroom/${room.id}`}
              className="text-indigo-600 hover:text-purple-600 font-semibold text-lg flex-1 transition-colors duration-200 group-hover:translate-x-1 inline-block"
            >
              {room.name}
            </Link>

            <button
              onClick={() => joinRoom(room.id)}
              disabled={joiningRoomId === room.id}
              className="ml-4 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors duration-300 shadow-md"
            >
              {joiningRoomId === room.id ? "Joining..." : "Join"}
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
