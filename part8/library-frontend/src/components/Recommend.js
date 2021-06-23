import React, {useEffect} from "react"
import PropTypes from "prop-types"
import { useQuery} from "@apollo/client"

import { FAVORITE_GENRE } from "../queries"

const Recommend = (props) => {
  if (!props.show) {
    return null
  }

  const favoriteGenre = useQuery(FAVORITE_GENRE)

  useEffect(() => {
    if (!favoriteGenre.loading) {
      props.onGenreFilterChanged(favoriteGenre.data.me.favoriteGenre)
    }
  }, [favoriteGenre.data])

  useEffect(() => {
    if (favoriteGenre.data) {
      props.onGenreFilterChanged(favoriteGenre.data.me.favoriteGenre)
    }
  }, [props.show])

  if (favoriteGenre.loading || props.books.loading || !favoriteGenre.data) {
    return (
      <div>
        Loading recommendations
      </div>
    )
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre <b>{favoriteGenre.data.me.favoriteGenre}</b></p>
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
    </div>
  )
}

Recommend.propTypes = {
  books: PropTypes.object,
  show: PropTypes.bool,
  onGenreFilterChanged: PropTypes.func
}

export default Recommend