import React, { useState } from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import Anecdote from "./components/Anecdote"
import AnecdoteList from "./components/AnecdoteList"
import CreateNew from "./components/CreateNew"
import Menu from "./components/Menu"

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is &quot;a story with a point.&quot;</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href="https://courses.helsinki.fi/fi/tkt21009">Full Stack -websovelluskehitys</a>.

    See <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1"
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2"
    }
  ])

  const [notification, setNotification] = useState("")
  const [notificationTimeout, setNotificationTimeout] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`a new anecdote ${anecdote.content} is created`)

    clearTimeout(notificationTimeout)
    setNotificationTimeout(setTimeout(() => {
      setNotification("")
    }, 10000))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  /*const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }*/

  const match = useRouteMatch("/anecdotes/:id")
  const anecdote = match
    ? anecdoteById(match.params.id)
    : {}

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification}
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App