const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

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
    name: {
        minlength: 3,
        type: String,
        required: true,
        unique: true
    },
    number: {
        minlength: 8,
        type: String,
        required: true
    }
})
personSchema.plugin(uniqueValidator)

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)