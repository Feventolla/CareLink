// cypress/component/Login.spec.js

import { mount } from "@cypress/react18";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../src/store/index";
import Login from "../../src/components/auth/login";
import assert from "assert";

describe("Login Component", () => {
  beforeEach(() => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  });

  it("should display the login form", () => {
    cy.get("h1").contains("Admin Login");
    cy.get("form").should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get("button").contains("Login");
  });

  it("should display validation errors for empty fields", () => {
    cy.get("button").contains("Login").click();
    cy.get("span").contains("Email is required").should("exist");
    cy.get("span").contains("Password is required").should("exist");
  });

  it("should display validation error for invalid email", () => {
    cy.get('input[name="email"]').type("invalid-email");
    cy.get("button").contains("Login").click();
    cy.get("span").contains("Invalid email address").should("exist");
  });

  it("should submit the form successfully and navigate to dashboard", () => {
    // Mocking the API response for successful login
    cy.intercept("POST", "https://carelink.onrender.com/patient/signin", {
      statusCode: 200,
      body: {
        value: {
          patient: {
            email: "admin@example.com",
            role: "admin",
          },
          token: "fake-jwt-token",
        },
      },
    }).as("loginRequest");

    // Stub the window location to prevent actual navigation
    cy.window().then((win) => {
      cy.stub(win.location, "assign").as("locationAssign");
    });

    cy.get('input[name="email"]').type("feven@gmail.com");
    cy.get('input[name="password"]').type("1234");
    cy.get("button").click();

    // Debugging step
    cy.wait("@loginRequest").then((interception) => {
      console.log(interception);
    });

    // Check if the window.location.assign was called with the correct URL
    cy.get("@locationAssign").should(
      "be.calledWith",
      "http://localhost:5173/adminDashboard"
    );
  });

  // it("should successfully login with correct credentials", () => {
  //   cy.intercept("POST", "https://carelink.onrender.com/patient/signin", {
  //     statusCode: 200,
  //     body: {
  //       value: {
  //         patient: {
  //           email: "mekdes@example.com",
  //           role: "admin",
  //         },
  //         token: "fake-jwt-token",
  //       },
  //     },
  //   }).as("loginRequest");
  //   cy.get("form").submit();

  //   cy.wait("@loginRequest").then((interception) => {
  //     assert.isNotNull(interception.response.body, "API call has data");
  //     cy.get("form").should("not.exist"); // Assuming form is not displayed after login
  //     cy.url().should("include", "/adminDashboard"); // Simulate navigation
  //   });
  // });

  it("should display backend error", () => {
    cy.intercept("POST", "/auth/login", {
      statusCode: 401,
      body: {
        data: {
          error: [{ propertyName: "email", errorMessage: "User not found" }],
        },
      },
    }).as("loginRequestFailed");

    cy.get('input[name="email"]').type("wronguser@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get("button").contains("Login").click();

    cy.wait("@loginRequestFailed").then(() => {
      cy.get("span").contains("User not found").should("exist");
    });
  });
});
