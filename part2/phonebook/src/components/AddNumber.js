import React, {useState} from 'react'

const AddNumber = ({handleSubmit}) => {
    const [newName, setNewName] = useState('')

    const handleInput = (event) => {
        setNewName(event.target.value)
    }

    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleInput}/>
            </div>
            <div>
                <button onClick={handleSubmit} type="submit">add</button>
            </div>
        </form>
    )
}

export default AddNumber