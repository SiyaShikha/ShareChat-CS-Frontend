import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../src/components/LoginForm";
import axios from "axios";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("axios");
const mockedAxios = axios as any;

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("LoginForm", () => {
  it("renders login form inputs and button", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/enter your username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("navigates to chat room page on successful login", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { token: "mocked-token" } });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText(/enter your username/i), "testuser");
    await userEvent.type(screen.getByPlaceholderText(/enter your password/i), "testpass");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/chatroom");
    });
  });

  it("shows error message on failed login", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: "Invalid credentials" },
    });
    render(<LoginForm />);
    await userEvent.type(screen.getByPlaceholderText(/enter your username/i), "baduser");
    await userEvent.type(screen.getByPlaceholderText(/enter your password/i), "badpass");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
    );
  });
});
