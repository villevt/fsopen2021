import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Authors from "./components/Authors"
import Books from "./components/Books"
import Login from "./components/Login"
import NewBook from "./components/NewBook"
import Recommend from "./components/Recommend"
import { useSubscription, useQuery } from "@apollo/client"
import { BOOK_ADDED, GENRE_BOOKS } from "./queries"

const App = ({onLogout, onBookAdded, onGenreFilterChanged}) => {
  const [page, setPage] = useState("authors")
  const [loggedIn, setLoggedIn] = useState(false)
  const [genreFilter, setGenreFilter] = useState("")
  const books = useQuery(GENRE_BOOKS, {variables: {genre: genreFilter}})

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      window.alert(`Book ${subscriptionData.data.bookAdded.title} has been added.`)
      onBookAdded(subscriptionData.data.bookAdded)
    },
  })

  useEffect(() => {
    window.localStorage.getItem("library-user-token") && setLoggedIn(true)
  }, [])

  const handleLogin = () => {
    setPage("authors")
    setLoggedIn(true)
  }

  const handleLogout = () => {
    setPage("authors")
    setLoggedIn(false)
    onLogout()
  }

  const handleAdd = () => {
    setPage("books")
  }

  const handleGenreFilterChange = genreFilter => {
    setGenreFilter(genreFilter)
    onGenreFilterChanged(genreFilter)
    console.log("refech")
    books.refetch({variables: {genre: genreFilter}})
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => {
          setPage("books")
          setGenreFilter("")
        }}>books</button>
        {!loggedIn && <button onClick={() => setPage("login")}>login</button>}
        {loggedIn && <button onClick={() => setPage("add")}>add book</button>}
        {loggedIn && <button onClick={() => setPage("recommend")}>recommend</button>}
        {loggedIn && <button onClick={handleLogout}>logout</button>}
      </div>

      <Authors
        show={page === "authors"} loggedIn={loggedIn}
      />

      <Books
        show={page === "books"} books={books} onGenreFilterChanged={handleGenreFilterChange}
      />

      <NewBook
        show={page === "add"} onAdd={handleAdd} 
      />

      <Recommend 
        show={page === "recommend"} books={books} onGenreFilterChanged={handleGenreFilterChange}
      />

      <Login 
        show={page === "login"} onLogin={handleLogin}
      />

    </div>
  )
}

App.propTypes = {
  onLogout: PropTypes.func,
  onBookAdded: PropTypes.func,
  onGenreFilterChanged: PropTypes.func
}

export default App