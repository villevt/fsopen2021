describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function() {
    cy.get("form")
      .should("contain", "Username")
      .and("contain", "Password")

    cy.get("form")
      .find("input")
      .should("be.visible")

    cy.get("form")
      .find("button")
      .should("contain", "Login")
  })
})