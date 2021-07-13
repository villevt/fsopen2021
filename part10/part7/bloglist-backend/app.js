
const config = require("./utils/config")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const testingRouter = require("./controllers/testing")
const errorHandler = require("./utils/errorhandler")
const tokenExtractor = require("./utils/token-extractor")
const userExtractor = require("./utils/user-extractor")

const app = express()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use("/api/blogs", userExtractor, blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter)
}

app.use(errorHandler)

module.exports = app