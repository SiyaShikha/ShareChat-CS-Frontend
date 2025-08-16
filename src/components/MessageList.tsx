import type { MessageListProps } from "../utils/types";

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="space-y-2 mb-4">
      {messages.map((msg) => {
        console.log(msg, "..............Message in list............");

        return (
          <div key={msg.id} className="p-2 bg-gray-100 rounded">
            <strong>{msg.userId}: </strong>
            {msg.content}
            <div className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
