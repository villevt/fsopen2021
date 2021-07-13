const mongoose = require("mongoose")
const config = require("./config")
const helper = require("../tests/test_helper")

console.log("Initializing DB with test data..")

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
helper.initializeUsers()
helper.initializeBlogs()

console.log("Done!")
process.exit()