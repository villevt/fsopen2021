describe("Blog app", function() {
  const user = {
    username: "aaa",
    password: "bbb",
    name: "ccc"
  }

  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    cy.request("POST", "http://localhost:3003/api/users", user)

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

  describe("Login",function() {
    it("succeeds with correct credentials", function() {
      cy.get("form")
        .find("input[name=\"Username\"]").type(user.username)

      cy.get("form")
        .find("input[name=\"Password\"]").type(user.password)

      cy.get("form")
        .find("button")
        .click()
      
      cy.contains("Logged in")
    })

    it("fails with wrong credentials", function() {
      cy.get("form")
        .find("input[name=\"Username\"]").type("wrongname")

      cy.get("form")
        .find("input[name=\"Password\"]").type("wrongpw")

      cy.get("form")
        .find("button")
        .click()
      
      cy.contains("Invalid username or password")
    })
  })
})