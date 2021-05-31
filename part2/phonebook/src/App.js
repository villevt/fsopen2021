import React, { useState } from 'react'

import AddNumber from "./components/AddNumber"
import Filter from "./components/Filter"
import Numbers from "./components/Numbers"

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 

  const [filter, setFilter] = useState(new RegExp(''))

  const filterHandler = (event) => {
    const newFilter = new RegExp(`^${event.target.value.toLowerCase()}`)
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
      const copy = [...persons]
      copy.push({
        name: newName,
        number: newNumber
      })
      setPersons(copy)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilter={filterHandler}/>
      <h2>Add a new</h2>
      <AddNumber handleSubmit={newPerson}/>
      <h2>Numbers</h2>
      <Numbers persons={persons.filter((person) => filter.test(person.name.toLowerCase()))}/>
    </div>
  )
}

export default App