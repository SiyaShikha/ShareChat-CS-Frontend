type Message = {
  id: number;
  content: string;
  userId: string;
  chatRoomId: number;
  userName: string;
  timestamp: string;
};

type MessageListProps = {
  messages: Message[];
};

export type { Message, MessageListProps };
