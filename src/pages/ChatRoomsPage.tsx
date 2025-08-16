import CreateChatRoomForm from "../components/CreateChatRoomForm";
import ChatRoomList from "../components/ChatRoomList";

export default function ChatRoomsPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Rooms</h1>

      <CreateChatRoomForm onRoomCreated={() => window.location.reload()} />
      <ChatRoomList />
    </div>
  );
}
