import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Login from "../Login";

jest.mock("../../Context/AuthContext");

const mockLogin = jest.fn();

beforeEach(() => {
  (useAuth as jest.Mock).mockReturnValue({
    login: mockLogin,
    currentUser: null,
    error: "",
    setError: jest.fn(),
  });
});

test("renders login form", () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByText(/log in/i)).toBeInTheDocument();
});

test("calls login function on form submit", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByText(/log in/i));

  expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password");
});