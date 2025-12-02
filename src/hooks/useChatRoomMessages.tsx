import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { Message } from "../utils/types";
import axios from "axios";

export default function useChatRoomMessages(roomId: string | undefined) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await axios.get<Message[]>(
          `http://localhost:5086/api/chatroom/${roomId}/message`,
          { withCredentials: true }
        );
        const history = res.data;

        // Load DB messages first
        setMessages(history);
      } catch (err) {
        console.error(err);
        setError("Failed to load chat history");
      }
    };

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

    loadHistory();
    setConnection(conn);

    return () => {
      conn.stop();
    };
  }, [roomId]);

  const sendMessage = async (text: string) => {
    if (!connection) return;
    const msgDto = { Text: text };

    try {
      await connection.invoke("SendMessage", Number(roomId), msgDto);
    } catch (err) {
      console.error(err);
      setError("Failed to send message");
    }
  };

  return { messages, sendMessage, loading, error };
}
