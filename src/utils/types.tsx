type Message = {
  id: number;
  content: string;
  userId: string;
  userName: string;
  timestamp: string;
};

type MessageListProps = {
  messages: Message[];
};

export type { Message, MessageListProps };
