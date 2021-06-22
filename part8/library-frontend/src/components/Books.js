import React, {useState} from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/client"

import { GENRE_BOOKS } from "../queries"

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [genreFilter, setGenreFilter] = useState("")
  const books = useQuery(GENRE_BOOKS, {variables: {genre: genreFilter}})

  if (books.loading) {
    return (
      <div>
        Loading books
      </div>
    )
  }

  const genres = new Set()
  for (const book of books.data.allBooks) {
    for (const genre of book.genres) {
      genres.add(genre)
    }
  }

  const handleFilter = event => {
    books.refetch()
    setGenreFilter(event.target.value)
  }

  return (
    <div>
      <h2>books</h2>

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
          {books.data.allBooks.map(a => {
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
      {[...genres].map(genre => <button key={genre} onClick={handleFilter} value={genre}>{genre}</button>)}
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool
}

export default Books