import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "apollo-link-context"


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

const handleLogout = () => {
  window.localStorage.clear()
  client.resetStore()
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App onLogout={handleLogout}/>
  </ApolloProvider>, 
  document.getElementById("root")
)