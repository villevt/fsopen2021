import React, {useEffect} from "react"
import PropTypes from "prop-types"
import { useQuery, useLazyQuery } from "@apollo/client"

import { FAVORITE_BOOKS, FAVORITE_GENRE } from "../queries"

const Recommend = (props) => {
  if (!props.show) {
    return null
  }

  const favoriteGenre = useQuery(FAVORITE_GENRE)
  const [queryBooks, books] = useLazyQuery(FAVORITE_BOOKS)

  console.log(books)

  useEffect(() => {
    if (!favoriteGenre.loading) {
      console.log(favoriteGenre.data.me.favoriteGenre)
      queryBooks({variables: {genre: favoriteGenre.data.me.favoriteGenre}})
    }
  }, [favoriteGenre.data])

  if (!books.called || books.loading) {
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
    </div>
  )
}

Recommend.propTypes = {
  show: PropTypes.bool
}

export default Recommend