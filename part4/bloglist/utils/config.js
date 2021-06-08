require("dotenv").config()

const PORT = process.env.PORT
const TOKEN_SECRET = process.env.TOKEN_SECRET
const MONGODB_URI = process.env.NODE_ENV === "test"
  ? process.env.MONGODB_TEST_URI
  : process.env.MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URI,
  TOKEN_SECRET
}