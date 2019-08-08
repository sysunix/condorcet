context("Navigation", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");

    cy.login();
    cy.visit("http://localhost:8080/polls");
  });

  it("should navigate to poll creation", () => {
    cy.get("[data-testid=burger-button]").click();
    cy.get("[data-testid=navlink-poll-creation]").click();

    cy.url().should("match", /\/polls\/new$/);
  });

  it("should navigate to public polls", () => {
    cy.get("[data-testid=burger-button]").click();
    cy.get("[data-testid=navlink-public-polls]").click();

    cy.url().should("match", /\/polls\/public$/);
  });

  it("should navigate to polls list", () => {
    cy.visit("http://localhost:8080/polls/new");

    cy.get("[data-testid=burger-button]").click();
    cy.get("[data-testid=navlink-user-polls]").click();

    cy.url().should("match", /\/polls$/);
  });
});
