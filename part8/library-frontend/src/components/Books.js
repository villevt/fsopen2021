import React, {useState} from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [genreFilter, setGenreFilter] = useState("")
  const books = useQuery(ALL_BOOKS)

  if (books.loading) {
    return (
      <div>
        Loading books
      </div>
    )
  }

  const filteredBooks = (genreFilter != "")
    ? books.data.allBooks.filter(b => b.genres.some(g => g === genreFilter))
    : books.data.allBooks

  const genres = new Set()
  for (const book of books.data.allBooks) {
    for (const genre of book.genres) {
      genres.add(genre)
    }
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
      {[...genres].map(genre => <button key={genre} onClick={event => setGenreFilter(event.target.value)} value={genre}>{genre}</button>)}
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool
}

export default Books