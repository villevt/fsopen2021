import React from "react"
import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleForm = async event => {
    event.preventDefault()
    await dispatch(addAnecdote(event.target.anecdote.value))
    dispatch(changeNotification("You added a new anecdote.", 5))
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

export default AnecdoteForm