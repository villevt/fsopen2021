const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(cors())

morgan.token("content", (request, response) => {
    return JSON.stringify(request.body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(persons)
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
    } else if (persons.some(person => person.name == body.name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
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
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get("/info", (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br/><br/>${new Date()}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})