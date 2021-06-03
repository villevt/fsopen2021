const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`Connecting DB to ${url}`)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(result => {
        console.log("Connected go DB")
    })
    .catch(error => {
        console.log("Connection to DB failed", error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)