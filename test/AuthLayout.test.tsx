import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthLayout from "../src/components/AuthLayout";
import "@testing-library/jest-dom";
import { vi } from "vitest";

describe("AuthLayout", () => {
  it("renders children", () => {
    render(
      <AuthLayout>
        <div>Test Content</div>
      </AuthLayout>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders header with logo and ShareChat text", () => {
    render(
      <AuthLayout>
        <div>Content</div>
      </AuthLayout>
    );

    expect(screen.getByText("ShareChat")).toBeInTheDocument();
  });

  it("renders footer button when footer props are provided", () => {
    const mockOnFooterAction = vi.fn();

    render(
      <AuthLayout
        footerText="Test footer text"
        footerActionText="Test Action"
        onFooterAction={mockOnFooterAction}
      >
        <div>Content</div>
      </AuthLayout>
    );

    expect(screen.getByText("Test footer text")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /test action/i })).toBeInTheDocument();
  });

  it("does not render footer when footer props are not provided", () => {
    render(
      <AuthLayout>
        <div>Content</div>
      </AuthLayout>
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onFooterAction when footer button is clicked", async () => {
    const mockOnFooterAction = vi.fn();
    const user = userEvent.setup();

    render(
      <AuthLayout
        footerText="Test"
        footerActionText="Click Me"
        onFooterAction={mockOnFooterAction}
      >
        <div>Content</div>
      </AuthLayout>
    );

    await user.click(screen.getByRole("button", { name: /click me/i }));

    expect(mockOnFooterAction).toHaveBeenCalledTimes(1);
  });
});
