import React from "react"
import PropTypes from "prop-types"

const Anecdote = anecdote => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired
}

export default Anecdote