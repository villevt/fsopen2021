import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from "@apollo/client"
import { setContext } from "apollo-link-context"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { GENRE_BOOKS } from "./queries"

let genreFilter = ""

const authLink = setContext((request, {headers}) => {
  const token = window.localStorage.getItem("library-user-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({uri: "http://localhost:4000"})

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
})

const splitLink = split(
  (({query}) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" && definition.operation === "subscription"
    )
  }),
  wsLink,
  authLink.concat(httpLink)
)

const handleLogout = () => {
  window.localStorage.clear()
  client.resetStore()
}

const handleBookAdded = book => {
  const books = client.readQuery({query: GENRE_BOOKS, variables: {genre: genreFilter}})

  if (books && !books.allBooks.some(b => b.title === book.title)) {
    client.writeQuery({
      query: GENRE_BOOKS,
      data: {allBooks: books.allBooks.concat(book)},
      variables: {genre: genreFilter}
    })
  }
}

const handleGenreFilterChange = genre => {
  genreFilter = genre
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App onLogout={handleLogout} onBookAdded={handleBookAdded} onGenreFilterChanged={handleGenreFilterChange}/>
  </ApolloProvider>, 
  document.getElementById("root")
)