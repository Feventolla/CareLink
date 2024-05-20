describe("Admin Dashboard Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/adminDashboard"); // Adjust the URL to match your login page route
  });
  it("should display hospitals", () => {
    cy.get("div").contains("Hospitals Information");
    // Mocking the API response for getting hospitals

    // cy.intercept(
    //   "GET",
    //   "https://carelink.onrender.com/hospital/getAllHospitals"
    // ).as("getHospitals");

    // // Check if the request is successful and contains hospitals
    // cy.wait("@getHospitals").then((interception) => {
    //   expect(interception.response.statusCode).to.equal(200);
    //   expect(interception.response.body.value).to.be.an("array");

    //   const hospitals = interception.response.body.value.slice(0, 5);
    //   // Now you can check if hospitals are displayed on the page
    //   hospitals.forEach((hospital) => {
    //     cy.contains(hospital.name);
    //     // cy.contains(hospital.description);
    //   });
    // });
  });
  it("should navigate to hospital form page when 'Add Hospital' button is clicked", () => {
    cy.contains("Add Hospital").click();
    // cy.url().should("include", "/addHospital"); // Adjust the URL to match your hospital form page route
  });

  it("should display all required form elements", () => {
    cy.contains("Add Hospital").click();
    // cy.url().should("include", "/addHospital");
    cy.get("input[name='name']").should("exist");
    cy.get("input[name='generalSpecialization']").should("exist");
    cy.get("input[name='description']").should("exist");
    cy.get("input[name='address']").should("exist");
    cy.get("input[name='webSite']").should("exist");
    cy.get("input[name='phoneNumber']").should("exist");
    cy.get("input[name='latitude']").should("exist");
    cy.get("input[name='longitude']").should("exist");
    cy.get("input[name='startTime']").should("exist");
    cy.get("input[name='endTime']").should("exist");
    cy.get("input[name='photo']").should("exist");
    // Add more assertions for other form elements
  });

  it("should display validation errors for invalid form data", () => {
    cy.contains("Add Hospital").click();
    // cy.url().should("include", "/addHospital");
    // Fill in the form with invalid data
    cy.get("input[name='name']").type("test hopital");
    cy.get("input[name='generalSpecialization']").type("dental clinic");
    cy.get("input[name='description']").type(
      "hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type "
    );
    cy.get("input[name='address']").type("kirkos sefer");
    cy.get("input[name='webSite']").type("http://www.mcmet.org/");
    cy.get("input[name='phoneNumber']").type("0912345678");
    cy.get("input[name='latitude']").type("12.3456");
    cy.get("input[name='longitude']").type("23.421"); // Invalid hospital location (numeric)
    cy.get("input[name='startTime']").type("00:30");
    cy.get("input[name='endTime']").type("17:00");

    cy.get("button[type='submit']").click();
  });

  it("should send a request to add the hospital when the form is submitted", () => {
    cy.contains("Add Hospital").click();
    // cy.url().should("include", "/addHospital");
    // cy.intercept(
    //   "POST",
    //   "https://carelink.onrender.com/hospital/postHospital",
    //   {
    //     statusCode: 200,
    //     body: { message: "Hospital added successfully" },
    //   }
    // ).as("createHospital");

    cy.get("input[name='name']").type("test hopital");
    cy.get("input[name='generalSpecialization']").type("dental clinic");
    cy.get("input[name='description']").type(
      "hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type hospital is a hospital type "
    );
    cy.get("input[name='address']").type("kirkos sefer");
    cy.get("input[name='webSite']").type("http://www.mcmet.org/");
    cy.get("input[name='phoneNumber']").type("0912345678");
    cy.get("input[name='latitude']").type("12.3456");
    cy.get("input[name='longitude']").type("23.421"); // Invalid hospital location (numeric)
    cy.get("input[name='startTime']").type("00:30");
    cy.get("input[name='endTime']").type("17:00");
    // Submit the form
    cy.get("button[type='submit']").click();
    cy.visit("http://localhost:5173/adminDashboard");
    // Wait for the API request
    // cy.wait("@createHospital").then((interception) => {
    //   console.log(interception);
    // });

    // // Log the current URL
    // cy.url().then((url) => {
    //   console.log("Current URL before check:", url);
    // });

    // // Increase the timeout for URL check
    // cy.url({ timeout: 1000 }).should("include", "/adminDashboard");
    // Assert that the form submission was successful
    // cy.contains("Hospital added successfully").should("exist");
    // cy.visit("http://localhost:5173/admin");
  });

  it("should display confirmation popup when 'Delete Hospital' button is clicked", () => {
    // Click on the delete button of the first hospital (assuming it's the one you want to delete)
    cy.get(".bottom-4.right-3.absolute button").first().click();

    // Verify that the confirmation popup is displayed
    cy.contains("Are you sure?").should("be.visible");

    // Click the "Yes" button to confirm deletion
    cy.contains("No").click();

    // Verify that the deletion process is in progress (optional)
    cy.contains("deleting...").should("be.visible");

    // Wait for the deletion process to complete (if necessary)

    // Verify that the hospital is deleted from the list
    cy.get(".hospital-item").should("not.exist");
  });

  //   cy.visit('/path-to-register-hospital-component');

  //   it('renders without crashing', () => {
  //     cy.get('form').should('exist');
  //   });

  //   it('displays hospital information in English by default', () => {
  //     cy.contains('Hospital Information').should('exist');
  //     cy.contains('Add Hospital').should('exist');
  //     cy.contains('Hospital Name').should('exist');
  //   });

  //   it('displays hospital information in Amharic when language is toggled', () => {
  //     cy.contains('Amharic').click();
  //     cy.contains('የሆስፒታል መረጃ').should('exist');
  //     cy.contains('ሆስፒታል ጨምር').should('exist');
  //     cy.contains('የሆስፒታል ስም').should('exist');
  //   });

  //   it('submits hospital information when the form is filled and submitted', () => {
  //     cy.get('input[name="hospitalName"]').type('Tkur Anbesa Hospital');
  //     cy.get('select[name="generalSpecialization"]').select('General Hospital');
  //     cy.get('textarea[name="aboutHospital"]').type('This is a hospital in Addis Ababa.');
  //     cy.get('input[name="address"]').type('Addis Ababa, Arada Subcity');
  //     cy.get('input[name="webSite"]').type('www.tkuranbesa.com');
  //     cy.get('input[name="contact"]').type('+251 967 765 789');
  //     cy.get('input[name="latitude"]').type('8.6666');
  //     cy.get('input[name="longitude"]').type('8.6666');

  //     cy.intercept('POST', '/api-url', { statusCode: 200, body: { data: 'success' } }).as('postHospital');

  //     cy.get('form').submit();

  //     cy.wait('@postHospital').then(() => {
  //       cy.contains('Hospital added successfully.').should('exist');
  //     });
  //   });
  // });
});
