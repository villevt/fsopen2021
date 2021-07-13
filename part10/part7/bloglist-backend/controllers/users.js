require("express-async-errors")
const bcrypt = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  const result = await User.find({}).populate("blogs", {url: true, title: true, author: true, id: true})
  response.json(result)
})

usersRouter.post("/", async (request, response) => {
  const body = request.body
  
  if (!body.password) {
    return response.status(400).json({error: "Missing password"})
  } else if (body.password.length < 3) {
    return response.status(400).json({error: "Password too short"})
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash  
  })
  
  const result = await user.save()
  response.json(result)
})

module.exports = usersRouter