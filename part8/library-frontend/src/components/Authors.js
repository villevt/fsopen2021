import React, { useState } from "react"
import PropTypes from "prop-types"
import { useMutation, useQuery } from "@apollo/client"

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const updateAuthor = () => {
    editAuthor({variables: {name, born: parseInt(born)}})
    setName("")
    setBorn("")
  }

  if (!props.show) {
    return null
  }
  const authors = useQuery(ALL_AUTHORS)

  if (authors.loading) {
    return(
      <div>Loading authors</div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <div>
        Name
        <input value={name} onChange={event => setName(event.target.value)}/>
      </div>
      <div>
        Born
        <input value={born} onChange={event => setBorn(event.target.value)}/>
      </div>
      <button onClick={updateAuthor}>Update author</button>
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool
}

export default Authors