import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MessageInput from "../src/components/MessageInput";
import "@testing-library/jest-dom";
import { vi } from "vitest";

describe("MessageInput", () => {
  const mockOnSend = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input and send button", () => {
    render(<MessageInput onSend={mockOnSend} />);
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("calls onSend when send button is clicked", async () => {
    render(<MessageInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(/type your message/i);
    await userEvent.type(input, "Hello world");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(mockOnSend).toHaveBeenCalledWith("Hello world");
  });

  it("calls onSend when Enter key is pressed", async () => {
    render(<MessageInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(/type your message/i);
    await userEvent.type(input, "Test message{Enter}");

    expect(mockOnSend).toHaveBeenCalledWith("Test message");
  });

  it("clears input after sending message", async () => {
    render(<MessageInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(/type your message/i) as HTMLInputElement;
    await userEvent.type(input, "Hello");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(input.value).toBe("");
  });

  it("does not send empty message", async () => {
    render(<MessageInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(/type your message/i);
    await userEvent.type(input, "   ");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it("does not send message with only whitespace", async () => {
    render(<MessageInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(/type your message/i);
    await userEvent.type(input, "   \n\t   ");
    await userEvent.click(screen.getByRole("button", { name: /send/i }));

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it("updates input value as user types", async () => {
    render(<MessageInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText(/type your message/i) as HTMLInputElement;
    await userEvent.type(input, "Typing");

    expect(input.value).toBe("Typing");
  });
});
