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
      
      cy.get(".notification")
        .contains("Logged in")
        .and("have.css", "background-color", "rgb(0, 128, 0)")
    })

    it("fails with wrong credentials", function() {
      cy.get("form")
        .find("input[name=\"Username\"]").type("wrongname")

      cy.get("form")
        .find("input[name=\"Password\"]").type("wrongpw")

      cy.get("form")
        .find("button")
        .click()
      
      cy.get(".notification")
        .contains("Invalid username or password")
        .and("have.css", "background-color", "rgb(255, 0, 0)")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.login({username: user.username, password: user.password})
      cy.addBlog("SomeTitle", "SomeAuthor", "Url")
      cy.visit("http://localhost:3000")
    })

    it("A blog can be created", function() {
      cy.contains("Create new blog").click()
      cy.get("form")
        .find("input[name=\"Title\"]").type("Sometitle")

      cy.get("form")
        .find("input[name=\"Author\"]").type("Someauthor")

      cy.get("form")
        .find("input[name=\"Url\"]").type("http.com")

      cy.get("form")
        .find("button")
        .contains("Create")
        .click()

      cy.get(".blog")
        .should("contain", "Sometitle")
        .and("contain", "Someauthor")
    })

    it("A blog can be liked", function() {
      cy.get(".blog").first()
        .contains("view")
        .click()

      cy.get(".blog").first()
        .contains("Like")
        .click()

      cy.get(".blog").first().find(".likes").then(likes => {
        const likesBefore = likes.text()

        cy.get(".blog").first()
          .contains(/^Like$/)
          .click()

        cy.get(".blog").first()
          .find(".likes")
          .contains(parseInt(likesBefore.substring(6)) + 1)
      })    
    })

    it("User can remove their own blog", function() {
      cy.get(".blog").each(blog => {
        cy.wrap(blog)
          .contains("view")
          .click()
      })

      cy.get(".blog").contains(user.name).as("blogToBeRemoved")

      cy.get("@blogToBeRemoved").next().click()

      cy.get("@blogToBeRemoved").should("not.exist")
    })

    it.only("User cannot remove other users' blogs", function() {
      cy.get(".blog").each(blog => {
        cy.wrap(blog)
          .contains("view")
          .click()
      })

      cy.get(".blog")
        .find("div")
        .not(`div[data-user="${user.name}"]`)
        .contains("Remove")
        .should("not.exist")
    })
  })
})