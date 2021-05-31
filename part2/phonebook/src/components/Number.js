import React from 'react'

const Number = ({person}) => (
    <tr key={person.name}>
        <td>{person.name}</td>
    </tr>
)

export default Number