import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/chatroom" element={<ChatRoomPage />} />
    </Routes>
  );
}

export default App;
