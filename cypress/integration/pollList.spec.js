import firebase from "@firebase/app";
import "@firebase/firestore";

context("Poll", () => {
  before(() => {
    const opts = { recursive: true };
    cy.callFirestore("delete", "polls", opts);

    cy.callFirestore("set", "polls/TEST_UID", {
      answers: [
        { slug: "sadam-hussein", value: "Sadam Hussein" },
        { slug: "macron", value: "Macron" }
      ],
      description: "",
      isActive: true,
      isPublic: false,
      owner: "Kb5XM9p2CPhGtiMqgdGVUO8H49R2",
      question: "Quel est le chef d état le plus street cred ?",
      token: "TOKEN",
      users: ["Kb5XM9p2CPhGtiMqgdGVUO8H49R2"],
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  });

  beforeEach(() => {
    cy.viewport("iphone-6");

    cy.login();
    cy.visit("http://localhost:8080/");
  });

  it("should navigate to poll page", () => {
    cy.get(
      "[data-testid=vote-Quel-est-le-chef-d-etat-le-plus-street-cred]"
    ).click();

    cy.url().should("include", "/polls/TEST_UID");
  });

  it("should go to the result screen", () => {
    cy.get(
      '[data-testid="close-Quel-est-le-chef-d-etat-le-plus-street-cred"]'
    ).click();

    cy.get(
      "[data-testid=results-Quel-est-le-chef-d-etat-le-plus-street-cred]"
    ).click();

    cy.url().should("include", "/polls/TEST_UID/result");
  });

  it("should delete poll", () => {
    cy.get("[data-testid=delete]").click();
  });
});
