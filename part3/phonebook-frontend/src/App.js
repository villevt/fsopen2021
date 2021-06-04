import React, {useEffect, useState} from "react"

import numberService from "./services/numbers" 

import AddNumber from "./components/AddNumber"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import Numbers from "./components/Numbers"

const App = () => {
  const [persons, setPersons] = useState([{}]) 
  const [filter, setFilter] = useState("")
  let [notification, setNotification] = useState({
    notification: null,
    error: false
  })

  const notificationTimeout = (newNotification, error=false) => {
    setNotification({
      notification: newNotification,
      error: error
    })
    setTimeout(() => setNotification({notification: null, error: false}), 3000)
  }

  const personSetter = (values) => {
    setPersons(values.map(value => {
      return {...value, removeHandler: () => {
        if (window.confirm(`Delete ${value.name}?`)) {
          numberService.remove(value.id)
            .then(() => {
              personSetter(values.filter(val => val.id !== value.id))
              notificationTimeout(`Deleted ${value.name}`)
            })
            .catch(error => notificationTimeout(`Failed to delete person\n${error.response.data.error}`, true))
        }
      }}
    }))
  }

  useEffect(() => {
    numberService.getAll()
      .then(response => personSetter(response))
      .catch(error => notificationTimeout(`Failed to retrieve numbers \n${error.response.data.error}`, true))
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
        })
          .then(response => {
            personSetter(
              persons.map(person => {
                if (person.name === newName) {
                  person.number = newNumber
                }
                return person
              })  
            )
            notificationTimeout(`Updated ${response.name}`)
          }).catch(error => notificationTimeout(`Error updating number\n${error.response.data.error}`, true))
      }
    } else if (persons.some((value) => value.number === newNumber)) {
      notificationTimeout(`${newNumber} is already in phonebook`)
    } else {
      numberService.create({
        name: newName,
        number: newNumber
      })
        .then(response => {
          personSetter(persons.concat(response))
          notificationTimeout(`Added ${response.name}`)
        })
        .catch(error => {
          notificationTimeout(`Error adding number\n${error.response.data.error}`, true)
        })
    }
  }

  let numbers = ""
  if (persons[0].name) {
    numbers = <Numbers persons={persons.filter((person) => person.name.toLowerCase().startsWith(filter))}/>
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.notification} error={notification.error}/>
      <Filter handleFilter={filterHandler}/>
      <h2>Add a new</h2>
      <AddNumber handleSubmit={newPerson}/>
      <h2>Numbers</h2>
      {numbers}
    </div>
  )
}

export default App