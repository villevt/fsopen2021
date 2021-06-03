require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const Person = require("./models/person")

const app = express()
app.use(express.static("build"))

morgan.token("content", (request, response) => {
    return JSON.stringify(request.body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

app.use(express.json())

app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            error: "content missing"
        })
    } else if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: "number missing"
        })
    } 
    
    /*else if (persons.some(person => person.name == body.name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }*/

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(result => {
        response.json(result)
    })
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.log(error)
            response.status(500).end()
        })
})

app.get("/info", (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br/><br/>${new Date()}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})