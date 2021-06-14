import React from "react"
import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification, resetNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleForm = async event => {
    event.preventDefault()
    const action = addAnecdote(event.target.anecdote.value)
    dispatch(action)
    dispatch(changeNotification("You added a new anecdote."))
    setTimeout(() => dispatch(resetNotification()), 5000)
    await anecdoteService.add(action.data)
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