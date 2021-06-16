const jwt = require("jsonwebtoken")
const config = require("./config")
const User = require("../models/user")

const userExtractor = async (request, response, next) => {
  const token = request.token
  if (!token) {
    return next()
  }
  
  const decoded = jwt.verify(token, config.TOKEN_SECRET)
  if (!decoded.id) {
    return response.status(401).json({error: "token missing or invalid"})
  }

  request.user = await User.findById(decoded.id)

  next()
}

module.exports = userExtractor