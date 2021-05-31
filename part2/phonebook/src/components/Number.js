import React from 'react'

const Number = ({person}) => (
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td>
            <button onClick={person.removeHandler}>
                Remove
            </button>
        </td>
    </tr>
)

export default Number