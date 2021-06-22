import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Authors from "./components/Authors"
import Books from "./components/Books"
import Login from "./components/Login"
import NewBook from "./components/NewBook"

const App = ({onLogout}) => {
  const [page, setPage] = useState("authors")
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    window.localStorage.getItem("library-user-token") && setLoggedIn(true)
  }, [])

  const handleLogin = () => {
    setLoggedIn(true)
    setPage("authors")
  }

  const handleLogout = () => {
    setLoggedIn(false)
    onLogout()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!loggedIn && <button onClick={() => setPage("login")}>login</button>}
        {loggedIn && <button onClick={() => setPage("add")}>add book</button>}
        {loggedIn && <button onClick={handleLogout}>logout</button>}
      </div>

      <Authors
        show={page === "authors"} loggedIn={loggedIn}
      />

      <Books
        show={page === "books"}
      />

      <NewBook
        show={page === "add"}
      />

      <Login 
        show={page === "login"} onLogin={handleLogin}
      />

    </div>
  )
}

App.propTypes = {
  onLogout: PropTypes.func
}

export default App