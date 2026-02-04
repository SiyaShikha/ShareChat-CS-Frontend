import type { MessageListProps } from "../utils/types";

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="space-y-3">
      {messages.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white/50 backdrop-blur-sm rounded-xl">
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((msg) => {
          return (
            <div key={msg.id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 hover:border-indigo-300 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group">
              <div className="flex items-start justify-between mb-1">
                <strong className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold group-hover:scale-105 transition-transform inline-block">
                  {msg.userName}
                </strong>
                <span className="text-xs text-gray-400 ml-2">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-800 mt-1">{msg.content}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessageList;
