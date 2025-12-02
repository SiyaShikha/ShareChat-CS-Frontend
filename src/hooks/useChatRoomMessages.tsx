import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { Message } from "../utils/types";

export default function useChatRoomMessages(roomId: string | undefined) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5086/messagehub", {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    conn
      .start()
      .then(() => {
        conn.invoke("JoinRoom", Number(roomId));
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to connect to chat server");
        setLoading(false);
      });

    conn.on("ReceiveMessage", (msg) => {
      console.log("Received message:", msg);

      setMessages((prev) => [...prev, msg]);
    });

    setConnection(conn);

    return () => {
      conn.stop();
    };
  }, [roomId]);

  const sendMessage = async (text: string) => {
    if (!connection) return;

    try {
      await connection.invoke("SendMessage", Number(roomId), text);
    } catch (err) {
      console.error(err);
      setError("Failed to send message");
    }
  };

  return { messages, sendMessage, loading, error };
}
