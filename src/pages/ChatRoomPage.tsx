import { useEffect, useState } from "react";
import axios from "axios";
import CreateChatRoomForm from "../components/CreateChatRoomForm";

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
    <div>
      <h1>Chat Rooms</h1>

      <CreateChatRoomForm onRoomCreated={fetchChatRooms} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {chatRooms.map((room) => (
            <li key={room.id}>{room.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatRoomPage;
