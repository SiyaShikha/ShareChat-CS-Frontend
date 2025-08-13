import { useEffect, useState } from "react";
import axios from "axios";
import CreateChatRoomForm from "../components/CreateChatRoomForm";
import { Link } from "react-router-dom";

type ChatRoom = {
  id: number;
  name: string;
};

const ChatRoomPage = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Rooms</h1>

      <CreateChatRoomForm onRoomCreated={fetchChatRooms} />

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-2">
          {chatRooms.map((room) => (
            <li
              key={room.id}
              className="bg-white shadow p-3 rounded hover:bg-gray-100 transition"
            >
              <Link
                to={`/chatroom/${room.id}`}
                className="text-blue-600 font-medium"
              >
                {room.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatRoomPage;
