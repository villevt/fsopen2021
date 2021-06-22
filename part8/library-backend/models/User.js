const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    minlength: 3,
    required: true,
    unique: true
  },
  favoriteGenre: {
    type: mongoose.Schema.Types.String,
    required: true
  }
})
schema.plugin(uniqueValidator)

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})


module.exports = mongoose.model("User", schema)