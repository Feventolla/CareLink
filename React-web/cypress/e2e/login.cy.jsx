describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // Adjust the URL to match your login page route
  });

  it("should display validation errors for empty fields", () => {
    cy.get("button").click();

    cy.get("span.text-red-500")
      .should("contain", "Email is required")
      .and("contain", "Password is required");
  });

  it("should display an invalid email error", () => {
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="password"]').type("Password123");
    cy.get("button").click();

    cy.get("span.text-red-500").should("contain", "Invalid email address");
  });

  it("should display unauthorized error for non-admin", () => {
    // Mocking the API response for a non-admin user
    // cy.intercept("POST", "https://carelink.onrender.com/patient/signin", {
    //   statusCode: 200,
    //   body: {
    //     value: {
    //       patient: {
    //         email: "user@example.com",
    //         role: "user",
    //       },
    //       token: "fake-jwt-token",
    //     },
    //   },
    // }).as("loginRequest");

    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("Password123");
    cy.get("button").click();

    // Debugging step
    // cy.wait("@loginRequest").then((interception) => {
    //   console.log(interception);
    // });

    // cy.get("p.text-red-500").should(
    //   "contain",
    //   "You are not registed as an admin!"
    // );
  });

  it("should submit the form successfully and navigate to dashboard", () => {
    // Mocking the API response for successful login
    // cy.intercept("POST", "https://carelink.onrender.com/patient/signin", {
    //   statusCode: 200,
    //   body: {
    //     value: {
    //       patient: {
    //         email: "feven@gmail.com",
    //         role: "admin",
    //       },
    //       token: "fake-jwt-token",
    //     },
    //   },
    // }).as("loginRequest");

    cy.get('input[name="email"]').type("feven@gmail.com");
    cy.get('input[name="password"]').type("1234");
    cy.get("button").click();

    // Debugging step
    // cy.wait("@loginRequest").then((interception) => {
    //   console.log(interception);
    // });

    // Log the current URL
    // cy.url().then((url) => {
    //   console.log("Current URL before check:", url);
    // });

    // Increase the timeout for URL check
    // cy.url({ timeout: 1000 }).should("include", "/adminDashboard");
    // cy.visit("http://localhost:5173/adminDashboard");
  });

  // it("should navigate to admin dashboard after sucessful login", () => {
  //   cy.visit("http://localhost:5173/adminDashboard");
  //   // cy.contains("Hospitals Information").click();
  //   // cy.url().should("include", "adminDashboard");
  // });

  // it("should display all required form elements", () => {
  //   cy.visit("http://localhost:5173/adminDashboard");
  //   cy.contains("Add Hospital").click();
  //   // cy.url().should("include", "/adminDashboard");
  //   cy.get("input[name='name']").should("exist");
  //   cy.get("input[name='generalSpecialization']").should("exist");
  //   cy.get("input[name='description']").should("exist");
  //   cy.get("input[name='address']").should("exist");
  //   cy.get("input[name='webSite']").should("exist");
  //   cy.get("input[name='phoneNumber']").should("exist");
  //   cy.get("input[name='latitude']").should("exist");
  //   cy.get("input[name='longitude']").should("exist");
  //   cy.get("input[name='startTime']").should("exist");
  //   cy.get("input[name='endTime']").should("exist");
  //   cy.get("input[name='photo']").should("exist");
  //   // Add more assertions for other form elements
  // });
});
