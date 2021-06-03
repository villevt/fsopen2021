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

app.get("/api/persons", (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    if (!body) {
        next(new Error("MissingContentError"))
    } else if (!body.name) {
        next(new Error("MissingNameError"))
    } else if (!body.number) {
        next(new Error("MissingNumberError"))
    } else {
        person.save()
            .then(result => {
                response.json(result)
            })
            .catch(error => next(error)) 
    }
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

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get("/info", (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br/><br/>${new Date()}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === "CastError") {
        return response.status(400).send({error: "malformatted id"})
    }

    next(error)
}

app.use(errorHandler)