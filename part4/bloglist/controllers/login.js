const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const loginRouter = require("express").Router()
const config = require("../utils/config")
const User = require("../models/user")

loginRouter.post("/", async (request, response) => {
  const body = request.body

  if (!body.password || !body.username) {
    return response.status(401).json({error: "Missing username or password"})
  }

  const user = await User.findOne({username: body.username})
  const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return response.status(401).json({error: "Invalid username or password"})
  }

  const token = jwt.sign({username: user.username, id: user.id}, config.TOKEN_SECRET, {expiresIn: 60*60})

  response.status(200).json({token, username: user.username, name: user.name})
})

module.exports = loginRouter