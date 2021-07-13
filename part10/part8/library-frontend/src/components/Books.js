import React, {useState} from "react"
import PropTypes from "prop-types"

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [genreFilter, setGenreFilter] = useState("")

  if (props.books.loading) {
    return (
      <div>
        Loading books
      </div>
    )
  }

  const genres = new Set()
  for (const book of props.books.data.allBooks) {
    for (const genre of book.genres) {
      genres.add(genre)
    }
  }

  const handleFilter = event => {
    props.books.refetch()
    setGenreFilter(event.target.value)
    props.onGenreFilterChanged(genreFilter)
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
          {props.books.data.allBooks.map(a => {
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
  books: PropTypes.object,
  show: PropTypes.bool,
  onGenreFilterChanged: PropTypes.func
}

export default Books