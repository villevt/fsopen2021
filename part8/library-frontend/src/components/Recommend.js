import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/client"

import { ALL_BOOKS, CURRENT_USER } from "../queries"

const Recommend = (props) => {
  if (!props.show) {
    return null
  }

  const books = useQuery(ALL_BOOKS)
  const currentUser = useQuery(CURRENT_USER)

  if (books.loading || currentUser.loading) {
    return (
      <div>
        Loading recommendations
      </div>
    )
  }

  const filteredBooks = books.data.allBooks.filter(b => b.genres.some(g => g === currentUser.data.me.favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre {currentUser.data.me.favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a => {
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Recommend.propTypes = {
  show: PropTypes.bool
}

export default Recommend