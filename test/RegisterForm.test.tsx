import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../src/components/RegisterForm";
import axios from "axios";
import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("axios");
const mockedAxios = axios as any;

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders register form inputs and button", () => {
    render(<RegisterForm />);
    expect(screen.getByPlaceholderText(/choose a username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/create a password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("renders form labels", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("shows success message on successful registration", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: "Registration successful" });

    render(<RegisterForm />);

    await userEvent.type(screen.getByPlaceholderText(/choose a username/i), "newuser");
    await userEvent.type(screen.getByPlaceholderText(/create a password/i), "newpass");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText("Registration successful")).toBeInTheDocument();
    });
  });

  it("shows error message on failed registration", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: "Username already exists" },
    });

    render(<RegisterForm />);
    await userEvent.type(screen.getByPlaceholderText(/choose a username/i), "existinguser");
    await userEvent.type(screen.getByPlaceholderText(/create a password/i), "password");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText("Username already exists")).toBeInTheDocument();
    });
  });

  it("shows generic error message when error response is missing", async () => {
    mockedAxios.post.mockRejectedValueOnce({});

    render(<RegisterForm />);
    await userEvent.type(screen.getByPlaceholderText(/choose a username/i), "user");
    await userEvent.type(screen.getByPlaceholderText(/create a password/i), "pass");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText("Registration failed")).toBeInTheDocument();
    });
  });

  it("calls API with correct data on submit", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: "Success" });

    render(<RegisterForm />);
    await userEvent.type(screen.getByPlaceholderText(/choose a username/i), "testuser");
    await userEvent.type(screen.getByPlaceholderText(/create a password/i), "testpass");
    await userEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/user/register"),
        { username: "testuser", password: "testpass" }
      );
    });
  });
});
