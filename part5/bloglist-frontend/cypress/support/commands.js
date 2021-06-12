Cypress.Commands.add("login", ({username, password}) => {
  cy.request("POST", "http://localhost:3003/api/login", {username, password})
    .then(response => {
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(response.body))
    })
})

Cypress.Commands.add("addBlog", (title, author, url) => {
  cy.request({
    method: "POST", 
    url: "http://localhost:3003/api/blogs", 
    body: {title, author, url}, 
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("loggedBloglistUser")).token}`
    }
  })
})