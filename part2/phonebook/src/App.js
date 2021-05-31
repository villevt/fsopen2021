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

  useEffect(() => {
    numberService.getAll()
      .then(response => setPersons(response))
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
      alert(`${newName} is already in phonebook`)
    } else if (persons.some((value) => value.number === newNumber)) {
      alert (`${newNumber} is already in phonebook`)
    } else {
      numberService.create({
        name: newName,
        number: newNumber
      }).then(response =>
          setPersons(persons.concat(response))
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