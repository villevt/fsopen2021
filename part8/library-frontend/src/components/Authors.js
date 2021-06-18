import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/client"

import { ALL_AUTHORS } from "../queries"

const Authors = (props) => {
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

    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool
}

export default Authors