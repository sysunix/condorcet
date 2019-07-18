context("Poll", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.login();
  });

  it("should fill poll form", () => {
    cy.get("[data-testid=burger-button]").click();

    cy.get("[data-testid=navlink-poll-creation]").click();

    cy.get("[data-testid=form-question]").type(
      "Quel est le chef d'état le plus street cred ?"
    );

    cy.get("[data-testid=form-description]").type(
      "Peut être que j'aurais des problèmes avec ce test mais au moins il est marrant"
    );

    cy.get("[data-testid=form-answer]").type("Sadam Hussein");

    cy.get("[data-testid=form-addAnswer]").click();

    cy.get("[data-testid=form-answer]").type("Macron");

    cy.get("[data-testid=form-addAnswer]").click();

    cy.get("[data-testid=form-answer]").type("Pinochet");

    cy.get("[data-testid=form-addAnswer]").click();

    // cy.get('[data-testid=form-submit]').click()
  });
});
