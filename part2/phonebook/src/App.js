import React, {useEffect, useState} from 'react'

import numberService from "./services/numbers" 

import AddNumber from "./components/AddNumber"
import Filter from "./components/Filter"
import Numbers from "./components/Numbers"

const App = () => {
  const [persons, setPersons] = useState([{
    name: "",
    number: "",
    id: 0
  }]) 
  const [filter, setFilter] = useState("")

  const personSetter = (values) => {
    setPersons(values.map(value => {
      return {...value, removeHandler: () => {
        if (window.confirm(`Delete ${value.name}?`)) {
          numberService.remove(value.id)
          .then(response => {
            personSetter(values.filter(val => val.id !== value.id))
          })
          .catch(error => alert(`Failed to delete person\n${error}`))
        }
      }}
    }))
  }

  useEffect(() => {
    numberService.getAll()
      .then(response => personSetter(response))
      .catch(error => alert(`Failed to retrieve numbers \n${error}`))
  }, [])

  const filterHandler = (event) => {
    const newFilter = event.target.value.toLowerCase()
    setFilter(newFilter)
  }

  const newPerson = (event) => {
    const newName = event.target.form[0].value
    const newNumber = event.target.form[1].value

    if (persons.some((value) => value.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)) {
        numberService.update({
          name: newName,
          number: newNumber,
          id: persons.find(person => person.name === newName).id
        }).then(response => personSetter(persons.map(person => {
          if (person.name === newName) {
            person.number = newNumber
          }
          return person
        }))).catch(error => alert(`Error updating number\n${error}`))
      }
    } else if (persons.some((value) => value.number === newNumber)) {
      alert (`${newNumber} is already in phonebook`)
    } else {
      numberService.create({
        name: newName,
        number: newNumber
      }).then(response =>
          personSetter(persons.concat(response))
        )
        .catch(error => alert(`Error adding number\n${error}`))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilter={filterHandler}/>
      <h2>Add a new</h2>
      <AddNumber handleSubmit={newPerson}/>
      <h2>Numbers</h2>
      <Numbers persons={persons.filter((person) => person.name.toLowerCase().startsWith(filter))}/>
    </div>
  )
}

export default App