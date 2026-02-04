import React from "react";
import { render, screen } from "@testing-library/react";
import MessageList from "../src/components/MessageList";
import "@testing-library/jest-dom";

describe("MessageList", () => {
  it("renders empty state when no messages", () => {
    render(<MessageList messages={[]} />);
    expect(screen.getByText(/no messages yet/i)).toBeInTheDocument();
  });

  it("renders list of messages", () => {
    const messages = [
      {
        id: 1,
        content: "Hello world",
        userName: "User1",
        userId: "1",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        content: "How are you?",
        userName: "User2",
        userId: "2",
        timestamp: new Date().toISOString(),
      },
    ];

    render(<MessageList messages={messages} />);

    expect(screen.getByText("Hello world")).toBeInTheDocument();
    expect(screen.getByText("How are you?")).toBeInTheDocument();
    expect(screen.getByText("User1")).toBeInTheDocument();
    expect(screen.getByText("User2")).toBeInTheDocument();
  });

  it("displays message timestamps", () => {
    const messages = [
      {
        id: 1,
        content: "Test message",
        userName: "TestUser",
        userId: "1",
        timestamp: new Date("2024-01-01T12:00:00").toISOString(),
      },
    ];

    render(<MessageList messages={messages} />);

    const timeString = new Date("2024-01-01T12:00:00").toLocaleTimeString();
    expect(screen.getByText(timeString)).toBeInTheDocument();
  });

  it("renders correct number of messages", () => {
    const messages = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      content: `Message ${i + 1}`,
      userName: `User${i + 1}`,
      userId: String(i + 1),
      timestamp: new Date().toISOString(),
    }));

    render(<MessageList messages={messages} />);

    messages.forEach((msg) => {
      expect(screen.getByText(msg.content)).toBeInTheDocument();
    });
  });

  it("displays user names correctly", () => {
    const messages = [
      {
        id: 1,
        content: "Content",
        userName: "JohnDoe",
        userId: "1",
        timestamp: new Date().toISOString(),
      },
    ];

    render(<MessageList messages={messages} />);

    expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
