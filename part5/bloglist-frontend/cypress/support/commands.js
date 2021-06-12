Cypress.Commands.add("login", ({username, password}) => {
  cy.request("POST", "http://localhost:3003/api/login", {username, password})
    .then(response => {
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(response.body))
    })
})