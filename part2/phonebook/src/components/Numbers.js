import React from 'react'

import Number from "./Number"

const Numbers = ({persons}) => (
    <table>
        <tbody>
            {persons.map(person => 
                <Number person={person} />
            )}
        </tbody>
    </table>
)

export default Numbers