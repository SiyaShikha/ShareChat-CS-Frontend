import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ChatRoomsPage from "./pages/ChatRoomsPage";
import HomePage from "./pages/HomePage";
import ChatRoomPage from "./pages/ChatRoomPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/chatroom" element={<ChatRoomsPage />} />
      <Route path="/chatroom/:roomId" element={<ChatRoomPage />} />
    </Routes>
  );
}

export default App;
