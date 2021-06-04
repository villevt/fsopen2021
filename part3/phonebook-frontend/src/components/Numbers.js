import React from "react"

import Number from "./Number"

const Numbers = ({persons}) => (
  <table>
    <tbody>
      {persons.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1).map(person => 
        <Number key={person.id} person={person} />
      )}
    </tbody>
  </table>
)

export default Numbers