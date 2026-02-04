import { useState } from "react";

type MessageInputProps = {
  onSend: (message: string) => void;
};

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-2 shadow-lg hover:shadow-xl transition-all duration-300">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-2.5 border-0 focus:outline-none text-gray-900 placeholder-gray-400 bg-transparent"
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 font-medium transition-colors duration-300 shadow-md"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
