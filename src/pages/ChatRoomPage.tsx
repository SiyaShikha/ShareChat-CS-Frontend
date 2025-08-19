import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import type { Message } from "../utils/types";

const ChatRoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5086/api/chatroom/${roomId}/message`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages(res.data);
    } catch {
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    try {
      await axios.post(
        `http://localhost:5086/api/chatroom/${roomId}/message`,
        { text: content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();

    // poll every second
    const interval = setInterval(fetchMessages, 1000);

    // cleanup when component unmounts or roomId changes
    return () => clearInterval(interval);
  }, [roomId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Room {roomId}</h1>

      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <MessageInput onSend={sendMessage} />
          <MessageList messages={messages} />
        </>
      )}
    </div>
  );
};

export default ChatRoomPage;
