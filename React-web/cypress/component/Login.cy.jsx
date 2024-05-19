// cypress/component/Login.spec.js

import React from "react";
import { mount } from "@cypress/react18";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../src/store/index"; // Adjust the path to your Redux store
import Login from "../../src/components/auth/login"; // Adjust the path to your Login component

describe("Login Component", () => {
  const mountComponent = () => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  };

  it("should display the login form", () => {
    mountComponent();
    cy.get("h1").contains("Admin Login");
    cy.get("form").should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get("button").contains("Login");
  });

  it("should display validation errors for empty fields", () => {
    mountComponent();
    cy.get("button").contains("Login").click();
    cy.get("span").contains("Email is required").should("exist");
    cy.get("span").contains("Password is required").should("exist");
  });

  it("should display validation error for invalid email", () => {
    mountComponent();
    cy.get('input[name="email"]').type("invalid-email");
    cy.get("button").contains("Login").click();
    cy.get("span").contains("Invalid email address").should("exist");
  });

  it("should successfully login with correct credentials", () => {
    // Mocking the API response
    cy.intercept("POST", "https://carelink.onrender.com/auth/login", {
      statusCode: 200,
      body: {
        value: {
          patient: {
            email: "mekdes@example.com",
            role: "admin",
          },
          token: "fake-jwt-token",
        },
      },
    }).as("loginRequest");
    cy.get("form").submit();

    // mountComponent();
    // cy.get('input[name="email"]').type("admin@example.com");
    // cy.get('input[name="password"]').type("correctpassword");
    // cy.get("button").contains("Login").click();

    cy.wait("@loginRequest").then((interception) => {
      assert.isNotNull(interception.response.body, "API call has data");
      cy.get("form").should("not.exist"); // Assuming form is not displayed after login
      // Simulate navigation
      cy.get("@navigate").should("have.been.calledWith", "/adminDashboard");
    });
  });

  it("should display backend error", () => {
    // Mocking a failed API response
    cy.intercept("POST", "/auth/login", {
      statusCode: 401,
      body: {
        data: {
          error: [{ propertyName: "email", errorMessage: "User not found" }],
        },
      },
    }).as("loginRequestFailed");

    mountComponent();
    cy.get('input[name="email"]').type("wronguser@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get("button").contains("Login").click();

    cy.wait("@loginRequestFailed").then(() => {
      cy.get("span").contains("User not found").should("exist");
    });
  });
});
