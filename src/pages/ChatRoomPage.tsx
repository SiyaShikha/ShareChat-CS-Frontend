import { useParams, useNavigate, Link } from "react-router-dom";
import useChatRoomMessages from "../hooks/useChatRoomMessages";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

const ChatRoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { messages, sendMessage, loading, error } = useChatRoomMessages(roomId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="h-full px-6 flex items-center justify-between">
          <Link to="/chatroom" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              💬
            </div>
            <span className="font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ShareChat
            </span>
          </Link>
          <Link
            to="/chatroom"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            ← Back to Rooms
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-6 pt-24 pb-24 flex flex-col flex-1 min-h-0">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Chat Room {roomId}
        </h1>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto mb-4 min-h-0">
            <MessageList messages={messages} />
          </div>
        )}
      </main>

      {!loading && !error && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-t border-gray-200/50 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <MessageInput onSend={sendMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoomPage;
