import { useParams } from "react-router-dom";
import useChatRoomMessages from "../hooks/useChatRoomMessages";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

const ChatRoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { messages, sendMessage, loading, error } = useChatRoomMessages(roomId);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Room {roomId}</h1>

      {loading ? (
        <p>Loading...</p>
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
