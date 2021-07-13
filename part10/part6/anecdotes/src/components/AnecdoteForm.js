import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = ({addAnecdote}) => {
  const handleForm = async event => {
    event.preventDefault()
    await addAnecdote(event.target.anecdote.value)
    changeNotification("You added a new anecdote.", 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleForm}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  addAnecdote: PropTypes.func.isRequired,
  changeNotification: PropTypes.func.isRequired
}

const ConnectedAnecdoteForm = connect(null, {addAnecdote, changeNotification})(AnecdoteForm)

export default ConnectedAnecdoteForm