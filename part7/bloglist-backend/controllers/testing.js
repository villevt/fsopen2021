const router = require("express").Router()
const helper = require("../tests/test_helper")

router.post("/reset", async (request, response) => {
  await helper.initializeUsers()
  await helper.initializeBlogs()

  response.status(204).end()
})

module.exports = router