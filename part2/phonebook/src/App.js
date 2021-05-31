import React, { useState } from 'react'

import AddNumber from "./components/AddNumber"
import Numbers from "./components/Numbers"

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const newPerson = (event) => {
    event.preventDefault()
    const newName = event.target.form[0].value

    if (persons.some((value) => value.name === newName)) {
      alert(newName + " is already added to phonebook")
    } else {
      const copy = [...persons]
      copy.push({name: event.target.form[0].value})
      setPersons(copy)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AddNumber handleSubmit={newPerson}/>
      <h2>Numbers</h2>
      <Numbers persons={persons}/>
    </div>
  )
}

export default App