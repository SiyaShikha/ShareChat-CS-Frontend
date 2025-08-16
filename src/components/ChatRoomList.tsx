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

  const fetchChatRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5086/api/chatroom", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
        `http://localhost:5086/api/chatroom/${roomId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ul className="space-y-2">
      {chatRooms.map((room) => (
        <li
          key={room.id}
          className="bg-white shadow p-3 rounded flex justify-between items-center hover:bg-gray-100 transition"
        >
          <Link
            to={`/chatroom/${room.id}`}
            className="text-blue-600 font-medium"
          >
            {room.name}
          </Link>

          <button
            onClick={() => joinRoom(room.id)}
            disabled={joiningRoomId === room.id}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {joiningRoomId === room.id ? "Joining..." : "Join"}
          </button>
        </li>
      ))}
    </ul>
  );
}
