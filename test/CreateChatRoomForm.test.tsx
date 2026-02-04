import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateChatRoomForm from "../src/components/CreateChatRoomForm";
import axios from "axios";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("axios");
const mockedAxios = axios as any;

describe("CreateChatRoomForm", () => {
  const mockOnRoomCreated = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renders form inputs and buttons", () => {
    render(
      <CreateChatRoomForm
        onRoomCreated={mockOnRoomCreated}
        onCancel={mockOnCancel}
      />
    );
    expect(screen.getByPlaceholderText(/chat room name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", async () => {
    render(
      <CreateChatRoomForm
        onRoomCreated={mockOnRoomCreated}
        onCancel={mockOnCancel}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when backdrop is clicked", async () => {
    render(
      <CreateChatRoomForm
        onRoomCreated={mockOnRoomCreated}
        onCancel={mockOnCancel}
      />
    );

    const backdrop = screen.getByPlaceholderText(/chat room name/i).closest(".fixed");
    if (backdrop) {
      await userEvent.click(backdrop);
    }

    // Note: This test might need adjustment based on actual DOM structure
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("calls onRoomCreated and clears input on successful room creation", async () => {
    mockedAxios.post.mockResolvedValueOnce({});

    render(
      <CreateChatRoomForm
        onRoomCreated={mockOnRoomCreated}
        onCancel={mockOnCancel}
      />
    );

    const input = screen.getByPlaceholderText(/chat room name/i);
    await userEvent.type(input, "New Room");
    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(mockOnRoomCreated).toHaveBeenCalledTimes(1);
    });

    expect(input).toHaveValue("");
  });

  it("shows error message on failed room creation", async () => {
    mockedAxios.post.mockRejectedValueOnce({});

    render(
      <CreateChatRoomForm
        onRoomCreated={mockOnRoomCreated}
        onCancel={mockOnCancel}
      />
    );

    await userEvent.type(screen.getByPlaceholderText(/chat room name/i), "Test Room");
    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(screen.getByText("Failed to create chat room")).toBeInTheDocument();
    });
  });

  it("prevents body scroll when modal is open", () => {
    render(
      <CreateChatRoomForm
        onRoomCreated={mockOnRoomCreated}
        onCancel={mockOnCancel}
      />
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when component unmounts", () => {
    const { unmount } = render(
      <CreateChatRoomForm
        onRoomCreated={mockOnRoomCreated}
        onCancel={mockOnCancel}
      />
    );

    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("unset");
  });

  it("calls API with correct data on submit", async () => {
    mockedAxios.post.mockResolvedValueOnce({});

    render(
      <CreateChatRoomForm
        onRoomCreated={mockOnRoomCreated}
        onCancel={mockOnCancel}
      />
    );

    await userEvent.type(screen.getByPlaceholderText(/chat room name/i), "My Room");
    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/chatroom"),
        { name: "My Room" },
        { withCredentials: true }
      );
    });
  });
});
