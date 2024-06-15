// Import the necessary functions from 'vitest'
import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// Import the component you want to test
import Login from "../components/auth/login.jsx";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Uncomment this line
import store from "../store"; // Uncomment this line

describe("Login Component", () => {
  test("renders login form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });
});
