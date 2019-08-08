context("Poll creation", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");

    cy.login();
    cy.visit("http://localhost:8080/polls/new");
  });

  it("should create poll", () => {
    cy.fixture("poll").then(poll => {
      cy.get("[data-testid=form-question]").type(poll.question);

      cy.get("[data-testid=form-description]").type(poll.description);

      poll.answers.forEach(item => {
        cy.get("[data-testid=form-answer]").type(item);

        cy.get("[data-testid=form-addAnswer]").click();
      });

      cy.get("[data-testid=form-answerProposal-jean-smaug]").click();

      cy.get("[data-testid=form-submit]").click();

      cy.get("[data-testid=notification-0]").should("be.visible");
      cy.get("[data-testid=notification-0]").should(
        "contain",
        "Scrutin créé mon pote"
      );
    });
  });
});
