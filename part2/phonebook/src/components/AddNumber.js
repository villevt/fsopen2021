import React, {useState} from 'react'

const AddNumber = ({handleSubmit}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const nameChange = (event) => {
        setNewName(event.target.value)
    }

    const numberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const submitPressed = (event) => {
        event.preventDefault()

        if (newName === "") {
            alert("Please fill in a name")
        } else if (newNumber === "") {
            alert("Please fill in a number")
        } else {
            handleSubmit(event)
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <form>
            <div>
                name: <input value={newName} onChange={nameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={numberChange} />
            </div>
            <div>
                <button onClick={submitPressed} type="submit">add</button>
            </div>
        </form>
    )
}

export default AddNumber